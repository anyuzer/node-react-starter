import serialize from 'serialize-javascript';

const Html = ({ body, styles, title, routeObj, pageData, userProfile }) => `<!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${styles}
      <script>
        window.app = ${serialize({ routeObj, pageData, userProfile } || {}, { isJSON: true })};      
       </script>
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
      <script src="/assets/app.bundle.js"></script>
    </body>
  </html>
`;

export default Html;