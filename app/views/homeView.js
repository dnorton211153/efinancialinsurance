/**
 * HomeView
 * @author Norton 2022
 */
class HomeView {

    constructor() {
        this.dom = document.getElementById('mainPlaceholder');
    }

    async getTemplate() {
        return await getTemplate('app/views/templates/home.hbs');
    }

    async render(context) {
        if (!context) var context = {};
        context.indexActive = 'active';
        context.propertyActive = '';

        if (!this.template) {
            this.template = await this.getTemplate();
        } 

        this.dom.innerHTML = this.template(context);

        document.title = `eFinancialInsurance`;
        window.scrollTo(0,0);
    }

}

export { HomeView };