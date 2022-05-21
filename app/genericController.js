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

        // Strip the template name from the request.path
        this.genericView.render(params.page, { allServices, service });
    }
}

export { GenericController };