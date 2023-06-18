public with sharing class AccountController {
    public static Boolean isFisrtRun=false;
    
    public static void AfterInsert(List<Account> newlist){
        List<Account> acctoinsert=new List<Account>();
        for(Account acc:newlist){
            if(acc.Status__c!=null && acc.Status__c=='Cold'){
                Account accobj= new Account();
                accobj.ParentId=acc.id;
                accobj.Name= 'Child of' +acc.Name;
                if(Schema.sObjectType.Account.fields.Status__c.isCreateable()){
                accobj.Status__c=acc.Status__c;    
                }
                acctoinsert.add(accobj);
            }
        }
        if(!acctoinsert.isEmpty()){
            if(Schema.sObjectType.Account.isCreateable()){
            insert acctoinsert;    
            }  
        }
    }

    public static void AfterUpdate(List<Account> newlist,Map<Id,Account> oldlist){
        List<Account> acctoinsert=new List<Account>();
        for(Account acc:newlist){
            if(acc.Status__c!=oldlist.get(acc.Id).Status__c && acc.Status__c=='Cold'){
                Account accobj= new Account();
                accobj.ParentId=acc.id;
                accobj.Name='Child of' +acc.Name;
                if(Schema.sObjectType.Account.fields.Status__c.isCreateable()){
                accobj.Status__c=acc.Status__c;    
                }
                acctoinsert.add(accobj);
            }
        }
        if(!acctoinsert.isEmpty()){
            if(Schema.sObjectType.Account.isCreateable()){
            insert acctoinsert;    
            }  
        }
    }
}