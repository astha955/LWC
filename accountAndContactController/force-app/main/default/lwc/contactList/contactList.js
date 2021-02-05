import { LightningElement,wire,api} from 'lwc';
import { reduceErrors } from 'c/ldsUtils';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import getContacts from '@salesforce/apex/ContactController.getContacts';
const COLUMNS = [
    { label: 'FirstName', fieldName: FIRSTNAME_FIELD.fieldApiName, type: 'text' },
    { label: 'LastName', fieldName: LASTNAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'email' }
];
export default class ContactList extends LightningElement {
    
    columns = COLUMNS;
    @api recordId;
    errors;

    handleButtonClick() {
        getContacts({
            contactId: '$recordId'
        })
            .then(contacts => {
                // code to execute if the promise is resolved
            })
            .catch(error => {
                this.errors = reduceErrors(error); // code to execute if the promise is rejected
            });
    }

    get errors() {
        return (this.contacts.error) ?
            reduceErrors(this.contacts.error) : [];
    }

    @wire(getContacts)
    contacts;
}