"use strict";

var homeSliderTimer;
var themeSlideVideos = [];
var inAnimation 	 = false;

function clear_slider_timer() {
	window.clearInterval( homeSliderTimer );
}

function setPanel( referencePanel ) {
	
	inAnimation	 	= true;
	let currentPanel = jQuery( '#slideshow > li' ).index( jQuery( '#slideshow > li.selected' ) );
	
	if( currentPanel != referencePanel ) {
		
		jQuery( '#slideshow > li' ).eq( currentPanel ).fadeOut( 1000, function() {
			jQuery( this ).removeClass( 'selected' );
			jQuery( this ).css( 'display', '' );
		} );
		
		jQuery( '#slideshow > li' ).eq( referencePanel ).fadeIn( 1000, function() {
			
			let slide_id = jQuery( this ).attr( 'id' );
			
			if( themeSlideVideos[ slide_id ] ) {
				
				themeSlideVideos[ slide_id ].video.playVideo();
				clear_slider_timer();
				
				for( let key in themeSlideVideos ) {
					
					let obj = themeSlideVideos[ key ];
					
					if( obj.slide_id === slide_id ) {
						continue;
					}
					
					jQuery( '#' + obj.video_id )
						.attr( 'tmp', jQuery( '#' + obj.video_id ).attr( 'src' ) )
						.attr( 'src', '' )
						.attr( 'src', jQuery( '#' + obj.video_id ).attr( 'tmp' ) )
						.removeAttr( 'tmp' );
					
				}
				
			}
			
			jQuery( this ).addClass( 'selected' );
			jQuery( this ).css( 'display', '' );
			
			inAnimation = false;
		} );
	}
	
}

function fadeBanners( prev ) {
	
	let nextprev		= ( 'undefined' !== typeof prev ) ? -1 : 1;
	let totalPanels		= jQuery( '#slideshow > li').length;
	let currentPanel 	= jQuery( '#slideshow > li' ).index( jQuery( '#slideshow > li.selected' ) );
	let nextPanel 		= ( currentPanel + nextprev ) % totalPanels;
	
	setPanel( nextPanel );
	
}

function reset_slider_timer() {
	homeSliderTimer = window.setInterval( fadeBanners, 10 * 1000 );
}

/**
 * Youtube API
 */	
function onYouTubeIframeAPIReady() {
	
	jQuery( 'div.homeVideoWrapper' ).each( function() {
		
		let slide = {}
		slide.slide_id 	= jQuery( this ).closest( 'li' ).attr( 'id' );
		slide.video_id 	= slide.slide_id.replace( 'slide', 'video' );
		let youtube_id 	= jQuery( '#' + slide.video_id ).data( 'id' ); 
		
		slide.video = new YT.Player( slide.video_id, {
			height	: '360',
			width	: '640',
			videoId	: youtube_id,
			playerVars : {
				'autoplay'		: 0,
				'disablekb'		: 1,
				'fs'			: 0,
				'iv_load_policy': 3,
				'modestbranding': 1,
				'loop'			: 0,
				'controls'		: 0,
				'showinfo'		: 0,
				'rel'			: 0,
				'enablejsapi'	: 1,
				'mute'			: 1,
				'wmode' 		: 'transparent'
			},
			events : {
				'onReady' 		: pkOnPlayerReady,
				'onStateChange' : pkOnPlayerStateChange
			}
		} );
		
		themeSlideVideos[ slide.slide_id ] = slide;
		
	} );
	
}

function pkOnPlayerStateChange( e ) {
	
	e.target.setVolume(0);
	
	if( e.data === YT.PlayerState.BUFFERING ) {
		e.target.setPlaybackQuality( 'highres' );
	}
	
	if( 0 == e.data ) {
		e.target.stopVideo();
		reset_slider_timer();
		fadeBanners();
	} else if( 1 == e.data ) {
		clear_slider_timer();
	}
	
}

function pkOnPlayerReady( e ) {
	
	e.target.mute();
	e.target.setPlaybackQuality( 'highres' );
	
}

//Load a youtube pixel
var pkEnableYoutube = function() {
	let deferred = jQuery.Deferred();
	let img 	 = new Image();
	img.onload 	 = function() { return deferred.resolve(); };
	img.onerror  = function() { return deferred.reject(); };
	img.src 	 = "https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif?"+ new Date().getTime();
	return deferred.promise();
};


function theme_read_cookie( name ) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}


