/* eslint max-len: 0 */
const theme = {
    colors: {
        core: {
            hex: "#9A0A00",
            rgb: (_alpha = 1) => { return `rgba(154,10,0,${_alpha})`; }
        },
        companion: {
            hex: "#4A4A4A",
            rgb: (_alpha = 1) => { return `rgba(74,74,74,${_alpha})`; }
        },
        complement1: {
            hex: "#9B9B9B",
            rgb: (_alpha = 1) => { return `rgba(155,155,155,${_alpha})`; }
        },
        complement2: {
            hex: "#DDDDDD",
            rgb: (_alpha = 1) => { return `rgba(221,221,221,${_alpha})`; }
        },
        complement3: {
            hex: "#F5F5F5",
            rgb: (_alpha = 1) => { return `rgba(245,245,245,${_alpha})`; }
        },
        contrast: {
            hex: "#FFFFFF",
            rgb: (_alpha = 1) => { return `rgba(255,255,255,${_alpha})`; }
        },
        feature1: {
            hex: '#5DAE00',
            rgb: (_alpha = 1) => { return `rgba(93,174,0,${_alpha})`; }
        },
        error: {
            hex: '#E48E00',
            rgb: (_alpha = 1) => { return `rgba(228, 142, 0, ${_alpha}) `; }
        },
        white: {
            hex: "#FFFFFF",
            rgb: (_alpha = 1) => { return `rgba(255,255,255,${_alpha})`; }
        },
        black: {
            hex: "#000000",
            rgb: (_alpha = 1) => { return `rgba(0,0,0,${_alpha})`; }
        }
    },
    icons: {
        sizes: {
            xxs: "16px",
            xs: "24px",
            sm: "32px",
            md: "48px",
            lg: "64px",
            xl: "96px",
            defaultSize: "16px"
        },
        colors: {
            defaultFill: "#000000"
        }
    },
    text: {
        sizes: {
            sm: "16px",
            md: "24px",
            lg: "32px",
            xl: "40px",
            xxl: "48px"
        },
        lineHeight: {
            base: 1.3,
            wider: 1.5,
            double: 2,
            triple: 3,
            sm: "16px",
            md: "24px",
            lg: "32px",
            xl: "40px",
            xxl: "48px"
        }
    },
    border: {
        quick: `1px solid #FF0000`
    },
    grid: {
        grid_breakpoints: {
            sm: 320,
            md: 768,
            lg: 1200
        },
        max_container_width: {
            sm: 540,
            md: 720,
            lg: 1024
        },
        column_gutter: {
            sm: 16,
            md: 16,
            lg: 16
        },
        outer_gutter: {
            xs: 0,
            sm: 0,
            md: 0
        }
    },
    padding: {
        0: 0,
        1: 8,
        2: 16,
        3: 24,
        4: 32,
        5: 40,
        6: 48,
        7: 56,
        8: 64
    },
    mediaQueries: {
        get sm() { return `@media (min-width: ${theme.grid.grid_breakpoints.sm}px)`; },
        get md() { return `@media (min-width: ${theme.grid.grid_breakpoints.md}px)`; },
        get lg() { return `@media (min-width: ${theme.grid.grid_breakpoints.lg}px)`; }
    },
    fonts: {
        family: "Roboto",
        link: () => { return `<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">`; },
        cssImport: () => { return `<style>@import url('https://fonts.googleapis.com/css?family=Roboto');</style>`; },
        inlineEmbed: () => {
            return `
                 /* cyrillic-ext */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2) format('woff2');
                  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
                }
                /* cyrillic */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu5mxKKTU1Kvnz.woff2) format('woff2');
                  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
                }
                /* greek-ext */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu7mxKKTU1Kvnz.woff2) format('woff2');
                  unicode-range: U+1F00-1FFF;
                }
                /* greek */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4WxKKTU1Kvnz.woff2) format('woff2');
                  unicode-range: U+0370-03FF;
                }
                /* vietnamese */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu7WxKKTU1Kvnz.woff2) format('woff2');
                  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
                }
                /* latin-ext */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.woff2) format('woff2');
                  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                }
                /* latin */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
                  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                }
                /* cyrillic-ext */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfCRc4AMP6lbBP.woff2) format('woff2');
                  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
                }
                /* cyrillic */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfABc4AMP6lbBP.woff2) format('woff2');
                  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
                }
                /* greek-ext */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfCBc4AMP6lbBP.woff2) format('woff2');
                  unicode-range: U+1F00-1FFF;
                }
                /* greek */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfBxc4AMP6lbBP.woff2) format('woff2');
                  unicode-range: U+0370-03FF;
                }
                /* vietnamese */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfCxc4AMP6lbBP.woff2) format('woff2');
                  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
                }
                /* latin-ext */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfChc4AMP6lbBP.woff2) format('woff2');
                  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                }
                /* latin */
                @font-face {
                  font-family: 'Roboto';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2) format('woff2');
                  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                }
                
                /* cyrillic-ext */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFWJ0bf8pkAp6a.woff2) format('woff2');
                  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
                }
                /* cyrillic */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFUZ0bf8pkAp6a.woff2) format('woff2');
                  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
                }
                /* greek-ext */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFWZ0bf8pkAp6a.woff2) format('woff2');
                  unicode-range: U+1F00-1FFF;
                }
                /* greek */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVp0bf8pkAp6a.woff2) format('woff2');
                  unicode-range: U+0370-03FF;
                }
                /* vietnamese */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFWp0bf8pkAp6a.woff2) format('woff2');
                  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
                }
                /* latin-ext */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFW50bf8pkAp6a.woff2) format('woff2');
                  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                }
                /* latin */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 400;
                  font-display: optional;
                  src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2) format('woff2');
                  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                }
                /* cyrillic-ext */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Open Sans Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rgOX-hpKKSTj5PW.woff2) format('woff2');
                  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
                }
                /* cyrillic */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Open Sans Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rgOVuhpKKSTj5PW.woff2) format('woff2');
                  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
                }
                /* greek-ext */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Open Sans Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rgOXuhpKKSTj5PW.woff2) format('woff2');
                  unicode-range: U+1F00-1FFF;
                }
                /* greek */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Open Sans Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rgOUehpKKSTj5PW.woff2) format('woff2');
                  unicode-range: U+0370-03FF;
                }
                /* vietnamese */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Open Sans Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rgOXehpKKSTj5PW.woff2) format('woff2');
                  unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
                }
                /* latin-ext */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Open Sans Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rgOXOhpKKSTj5PW.woff2) format('woff2');
                  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
                }
                /* latin */
                @font-face {
                  font-family: 'Open Sans';
                  font-style: normal;
                  font-weight: 700;
                  font-display: optional;
                  src: local('Open Sans Bold'), local('OpenSans-Bold'), url(https://fonts.gstatic.com/s/opensans/v15/mem5YaGs126MiZpBA-UN7rgOUuhpKKSTjw.woff2) format('woff2');
                  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                }                
                `;
        }
    }
};

export default theme;
