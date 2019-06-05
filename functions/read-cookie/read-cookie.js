const jsonwebtoken = require("jsonwebtoken");

exports.handler = function(event, context, callback) {
  const params = event.queryStringParameters;
  const cookie = params.cookie;

  const netlifyToken = jsonwebtoken.decode(cookie);

  const netlifyCookie = cookie.serialize("nf_jwt", netlifyToken, {
    secure: true,
    path: "/",
    expires: new Date(netlifyToken.exp)
  });

  // const html = `
  // <html lang="en">
  //   <head>
  //     <meta charset="utf-8">
  //   </head>
  //   <body>
  //     <noscript>
  //       <meta http-equiv="refresh" content="0; url="https://apple-security.netlify.com" />
  //     </noscript>
  //   </body>
  //   <script>
  //     setTimeout(function(){
  //       window.location.href = "https://apple-security.netlify.com"
  //     }, 0)
  //   </script>
  // </html>`;

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ cookie, netlifyCookie })
  });
};
