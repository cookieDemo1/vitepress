###### 1.Icons基础

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        // 1.Icon是一个字体图标，在网页中用的非常多
        // 2.字体图标是一个矢量值，放大不会失真
        // 3.因为字体图标是字体所以可以设置颜色
        // 4.图标很多时，占据空间更小
        Icon(Icons.pets, size: 100, color: Colors.orange,)
      ],
    );
  }
}
```

###### 2.TextField输入框基础

```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      home: QHomePage(),
    );
  }
}

class QHomePage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('基础Widget'),
      ),
      body: QHomeContent(),
    );
  }
}

class QHomeContent extends StatefulWidget{
  @override
  State<StatefulWidget> createState() {
    return _QHomeContentState();
  }
}

class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    // Padding设置边距
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: <Widget>[
          // 文本输入框
          TextField(
            // 输入框的样式使用decoration
            decoration: InputDecoration(
              // 设置Icon图标
              icon: Icon(Icons.access_alarm),
              // 类似label
              // labelText: 'username',

              // 类似placeholder
              hintText: '请输入用户名',
              // 矩形边框
              border: OutlineInputBorder(),

              // 背景色,传递的100代表混合的不同的颜色
              fillColor: Colors.orange[100]

            ),
          ),
          TextField(
            // 输入框的样式使用decoration
            decoration: InputDecoration(
              // 设置Icon图标
              icon: Icon(Icons.pause),
              // 类似label
              // labelText: 'username',

              // 类似placeholder
              hintText: '请输入用户名',
              // 矩形边框
              border: OutlineInputBorder()

            ),
          ),
        ],
      ),
    );
  }
}


```

###### 3.监听input框的事件

```dart

class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    // Padding设置边距
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: <Widget>[
          // 文本输入框
          TextField(
            // 输入框的样式使用decoration
            decoration: InputDecoration(
              // 设置Icon图标
              icon: Icon(Icons.access_alarm),
              // 类似label
              // labelText: 'username',

              // 类似placeholder
              hintText: '请输入用户名',
              // 矩形边框
              border: OutlineInputBorder(),

              // 背景色,传递的100代表混合的不同的颜色
              fillColor: Colors.orange[100]
            ),
            // 监听输入框的值的改变
            onChanged: (value){
              print(value);
            },
            // 监听提交，夜神模拟器没有键盘，点击不了提交或者完成
            onSubmitted: (value) {
              print('监听到提交，值为${value}');
            },
          ), 
        ],
      ),
    );
  }
}


```

###### 4.通过按钮获取到所有的input中的数据

```dart
class _QHomeContentState extends State<QHomeContent>{
  // 1.创建两个TExtEditingController
  final usernameTextEditController = TextEditingController();
  final passwordTextEditController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: <Widget>[
          TextField(
            // 2.TextFiled绑定controller
            controller: usernameTextEditController,
            decoration: InputDecoration(
              icon: Icon(Icons.access_alarm),
              hintText: '请输入用户名',
              border: OutlineInputBorder(),
              fillColor: Colors.orange[100]
            ),
          ),
          TextField(
            controller: passwordTextEditController,
            decoration: InputDecoration(
              hintText: '请输入密码',
              icon: Icon(Icons.lock),
              border: OutlineInputBorder(),
            ),
          ),
          // 包裹一层Container也可以设置按钮的大小，因为Container的子元素会填充满Container的大小
          Container(
            // double.infinity填充满整个父容器的宽度
            width: double.infinity,
            height: 35,
            child: FlatButton(
              color: Colors.blue,
              child: Text('登录', style: TextStyle(fontSize: 20, color: Colors.white)),
              onPressed: (){
                // 3.获取用户名和密码
                // 1).通过controller获取到用户名和密码
                final username = usernameTextEditController.text;
                final password = passwordTextEditController.text;
                // 2).打印用户名和密码
                print('用户名: ${username}, password: ${password}');
              },
            ),
          )
        ],
      ),
    );
  }
}


```

###### 5.修改input的边框颜色

```dart
class _QHomeContentState extends State<QHomeContent>{
  // 1.创建两个TExtEditingController
  final usernameTextEditController = TextEditingController();
  final passwordTextEditController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    // padding外层包裹一个Them，修改边框颜色
    return Theme(
      data: ThemeData(
        primaryColor: Colors.red
      ), 
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: <Widget>[
            TextField(
              // 2.TextFiled绑定controller
              controller: usernameTextEditController,
              decoration: InputDecoration(
                icon: Icon(Icons.access_alarm),
                hintText: '请输入用户名',
                border: OutlineInputBorder(),
                fillColor: Colors.orange[100]
              ),
            ),
            TextField(
              controller: passwordTextEditController,
              decoration: InputDecoration(
                hintText: '请输入密码',
                icon: Icon(Icons.lock),
                border: OutlineInputBorder(),
              ),
            ),
            // 包裹一层Container也可以设置按钮的大小，因为Container的子元素会填充满Container的大小
            Container(
              // double.infinity填充满整个父容器的宽度
              width: double.infinity,
              height: 35,
              child: FlatButton(
                color: Colors.blue,
                child: Text('登录', style: TextStyle(fontSize: 20, color: Colors.white)),
                onPressed: (){
                  // 3.获取用户名和密码
                  // 1).通过controller获取到用户名和密码
                  final username = usernameTextEditController.text;
                  final password = passwordTextEditController.text;
                  // 2).打印用户名和密码
                  print('用户名: ${username}, password: ${password}');
                },
              ),
            )
          ],
        ),
      )
    );
  }
}
```

