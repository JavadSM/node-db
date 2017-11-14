/**
The MIT License (MIT)

Copyright (c) 2017-present Carlos Galarza <carloslfu@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE
*/

var globals = Object.getOwnPropertyNames(this)
module.exports = function SafeEval (include) {
  var clearGlobals = ''
  for (var i = 0, len = globals.length; i < len; i++) {
    if (include && include.indexOf(globals[i]) === -1 || !include) {
      clearGlobals += 'var ' + globals[i] + ' = undefined;'
    }
  }
  return function (operation) {
    var globals = undefined // out of scope for operation
    return eval('(function () {' + clearGlobals + ';return ' + operation.replace('this', '_this') + '})()')
  }
}