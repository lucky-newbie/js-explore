const path = require('path');
module.exports = {
  contentBase: path.resolve(__dirname, '../dist'),
  hot: true,
  hotOnly: true,
  historyApiFallback: true,
  open: true
}
