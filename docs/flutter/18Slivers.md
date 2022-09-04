###### 1.Slivers

```dart
Slivers的基本使用
因为我们需要把很多的Sliver放在一个CustomScrollView中，所以CustomSrollView有一个slivers属性，里面让我们放对应的一些Sliver
        SliverList: 类似于我们之前使用过的ListView
        SliverFiexdExtendList: 类似于SliverList只是可以设置滚动的高度
        SliverGrid: 类似于之前使用的GridView
        SliverPadding: 设置Sliver的内边距，因为可能要单独给Sliver设置内边距
        SliverAppBar: 添加一个AppBar,通常用来作为CustomScrollView和HeaderView
        SliverSafeArea: 设置内容显示在安全区域(比如不让齐刘海挡住我们的内容)
            
ListView和GridView其实也就是内部创建了Sliver,但是因为它们只能放一个sliver,所以如果我们想要在一个容器里面即显示ListView又显示GridView是不行的。那么就需要使用CoustomScrollView,它可以直接传入一个数组，数组里面可以放多个sliver.
```

###### 2.CustomScrollView

- 里面放SliverGrid

```dart
lass _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    // CustomScrollView不能放普通的Widget,只能放Sliver
    return CustomScrollView(
      slivers: <Widget>[
        // SliverGrid也有extend等构造器，但是没有builder构造器
        // 要实现builder的效果，则使用默认构造器
        SliverGrid(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            crossAxisSpacing: 8,
            mainAxisSpacing: 8,
            childAspectRatio: 0.9
          ),
          // 没有builder方法去创建SliverGrid的子Widget，需要使用delegate
          // SliverChildBuilderDelegate类似于builder的方式
          // ListVie.custom()有一个custom构造方法，也是传递一个delegate和这个一样
          delegate: SliverChildBuilderDelegate(
            //arg1是一个函数，返回需要的子Widget
            (BuildContext ctx, int index){
              return Container(
                color: Color.fromARGB(255,Random().nextInt(256),Random().nextInt(256),Random().nextInt(256)),
              );
            },
            // arg2创建子widget的个数，默认是无穷的，可以一直滚动
            childCount: 200
          ),
        )
      ],
    );
  }
}
```

###### 2.SliverGrid + SafeView

```dart
import 'dart:math';

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
      // 1.假如脚手架没有appBar,则如果某些手机有刘海屏，会遮挡内容
      // appBar: AppBar(
      //   title: Text('基础Widget'),
      // ),
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
    // 2.然后我们的CustomScrollView包裹一个SafeArea，内容就不会显示在
    // 刘海旁边的区域，只显示在安全区域
    return SafeArea(
      child: CustomScrollView(
        slivers: <Widget>[
          SliverGrid(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              crossAxisSpacing: 8,
              mainAxisSpacing: 8,
              childAspectRatio: 0.9
            ),

            delegate: SliverChildBuilderDelegate(
              //arg1是一个函数，返回需要的子Widget
              (BuildContext ctx, int index){
                return Container(
                  color: Color.fromARGB(255,Random().nextInt(256),Random().nextInt(256),Random().nextInt(256)),
                );
              },
              childCount: 200
            ),
          )
        ],
      )
    ); 
    
  }
}

```

###### 3.一般可滚动的Widget包裹SliverSafeArea

- SliverGrid + SliverSafeView

```dart
import 'dart:math';

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
      // 1.假如脚手架没有appBar,则如果某些手机有刘海屏，会遮挡内容
      // appBar: AppBar(
      //   title: Text('基础Widget'),
      // ),
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
    return CustomScrollView(
      slivers: <Widget>[
        // 2.数组中的SliverGrid包裹一个SliverSafeArea
        SliverSafeArea(
          sliver: SliverGrid(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              crossAxisSpacing: 8,
              mainAxisSpacing: 8,
              childAspectRatio: 0.9
            ),

            delegate: SliverChildBuilderDelegate(
              //arg1是一个函数，返回需要的子Widget
              (BuildContext ctx, int index){
                return Container(
                  color: Color.fromARGB(255,Random().nextInt(256),Random().nextInt(256),Random().nextInt(256)),
                );
              },
              childCount: 200
            ),
          ) 
        )
      ],
    );
  }
}


```

###### 4.CustomScrollView完整例子

