/**
 * HomeController
 * @author Norton 2022
 */
import { HomeView } from "./views/homeView.js";
import { ServiceStore } from "./serviceStore.js";
import { EventDepot } from "./eventDepot.js";

export class HomeController {

    constructor(router) {
        this.serviceStore = new ServiceStore();
        this.eventDepot = new EventDepot();
        this.homeView = new HomeView(router);
    }

    load() {
        let allServices = this.serviceStore.getAll()

        if (Object.keys(allServices).length == 0) {
            allServices = loadDefaultServices();
            this.serviceStore.overwriteStorage(allServices);
        }
    
        allServices = shuffle(allServices);

        let context = {};

        // Featured (offer) service
        if (allServices.find(el => el.status == 'offer') != undefined) 
        context = allServices.find(el => el.status == 'offer');

        // Sort the allServices array in reverse by dateUpdated; take the top three
        allServices = allServices.sort((a, b) => a.dateUpdated > b.dateUpdated);


        if (allServices.length > 0) {
            context.allServices = allServices;
            context.testimonials = testimonials;
        }

        this.homeView.render(context);
    }
}