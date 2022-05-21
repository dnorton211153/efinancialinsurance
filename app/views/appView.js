/**
 * appView
 * @author Norton 2022
 */
class AppView {

  constructor(callback) {

    // Could switch preLoad to async function using promises... might look nicer.
    // e.g. https://attacomsian.com/blog/javascript-load-script-async 
    this.preLoad("https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js", () => {
      this.preLoad("https://kit.fontawesome.com/48d135817c.js", () => {
        this.preLoad("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js", () => {
          this.preLoad("/general.js", () => {

            // After HB is loaded, get the header
            fetch("app/views/templates/appHead.html").then(response => response.text()).then(text => {
                let t = document.createElement('template');
                t.innerHTML = text;
                document.head.append(t.content);
                callback();
              });
            });
        });
        
      })
    });
  }
}
  
AppView.prototype.render = function(callback) {

    let messagesPlaceholder = document.createElement("div");
    messagesPlaceholder.id = "messagesPlaceholder"

    let mainPlaceholder = document.createElement("div");
    mainPlaceholder.id = "mainPlaceholder"
    
    document.body.appendChild(messagesPlaceholder);
    document.body.appendChild(mainPlaceholder);
    callback();
    
};

AppView.prototype.preLoad = function (scripting, callback) {
    var script = document.createElement("script");
    script.src = scripting;
    script.addEventListener("load", function() {
      callback();
    });
    document.body.appendChild(script);
}

export { AppView };
  