const mainRouter = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Hello");
    res.end();
};
module.exports = mainRouter;
