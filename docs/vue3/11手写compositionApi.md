###### 1.手写shallowReactive和reactive

```jsx
// 以下代码，只涉及到对数据的劫持，不涉及到劫持之后的双向绑定和渲染
// shallowReactive(浅的劫持，浅的监视，浅的响应式数据)与reactive(深的响应式数据)

const reactiveHandler = {
  // 获取属性值
  get(target, prop){
    const result = Reflect.get(target, prop)
    console.log('拦截了读取数据', prop, result)
    return result
  },

  // 修改某个属性值或是添加属性
  set(target, prop, value){
    const result = Reflect.set(target, prop, value)
    console.log('拦截了修改或是添加属性', prop, value)
    return result
  },
  // 删除某个属性
  deleteProperty(target, prop){
    const result = Reflect.defineProperty(target, prop)
    console.log('拦截了删除数据', prop)
    return result
  }
}

// 定义一个shallowReactive函数，传入一个目标对象
function shallowReactive(target){
  // 判断当前的目标对象是不是object类型(对象/数组)
  if(target && typeof target === 'object'){
    return new Proxy(target, reactiveHandler)
  }
  // 如果传入的数据是基本数据类型，那就直接返回
  return target
}

// 定义一个reactive函数，传入一个目标对象
function reactive(target){
  // 判断当前的目标对象是不是object类型(对象/数组)
  if(target && typeof target === 'object'){
    // 对数组或者是对象中所有的数据进行reactive的递归处理
    // 先判断当前的数据是不是数组
    if(Array.isArray(target)){
      target.forEach((item, index) => {
        // 将当前数据给reactive判断是不是递归
        target[index] = reactive(item)
      })
    }else{
      // 再判断是不是对象，
      // 对象的数据也要进行遍历操作
      Object.keys(target).forEach(key => {
        target[key] = reactive(target[key])
      })
    }
    return new Proxy(target, reactiveHandler)
  }
  // 如果传入的数据是基本数据类型，那就直接返回
  return target
}

// 测试
const proxyUser1 = shallowReactive({
  name: '小明',
  car: {
    color: 'yellow'
  }
})

proxyUser1.name += '=='
// 拦截不了color的修改
proxyUser1.car.color += '=='
console.log(proxyUser1.name)
console.log(proxyUser1.car.color)

console.log('============ 华丽的分割线 =============')

const proxyUser2 = reactive({
  name: '小明',
  car: {
    color: 'yellow'
  }
})

proxyUser2.name += '=='
拦截不了color的修改
proxyUser2.car.color += '=='
console.log(proxyUser2.name)

console.log(proxyUser2.car.color)


// 数组和对象调用typeof都返回 'object' 
console.log(typeof [])
console.log(typeof {})

```



###### 2.手写shallowReadonly和readonly函数

```jsx
// 1.shallowReadonly  浅只读
const readonlyHandler = {
  get(target, prop){
    const result = Reflect.get(target, prop)
    console.log('拦截到了读取数据了', prop, result)
    return result

  },
  set(target, prop, value){
    console.warn('只能读取数据，不能修改数据')
  },
  deleteProperty(target, prop){
    console.warn('只能读取数据，不能删除数据')
  }
}

function shallowReadonly(target){
  // 需要判断当前数据是不是对象
  if(target && typeof target === 'object'){
    return new Proxy(target, readonlyHandler)
  }
  // 如果不是对象或数组，直接返回
  return target
}
// readonly 深只读
function readonly(target){
  // 需要判断当前数据是不是对象
  if(target && typeof target === 'object'){
    // 判断是不是数组
    if(Array.isArray(target)){
      target.forEach((item, index) => {
        target[index] = readonly(item)
      })
    }else{
      // 如果是对象，遍历对象
      Object.keys(target).forEach(key => {
        target[key] = readonly(target[key])
      })

    }
    return new Proxy(target, readonlyHandler)
  }

  // 如果不是对象或数组，直接返回
  return target
}

// 测试浅只读
const p1 = shallowReadonly({
  name: 'yellow ping',
  cars: ['car1', 'car2']
})

p1.name = 'pp1'
p1.cars[0] = 'pp0'
console.log(p1)

console.log('============ 华丽的分割线 =============')

// 测试深只读
const p2 = readonly({
  name: 'yellow ping',
  cars: ['car1', 'car2']
})

p2.name = 'pp1'
p2.cars[0] = 'pp0'
console.log(p2)
```



###### 3.手写shallowRef和ref

```jsx
// 定义一个shallowRef函数
function shallowRef(target){
  return{
    // 私有属性
    _value: target,

    // get函数
    get value(){
      console.log('拦截到了读取数据')
      return this._value
    },
    set value(val){
      console.log('劫持到了修改或设置数据')
      this._value = val
    }
  }
}

// 定义一个ref函数
// ref有两种情况传递基本数据和对象类型
function ref(target){
  // 如果是基本数据，reactive返回的为基本数据
  // 如果是对象或数组，则会返回一个代理的对象
  target = reactive(target)
  return{
    // 私有属性
    _value: target,

    // get函数
    get value(){
      console.log('拦截到了读取数据')
      return this._value
    },
    set value(val){
      console.log('劫持到了修改或设置数据')
      this._value = val
    }
  }
}

// 测试
const p1 = shallowRef({
  name: 'Nice',
  car: ['b1', 'b2']
})
console.log(p1.value.car[1])

const p2 = ref({
  name: 'Nice',
  car: ['b1', 'b2']
})

console.log(p2.value.car[1])



// ref当传递的参数是对象的时候，将会转换成reactive,所以需要reactive函数
const reactiveHandler = {
  // 获取属性值
  get(target, prop){
    const result = Reflect.get(target, prop)
    console.log('拦截了读取数据', prop, result)
    return result
  },

  // 修改某个属性值或是添加属性
  set(target, prop, value){
    const result = Reflect.set(target, prop, value)
    console.log('拦截了修改或是添加属性', prop, value)
    return result
  },
  // 删除某个属性
  deleteProperty(target, prop){
    const result = Reflect.defineProperty(target, prop)
    console.log('拦截了删除数据', prop)
    return result
  }
}

// 定义一个reactive函数，传入一个目标对象
function reactive(target){
  // 判断当前的目标对象是不是object类型(对象/数组)
  if(target && typeof target === 'object'){
    // 对数组或者是对象中所有的数据进行reactive的递归处理
    // 先判断当前的数据是不是数组
    if(Array.isArray(target)){
      target.forEach((item, index) => {
        // 将当前数据给reactive判断是不是递归
        target[index] = reactive(item)
      })
    }else{
      // 再判断是不是对象，
      // 对象的数据也要进行遍历操作
      Object.keys(target).forEach(key => {
        target[key] = reactive(target[key])
      })
    }
    return new Proxy(target, reactiveHandler)
  }
  // 如果传入的数据是基本数据类型，那就直接返回
  return target
}
```



###### 4.手写isRef和isReactive和isReadonly方法

```jsx
// isRef
function isRef(obj){
  // 再初始化ref的时候，增加一个_is_ref属性为true,
  // 如果传递过来的对象为obj 并且有_is_ref属性，则返回true，否则会返回false
  return obj && obj._is_ref
}

console.log(isRef(1))

// isReactive

// isReadonly

// isProxy,判断当前的对象是不是reactive对象或者readonly对象


```

