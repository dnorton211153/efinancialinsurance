import { MessagesController } from "./app/messagesController.js";
import { AppController } from "./app/appController.js";
import { HomeController } from "./app/homeController.js";
import { GenericController } from "/app/genericController.js";
import { NavController } from "/app/navController.js";
import { Router } from "./app/router.js";
class App {
  constructor() {
    this.router = new Router();
    this.addRouterLinks();

    this.messageController = new MessagesController();
    this.addWindowEventListeners();
  }
}

App.prototype.load = async function () {
  
  this.appController = new AppController();
  await this.appController.load();

  this.navController = new NavController(this.router);
  await this.navController.load({});
  // await this.registerPartials();
  
  this.homeController = new HomeController(this.router);
  this.genericController = new GenericController(this.router);

  this.router.navigateTo(
    window.location.pathname,
    window.location.search,
    false
  );

};

App.prototype.addWindowEventListeners = function () {
  window.addEventListener("error", (e) => {
    // catches runtime errors, e.g. throw new Error(....);
    this.messageController.displayMessage(e.error);
  });

  window.addEventListener("popstate", (e) => {
    let { path, query } = e.state;
    this.router.navigateTo(path, query, true);
  });
};

App.prototype.addRouterLinks = function () {
  this.router.add("/", () => {
    this.homeController.load();
  });

  this.router.add("/index.html", () => {
    this.homeController.load();
  });

  // GenericController is for static pages
  this.router.add("/generic.html", (request) => {
    this.genericController.load(request);
  });
};

App.prototype.registerPartials = async function () {
  text = await handleGet("app/views/templates/searchbar.hbs");
  Handlebars.registerPartial("searchbar", text);
};

export { App };
