/**
 * GenericView is for non-dynamic pages like Contact and About;
 * just grabs the HBS template and places it in the mainPlaceholder;
 * when rendering provide templateName and optional context params.
 */
class GenericView {
    constructor(router) {
        this.router = router;
    }

    async render(templateName, context) {
        if (!context) var context = {};
        context[templateName] = 'active';

        this.template = await getTemplate(`app/views/templates/${templateName}.hbs`);

        this.dom = document.getElementById('mainPlaceholder');
        this.dom.innerHTML = this.template(context);

        this.router.setRouteLinks();
        document.title = `eFinancialInsurance - ${templateName}`;
        // document.documentElement.scrollTop = 0;
        window.scrollTo(0,0);
    }
}

export { GenericView };