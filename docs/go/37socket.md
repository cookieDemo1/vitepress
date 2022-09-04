### 1.1TCP Server 服务端
- 一个TCP服务端可以同时连接很多个客户端，例如世界各地的用户使用自己电脑上的浏览器访问淘宝网。
- TCP服务端程序的处理流程
    1.监听端口
    2.接收客户端请求建立链接
    3.创建goroutine处理链接。
```go
package main

import (
	"bufio"
	"fmt"
	"net"
)

// 处理函数, arg1: TCP连接
func process(conn net.Conn){
	defer conn.Close()	// 关闭连接
	for {
		reader := bufio.NewReader(conn)		// 将连接编程一个IO
		var buf [128]byte
		n, err := reader.Read(buf[:])		// 将数据读取到buf中，为什么切片是[:]
		if err != nil{
			fmt.Println("read from client failed, err: ", err)
			break
		}

		// 从buf取数据
		recvStr := string(buf[:n])
		fmt.Println("收到client端发送来的数据: ", recvStr)
		conn.Write([]byte(recvStr))		// 发送数据
	}
}

func main(){
	listener, err := net.Listen("tcp", "127.0.0.1:20000")
	if err != nil{
		fmt.Println("listen failed, err: ", err)
		return
	}

	println("server")

	// 无限循环，等待连接
	for {
		conn ,err := listener.Accept() 	// 连接连接

		// 如果连接有异常，跳过此次循环
		if err != nil{
			fmt.Println("accept failed, err: ", err)
			continue
		}

		go process(conn) // 启动一个goroutine处理连接
	}

}


```

### 2.TCP Client
- 一个TCP客户端进行TCP通信的流程如下：
    1.建立与服务端的链接
    2.进行数据收发
    3.关闭链接
```go
package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strings"
)

func main(){
	conn, err := net.Dial("tcp", "127.0.0.1:20000")
	// 连接失败，直接跳出主函数
	if err != nil{
		fmt.Println("err: ", err)
		return
	}

	println("Client")
	defer conn.Close()

	// inputReader为从标准输入中读取数据
	inputReader := bufio.NewReader(os.Stdin)
	for{
		input, _ := inputReader.ReadString('\n')	// 读取用户输入
		inputInfo := strings.Trim(input, "\r\n")
		if strings.ToUpper(inputInfo) == "Q"{ // 如果输入Q就退出
			return
		}

		_, err = conn.Write([]byte(inputInfo)) // 发送数据
		if err != nil{						   // 发送失败，跳出函数
			return
		}

		// 读取服务端返回的数据
		buf := [512]byte{}
		n, err := conn.Read(buf[:])
		if err != nil{
			fmt.Println("recv failed. err: ", err)
			return
		}
		// 有数据，打印
		fmt.Println("recv", string(buf[:n]))
	}
}
```

### 2.UDP服务端
- UDP不需要建立连接就能直接进行数据发送和接收，属于不可靠的、没有时序的通信
- 但是UDP协议的实时性比较好，通常用于视频直播相关领域。
```go
package main

import (
	"fmt"
	"net"
)

func main(){
	// ListenUDP的第二个参数为 net.UPAddr结构体类型的数据，并且传递指针就行
	listen, err := net.ListenUDP("udp", &net.UDPAddr{
		IP: net.IPv4(0,0,0,0),
		Port: 20000,
	})

	println("UDP serve start")

	if err != nil{
		fmt.Println("listen failed, err: ", err)
	}
	defer listen.Close()

	// 循环接收数据,UDP不需要建立连接，服务端直接监听有没有数据来即可
	for{
		var data[1024]byte
		n, addr, err := listen.ReadFromUDP(data[:])	// 接收数据

		// 如果接收数据有错误，跳过此次循环，进入下次循环
		if err != nil{
			fmt.Println("read udp failed, err: ", err)
			continue
		}
		// 打印接收的数据
		fmt.Printf("data: %v, addr: %v, count: %v\n", string(data[:n]), addr, n)

		// 发送给数据给客户端,谁给发的就i返回给谁
		_, err = listen.WriteToUDP(data[:n], addr)	// 发送数据
		if err != nil{
			fmt.Println("write to udp failed, err: ", err)
			continue
		}
	}
}
```

### 3.UDP客户端
```go
package main

import (
	"fmt"
	"net"
)

func main(){
	// 连接一个websocket服务端
	socket, err := net.DialUDP("udp", nil, &net.UDPAddr{
		IP: net.IPv4(0,0,0,0),
		Port: 20000,
	})

	println("UDP Client start")

	if err != nil {
		fmt.Println("连接服务端失败, err: ", err)
		return
	}

	// defer关闭连接
	defer socket.Close()

	sendData := []byte("Hello Word")	// 需要发送的数据
	_,err = socket.Write(sendData)		// 发送数据

	if err != nil{
		fmt.Println("发送数据失败, err: ", err)
		return
	}

	// 这个data用来存储接收的数据
	data := make([]byte, 4096)
	n, remoteAddr, err := socket.ReadFromUDP(data)	// 接收数据
	if err != nil{	// 如果接收中发生错误，则return
		fmt.Println("接收数据失败,err: ", err)
		return
	}
	fmt.Printf("recv: %v, addr: %v, content:  %v\n", string(data[:n]), remoteAddr, n)
}
```