###### 1.Align基本使用

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
    // 1.Align布局组件，做居中的.和Center表现一样，是Center的父类
    // Align的子元素会水平垂直居中
    // Align是占据整个屏幕的大小，所以会水平垂直居中
    // 所以它可以把唯一的child放到中间
    return Align(
      child: Icon(Icons.pets, size: 50, color: Colors.orange),
    );
  }
}
```

###### 2.改变默认的水平和垂直居中

```dart
class _QHomeContentState extends State<QHomeContent>{

  @override
  Widget build(BuildContext context) {
    return Align(
      // 居中是用Alignment属性做的，左上角是(-1,-1),右下角是(1,1),中心点是(0,0)
      // 可以调整它的x,y改变位置
      // alignment: Alignment(1, 0),
        
      // alignment也可以设置常量
      alignment: Alignment.centerLeft,
      child: Icon(Icons.pets, size: 50, color: Colors.orange),
    );
  }
}
```

###### 3.如果不想基于整个屏幕水平垂直居中，可以包裹一个Container

- 因为Container可以设置大小，那么Align就会占满父元素的大小，然后做定位

```dart
class _QHomeContentState extends State<QHomeContent>{

  @override
  Widget build(BuildContext context) {
    // 包裹Container父元素
    return Container(
      width: 200,
      height: 200,
      color: Colors.blue,
      child: Align(
        alignment: Alignment(1, 0),
        child: Icon(Icons.pets, size: 50, color: Colors.orange),
      ),
    );
  }
}

```

###### 4.widthFactor和heightFactor

```dart
class _QHomeContentState extends State<QHomeContent>{

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment(1, 1),

      // 设置widthFactor将会改变Align的大小，Align默认是占满父元素
      // 当Align是Container的子元素时，widthFactor和heightFactor不生效

      // widthFactor代表宽度是child元素(即Icon)的10倍
      // heightFactor代表高度是child元素的10倍
      widthFactor: 5,
      heightFactor: 5,

      child: Icon(Icons.pets, size: 50, color: Colors.orange),
    );
  }
}
```



###### 5.Center组件，是Align组件的子组件，它只可以做水平垂直居中，不能设置其他值

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Icon(Icons.pets, size: 50, color: Colors.orange),
    );
  }
}

```

