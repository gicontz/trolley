const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const Dotenv = require("dotenv-webpack");
const dotenv = require("dotenv");

let env = dotenv.config({ path: __dirname + "/.env" });
let dotEnvPluginPath = "./.env";

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mcgifs",
    projectName: "cashier",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      port: env.parsed.PORT || 8500,
      host: "localhost",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|ico)$/,
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack", "file-loader"],
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: dotEnvPluginPath,
        safe: true,
      }),
    ],
  });
};
