/**
 * Generic router to override default link handling within the application
 * @author Norton 2022
 */
class Router {

    constructor() {
        this.routingTable = {};
        this.navigateTo = this.navigateTo.bind(this);
        this.setRouteLinks = this.setRouteLinks.bind(this);
    }
}

/**
 * Add(path, handler) - adds a path to the router list with a handler function
 * @param {String} path e.g. '/property.html' ?
 * @param {fn(props)} handler fn for this path, where props is array of URL params, 
 *                            e.g. [propertyId=4,uid=whatever]
 */
Router.prototype.add = function(path, handler) {
    this.routingTable[path] = handler;
}

/**
 * navigateTo(path, query)
 * @param {String} path 
 * @param {String} query 
 * @param {Boolean} pop 
 */
Router.prototype.navigateTo = function(path, query, pop) {

    let handler = this.routingTable[path];

    // Handle history state push
    if (!pop) {
        var historyState = { path: path, query: query };
        history.pushState(historyState, path + query, path + query);
    }

    // Strip the initial '?' and create an array of params,
    // include these in a request object
    var query = query.substring(1);
    let request = { path: path, parameters: query.split('&') };

    handler(request);
}

/**
 *  setRouteLinks - finds all the links (anchors) that need to be 
 * handled by the router and attaches a method to call navigateTo
 */
Router.prototype.setRouteLinks = function() {

    let anchorElements = document.querySelectorAll('a[data-route-link]');
    anchorElements.forEach(el => {
        el.addEventListener('click', e => {
            // HTMLAnchorElement has the following properties:
            // pathname - path from the href attribute (no query string)
            // search - query string including leading ? from the href attribute 
            this.navigateTo(el.pathname, el.search, false);
            e.preventDefault();
        });
    });
}


export { Router };