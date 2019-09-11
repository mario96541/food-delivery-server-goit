const mainRouter = (request, response) => {
    response.set("Content-Type", "text/html");
    response.status(200);
    response.send("<h2>Привет Express!</h2>");
  };
  module.exports = mainRouter;