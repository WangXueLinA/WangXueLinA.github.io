import ReactDOM from 'react-dom';
import Test from './test';
import { local, localClear, session } from './utils';

local.setItem('number', 123); // number
local.setItem('string', 'string'); // string
local.setItem('object', { a: 1, b: 2 }); // object
local.setItem('array', [1, 2, 3]); // array
local.setItem('null', null); // null
local.setItem('undefined', undefined); // undefined
local.setItem('boolean', false); // boolean
console.log('number', local.getItem('number')); // 123
console.log('string', local.getItem('string')); // 'string'
console.log('object', local.getItem('object')); // { a: 1, b: 2 }
console.log('array', local.getItem('array')); // [1, 2, 3]
console.log('null', local.getItem('null')); // null
console.log('undefined', local.getItem('undefined')); // undefined
console.log('boolean', local.getItem('boolean')); // false
console.log('key', local.key(0));
console.log('length from local', local.getLength());
local.removeItem('number');
// local.clear()
localClear.setItem('number', 123); // number
localClear.setItem('string', 'string'); // string
localClear.setItem('object', { a: 1, b: 2 }); // object
localClear.setItem('array', [1, 2, 3]); // array
localClear.setItem('null', null); // null
localClear.setItem('undefined', undefined); // undefined
localClear.setItem('boolean', false); // boolean
console.log('number', localClear.getItem('number')); // 123
console.log('string', localClear.getItem('string')); // 'string'
console.log('object', localClear.getItem('object')); // { a: 1, b: 2 }
console.log('array', localClear.getItem('array')); // [1, 2, 3]
console.log('null', localClear.getItem('null')); // null
console.log('undefined', localClear.getItem('undefined')); // undefined
console.log('boolean', localClear.getItem('boolean')); // false
console.log('key', localClear.key(0));
console.log('length from localClear', localClear.getLength());
localClear.removeItem('number');
localClear.clear();
console.log('----------------------------------------------------------------');
session.setItem('number', 123); // number
session.setItem('string', 'string'); // string
session.setItem('object', { a: 1, b: 2 }); // object
session.setItem('array', [1, 2, 3]); // array
session.setItem('null', null); // null
session.setItem('undefined', undefined); // undefined
session.setItem('boolean', false); // boolean
console.log('number', session.getItem('number')); // 123
console.log('string', session.getItem('string')); // 'string'
console.log('object', session.getItem('object')); // { a: 1, b: 2 }
console.log('array', session.getItem('array')); // [1, 2, 3]
console.log('null', session.getItem('null')); // null
console.log('undefined', session.getItem('undefined')); // undefined
console.log('boolean', session.getItem('boolean')); // false
console.log('key', session.key(0));
console.log('length', session.getLength());
session.removeItem('number');
// session.clear()

ReactDOM.render(
  <div>
    <Test />
  </div>,
  document.getElementById('dsc-app'),
);
