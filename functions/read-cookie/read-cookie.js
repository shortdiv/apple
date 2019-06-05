exports.handler = function(event, context, callback) {
  const { headers } = event;
  const bearerToken = headers.authorization;

  // const netlifyToken = jsonwebtoken.decode(token)

  // const netlifyCookie = cookie.serialize("nf_jwt", token, {
  //   secure: true,
  //   path: "/",
  //   expires: new Date(netlifyToken.exp)
  // });

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ bearerToken, msg: "hello" })
  });
};
