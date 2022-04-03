import serialize from 'serialize-javascript';
import { ArcHash } from 'arc-lib';

/*
      HMR for isomorphic React is not straightforward in theory, but in practice, we can brute force a development approach that seems to do the job.
      Use webpack --watch, when the bundle changes, switch to clientRendering, reload our bundle. As long as we hoist our data up, when we navigate
      it does the trick.
 */
if(process.env.WATCH_CLIENT) {
      console.log('Injecting HMR watch.');
}
const watch = `
        let lastAppBundleETag = false;
        window.addEventListener('load', (event) => {
            window.hmr = true;
            setInterval(() => {
                //Send a HEAD request to check ETag of AppBundle
                fetch('/assets/app.bundle.js', {
                    method: 'HEAD',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin'
                }).then((response) => {
                    response.headers.forEach((_val, _field) => {
                        //Headers is a weird object. Whatever
                        if(_field !== 'etag') {
                            return;
                        }
                        if(!lastAppBundleETag) {
                            lastAppBundleETag = _val;
                        }
                        if(lastAppBundleETag !== _val) {
                            console.log('New client available. Switching to client rendering.');
                            document.getElementById('appBundle').remove();
                            const newApp = document.createElement('script');
                            newApp.setAttribute('src', '/assets/app.bundle.js');
                            newApp.setAttribute('id', 'appBundle');
                            document.body.append(newApp);
                            lastAppBundleETag = _val;
                        }
                    })
                });
            }, 1000);
        });
`;

const Html = ({ body, styles, title, routeData, pageData, userProfile }, { ogTitle, ogType, ogUrl, ogImage, ogDescription }, _environment) => `<!DOCTYPE html>
  <html>
    <head>
      <!-- Inject our title -->
      <title>${title}</title>
      
      <!-- Set our viewport expectations -->
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
      
      <!-- Inject social meta properties -->
      <meta property="og:title" content="${ogTitle}" />
      <meta property="og:type" content="${ogType}" />
      <meta property="og:url" content="${ogUrl}" />
      <meta property="og:image" content="${ogImage}" />
      <meta property="og:description" content="${ogDescription}" />
      
      <!-- If you're using google fonts, let the browser preconnect -->
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            
      <!-- All of our fun favicon stuff -->
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png">
      <link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
      <link rel="manifest" href="/assets/site.webmanifest">
           
      <!-- Inject our compiled styles -->
      ${styles}
      
      <!-- Ready the data we will use to hydrate our client app -->
      <script>
        window.env = '${_environment}';
        window.app = ${serialize({ routeData, pageData, userProfile } || {}, { isJSON: true })};
        window.watch = ${process.env.WATCH_CLIENT ? true : false};
        ${process.env.WATCH_CLIENT ? watch : ''}
       </script>
    </head>
    <body style="margin:0">
      <!-- Our app container -->
      <div id="app" style="display:flex;flex-direction: column;min-height: calc(100vh)">${body}</div>
      
      <!-- Our isomorphic bundle -->
      <script id="appBundle" src="/assets/app.bundle.js"></script>
    </body>
  </html>
`;

export default Html;