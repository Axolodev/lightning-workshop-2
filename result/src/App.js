import { Utils, Router, Lightning } from "@lightningjs/sdk";
import routes from "./routes";
import Navbar from "./widgets/Navbar";

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
      color: 0xfff0f0f0,
      rect: true,

      Widgets: {
        Navbar: {
          type: Navbar,
        },
      },
    };
  }

  _negative = false;

  set negative(value) {
    this._negative = value;

    if (value) {
      this.patch({
        shader: {
          type: Lightning.shaders.Inversion,
        },
      });
    } else {
      this.patch({
        shader: null,
      });
    }
  }

  get negative() {
    return this._negative;
  }

  $toggleNegative() {
    this.negative = !this.negative;
  }

  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") },
    ];
  }
}
