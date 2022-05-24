/**
 * HomeView
 * @author Norton 2022
 */
class HomeView {

    constructor(router) {
        this.router = router;
    }

    async render(context) {
        // if (!context) var context = {};
        context.indexActive = 'active';

        if (!this.template) {
            this.template = await getTemplate('app/views/templates/home.hbs');
        } 

        this.dom = document.getElementById('main');
        this.dom.innerHTML = this.template(context);

        this.router.setRouteLinks(this.dom);
        document.title = `eFinancialInsurance`;
        window.scrollTo(0,0);
    }

}

export { HomeView };