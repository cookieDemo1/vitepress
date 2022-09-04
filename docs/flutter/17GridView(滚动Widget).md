###### 1.GridView网格布局

```dart
// 默认构造方法
// count构造方法
// extent构造方法
// builder构造方法
```

###### 2.默认构造方法

- SliverGridDelegateWithFixedCrossAxisCount

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
    return GridView(
      // SliverGridDelegateWithFixedCrossAxisCount() Grid布局的属性
      // crossAxisCount: 固定交叉轴的个数，默认垂直方向是主轴
      // 所以这里是水平方向一行显示多少个item

      // childAspectRatio: 1.5  宽高比1.5:1
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        // 一行放三个元素，平局分
        crossAxisCount: 3,

        // 宽高比 0.8:1
        childAspectRatio: .8,

        // 交叉轴上的间距
        crossAxisSpacing: 8,

        // 主轴上的间距
        mainAxisSpacing: 8
      ),
      
      children: List.generate(100, (index){
        return Container(
          // 颜色随机
          color: Color.fromARGB(255, Random().nextInt(256), Random().nextInt(256), Random().nextInt(256)),
        );
      })
    );
  }
}


```

###### 3.整个GridView有边距

- 外层加一个padding

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    // 整个Grid有边距，则在外层包裹一个Padding
    return Padding(
      padding: EdgeInsets.all(8),
      child: GridView(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          // 一行放三个元素，平局分
          crossAxisCount: 3,

          // 宽高比 0.8:1
          childAspectRatio: .8,

          // 交叉轴上的间距
          crossAxisSpacing: 8,

          // 主轴上的间距
          mainAxisSpacing: 8
        ),
        
        children: List.generate(100, (index){
          return Container(
            // 颜色随机
            color: Color.fromARGB(255, Random().nextInt(256), Random().nextInt(256), Random().nextInt(256)),
          );
        })
      ),
    ); 
    
  }
}
```

###### 3.默认构造方法

- SliverGridDelegateWithMaxCrossAxisExtent

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(8),
      child: GridView(
        // SliverGridDelegateWithMaxCrossAxisExtent
        gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
          // item想要占据的宽度范围是多少.最大宽度是100,也可能小于100,会动态调整
          maxCrossAxisExtent: 120,
          crossAxisSpacing: 8,
          mainAxisSpacing: 8,
          // 宽高比， 宽0.8:高1
          childAspectRatio: .8
        ),
        
        children: List.generate(100, (index){
          return Container(
            // 颜色随机
            color: Color.fromARGB(255, Random().nextInt(256), Random().nextInt(256), Random().nextInt(256)),
          );
        })
      ),
    ); 
    
  }
}
```

###### 4builder构造方法

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(8),
      // builder方法，只有item在屏幕上要显示的时候才调用itemBuilder方法创建Widget
      child: GridView.builder(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          // 一行可以放多少个子Widget
          crossAxisCount: 3,
          // 主轴间隙
          mainAxisSpacing: 8,
          // 交叉轴间隙
          crossAxisSpacing: 8
        ), 
        itemBuilder: (BuildContext ctx, int index){
          return Container(
            color: Color.fromARGB(255, Random().nextInt(256), Random().nextInt(256), Random().nextInt(256)),
          );
        }
      )
    ); 
    
  }
}
```

