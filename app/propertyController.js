/* Norton's rendition of the BlueSky Page (June 2019) */
import { ServiceStore } from "./serviceStore.js";
import { PropertyView } from "./views/propertyView.js";

class PropertyController {
    constructor(callback) {

        this.serviceStore = new ServiceStore();
        this.propertyView = new PropertyView(() => {
            callback();
        });
    }
}

PropertyController.prototype.load = function(request, callback) {

    let allServices = this.serviceStore.getAll()

    var property = { };

    if (request.parameters[0]) {

        let params = getParamsFromRequest(request);
        property = this.serviceStore.get(params.serviceId);
    
    } 

    property.types = getFromProperties(allServices, "type");
    property.cities = getFromProperties(allServices, "city");

    this.propertyView.render(() => {

        if (callback) callback();
    
    }, property);
}

export { PropertyController };