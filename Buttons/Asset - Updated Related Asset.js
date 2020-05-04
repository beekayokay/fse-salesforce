{!RequireScript("/soap/ajax/42.0/connection.js")}

var uriToOpen = '/flow/Clone_Asset_Information?CurrentAssetID={!Asset.Id}&retURL={!Asset.Id}';

if ('{!$User.ProfileId}' != '00ei0000000qvTB' && '{!$User.ProfileId}' != '00ei0000001Xb3u')
{
    alert('This button is only accessible by admins and marketing users');
}
else
{
    var confirmVal = confirm('WARNING!!! This will overwrite information on all related Assets. Do you want to continue?');
    if (confirmVal == true)
    {
        parent.location=(uriToOpen);
        alert('Records were successfully updated!')
    }
    else
    {
        alert('Records were not updated')
    }
}