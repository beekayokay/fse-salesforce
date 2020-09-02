trigger LastActivity on Task (after insert, after update) {

    //Create Set of All Related To Ids
    Set<String> whatIDs = new Set<String>();
        
    //Add IDs to Set
        for(Task t : Trigger.new){
            whatIds.add(t.whatID);
        }
    
    //Select Tasks Related To Opportunities
    List<Opportunity> opps = [SELECT Id, Last_Activity__c FROM Opportunity WHERE Id =: whatIDs];
    
    //Create Mapping of Related To IDs and Opportunity IDs
    Map<String, Task> taskMap = new Map<String, Task>();    
    for (Task t : Trigger.new){
        if(t.whatID != NULL){
            taskMap.put(t.whatID, t);
        }
    }
    
    //Create User Map
    Set<Id> Users = new Set<Id>();
        for (Task t : Trigger.new)
             Users.add(t.OwnerId);
    Map<Id, User> userMap = new Map<Id, User>(
              [SELECT Name FROM User WHERE Id IN :Users]);
    
    for (Opportunity o : opps){
        if (taskMap.containsKey(o.Id)){
            for (Task t : Trigger.new){
                if(t.Status == 'Completed'){
                Datetime theDateTime = taskMap.get(o.Id).LastModifiedDate;
                o.Last_Activity__c = 
                    userMap.get(t.OwnerId).Name
                    + ' ('
                    +
                    + theDateTime.format('MM/dd/yyyy h:mm:ss a','America/New_York')
                    +
                    ') - '
                    + taskMap.get(o.Id).Description;
                }
            }
        }
    }
    
    upsert opps;
    
}