/* Norton's rendition of the MVC Property Mgmt Page (June 2019) */
import { HomeView } from "./views/homeView.js";
import { PropertyStore } from "./propertyStore.js";
import { EventDepot } from "./eventDepot.js";

export class HomeController {

    constructor() {
        this.propertyStore = new PropertyStore();
        this.eventDepot = new EventDepot();
        this.homeView = new HomeView();
    }

    load() {
        let allProperties = this.propertyStore.getAll()

        if (Object.keys(allProperties).length == 0) {
            allProperties = loadDefaultProperties();
            this.propertyStore.overwriteStorage(allProperties);
        }
    
        allProperties = shuffle(allProperties);

        let context = {};

        // Featured (offer) service
        if (allProperties.find(el => el.status == 'offer') != undefined) 
        context = allProperties.find(el => el.status == 'offer');

        // Sort the allProperties array in reverse by dateUpdated; take the top three
        allProperties = allProperties.sort((a, b) => a.dateUpdated > b.dateUpdated);
        let someProperties = allProperties.filter((el, index) => index < 3);

        if (allProperties.length > 0) {
            context.properties = someProperties;
            context.testimonials = testimonials;
        }

        this.homeView.render(context);
    }
}