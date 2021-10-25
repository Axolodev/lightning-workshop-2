import { Utils, Lightning } from "@lightningjs/sdk";

export default class App extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,
      color: 0xfff0f0f0,
      rect: true,
    };
  }

  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") },
    ];
  }
}
