import { css as GlamorCSS } from 'glamor';
import theme from "./theme";

export default () => {
    require('glamor/reset');
    GlamorCSS.global('*', {
        boxSizing: 'border-box'
    });

    GlamorCSS.global('html', {
        position: 'relative',
        minHeight: '100%'
    });

    GlamorCSS.global('body', {
        minHeight: '100%',
        fontFamily: '"Roboto", Helvetica, Arial, sans-serif',
        fontSize: '16px',
        lineHeight: theme.text.lineHeight.base,
        color: theme.colors.companion.hex,
        margin: 0,
        padding: 0,
        WebkitFontSmoothing: 'antialiased',
        textRendering: 'optimizeLegibility'
    });

    GlamorCSS.global('#app-mount', {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column'
    });

    GlamorCSS.global('a', {
        textDecoration: 'none'
    });
    GlamorCSS.global('a:hover', {
        textDecoration: `underline`
    });
};