jQuery( function( $ ) {
	
	//When the video starts to load, set a timer for the video wrap to fade in
	$.when( pkEnableYoutube() ).done( function() {
		
		if( $( 'body' ).hasClass( 'is-mobile' ) ) {
			return;
		}
		
		setTimeout( function() {
			
			if( $( '#slideshow > li:first-child iframe' ).length ) {
				let slide_id = $( '#slideshow > li:first-child' ).attr( 'id' );
				themeSlideVideos[ slide_id ].video.playVideo();
			}
			
			$( '.homeVideoWrapper' ).fadeIn();
			
		}, 2000 );
		
	} );
	
	
	/**
	 * Document Ready
	 */
	$( document ).ready( function( $ ) {
	
	
		/***
		* Mobile Settings
		***/
		if( $( '#openMobileMenu' ).length ) {
			
			$( '#closeMobileMenu' ).click( function() {
				$( 'body, html' ).removeClass( 'mobileMenu-open' );
				$( '#mobileMask' ).remove();
			} );
			
			// Open Mobile Menu Actions
			$( '#openMobileMenu' ).click( function() {
				$( 'body, html' ).addClass( 'mobileMenu-open' );
				$( 'body').append( '<div id="mobileMask"></div>' );
				
				// Mobile Menu Settings
				$( '#mobileMask').click( function() {
					$( 'body, html' ).removeClass( 'mobileMenu-open' );
					$( '#mobileMask' ).remove();
				} );
			} );
			
			// Submenu Click
			$( '#mobileNav ul li.menu-item-has-children i' ).click( function( e ) {
				
				e.preventDefault();
				e.stopPropagation();
				
				var $parent_li	= $( this ).closest( 'li' );
				var $click_span = $( this );
				
				$( '> ul.sub-menu', $parent_li ).slideToggle( function() {
					$parent_li.addClass( 'active' );
					
					if( $click_span.hasClass( 'fa-plus' ) ) {
						$click_span.removeClass( 'fa-plus' ).addClass( 'fa-minus' );
					} else {
						$click_span.removeClass( 'fa-minus' ).addClass( 'fa-plus' );
					}
					
				} );
				
			} );
			
		}
		
		
		/**
		 * Homepage Slideshow
		 */
		if( $( '#slideshow' ).length ) {
			
			if( $( '#slideshow > li' ).length >= 2 ) {
				reset_slider_timer();
			} else {
				$( '#slideshowWrapper > a' ).remove();
			}
			
			// Slide Nav Click
			$( '#slideshowWrapper > a' ).click( function( e ) {
				
				e.preventDefault();
				e.stopPropagation();
				
				if( inAnimation ) {
					return false;
				}
				
				clear_slider_timer();
				
				if( $( this ).hasClass( 'prev' ) ) {
					fadeBanners( true );
				} else {
					fadeBanners();
				}
				
			} );
			
		}
		
		
		$( '#content .productButtons a.btnOxfordBlue' ).click( function( e ) {
			
			if( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {
				
				e.preventDefault();
				let $target		= $( 'div.wc-tabs-wrapper' );
				
				if( $target.length ) {
					
					e.preventDefault();
					$( '#tab-title-contact a' ).trigger( 'click' );
					$( 'html, body' ).animate( {
							scrollTop: $target.offset().top
						}, 
						1000
					);
					
				}
				
			}
			
		} );
		
		
		/**
		 * Site Select Dropdown
		 */
		if( $( '#siteSelect' ).length ) {
			
			let locale 		= theme_read_cookie( 'bab_locale' );
			let $selected 	= $( '#siteSelect li.en_us' );
			
			if( $( '#siteSelect li.' + locale ).length ) {
				$selected = $( '#siteSelect li.' + locale );
			}
			$( '#siteSelect' ).prepend( $selected );
			
			$( '#siteSelect > li > a' ).on( 'click', function( e ) {
				e.preventDefault();
				e.stopPropagation();
				$( this ).closest( '#siteSelect' ).find( '.children' ).toggle();
			} );
			
			$( 'body' ).on( 'click tap', function( e ) {
				
				if( '#siteSelect' == e.target_id || $( e.target ).closest( '#siteSelect' ).length ) {
					return;
				}
				
				$( '#siteSelect .children' ).hide();
				
		 	} );
			
		}
		
		
	} ); // END Dom Ready
	
} ); // END Jquery Alias