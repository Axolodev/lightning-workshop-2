import { Lightning, Router } from "@lightningjs/sdk";
import styles from "../styles";

export default class NegativeToggler extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 60,
      rect: true,
      color: 0xfffafafa,
      y: -NegativeToggler.totalHeight,
      flex: {
        alignItems: "center",
        paddingTop: styles.spacing.small,
        paddingRight: styles.spacing.large,
        paddingBottom: styles.spacing.small,
        paddingLeft: styles.spacing.large,
      },
    };
  }

  static height = 60;
  static totalHeight = NegativeToggler.height + styles.spacing.small * 2;

  _focus() {
    this.patch({
      smooth: {
        y: 0,
      },
    });
  }

  _unfocus() {
    this.patch({
      smooth: {
        y: -NegativeToggler.totalHeight,
      },
    });
  }

  _handleEnter() {
    this.fireAncestors("$toggleNegative");
  }

  _handleDown() {
    Router.focusPage();
  }
}
