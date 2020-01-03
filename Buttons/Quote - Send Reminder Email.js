{!REQUIRESCRIPT("/soap/ajax/43.0/connection.js")}

try {
    var url = parent.location.href;
    var update_records = [];
    var update_quote = new sforce.SObject("SBQQ__Quote__c");
    update_quote.id = "{!SBQQ__Quote__c.Id}";
    update_quote.Last_Reminder_Email_Sent__c = new Date().toISOString();
    update_records.push(update_quote);

    result = sforce.connection.update(update_records);
    parent.location.href = url;

    alert('Email has been successfully sent!');
} catch (e) {
    alert (e);
}