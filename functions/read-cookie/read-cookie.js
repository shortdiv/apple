const jsonwebtoken = require("jsonwebtoken");
const cookie = require("cookie");

exports.handler = function(event, context, callback) {
  const params = event.queryStringParameters;
  const cookieParam = params.cookie;

  const netlifyToken = jsonwebtoken.decode(cookieParam);

  const netlifyCookie = cookie.serialize("nf_jwt", cookieParam, {
    secure: true,
    path: "/",
    expires: new Date(netlifyToken.exp)
  });

  const html = `
  <html lang="en">
    <head>
      <meta charset="utf-8">
    </head>
    <body>
      <noscript>
        <meta http-equiv="refresh" content="0; url="https://apple-security.netlify.com" />
      </noscript>
    </body>
    <script>
      setTimeout(function(){
        window.location.href = "https://apple-security.netlify.com"
      }, 1000)
    </script>
  </html>`;

  callback(null, {
    statusCode: 200,
    headers: {
      "Set-Cookie": netlifyCookie,
      "Cache-Control": "no-cache",
      "Content-Type": "text/html"
    },
    body: html
  });
};
