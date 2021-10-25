import { Utils, Router } from "@lightningjs/sdk";
import routes from "./routes";

// routing, API work, using widgets, components' lifecycles, more about textures + shaders,
// and maybe animations and children to parent communication
export default class App extends Router.App {
  _setup() {
    Router.startRouter(routes);
  }

  static _template() {
    return {
      ...super._template(),
      w: 1920,
      h: 1080,
    };
  }

  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") },
    ];
  }
}
