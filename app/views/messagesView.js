/**
 * MessagesView
 * @author Norton 2022
 */
export class MessagesView {
    constructor() { }

    async updateMessage(message) {
        let context = { 'hidden': false, 'message': message };

        if (!this.template) {
            this.template = await getTemplate('app/views/templates/messages.hbs');
        } 
    
        document.getElementById('messagesPlaceholder').innerHTML = template(context);
    }
}
