### 1.概念
- 单纯地将函数并发执行是没有意义的。函数与函数间需要交换数据，才能体现并发执行函数的意义
- 虽然可以使用共享内存进行数据交换，但是共享内存再不同的goroutine中容易发生竞态问题，为了
保证数据交互的正确性，必须使用互斥量对内存进行加锁，这种做法势必造成性能问题。
- GO语言的并发模型是CSP，提倡通过通信共享内存而不是通过共享内存而实现通信。
- 如果说goroutine是Go程序并发的执行体，channel就是它们之间的连接，channel是可以让一个goroutine发送特定值到另一个goroutine的通信机制
- Go 语言中的通道（channel）是一种特殊的类型。通道像一个传送带或者队列，总是遵循先入先出（First In First Out）的规则，保证收发数据的顺序。
- 每一个通道都是一个具体类型的导管，也就是声明channel的时候需要为其指定元素类型。

### 2.channel类型
- channel是一种类型，一种引用类型，声明通道类型格式如下
```go
var 变量 chan 元素类型

var ch1 chan int   // 声明一个传递整型的通道
var ch2 chan bool  // 声明一个传递布尔型的通道
var ch3 chan []int // 声明一个传递int切片的通道
```

### 3.创建channel
```go
var ch chan int
fmt.Println(ch) // nil
```

### 4.声明的通道后需要使用make函数初始化之后才能使用
- 创建channel的格式如下
```go
make(chan 元素类型, [缓冲大小]) // 缓冲大小是可选的

// 缓冲区还可以存储结构体或者结构体指针
ch4 := make(chan int)
ch5 := make(chan bool)
ch6 := make(chan []int)
```

### 5.channel操作
- 通道有发送(send), 接收(receive)和关闭(close)三种操作
- 发送 -> c
- 接收 <- c
- 关闭 Close(c)
```go
ch := make(chan int)

ch <- 10    // 把10发送到ch中

x := <- ch  // 从ch中接收值，并赋值给x变量
<- ch       // 从ch中接收值，忽略结果

Close(ch)   // 我们通过调用内置的close函数来关闭通道
```

### 6.对于关闭通道需要注意的一些事情
- 只有在通知接收方goroutine所有的数据都发送完毕的时候才需要关闭通道。
- 通道是可以被垃圾回收机制回收的，它和关闭文件是不一样的，在结束操作之后关闭文件是必须要做的，但关闭通道不是必须的。
```shell script
# 关闭后的通道有以下特点
1.对一个关闭的通道再发送值就会导致panic。
2.对一个关闭的通道进行接收会一直获取值直到通道为空。
3.对一个关闭的并且没有值的通道执行接收操作会得到对应类型的零值。
4.关闭一个已经关闭的通道会导致panic。
```

### 7.无缓冲通道
- 无缓冲的通道又成为阻塞通道
```go
// 运行以下代码会出现deadlock的错误
// 因为我们使用ch := make(chan int)创建的是无缓冲的通道，无缓冲的通道只有在有人接收值的时候才能发送值。
// 上面的代码会阻塞在ch <- 10这一行代码形成死锁，那如何解决这个问题呢？
// 一种方法是启用一个goroutine去接收值
func main() {
    ch := make(chan int)
    ch <- 10
    fmt.Println("发送成功")
}
```

### 8.上面代码解决方案
- 无缓冲通道上的发送操作会阻塞，直到另一个goroutine在该通道上执行接收操作，这时值才能发送成功，两个goroutine将继续执行。相反，如果接收操作先执行，接收方的goroutine将阻塞，直到另一个goroutine在该通道上发送一个值。
- 使用无缓冲通道进行通信将导致发送和接收的goroutine同步化。因此，无缓冲通道也被称为同步通道。
```go
package main

import "fmt"

func recv(c chan int){
	ret := <-c
	fmt.Println("接收成功", ret)
}

func main()  {
	ch := make(chan int)
	go recv(ch)	// 启用goroutine从通道接收值
	ch <- 10
	fmt.Println("发送成功")
}
```

### 9.使用make函数初始化通道的时候为其指定通道的容量。例如
- 只要通道的容量大于零，那么该通道就是有缓冲的通道，通道的容量表示通道中能存放元素的数量。就像你小区的快递柜只有那么个多格子，格子满了就装不下了，就阻塞了，等到别人取走一个快递员就能往里面放一个。
- 我们可以使用内置的len函数获取通道内元素的数量，使用cap函数获取通道的容量，虽然我们很少会这么做。
```go
func main(){
    ch := make(chan int, 1) // 创建一个容量为1的有缓冲区通道
    ch <- 10
    fmt.Println("发送成功")
}
```

### 10.close
- 可以通过内置的close()函数关闭channel(如果你的管道不管往里存值或者取值的时候一定要记得关闭通道)
```go
package main

import "fmt"

func main(){
	c := make(chan int)	// 创建一个无缓冲通道
	go func() {
		for i:=0; i<5; i++{
			c <- i	// 往通道中塞值
		}
		close(c)
	}()

	for {
		// 从通道中接收值会返回两个数据，一个是data,一个是是否接收成功
		// 当通道关闭再读取，就是空，那么ok为空，就会进入else.跳出循环，结束main
		if data, ok := <- c; ok{
			fmt.Println(data)
		}else{
			break
		}
	}

	fmt.Println("main结束")
}
```

### 11.优雅的从通道到中取值
- 当通过通道发送有限的数据时，我们可以通过close函数关闭通道来告知从该通道接收值的goroutine停止等待
- 当通道关闭时，往该通道发送值会引发panic,从该通道里接收 的值一直都是类型零值
- 那么如何判断一个通道是否被关闭了呢？(使用for range循环通道)来看下面的例子
```go
package main

import "fmt"

func main(){
	ch1 := make(chan int)
	ch2 := make(chan int)

	// 开启goroutine将0~100的数发送到ch1中
	go func() {
		for i :=0; i<100; i++{
			ch1 <- i
		}
		close(ch1)
	}()


	// 开启goroutine从ch1中共接收值，并将该值的平方发送到ch2中
	go func() {
		for {
			i, ok := <- ch1	// 通道关闭后再取值ok 为false
			if !ok{
				break
			}
			ch2 <- i * i
		}
		close(ch2)
	}()

	// 在主goroutine中从ch2中接收值打印
	for i := range ch2{	// 通道关闭后会退出for range循环
		fmt.Println(i)
	}
}

// 从上面的例子中我们看到有两种方式在接收值的时候判断通道是否被关闭，我们通常使用的是for range的方式。
```

### 12.单向通道
- 有时候我们会将通道作为参数在多人任务函数间传递，很多时候我们在不同的任务函数中使用通道都会对其
进行限制，比如显示通道在函数中只能发送或只能接收

- Go提供了单向通道来处理这种情况
```go
package main

import "fmt"

// 限制只能往out通道中发送数据
func counter(out chan <- int){
	for i := 0; i<100; i++{
		out <- i
	}
	close(out)
}

// 只能往out中发送数据，只能往int中取数据
func squarer(out chan <- int, in <- chan int){
	for i := range in{
		out <- i * i
	}
	close(out)
}

func printer(in <- chan int){
	for i := range in{
		fmt.Println(i)
	}
}

func main(){
	ch1 := make(chan int)
	ch2 := make(chan int)
	go counter(ch1)
	go squarer(ch2, ch1)
	printer(ch2)
}

/**
1.chan<- int是一个只能发送的通道，可以发送但是不能接收；
2.<-chan int是一个只能接收的通道，可以接收但是不能发送。
*/
```