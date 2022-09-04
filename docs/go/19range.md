### 1.range
```
for key, value := range oldMap {
    newMap[key] = value
}
```
### 2.可忽略不想要的返回值，或者使用_这个特殊变量省略某个返回值
```
            1st value	2nd value	
string	    index	    s[index]
array/slice	index	    s[index]	
map	        key	        m[key]	
channel	    element	
```

### 3.例子
```go
package main

func main(){
	s := "abc"

	// 忽略第二个值value
	for i:= range s{
		println(s[i])
	}

	// 忽略index
	for _, c := range s{
		println(c)
	}

	// 忽略全部返回值，仅迭代
	for range s{

	}

	// 遍历map
	m := map[string]int{"a": 1, "b": 2}
	for k, v := range m{
		println(k, v)
	}
}
```

### 3.注意range会复制对象
```go
package main

import "fmt"

func main() {
    a := [3]int{0, 1, 2}

    for i, v := range a { // index、value 都是从复制品中取出。

        if i == 0 { // 在修改前，我们先修改原数组。
            a[1], a[2] = 999, 999
            fmt.Println(a) // 确认修改有效，输出 [0, 999, 999]。
        }

        a[i] = v + 100 // 使用复制品中取出的 value 修改原数组。

    }

    fmt.Println(a) // 输出 [100, 101, 102]。
}
```

### 4.建议改用引用类型，其底层数据不会被复制
```go
package main

func main() {
    s := []int{1, 2, 3, 4, 5}

    for i, v := range s { // 复制 struct slice { pointer, len, cap }。

        if i == 0 {
            s = s[:3]  // 对 slice 的修改，不会影响 range。
            s[2] = 100 // 对底层数据的修改。
        }

        println(i, v)
    }
}
```

### 5.for 和 for range的区别
- for可以
  遍历array和slice
  遍历key为整型递增的map
  遍历string
  
- for range可以完成所有for可以做的事情，却能做到for不能做的，包括
  遍历key为string类型的map并同时获取key和value
  遍历channel