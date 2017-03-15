const f = x => y => z => x + y + z

const ff = (x, y) => x + y
const currying = function (fn) {
  return function () {
    console.log(fn)
    console.log(fn.callee)
    return fn.call(null, arguments[0])
  }
}


console.log(currying(ff)(1))
