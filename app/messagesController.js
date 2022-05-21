/**
 * MessagesView
 * @author Norton 2022
 */
import { MessagesView } from "./views/messagesView.js"

export class MessagesController {

    constructor() {
        this.messages = new MessagesView(this);
    }

    displayMessage(message) {
        this.messages.updateMessage(message);
    }
}