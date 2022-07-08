import { Lightning, Router } from "@lightningjs/sdk";
import { getCountry } from "../api/country";
import styles from "../styles";
import Navbar from "../widgets/Navbar";

export default class CountryPage extends Lightning.Component {
  static _template() {
    return {
      w: (w) => w,
      flex: {
        direction: "column",
        padding: styles.spacing.large,
        paddingTop: styles.spacing.large + Navbar.totalHeight,
      },
      BackButton: {
        texture: Lightning.Tools.getRoundRect(
          200,
          styles.fontSizes.large.height + styles.spacing.xsmall * 2,
          8
        ),
        flex: {
          alignItems: "center",
          justifyContent: "center",
          paddingTop: styles.spacing.xsmall,
          paddingRight: styles.spacing.medium,
          paddingBottom: styles.spacing.xsmall,
          paddingLeft: styles.spacing.medium,
        },
        Label: {
          text: {
            text: "←   Back",
            verticalAlign: "middle",
            fontSize: styles.fontSizes.large.size,
            lineHeight: styles.fontSizes.large.height,
            textColor: 0xff333333,
            fontStyle: 700,
          },
        },
      },

      CountryInfo: {
        flex: {
          justifyContent: "space-between",
        },
        flexItem: {
          marginTop: styles.spacing.large,
        },
        Flag: {
          w: CountryPage.flagWidth,
          h: CountryPage.flagHeight,
        },
        Info: {
          flexItem: {
            marginLeft: styles.spacing.large,
          },
          flex: {
            direction: "column",
            padding: styles.spacing.small,
          },
          Name: {
            text: {
              fontSize: styles.fontSizes.xxxlarge.size,
              lineHeight: styles.fontSizes.xxxlarge.height,
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
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
                fontStyle: 600,
              },
            },
            Content: {
              text: {
                text: "81,770,900",
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
              },
            },
          },

          Region: {
            flex: {},
            Label: {
              text: {
                text: "Region: ",
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
                fontStyle: 600,
              },
            },
            Content: {
              text: {
                text: "",
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
              },
            },
          },

          Capital: {
            flex: {},
            Label: {
              text: {
                text: "Capital: ",
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
                fontStyle: 600,
              },
            },
            Content: {
              text: {
                text: "",
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
              },
            },
          },

          Languages: {
            flex: {},
            Label: {
              text: {
                text: "Languages: ",
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
                fontStyle: 600,
              },
            },
            Content: {
              text: {
                text: "",
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
              },
            },
          },
        },
      },
    };
  }

  /** Class constant */
  static flagWidth = styles.spacing.xxxlarge * 1.5;
  static flagHeight = CountryPage.flagWidth * 0.64;

  /** API */
  async getCountryData(code) {
    this._country = await getCountry(code);

    const { flags, name, population, region, capital, languages } =
      this._country;

    if (flags) {
      this.tag("Flag").patch({
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

    this.tag("Languages").patch({
      Content: {
        text: {
          text: Object.values(languages).join(", "),
        },
      },
    });
  }

  _active() {
    this.getCountryData(this.params.countryId);
  }

  _handleEnter() {
    Router.navigate("home");
  }

  _handleUp() {
    Router.focusWidget("Navbar");
  }

  _focus() {
    this.tag("BackButton").patch({
      texture: Lightning.Tools.getRoundRect(
        200,
        styles.fontSizes.large.height + styles.spacing.xsmall * 2,
        8,
        4,
        0xffc09d7b,
        false,
        0
      ),
    });
  }

  _unfocus() {
    this.tag("BackButton").patch({
      texture: Lightning.Tools.getRoundRect(
        200,
        styles.fontSizes.large.height + styles.spacing.xsmall * 2,
        8,
        4,
        0x00c09d7b,
        false,
        0
      ),
    });
  }
}
