const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
                app.use("/auth/", createProxyMiddleware ({ target: "http://localhost:5050/" }));
                app.use("/api/", createProxyMiddleware ({ target: "http://localhost:5050/" }));

                // app.use(proxy("/profile/", { target: "http://localhost:5000/" }));
                // app.use(proxy("/posts/", { target: "http://localhost:5000/" }));
};
