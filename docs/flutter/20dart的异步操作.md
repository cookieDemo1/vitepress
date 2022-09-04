###### 1.dart的异步操作

```dart
Dart中的异步操作主要使用Future以及async和await
可以把Future理解成Promise
```

###### 2.同步阻塞的代码

```dart
import 'dart:io';

main(List<String> args) {
  print('main start');
  print(getData());
  print('main end');
}

String getData(){
  sleep(Duration(seconds: 2));
  return 'Hello Word';
}
```

###### 3.修改成异步代码

```dart
import 'dart:io';

main(List<String> args) {
  print('main start');
  // value不指定类型是一个dynamic类型
  getData().then((value){
    print(value);
  }).catchError((error){
    print(error);
  });
  print('main end');
}

// Future相当于Promise
Future getData(){
  // Future需要传递一个回调函数
  // 将异步操作写在这个回调函数里面
  return Future((){
    sleep(Duration(seconds: 5));
    return "Hello Word";
  });
}
```

###### 4要想Future失败，则抛出异常，类似于Promise的reject

```dart
import 'dart:io';

main(List<String> args) {
  print('main start');
  getData().then((dynamic value){
    print(value);
  }).catchError((error){
    print(error);
  });
  print('main end');
}

Future getData(){
  return Future((){
    sleep(Duration(seconds: 5));
    // 1>如果有返回结果，那么就执行Future对应的then的回调(相当于Promise的resolve)
    // 2>如果没有结果返回(有错误信息)，需要在Future回调中抛出异常(相当于reject)
    // return "Hello Word";
    throw Exception('异常');
  });
}
```

###### 5.异步代码2

```dart
import 'dart:io';

main(List<String> args) {
  print('main start');

  Future(() {
    sleep(Duration(seconds: 5));
    return "Hello Word";
  }).then((value){
    print(value);
  }).catchError((error){
    print(error);
  });

  print('main end');
}
```

###### 6.可以和Promise一样不断的.then，catchError只需调用一次

```dart
// 如果希望第二次请求携带的参数，是第一次请求返回的结果，则可以在then里面再发送请求
import 'dart:io';

main(List<String> args) {
  print('main start');
  Future((){
    sleep(Duration(seconds: 5));
    print('第一次得到结果');
    return 'Hello Word';
  }).then((value){
    // 这里的value是上一次return的结果
    sleep(Duration(seconds: 5));
    print('第二次得到结果');
    return value;
  }).then((value){
    // 这里的value是上一次return的结果
    sleep(Duration(seconds: 5));
    print('第三次得到结果$value');
  // catchError只需要再最后捕捉一次即可 
  }).catchError((error){
    print(error);
  });
  print('main end');
}
```

###### 7.Future可以没有异步代码

```dart
import 'dart:io';

main(List<String> args) {
  print("start.....");
  // 如果Future没有异步代码，那么它也是在主线程之后执行，因为Future会加入到事件循环里。
  Future((){
    return "Hello Word";
  }).then((res){
    print(res);
  }).catchError((error){
    print("error");
  });
  print("end......");
}
```

###### 8Future其他API

```dart
main(List<String> args) {
  // 1.Future可以直接.value。相当于直接return一个值
  Future.value("Hello").then((res) => print(res));

  // 2.Future直接.error,相当于直接抛出一个异常
  Future.error("error").catchError((err) => print(err));

  // 3.delayed(Future延迟执行)
  // 第二个参数为一个回调函数，异步操作代码放进里面
  Future.delayed(Duration(seconds: 3), (){
    return "Hello Word";
  }).then((res){
    print(res);
  }).catchError((error){
    print(error);
  });

}
```



###### ========================================================================================

###### 1.async和await

```dart
async和await可以让我们用同步的代码格式，去实现异步的调用过程
```

###### 2.演示

- 这种代码，或许有问题，因为async和await有使用规范
- 1.await必须在async函数中才能使用
- 2.async函数返回的结果必须是一个Future

```dart
import 'dart:io';

// async
main(List<String> args) async {
  print('main start');
  // await
  await getNetworkData().then((res){
    print(res);
  });
  print('main end');
}

Future getNetworkData(){
  return Future((){
    sleep(Duration(seconds: 3));
    return "Hello Word";
  });
}
```

###### 3.async和await例子

```dart
import 'dart:io';

import 'dart:math';
main(List<String> args)async {
  print('start........');
  // 因为getData返回的也是Future对象，所以这里也要加async和await
  // 不加await和async则需要使用then来获取到结果
  var result =  await getData();
  print(result);
  print('end...........');
}


// async返回的也是一个Future对象
dynamic getData()async{
  var res1 = await getNetworkData();
  var res2 = await getNetworkData();
  var res3 = await getNetworkData();
  // 会将这里封装成Future对象返回
  return res1 + res2 + res3;
}

Future getNetworkData() async {
  return Future((){
    sleep(Duration(seconds: 2));
    return Random().nextInt(255);
  });
}
```



###### ==========================================================================================



###### Isolate基本使用

- 类似于开启一个线程

```dart
import 'dart:isolate';

main(List<String> args) {
  print('main start....');

  // 开启一个Isolate,执行calc函数，将100传递过去作为calc函数的参数
  Isolate.spawn(calc, 100);

  print('main end....');
}

void calc(int count){
  var total = 0;
  for(var i=0; i < count; i++){
    total += i;
  }
  print(total);
}
```

###### Isolate通信

```dart
import 'dart:isolate';

main(List<String> args) async {
  // 1.创建管道
  ReceivePort receivePort = ReceivePort();

  // 2.创建Isolate
  Isolate isolate = await Isolate.spawn<SendPort>(foo,receivePort.sendPort);

  // 3.监听管道
  receivePort.listen((message) {
    print(message);
    receivePort.close();
  });

  isolate.kill();
}


void foo(SendPort sendPort){
  // 4.通过SendPort的send发送消息
  return sendPort.send('Hello Word');
}

```

