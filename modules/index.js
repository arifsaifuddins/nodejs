// // 3 module in node js

// // - core module (node_modules)
// const fs = require('fs')

// // - local module
// const hello = require('./node')

// // - third module (library)
// const library = require('library')

const hello = require('./node1')
const data = require('./node2')

console.log(hello.sayHello(data.usia, data.kuliah))