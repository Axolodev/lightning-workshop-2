import { Lightning } from "@lightningjs/sdk";
import styles from "../styles";

export default class CountryCard extends Lightning.Component {
  static _template() {
    return {
      w: CountryCard.cardWidth,
      h: CountryCard.cardHeight,
      alpha: 0.7,
      color: 0xffffffff,
      rect: true,
      clipping: true,
      flex: {
        direction: "column",
      },
      Image: {
        src: null,
        w: (w) => w,
        h: 160,
        shader: {
          type: Lightning.shaders.RoundedRectangleShader,
          radius: 8,
        },
      },
      Info: {
        flex: {
          direction: "column",
          padding: styles.spacing.small,
        },
        Name: {
          text: {
            fontSize: styles.fontSizes.large.size,
            lineHeight: styles.fontSizes.large.height,
            textColor: 0xff333333,
            fontStyle: 700,
            verticalAlign: "middle",
          },
        },

        Population: {
          flex: {},
          Label: {
            text: {
              text: "Population: ",
              textColor: 0xff333333,
              fontSize: styles.fontSizes.medium.size,
              lineHeight: styles.fontSizes.medium.height,
              fontStyle: 600,
            },
          },
          Content: {
            text: {
              text: "81,770,900",
              textColor: 0xff333333,
              fontSize: styles.fontSizes.medium.size,
              lineHeight: styles.fontSizes.medium.height,
            },
          },
        },

        Region: {
          flex: {},
          Label: {
            text: {
              text: "Region: ",
              textColor: 0xff333333,
              fontSize: styles.fontSizes.medium.size,
              lineHeight: styles.fontSizes.medium.height,
              fontStyle: 600,
            },
          },
          Content: {
            text: {
              text: "",
              textColor: 0xff333333,
              fontSize: styles.fontSizes.medium.size,
              lineHeight: styles.fontSizes.medium.height,
            },
          },
        },

        Capital: {
          flex: {},
          Label: {
            text: {
              text: "Capital: ",
              textColor: 0xff333333,
              fontSize: styles.fontSizes.medium.size,
              lineHeight: styles.fontSizes.medium.height,
              fontStyle: 600,
            },
          },
          Content: {
            text: {
              text: "",
              textColor: 0xff333333,
              fontSize: styles.fontSizes.medium.size,
              lineHeight: styles.fontSizes.medium.height,
            },
          },
        },
      },
    };
  }

  /** Class constants */
  static cardWidth = styles.spacing.xxlarge;
  static cardHeight = 360;
  static cardHorizontalOffset = styles.spacing.medium;
  static cardVerticalOffset = styles.spacing.large;

  _init() {
    const { flags, name, population, region, capital } = this.item;
    if (flags) {
      this.tag("Image").patch({
        src: flags.png,
      });
    }

    this.tag("Name").patch({
      text: {
        text: name.common,
      },
    });

    this.tag("Population").patch({
      Content: {
        text: {
          text: population,
        },
      },
    });
    this.tag("Region").patch({
      Content: {
        text: {
          text: region,
        },
      },
    });
    this.tag("Capital").patch({
      Content: {
        text: {
          text: capital && capital.length > 0 ? capital[0] : "",
        },
      },
    });
  }

  /** Focus */
  _focus() {
    this.patch({
      smooth: {
        scale: 1.1,
        alpha: 1,
      },
    });
  }

  _unfocus() {
    this.patch({
      smooth: {
        scale: 1,
        alpha: 0.7,
      },
    });
  }
}