```dart
import 'dart:math';

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
      // 1.假如脚手架没有appBar,则如果某些手机有刘海屏，会遮挡内容
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
    return CustomScrollView(
      slivers: <Widget>[
        // 2.数组中的SliverGrid包裹一个SliverSafeArea
        SliverSafeArea(
          // 3.再传一个SliverPadding给Sliver增加边距
          // SliverPadding相较于padding,当滚动到顶部时
          // SliverPadding的顶部padding会被内容覆盖，而padding不会
          sliver: SliverPadding(
            padding: EdgeInsets.all(8),
            sliver: SliverGrid(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                crossAxisSpacing: 8,
                mainAxisSpacing: 8,
                childAspectRatio: 0.9
              ),

              delegate: SliverChildBuilderDelegate(
                //arg1是一个函数，返回需要的子Widget
                (BuildContext ctx, int index){
                  return Container(
                    color: Color.fromARGB(255,Random().nextInt(256),Random().nextInt(256),Random().nextInt(256)),
                  );
                },
                childCount: 200
              )
            ) 
          )
        )
      ],
    );
  }
}


```



###### ============================================================================================



###### 5.CustomScrollView里放多个Sliver

- 放SliverList和SliverGrid

```dart
import 'dart:math';

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
      // 1.假如脚手架没有appBar,则如果某些手机有刘海屏，会遮挡内容
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
    return CustomScrollView(
      // Slivers可以放多个Sliver
      slivers: <Widget>[
        // 1.SliverList是类似于ListView的Widget
        // SliverList只有一个delegate参数
        SliverList(
          delegate: SliverChildBuilderDelegate(
            (BuildContext ctx, int index){
              return ListTile(
                leading: Icon(Icons.people),
                title: Text('练习人'),
                subtitle: Text('13333333333'),
              );
            },
            childCount: 10
          )
        ),
        // 2.SliverGrid
        SliverGrid(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            crossAxisSpacing: 8,
            mainAxisSpacing: 8,
            childAspectRatio: 0.9
          ),

          delegate: SliverChildBuilderDelegate(
            //arg1是一个函数，返回需要的子Widget
            (BuildContext ctx, int index){
              return Container(
                color: Color.fromARGB(255,Random().nextInt(256),Random().nextInt(256),Random().nextInt(256)),
              );
            },
            childCount: 20
          )
        )

      ],
    );
  }
}


```



###### ==============================================================================================



###### 6.SliverAppBar

- 可滚动Sliver的AppBar.使用这个AppBar则可以把Scaffold的AppBar去除

```dart
import 'dart:math';

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
      // 1.使用SliverAppBar则可以把AppBar去掉
      // appBar: AppBar(
      //   title: Text('基础Widget'),
      // ),
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
    return CustomScrollView(
      slivers: <Widget>[
        // 1.Sliver导航，这个AppBar可以随着sliver的滚动而滚动
        SliverAppBar(
          // pinned: true，SliverAppBar固定，不随着Sliver的滚动而滚动
          pinned: true,
        ),
        SliverList(
          delegate: SliverChildBuilderDelegate(
            (BuildContext ctx, int index){
              return ListTile(
                leading: Icon(Icons.people),
                title: Text('练习人'),
                subtitle: Text('13333333333'),
              );
            },
            childCount: 10
          )
        ),
        // 2.SliverGrid
        SliverGrid(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            crossAxisSpacing: 8,
            mainAxisSpacing: 8,
            childAspectRatio: 0.9
          ),

          delegate: SliverChildBuilderDelegate(
            (BuildContext ctx, int index){
              return Container(
                color: Color.fromARGB(255,Random().nextInt(256),Random().nextInt(256),Random().nextInt(256)),
              );
            },
            childCount: 20
          )
        )

      ],
    );
  }
}

```

###### 7.定义SliverAppBar的样式

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      // Slivers可以放多个Sliver
      slivers: <Widget>[
        // 1.Sliver导航，这个AppBar可以随着sliver的滚动而滚动
        SliverAppBar(
          // pinned: true，SliverAppBar固定，不随着Sliver的滚动而滚动
          pinned: true,
          // 设置SliverAppBar的高度
          expandedHeight: 300,

          // 设置标题，FlexibleSpaceBar滚动的时候会有效果
          flexibleSpace: FlexibleSpaceBar(
            title: Text("Hello Word"),
            // 背景图，并且图片占满SliverBar
            background: Image.asset('assets/img/1.jpg', fit: BoxFit.cover,),
          ),
        ),
        SliverList(
          delegate: SliverChildBuilderDelegate(
            (BuildContext ctx, int index){
              return ListTile(
                leading: Icon(Icons.people),
                title: Text('练习人'),
                subtitle: Text('13333333333'),
              );
            },
            childCount: 10
          )
        ),
        // 2.SliverGrid
        SliverGrid(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            crossAxisSpacing: 8,
            mainAxisSpacing: 8,
            childAspectRatio: 0.9
          ),

          delegate: SliverChildBuilderDelegate(
            //arg1是一个函数，返回需要的子Widget
            (BuildContext ctx, int index){
              return Container(
                color: Color.fromARGB(255,Random().nextInt(256),Random().nextInt(256),Random().nextInt(256)),
              );
            },
            childCount: 20
          )
        )

      ],
    );
  }
}
```



