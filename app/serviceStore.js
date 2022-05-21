/* Norton's rendition of the BlueSky Page (June 2019) */

class ServiceStore {

    constructor() {
        this.serviceStore = [];

        if (localStorage.getItem('serviceStore')) {
            this.serviceStore = JSON.parse(localStorage.getItem('serviceStore'));
        } else {
            localStorage.setItem('serviceStore', JSON.stringify(this.serviceStore));
        }
    }
}

ServiceStore.prototype.uniqueId = function() {
    let id = 0;
    for (let property of this.serviceStore) 
        if (property.id >= id) 
            id = Number(property.id) + 1;
    return id;
}

ServiceStore.prototype.add = function(object) {
    object.dateCreated = new Date().toISOString();
    object.dateUpdated = new Date().toISOString();
    this.serviceStore.push(object);
    this.syncStorage();
}

ServiceStore.prototype.get = function(id) {
    return this.serviceStore.find(e => e.id == id);
}

ServiceStore.prototype.getAll = function() {
    return this.serviceStore;
}

ServiceStore.prototype.update = function(object) {
    object.dateUpdated = new Date().toISOString();
    this.remove(object.id);
    this.serviceStore.push(object);
    this.syncStorage();
}

ServiceStore.prototype.remove = function(id) {
    this.serviceStore = this.serviceStore.filter(u => u.id != id );
    this.syncStorage();
}

ServiceStore.prototype.syncStorage = function() {
    localStorage.setItem('serviceStore', JSON.stringify(this.serviceStore));
}

ServiceStore.prototype.overwriteStorage = function(properties) {
    localStorage.setItem('serviceStore', JSON.stringify(properties));
}

export { ServiceStore };