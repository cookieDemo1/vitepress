### 1.switch
```go
switch var1 {
    case val1:
        ...
    case val2:
        ...
    default:
        ...
}
```

### 3.例子
```go
package main

import "fmt"

func main(){
	var grade string = "A"
	var marks int = 90

	switch marks {
	case 90: grade = "A"
	case 80: grade = "B"			// case后面不需要break
	case 50, 60, 70: grade="C"		// case可以捕获多个值
	default:						// default
		grade = "D"
	}

	fmt.Println(grade)
}
```

### 4.typeSwitch
- switch 语句还可以被用于 type-switch 来判断某个 interface 变量中实际存储的变量类型。
```go
package main

import "fmt"

func main(){
	var x interface{}
	//写法一：
	switch i := x.(type) { // 带初始化语句,x必须时interface
	case nil:
		fmt.Printf(" x 的类型 :%T\r\n", i)	// 打印这个，为啥
	case int:
		fmt.Printf("x 是 int 型")
	case float64:
		fmt.Printf("x 是 float64 型")
	case func(int) float64:
		fmt.Printf("x 是 func(int) 型")
	case bool, string:
		fmt.Printf("x 是 bool 或 string 型")
	default:
		fmt.Printf("未知型")
	}
}
```

### 5.捕获多个值
```go
//写法二
var j = 0
switch j {
case 0:
case 1:                 // 捕获0和1
    fmt.Println("1")
case 2:
    fmt.Println("2")
default:
    fmt.Println("def")
}
```

### 6.捕获多个值
```go
//写法三
var m = 0
switch m {
case 0, 1:
    fmt.Println("1")
case 2:
    fmt.Println("2")
default:
    fmt.Println("def")
}
```

### 6.fallthrough
```go
//写法三
var k = 0
switch k {
case 0:
    println("fallthrough")
    fallthrough
    /*
        Go的switch非常灵活，表达式不必是常量或整数，执行的过程从上至下，直到找到匹配项；
        而如果switch没有表达式，它会匹配true。
        Go里面switch默认相当于每个case最后带有break，
        匹配成功后不会自动向下执行其他case，而是跳出整个switch,
        但是可以使用fallthrough强制执行后面的case代码。
    */
case 1:
    fmt.Println("1")
case 2:
    fmt.Println("2")
default:
    fmt.Println("def")
}
```

### 37.switch使用条件表达式
```go
    //写法四
    var n = 0
    switch { //省略条件表达式，可当 if...else if...else
    case n > 0 && n < 10:
        fmt.Println("i > 0 and i < 10")
    case n > 10 && n < 20:
        fmt.Println("i > 10 and i < 20")
    default:
        fmt.Println("def")
    }
```