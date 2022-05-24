/**
 * appView
 * @author Norton 2022
 */
class AppView {
  
  constructor() {}

  render = async function () {

    await this.preLoad("https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js");
    await this.preLoad("https://kit.fontawesome.com/48d135817c.js");
    await this.preLoad("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js");
    await this.preLoad("/general.js");

    let t = document.createElement("template");
    let text = await handleGet("app/views/templates/appHead.html");
    t.innerHTML = text;
    document.head.append(t.content);

  };

  preLoad = function (scripting) {
    return new Promise((resolve, reject) => {
      var script = document.createElement("script");
      script.src = scripting;
      script.addEventListener("load", resolve);
      script.addEventListener("error", reject);
      document.body.appendChild(script);
    });
  };
}

export { AppView };
