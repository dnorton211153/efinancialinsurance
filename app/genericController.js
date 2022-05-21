import { GenericView } from "./views/genericView.js";
import { defaultServices } from "./database.js"

class GenericController {
    constructor(router) {
        this.genericView = new GenericView(router);
    }

    load(request) {

        let allServices = defaultServices;
        allServices = shuffle(allServices);

        // At least one param is required; the templateName
        let params = getParamsFromRequest(request);
        let service = allServices.find(el => el.id == params.serviceId);

        // Strip the template name from the request.path
        this.genericView.render(params.page, { allServices, service });
    }
}

export { GenericController };