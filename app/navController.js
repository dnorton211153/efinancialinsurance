/**
 * HomeController
 * @author Norton 2022
 */
 import { NavView } from "./views/navView.js";
 import { EventDepot } from "./eventDepot.js";
 import { defaultServices } from "./database.js"
 
 
 export class NavController {
 
     constructor(router) {
         this.eventDepot = new EventDepot();
         this.navView = new NavView(router);
     }
 
     load(context) {
 
         let allServices = defaultServices;
         if (allServices.length > 0) {
             context.allServices = allServices;
         }
 
        this.navView.render(context);
     }
 }