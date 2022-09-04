###### 1.Padding用来做边距的

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
    return Padding(
      // Text文本四边都有一个8.0的边距
      padding: EdgeInsets.all(20.0),
      child: Text('你好啊', style: TextStyle(fontSize: 20)), 
    );
  }
}
```

###### 2.可以用SizeBox做上下的边距

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        // 也可以使用SizeBox做上下的边距
        Text('你好啊', style: TextStyle(fontSize: 20, backgroundColor: Colors.blue)), 
        SizedBox(height: 10),
        Text('你好啊', style: TextStyle(fontSize: 20, backgroundColor: Colors.blue)), 
        SizedBox(height: 10),
        Text('你好啊', style: TextStyle(fontSize: 20, backgroundColor: Colors.blue)), 
      ],
    );
  }
}
```

###### 3.Padding也可以实现上下边距，而不是直接加在四边

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[

        Padding(
          // 只传垂直的间距，即top和bottom都会有间距
          padding: EdgeInsets.symmetric(vertical: 5),
          child: Text('你好啊', style: TextStyle(fontSize: 20, backgroundColor: Colors.blue)),
        ),

        Padding(
          padding: EdgeInsets.symmetric(vertical: 5),
          child: Text('你好啊', style: TextStyle(fontSize: 20, backgroundColor: Colors.blue)),
        ),

        Padding(
          padding: EdgeInsets.symmetric(vertical: 5),
          child: Text('你好啊', style: TextStyle(fontSize: 20, backgroundColor: Colors.blue)),
        )
      ],
    );
  }
}
```

###### 4.padding也可以指定四个方向的间距

- fromLTRB四个参数都必须传

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[

        Padding(
          
          // 四个间距， left, top, right, bottom
          padding: EdgeInsets.fromLTRB(0, 0, 0, 20),
          child: Text('你好啊', style: TextStyle(fontSize: 20, backgroundColor: Colors.blue)),
        ),

        Padding(
          // 四个间距， left, top, right, bottom
          padding: EdgeInsets.fromLTRB(0, 0, 0, 20),
          child: Text('你好啊', style: TextStyle(fontSize: 20, backgroundColor: Colors.blue)),
        ),

        Padding(
          // 四个间距， left, top, right, bottom
          padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
          child: Text('你好啊', style: TextStyle(fontSize: 20, backgroundColor: Colors.blue)),
        ),
      ],
    );
  }
}
```

###### 5.only设置边距

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[

        Padding(
          // only具明可选参数，可以随意传递哪个边距
          padding: EdgeInsets.only(bottom: 20),
          child: Text('你好啊', style: TextStyle(fontSize: 20, backgroundColor: Colors.blue)),
        ),

        Padding(
          // 四个间距， left, top, right, bottom
          padding: EdgeInsets.fromLTRB(0, 0, 0, 20),
          child: Text('你好啊', style: TextStyle(fontSize: 20, backgroundColor: Colors.blue)),
        ),

        Padding(
          // 四个间距， left, top, right, bottom
          padding: EdgeInsets.fromLTRB(0, 0, 0, 0),
          child: Text('你好啊', style: TextStyle(fontSize: 20, backgroundColor: Colors.blue)),
        ),
      ],
    );
  }
}
```

