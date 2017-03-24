title: Functional Programming
speaker: Yang Zhe
url: https://github.com/ksky521/nodePPT
transition: cards
theme: moon
[slide]

# Functional Programming
## 杨哲

[slide]

# 柯里化 （curry)
## 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。


[slide]
# 柯里化 （curry)
- 有一个add()函数，我想把某个数组中的元素全部加1
```javascript
const add = (x, y) => x + y
const array = [1, 2, 3]
const newArray = array.map(value => add(1, value))
const anotherNewArray = array.map(add.bind(null, 1))
// newArray: [2, 3, 4]
```
[slide]
# 柯里化 （curry)
- 将add()柯里化
```javascript
const add = x => y => x + y
const inc = add(1)
const array = [1, 2, 3]
const newArray = array.map(inc)
// newArray: [2, 3, 4]

```

[slide]
# 柯里化 （curry)
- 实例
```javascript
// _ 是lodash
const dragstart = _.curry((type, event) => {
  event.dataTransfer.setData('type', type)
})
```

```html
<div
    draggable="true"
    onDragStart={dragstart('Text')}>
    <label>
    Text
    <Input 
        disabled={true}
    />
    </label>
</div>
<div
    draggable="true"
    onDragStart={dragstart('Button')}>
    <Button>
        Button
    </Button>
</div>
```

[slide]
# 柯里化 （curry)
- 实例
```javascript
// Design.js
class Design extends React.Component {
  updateComponent (type, { target }) {
    ...
  }

  render () {
      ...
      <PropsPanel
        updateComponent={_.curry(this.updateComponent.bind(this))}
        />
  }
}
```

```html
<div className="mt">
<label>
    Label
    <Input value={component.label} onChange={updateComponent('label')}/>
</label>
</div>
<div className="mt">
<label>
    Span
    <RadioGroup onChange={updateComponent('span')} value={component.span}>
        <RadioButton value={1}>1</RadioButton>
        <RadioButton value={2}>2</RadioButton>
        <RadioButton value={3}>3</RadioButton>
        <RadioButton value={4}>4</RadioButton>
    </RadioGroup>
</label>
</div>
```

[slide]
# 局部调用 (partial)
```javascript
const add = (x, y) => x + y
const inc = _.partial(add, 1, _)
const array = [1, 2, 3]
const newArray = array.map(inc)
```

[slide]
# 局部调用 (partial)
- 实例

```clojure
(defn- is? [what char]
    (->> char
        str
        (re-find what)
        empty?
        not
        ))
(def is-number? (partial is? #"\d+"))

(def is-operator? (partial is? #"[\+|\-|\*|\/|\(|\)]"))
```

[slide]
# 组合 (compose)
- 将多个函数组合成一个新的的函数

```javascript

const toUpperCase = str => str.toUpperCase()
const replaceAByB = str => str.replace(/A/g, 'B')
const trim = str => str.trim()

function compose () {
    return _.reduce(arguments, (prev, curr) => {
        return function () {
            return curr(prev.apply(null, arguments))
        }
    })
}

const upperAndReplace = compose(toUpperCase, replaceAByB)
const upperAndReplaceAndTrim = compose(upperAndReplace, trim)

upperAndReplace('aaaAccc')
// BBBBCCC
upperAndReplaceAndTrim('  aaaAccc  ')
// BBBBCCC
```


[slide]
# 组合 (compose)
- 实例

```clojure
(defn- is? [what char]
    ((comp
        not
        empty?
        (partial re-find what)
         str)
             char))
```

[slide]
# 组合 (compose)
- 实例

```clojure
(def top2 (comp peek pop))

(def rest2 (comp pop pop))

(top2 [1 2 3 4])
// 3
(rest2 [1 2 3 4])
// [1 2]
```

[slide]

# ref
- <a href="https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/">Git Book &lt;&lt;JS函数式编程指南&gt;&gt;</a>
- <a href="https://github.com/ksky521/nodePPT">Node PPT</a>

[slide]

# Thank you