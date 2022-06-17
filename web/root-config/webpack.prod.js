const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv");

let env = dotenv.config({ path: __dirname + "/.env" });
let dotEnvPluginPath = "./.env";

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "mcgifs";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "serve.json" },
          {
            from: "./node_modules/single-spa/lib/system/single-spa.min.js",
            to: "scripts",
          },
          {
            from: "./node_modules/react/umd/react.production.min.js",
            to: "scripts",
          },
          {
            from: "./node_modules/react-dom/umd/react-dom.production.min.js",
            to: "scripts",
          },
          {
            from: "./node_modules/single-spa/lib/system/single-spa.min.js",
            to: "scripts",
          },
          { from: "./node_modules/systemjs/dist/system.min.js", to: "scripts" },
          {
            from: "./node_modules/systemjs/dist/extras/amd.min.js",
            to: "scripts",
          },
          {
            from: "./node_modules/regenerator-runtime/runtime.js",
            to: "scripts",
          },
        ],
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: false,
          env: env.parsed,
        },
      }),
      new Dotenv({
        path: dotEnvPluginPath,
        safe: true,
      }),
    ],
  });
};
