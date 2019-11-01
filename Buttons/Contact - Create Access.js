{!REQUIRESCRIPT("/soap/ajax/30.0/connection.js")}
{!REQUIRESCRIPT("/soap/ajax/24.0/apex.js")}

var accessCheck = sforce.connection.query("SELECT Id FROM Contact_Access__c WHERE Contact__c = '{!Contact.Id}'")

records = accessCheck.getArray("records");

if(records.length>0){
  alert("You can only have 1 Contact Access record per Contact. Please edit the existing record to make changes");
}

else {
  window.open("/a0M/e?CF00N5B000000SSo0=" + '{!Contact.Name}' + "&CF00N5B000000SSo0_lkid=" + '{!Contact.Id}' + "&retURL=%2F" + '{!Contact.Id}',"_self");
}
