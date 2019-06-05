const cookie = require("cookie");
const jsonwebtoken = require("jsonwebtoken");

exports.handler = function(event, context, callback) {
  const { headers } = event;
  const token = headers.authorization;

  const netlifyToken = jsonwebtoken.decode(token);

  const netlifyCookie = cookie.serialize("nf_jwt", token, {
    secure: true,
    path: "/",
    expires: new Date(netlifyToken.exp)
  });

  callback(null, {
    statusCode: 200,
    headers: {
      "Set-Cookie": netlifyCookie,
      "Cache-Control": "no-cache",
      "Content-Type": "text/html"
    },
    body: JSON.stringify({ auth: netlifyToken })
  });
};
