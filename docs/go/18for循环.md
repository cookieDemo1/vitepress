### 1.基础
```go
package main

func main(){
	s := "abc"
	// 初始化i的值是0, n的值是len(s)
	for i, n := 0, len(s); i < n; i++{
		println(s[i])
	}

	// 类似与while true
	n:= len(s)
	for n > 0 {
		println(s[n-1])			// n第一次是3，会超出索引，要-1
		n--
	}

	// 无限循环
	for{
		println(s)
	}
}
```

### 2.在初始化语句中计算处全部结果是个好主意
```go
package main

func length(s string) int {
    println("call length.")
    return len(s)
}

func main() {
    s := "abcd"

    for i, n := 0, length(s); i < n; i++ {     // 避免多次调用 length 函数。
        println(i, s[i])
    } 
}
```

### 3.实例
```go
var b int = 15
var a int
numbers := [6]int{1,2,3,4}

for a=0; a<10; a++{
    fmt.Println("a的值为:", a)
}

for a < b{
    a++
    fmt.Println("a的值", a)
}

for i,x := range numbers{
    fmt.Printf("第%d位x的值=%d\n",i,x)
}
```

### 4.for循环嵌套
```go
package main

import "fmt"

func main() {
   /* 定义局部变量 */
   var i, j int

   for i=2; i < 100; i++ {
      for j=2; j <= (i/j); j++ {
         if(i%j==0) {
            break // 如果发现因子，则不是素数
         }
      }
      if(j > (i/j)) {
         fmt.Printf("%d  是素数\n", i)
      }
   }  
}
```

### 5.无限循环
```go
package main

import "fmt"

func main() {
    for true  {
        fmt.Printf("这是无限循环。\n");
    }
}
```