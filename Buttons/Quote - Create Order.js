{!REQUIRESCRIPT("/soap/ajax/43.0/connection.js")}

var url_string = '/801/e?\
accid_lkid={!SBQQ__Quote__c.SBQQ__AccountId__c}\
&nooverride=1\
&cancelURL=%2F{!SBQQ__Quote__c.Id}\
&CF00N0H00000JO7uq={!SBQQ__Quote__c.Name}\
&CF00N0H00000JO7uq_lkid={!SBQQ__Quote__c.Id}\
&EffectiveDate={!TODAY()}\
&opptyid_lkid={!SBQQ__Quote__c.SBQQ__Opportunity2Id__c}\
&BillingAddresscity={!SBQQ__Quote__c.SBQQ__BillingCity__c}\
&BillingAddressstreet={!SBQQ__Quote__c.SBQQ__BillingStreet__c}\
&BillingAddresszip={!SBQQ__Quote__c.SBQQ__BillingPostalCode__c}\
&ShippingAddresscity={!SBQQ__Quote__c.SBQQ__ShippingCity__c}\
&ShippingAddressstreet={!SBQQ__Quote__c.SBQQ__ShippingStreet__c}\
&ShippingAddresszip={!SBQQ__Quote__c.SBQQ__ShippingPostalCode__c}\
&Status=Draft\
&00N0H00000JZD1f={!SBQQ__Quote__c.SBQQ__BillingName__c}\
&00N0H00000JZD2C={!SBQQ__Quote__c.SBQQ__ShippingName__c}\
&00N0H00000JO7un={!TEXT(SBQQ__Quote__c.SBQQ__PaymentTerms__c)}\
&00N0H00000JZD2G={!TEXT(SBQQ__Quote__c.Shipping_Terms__c)}\
&00N0H00000JZD2F={!SBQQ__Quote__c.Shipping_Term_Location_or_Other__c}\
&CF00N0H00000JZD1p_lkid={!SBQQ__Quote__c.End_UserId__c}\
&CF00N0H00000JZD1p={!SBQQ__Quote__c.End_User__c}\
&CF00N29000001Oucc_lkid={!SBQQ__Quote__c.SBQQ__DistributorId__c}\
&CF00N0H00000JZD27={!SBQQ__Quote__c.SBQQ__Distributor__c}\
&CF00N0H00000JZD1m_lkid={!SBQQ__Quote__c.EPC_ContractorId__c}\
&CF00N0H00000JZD1m={!SBQQ__Quote__c.EPC_Contractor__c}\
&saveURL=\
%2Fapex\
%2Fsbqq__orderlineselector\
%3FopportunityId%3D{!SBQQ__Quote__c.SBQQ__Opportunity2Id__c}\
%26quoteId%3D{!SBQQ__Quote__c.Id}'

if({!SBQQ__Quote__c.SBQQ__Primary__c} == false){
    alert('Quote must be marked as Primary before creating an Order');
}
else{
    window.open(url_string);
}