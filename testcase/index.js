console.log('test')
require.ensure(['./a.js'], function() {
  console.log('load a')
}, 'home')
