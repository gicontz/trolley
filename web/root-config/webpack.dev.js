const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
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
    devServer: {
      port: env.parsed.PORT,
      host: "localhost",
      open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: true,
          orgName,
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
