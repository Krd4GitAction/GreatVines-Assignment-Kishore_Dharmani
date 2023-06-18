trigger CreateChildAccount on Account (after insert, after update) {
	if(Trigger.isAfter && Trigger.isInsert){
        if(!AccountController.isFisrtRun){
            AccountController.isFisrtRun=true;
            AccountController.AfterInsert(Trigger.new);
        } 
	}
    if(Trigger.isAfter && Trigger.isUpdate){
        if(!AccountController.isFisrtRun){
            AccountController.isFisrtRun=true;
        	AccountController.AfterUpdate(Trigger.new,Trigger.oldmap);
    	}
	}
}