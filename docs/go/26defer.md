### 1.defer和nil (没看明白)
- 解释：名为 test 的函数一直运行至结束，然后 defer 函数会被执行且会因为值为 nil 而产生 panic 异常。
- 然而值得注意的是，run() 的声明是没有问题，因为在test函数运行完成后它才会被调用。
```go
package main

import "fmt"

func test4(){
	var run func() = nil	// 这个run函数为nil
	defer run()
	fmt.Println("runs")
}

func main(){
	defer func() {
		if err := recover(); err != nil{
			fmt.Println(err)
		}
	}()
	test4()

	// 输出
	// runs
	// runtime error: invalid memory address or nil pointer dereference
}
```

### 2.1在错误的地方使用defer
- 当http.Get失败时会抛出异常
- 因为在这里我们并没有检查我们的请求是否成功执行
- 当它失败的时候，我们访问了 Body 中的空变量 res ，因此会抛出异常
```go
package main

import "net/http"

func do()error{
	res, err := http.Get("http://www.google.com")
	defer res.Body.Close()
	if err != nil{
		return err
	}

	return nil
}
func main(){
	// panic: runtime error: invalid memory address or nil pointer dereference
	do()
}
```

### 2.2上面代码的解决方案
```go
package main

import "net/http"

func do()error{
    // 通常，出错的时候.res的值为空，并且错误会被返回
	res, err := http.Get("http://www.google.com")
	if res != nil{
		defer res.Body.Close()
	}
	if err != nil{
		return err
	}

	return nil
}
func main(){
	do()
}
```

### 3.1不检查错误
- 在这里，`f.Close()`可能会返回一个错误，这个错误会被我们忽略掉
```go
package main

import "os"

func do() error {
    f, err := os.Open("book.txt")
    if err != nil {
        return err
    }

    if f != nil {
        // 这里f.Close()可能会返回一个错误，需要处理
        defer f.Close()
    }

    // ..code...

    return nil
}

func main() {
    do()
}
```

### 3.2上面代码的改进
```go
package main

import "os"

func do() error {
    f, err := os.Open("book.txt")
    if err != nil {
        return err
    }

    if f != nil {
    	// 为什么要用这个闭包
        defer func() {
            if err := f.Close(); err != nil {
                // log etc
            }
        }()
    }

    // ..code...

    return nil
}

func main() {
    do()
}
```

### 3.3再改进一下，通过命名的返回变量来返回defer内的错误
```go
package main

import "os"

func do() (err error) {
    f, err := os.Open("book.txt")
    if err != nil {
        return err
    }

    if f != nil {
        defer func() {
            if ferr := f.Close(); ferr != nil {
                // 这里将ferr复制给返回变量err
                err = ferr
            }
        }()
    }

    // ..code...

    return nil
}

func main() {
    do()
}
```

### 4.1释放相同的资源
- 如果你尝试使用相同的变量释放不同的资源，那么这个操作可能无法正常执行
```go
package main

import (
    "fmt"
    "os"
)

// 当延迟函数执行时，只有最后一个变量会被用到
// 因此，f 变量 会成为最后那个资源 (another-book.txt)。而且两个 defer 都会将这个资源作为最后的资源来关闭
func do() error {
    f, err := os.Open("book.txt")
    if err != nil {
        return err
    }
    if f != nil {
        defer func() {
            if err := f.Close(); err != nil {
                fmt.Printf("defer close book.txt err %v\n", err)
            }
        }()
    }

    // ..code...

    f, err = os.Open("another-book.txt")
    if err != nil {
        return err
    }
    if f != nil {
        defer func() {
            if err := f.Close(); err != nil {
                fmt.Printf("defer close another-book.txt err %v\n", err)
            }
        }()
    }

    return nil
}
// 输出结果： defer close book.txt err close ./another-book.txt: file already closed
func main() {
    do()
}
```

### 4.2解决方案
```go
package main

import (
	"fmt"
	"io"
	"os"
)

func do1() error{
	f, err := os.Open("book.txt")
	if err != nil{
		return err
	}
	if f != nil{
		defer func(f io.Closer) {
			if err = f.Close(); err != nil{
				fmt.Printf("defer close book.txt err %v\n", err)
			}
		}(f)
	}

	f, err = os.Open("another-book.txt")
	if err != nil{
		return err
	}
    // 通过闭包将f这个文件句柄传递过去
	if f != nil{
		defer func(f io.Closer) {
			// 先给err赋值，再进行判断
			// 第一个表达式是复制，第二个表达式才是判断条件
			if err = f.Close(); err != nil{
				fmt.Printf("defer close another-book.txt err %v\n", err)
			}
		}(f)
	}
	return nil
}

func main() {
	do1()
}
```