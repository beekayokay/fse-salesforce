{!REQUIRESCRIPT("/soap/ajax/43.0/connection.js")}

try {
    var quote = new sforce.SObject("SBQQ__Quote__c");
    quote.Id = "{!SBQQ__Quote__c.Id}";
    quote.Proposal_Created_Date__c = new Date().toISOString();
    let d = new Date();
    let date_plus_exp = d.setDate(d.getDate() + 60);
    quote.SBQQ__ExpirationDate__c = new Date(date_plus_exp).toISOString();
    result = sforce.connection.update([quote]);
    window.location.href = "/apex/SBQQ__RefreshQuotePrice?id={!SBQQ__Quote__c.Id}";
} catch (e) {
    alert (e);
}