### 1map定义语法如下
```
map[keyType]valueType

// map类型的变量默认值初始值位nil,需要使用make()函数来分配内存。
// 12代表map的容量，该参数虽然不是必须的，但是我们应该初始化map的时候就位其指定一个合适的容量
make(map[string]string, 12)
```

### 2.map基本使用
```go
func main() {
    scoreMap := make(map[string]int, 8)
    scoreMap["张三"] = 90
    scoreMap["小明"] = 100
    fmt.Println(scoreMap)
    fmt.Println(scoreMap["小明"])
    fmt.Printf("type of a:%T\n", scoreMap)
}
```

### 3.map支持在声明的时候填充元素
```go
func main() {
    userInfo := map[string]string{
        "username": "pprof.cn",
        "password": "123456",
    }
    fmt.Println(userInfo) //
}
```

### 4.go中有个判断map中key是否存在的特殊写法
```go
value, ok := map[key]
```
- 例子
```go
func main() {
    scoreMap := make(map[string]int)
    scoreMap["张三"] = 90
    scoreMap["小明"] = 100
    // 如果key存在ok为true,v为对应的值；不存在ok为false,v为值类型的零值
    v, ok := scoreMap["张三"]
    if ok {
        fmt.Println(v)
    } else {
        fmt.Println("查无此人")
    }
}
```

### 5.map的遍历
- 使用for range遍历map
```go
func main() {
    scoreMap := make(map[string]int)
    scoreMap["张三"] = 90
    scoreMap["小明"] = 100
    scoreMap["王五"] = 60
    for k, v := range scoreMap {
        fmt.Println(k, v)
    }
}
```

### 6.只遍历key
```go
func main() {
    scoreMap := make(map[string]int)
    scoreMap["张三"] = 90
    scoreMap["小明"] = 100
    scoreMap["王五"] = 60
    for k := range scoreMap {
        fmt.Println(k)
    }
}
```

### 7.使用delete()函数删除键值对
```
delete(map, key)
```
- 例子
```go
func main(){
    scoreMap := make(map[string]int)
    scoreMap["张三"] = 90
    scoreMap["小明"] = 100
    scoreMap["王五"] = 60
    delete(scoreMap, "小明")//将小明:100从map中删除
    for k,v := range scoreMap{
        fmt.Println(k, v)
    }
}
```

### 8.按顺序遍历map
```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

func main(){
	rand.Seed(time.Now().UnixNano()) //初始随机数种子

	var sourceMap = make(map[string]int, 200)
	for i:=0 ; i< 100; i++{
		key := fmt.Sprintf("stu%02d", i) //生成stu开头的字符串
		value := rand.Intn(100) // 生成0~99的随机整数
		sourceMap[key] =value
	}

	//for k,v := range sourceMap{
	//	fmt.Println(k, v)
	//}

	// 取出map中的所有key存入切片keys
	var keys = make([]string, 0, 200)
	for key:= range sourceMap{
		keys = append(keys, key)
	}

	// 对切片进行排序
	sort.Strings(keys)

	// 按照排序后的key遍历map, 忽略掉的变量是index
	for _, key := range keys{
		fmt.Println(key, sourceMap[key])
	}
}

```

### 9.元素位map类型的切片
```go
func main() {
    var mapSlice = make([]map[string]string, 3)
    for index, value := range mapSlice {
        fmt.Printf("index:%d value:%v\n", index, value)
    }
    fmt.Println("after init")
    // 对切片中的map元素进行初始化
    mapSlice[0] = make(map[string]string, 10)
    mapSlice[0]["name"] = "王五"
    mapSlice[0]["password"] = "123456"
    mapSlice[0]["address"] = "红旗大街"
    for index, value := range mapSlice {
        fmt.Printf("index:%d value:%v\n", index, value)
    }
}
```

### 10.元素为map类型的切片
```go
package main

import "fmt"

func main(){
	var mapSlice = make([]map[string]string, 3)

	for index, value := range mapSlice{
		fmt.Println(index, value)
	}

	mapSlice[0] = make(map[string]string)

	mapSlice[0]["name"] = "Perfect"
	mapSlice[0]["password"] = "123456"

	for index, value := range mapSlice{
		fmt.Println(index, value)
	}
}
```

### 11.只为切片类型的map
```go
func main() {
    var sliceMap = make(map[string][]string, 3)
    fmt.Println(sliceMap)
    fmt.Println("after init")
    key := "中国"
    value, ok := sliceMap[key]
    if !ok {
        value = make([]string, 0, 2)
    }
    value = append(value, "北京", "上海")
    sliceMap[key] = value
    fmt.Println(sliceMap)
}
```