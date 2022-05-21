import { ServiceStore } from "./serviceStore.js";
import { GenericView } from "./views/genericView.js";

class GenericController {
    constructor(router) {
        this.serviceStore = new ServiceStore();
        this.genericView = new GenericView(router);
    }

    load(request) {

        // let allServices = this.serviceStore.getAll()
        let allServices = defaultServices;

        if (Object.keys(allServices).length == 0) {
            allServices = loadDefaultServices();
            this.serviceStore.overwriteStorage(allServices);
        }
    
        allServices = shuffle(allServices);

        // At least one param is required; the templateName
        let params = getParamsFromRequest(request);
        let service = this.serviceStore.get(params.serviceId);

        // Strip the template name from the request.path
        this.genericView.render(params.page, { allServices, service });
    }
}

export { GenericController };