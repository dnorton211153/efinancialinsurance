/* Norton's rendition of the BlueSky Page (June 2019) */
import { ServiceStore } from "./serviceStore.js";
import { PropertiesView } from "./views/propertiesView.js";

class PropertiesController {
  constructor(callback) {
    this.serviceStore = new ServiceStore();
    this.propertiesView = new PropertiesView(() => {
      callback();
    });
  }
}

PropertiesController.prototype.load = function(request, callback) {
  let allServices = this.serviceStore.getAll();
  let context = { properties: allServices };
  context.types = getFromProperties(allServices, "type");
  context.cities = getFromProperties(allServices, "city");

  var params = {};

  if (request) {
    params = getParamsFromRequest(request);

    if (Object.keys(params).length > 0) {
      for (let paramName in params) {
        if (params[paramName] != "null") {
          context.properties = context.properties.filter(property => {
            return property[paramName] == params[paramName];
          });
        }
      }
    }
  }

  this.propertiesView.render(() => {
    if (callback) callback();
  }, context);
};

export { PropertiesController };
