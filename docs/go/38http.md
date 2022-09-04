### 1.服务端
```go
package main

import (
	"fmt"
	"net/http"
)


func httpHandler(w http.ResponseWriter, r *http.Request){
	fmt.Println(r.RemoteAddr, "连接成功")
	fmt.Println("method: ", r.Method)
	fmt.Println("header: ", r.Header)
	fmt.Println("url: ", r.URL.Path)
	fmt.Println("body: ", r.Body)

	// 回复
	_, err := w.Write([]byte("huang cai ping"))
	if err != nil{
		fmt.Println("回复失败")
	}
}



func main(){
	// 访问路径 http://127.0.0.1:8000/go
	http.HandleFunc("/go", httpHandler)

	err := http.ListenAndServe("127.0.0.1:8000", nil)
	if err != nil{
		fmt.Println("启动失败")
	}
}
```

### 2.客户端
```go
package main

import (
	"fmt"
	"io"
	"net/http"
)

func main(){
	resp, _ := http.Get("http://127.0.0.1:8000/go")
	defer func() {
		err := resp.Body.Close()
		if err != nil{
			fmt.Println("关闭失败")
		}
	}()

	fmt.Println(resp.Status)
	fmt.Println(resp.Header)

	buf := make([]byte, 1024)
	for{
		// 接收服务端消息
		n, err := resp.Body.Read(buf)
		if err != nil && err != io.EOF{
			fmt.Println(err)
			return
		}else{
			fmt.Println("读取完毕")
			res := string(buf[:n])
			fmt.Println(res)
			break
		}
	}
}
```