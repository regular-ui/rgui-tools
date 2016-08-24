// 使用这个效率低，而且有时会多次刷屏
let context = require.context('../../', true, /test\/spec.js$/);
context.keys().forEach(context);
module.exports = context;
