import { MessagesController } from "./app/messagesController.js";
import { AppController } from "./app/appController.js";
import { HomeController } from "./app/homeController.js";
import { GenericController } from '/app/genericController.js';

import { PropertyManagementController } from "./app/propertyManagementController.js";
import { Router } from "./app/router.js";
class App {
  constructor() {
    this.router = new Router();
    this.addRouterLinks();

    this.messageController = new MessagesController();
    this.addWindowEventListeners();

    

  }
}

App.prototype.load = async function() {

  this.appController = new AppController(() => {
    this.appController.load(async () => {
        await this.registerPartials();
        
        this.homeController = new HomeController(this.router);
        this.genericController = new GenericController(this.router);

        this.router.navigateTo(
          window.location.pathname,
          window.location.search,
          false
        );


        // this.propertyManagementController = new PropertyManagementController(
        //   () => {
        //     this.propertiesController = new PropertiesController(() => {
        //       this.propertyController = new PropertyController(() => {
        //         this.contactController = new ContactController(() => {
        //           
        //           
        //           
        //         });
        //       });
        //     });
        //   }
        // );

    });
  });
}

App.prototype.addWindowEventListeners = function() {
    window.addEventListener("error", e => {
      // catches runtime errors, e.g. throw new Error(....);
      this.messageController.displayMessage(e.error);
    });
  
    window.addEventListener("popstate", e => {
      let { path, query } = e.state;
      this.router.navigateTo(path, query, true);
    });
  };
  
App.prototype.addRouterLinks = function() {
    this.router.add("/", request => {
      this.homeController.load();
    });
  
    this.router.add("/index.html", request => {
      this.homeController.load();
    });

    this.router.add("/management.html", request => {
      this.propertyManagementController.load(request);
    });

    // GenericController is for static pages
    this.router.add("/generic.html", request => {
      this.genericController.load(request);
    });

  };
  
App.prototype.registerPartials = async function() {

    let text = await handleGet('app/views/templates/navbar.hbs');
    Handlebars.registerPartial("navbar", text);
  
    text = await handleGet('app/views/templates/searchbar.hbs');
    Handlebars.registerPartial("searchbar", text);
            
    text = await handleGet("app/views/templates/footer.hbs");
    Handlebars.registerPartial("footer", text);
  
};

export { App };