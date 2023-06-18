import { LightningElement,track,api,wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

const tables = [
    {
        id: '1',
        name: 'Related Accounts List',
        columns: [   
            { label: 'Name', fieldName: 'Name' },
            { label: 'Status', fieldName: 'Status__c' },
            { label: 'Annual Revenue', fieldName: 'AnnualRevenue' },
            { label: 'Created Date', fieldName: 'CreatedDate' }
        ],
    },
    {
        id: '2',
        name: 'Related Contacts List',
        columns: [   
            { label: 'Name', fieldName: 'Name' },
            { label: 'Email', fieldName: 'Email' },
            { label: 'Do Not Call', fieldName: 'DoNotCall' },
            { label: 'Created Date', fieldName: 'CreatedDate' }
        ],
    }
];

export default class AccountRelatedRecords extends LightningElement {
    @api recordId;
    tables=tables;
    accdata = [];
    condata = [];


    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'ChildAccounts',
        fields: [ 'Account.Id', 'Account.Name', 'Account.Status__c', 'Account.AnnualRevenue', 'Account.CreatedDate' ]
        })acclistInfo({error, data}) {

        if(data) {
            let tempRecords = [];
            data.records.forEach(obj => {
                let tempRecord = {};
                tempRecord.Id = obj.fields.Id.value;
                tempRecord.Name = obj.fields.Name.value;
                tempRecord.Status__c = obj.fields.Status__c.value;
                tempRecord.AnnualRevenue = obj.fields.AnnualRevenue.value;
                tempRecord.CreatedDate = obj.fields.CreatedDate.displayValue;
                tempRecords.push(tempRecord);
            });
            this.accdata = tempRecords;
            this.updateTable();
        }   else if (error) {
                this.accdata = undefined;
                console.error('Error occurred retrieving Account records...'+error.body.message);
            }
    }

    @wire(getRelatedListRecords, {
        parentRecordId: '$recordId',
        relatedListId: 'Contacts',
        fields: [ 'Contact.Id', 'Contact.Name', 'Contact.Email', 'Contact.DoNotCall', 'Contact.CreatedDate' ]
        })conlistInfo({error, data}) {

        if(data) {
            let tempRecords = [];
            data.records.forEach(obj => {
                let tempRecord = {};
                tempRecord.Id = obj.fields.Id.value;
                tempRecord.Name = obj.fields.Name.value;
                tempRecord.Email = obj.fields.Email.value;
                tempRecord.DoNotCall = obj.fields.DoNotCall.value;
                tempRecord.CreatedDate = obj.fields.CreatedDate.displayValue;
                tempRecords.push(tempRecord);
            });
            this.condata = tempRecords;
            this.updateTable();
        }   else if (error) {
                this.condata = undefined;
                console.error('Error occurred retrieving Contact records...'+error.body.message);
            }
    }

    updateTable(){
        this.tables= this.tables.map(obj => {
            return {...obj, data: obj.id=='1'? this.accdata : this.condata};
        });
    }

}