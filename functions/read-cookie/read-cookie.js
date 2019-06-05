const cookie = require("cookie");
const jsonwebtoken = require("jsonwebtoken");

exports.handler = function(event, context, callback) {
  const { headers } = event;
  const bearerToken = headers.authorization;
  let netlifyToken = bearerToken.split("Bearer ")[1];

  netlifyToken = jsonwebtoken.decode(netlifyToken);

  const netlifyCookie = cookie.serialize("nf_jwt", netlifyToken, {
    secure: true,
    path: "/",
    expires: new Date(netlifyToken.exp)
  });

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ netlifyCookie, msg: "hello" })
  });
};
