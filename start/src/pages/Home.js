import { Lightning } from "@lightningjs/sdk";
import styles from "../styles";

export default class HomePage extends Lightning.Component {
  static _template() {
    return {
      w: (w) => w,

      flex: {
        direction: "column",
        padding: styles.spacing.large,
      },

      Items: {
        w: 1920 - styles.spacing.large * 2,
        flex: {
          direction: "row",
          justifyContent: "space-between",
          wrap: true,
        },
      },
    };
  }

  /** Class constants */

  static columns = 6;

  /** Focus */
  _index = 0;

  get focusedItem() {
    return this.tag("Items").children[this._index];
  }

  _getFocused() {
    return this.focusedItem;
  }

  _handleUp() {
    if (this._index - HomePage.columns >= 0) {
      this._index -= HomePage.columns;
      this.animateToSelected();
    }
    return true;
  }

  _handleRight() {
    if (this._index + 1 < this._countries.length) {
      this._index += 1;
      this.animateToSelected();
    }
    return true;
  }

  _handleDown() {
    if (this._index + HomePage.columns < this._countries.length - 1) {
      this._index += HomePage.columns;
      this.animateToSelected();
    }
    return true;
  }

  _handleLeft() {
    if (this._index > 0) {
      this._index -= 1;
      this.animateToSelected();
    }
    return true;
  }

  animateToSelected() {
    this.patch({
      smooth: {
        y: -this.focusedItem.finalY,
      },
    });
  }
}
