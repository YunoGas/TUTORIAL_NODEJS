const path = require('path')

console.log(path.sep);
console.log('foo\\bar\\baz'.split(path.sep));
console.log(path); 

// Returns: ['foo', 'bar', 'baz']