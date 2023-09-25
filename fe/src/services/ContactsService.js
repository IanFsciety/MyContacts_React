import httpClient from "./utils/httpClient";

class ContactsService {
  constructor() {
    this.httpClient = new httpClient('http://localhost:8000');
  }
  listContacts(orderBy= 'asc') {
   return  this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }


  getContactById(id) {
    return this.httpClient.get(`/contacts/${id}`)
  }

  createContacts(contact) {
    return  this.httpClient.post('/contacts', contact);
   }

   updateContact(id, contact) {
    return this.httpClient.put(`/contacts/${id}`, {body: contact})
   }

   deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
   }
}

export default new ContactsService();
