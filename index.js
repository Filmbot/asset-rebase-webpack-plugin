// AssetRebaseWebpackPlugin.js
var path = require('path');

function AssetRebaseWebpackPlugin(options) {
  this.options = Object.assign({
    relative: false,
  }, options || {});
}

AssetRebaseWebpackPlugin.prototype.apply = function(compiler) {
  // ...
  var options = this.options;
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-alter-asset-tags', function(htmlPluginData, callback) {
      [htmlPluginData.body, htmlPluginData.head].forEach(function(region) {
        region.forEach(function(tag) {
          ['src', 'href'].forEach(function(attr) {
            var val = tag.attributes[attr];
            if (!val) { return; }

            if (options.relative === true) {
              tag.attributes[attr] = path.basename(val);
            } else if(typeof options.relative === 'string') {
              tag.attributes[attr] = path.relative(options.relative, path.resolve(val));
            }
          });
        });
      });
      callback(null, htmlPluginData);
    });
  });

};

module.exports = AssetRebaseWebpackPlugin;
