###### 1.基础的button

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

      // FloatingActionButton一般放在Scaffold里面，因为Scaffold本身就有一个floatingActionButton属性
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () => print("FloatingActionButton"),
      ),

      // 设置floatingActionButton按钮的位置
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
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
    return Column(
      children: <Widget>[
        // 1.RaiseButton(凸起效果的button), 不传onPress回调的按钮是disabled的
        RaisedButton(
          child: Text("RaiseButton"),
          // 按钮里面文本的颜色
          textColor: Colors.white,
          // 按钮的颜色
          color: Colors.orange,
          onPressed: () => print("Raise Button"),
        ),

        // 2.FlatButton， 扁平的button
        FlatButton(
          child: Text('FlatButton'),
          onPressed: () => print("Flat button"),
          color: Colors.black,
          textColor: Colors.white,
        ),

        // OutlineButton, 轮廓button
        OutlineButton(
          child: Text('OutlineButton'),
          onPressed: () => print("Outline button"),
        ),
      ],
    );
  }
}


```

###### 2.自定义button

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

      // FloatingActionButton一般放在Scaffold里面，因为Scaffold本身就有一个floatingActionButton属性
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () => print("FloatingActionButton"),
      ),

      // 设置floatingActionButton按钮的位置
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
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
    return Column(
      children: <Widget>[
        // 1.RaiseButton(凸起效果的button), 不传onPress回调的按钮是disabled的
        RaisedButton(
          child: Text("RaiseButton"),
          // 按钮里面文本的颜色
          textColor: Colors.white,
          // 按钮的颜色
          color: Colors.orange,
          onPressed: () => print("Raise Button"),
        ),

        // 2.FlatButton， 扁平的button
        FlatButton(
          child: Text('FlatButton'),
          onPressed: () => print("Flat button"),
          color: Colors.black,
          textColor: Colors.white,
        ),

        // 3.OutlineButton, 轮廓button
        OutlineButton(
          child: Text('OutlineButton'),
          onPressed: () => print("Outline button"),
        ),

        // 4.自定义button(图标背景，圆角)
        FlatButton(
          color: Colors.amberAccent,
          // 圆角
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8)
          ),
          child: Row(
            // 因为Row默认是占据一行的，主轴上的size改成min就是能占据多小就多小，会由内同撑起
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Icon(Icons.favorite, color: Colors.pink,),
              Text('点赞')
            ],
          ),

          onPressed: () => print('自定义button'),
        )
      ],
    );
  }
}


```

###### 3.button补充

- 默认button上下有一定边距，去除边距

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        // button的宽高如果不足48px的话会扩展至48px,表现就像外边距一样和其他元素有边距
        FlatButton(
          color: Colors.red,
          child: Text('FlatButton1'),
          textColor: Colors.white,
          onPressed:() => print('Hello Word'),
          // 设置为紧缩包裹，不会扩展至48px
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,

        ),
        FlatButton(
          color: Colors.red,
          child: Text('FlatButton1'),
          textColor: Colors.white,
          materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
          onPressed:() => print('Hello Word'),
        )
      ]
    );
  }
}
```

###### 4.设置最小宽高

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        // 想要设置它的默认宽高，需要外面嵌套一个ButtonTheme
        ButtonTheme(
          // 因为是最小高度，所以有内容的时候还是会包裹内容的
          // 设置最小宽高
          minWidth: 30,
          height: 30,
          child: FlatButton(
            color: Colors.red,
            // button没有内容时，夜默认有宽高，即默认值(width: 88, height: 36)
            child: Text('FlatButton1'),
            textColor: Colors.white,
            onPressed:() => print('Hello Word'),
            materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
          ),
        )
      ]
    );
  }
}
```

###### 5.button默认有内边距

- 去除button内边距

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        ButtonTheme(
          minWidth: 30,
          height: 30,
          child: FlatButton(
            color: Colors.red,
            child: Text('FlatButton1'),
            textColor: Colors.white,
            onPressed:() => print('Hello Word'),
            materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
            // 所有内边距都设置成0
            padding: EdgeInsets.all(0),
          ),
        )
      ]
    );
  }
}

```

