/**
 * AppView
 * @author Norton 2022
 */
import { AppView } from './views/appView.js'

export class AppController {

    constructor(callback) {
        this.appView = new AppView(() => { callback() });
    }

    load(callback) {
        this.appView.render(() => {
            callback();
        });
    }
}
