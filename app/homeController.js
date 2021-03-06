/**
 * HomeController
 * @author Norton 2022
 */
import { HomeView } from "./views/homeView.js";
import { EventDepot } from "./eventDepot.js";
import { defaultServices, testimonials } from "./database.js"


export class HomeController {

    constructor(router) {
        this.eventDepot = new EventDepot();
        this.homeView = new HomeView(router);
    }

    load() {

        let allServices = defaultServices;
        allServices = shuffle(allServices);

        let context = {};

        // Featured (offer) service
        context = allServices.find(el => el.status == 'offer');

        // Sort the allServices array in reverse by dateUpdated; take the top three
        allServices = allServices.sort((a, b) => a.dateUpdated > b.dateUpdated);

        if (allServices.length > 0) {
            context.allServices = allServices;
        }

        context.testimonials = testimonials;
        this.homeView.render(context);
    }
}