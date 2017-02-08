// AssetRebaseWebpackPlugin.js

function AssetRebaseWebpackPlugin(options) {
}

AssetRebaseWebpackPlugin.prototype.apply = function(compiler) {
  // ...
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-alter-asset-tags', function(htmlPluginData, callback) {
      console.log(arguments);
      callback(null, htmlPluginData);
    });
  });

};

module.exports = AssetRebaseWebpackPlugin;
