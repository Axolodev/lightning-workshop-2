import { Lightning, Router } from "@lightningjs/sdk";
import { getAll } from "../api/country";
import CountryCard from "../components/CountryCard";
import styles from "../styles";
import Navbar from "../widgets/Navbar";

export default class HomePage extends Lightning.Component {
  static _template() {
    return {
      w: (w) => w,

      flex: {
        direction: "column",
        padding: styles.spacing.large,
      },

      Items: {
        y: Navbar.totalHeight,
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

  /** API */

  async getAllCountries() {
    this._countries = await getAll();

    this.tag("Items").children = this._countries.map((country, index) => ({
      type: CountryCard,
      flexItem: {
        marginLeft:
          index % HomePage.columns !== 0 ? CountryCard.cardHorizontalOffset : 0,
        marginBottom: CountryCard.cardVerticalOffset,
      },
      item: country,
      signals: {
        _cardEnterHandler: "_cardEnterHandler",
      },
    }));

    this._refocus();
  }

  _setup() {
    this.getAllCountries();
  }

  /** Focus */
  _index = 0;

  get focusedItem() {
    return this.tag("Items").children[this._index];
  }

  _getFocused() {
    return this.focusedItem;
  }

  _handleUp() {
    if (this._index <= 5) {
      Router.focusWidget("Navbar");
    } else if (this._index - HomePage.columns >= 0) {
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

  _active() {
    this.patch({
      y: -this.focusedItem?.finalY || 0,
    });
  }

  animateToSelected() {
    this.patch({
      smooth: {
        y: -this.focusedItem.finalY,
      },
    });
  }

  /** Signals */

  _cardEnterHandler(item) {
    const { cioc } = item;

    Router.navigate(`country/${cioc}`);
  }
}
