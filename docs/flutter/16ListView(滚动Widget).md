###### 1.ListView基础

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
    return ListView(
      // List.generate可以生成列表Widget
      // 下列生成100个Hello Word
      children: List.generate(100, (index) {
        return Text("Hello Word: $index", style: TextStyle(fontSize: 30));
      })
    );
  }
}
```

###### 2.ListTile

- ListTile用来做每一行

```dart

class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: List.generate(100, (index) {
        // 一般ListView里面使用ListTile
        return ListTile(
          // 每一行开始的图标
          leading: Icon(Icons.people),
          // 每一行结束的图标
          trailing: Icon(Icons.delete),
          // 标题
          title: Text("联系人${index+1}"),
          subtitle: Text("联系人电话号码:188888666888"),
        );
      })
    );
  }
}
```

###### 3.scrollDirection滚动方向

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return ListView(
      // scrollDirection 默认是垂直滚动
      scrollDirection: Axis.vertical,
      children: List.generate(100, (index) {
        return ListTile(
          leading: Icon(Icons.people),
          trailing: Icon(Icons.delete),
          title: Text("联系人${index+1}"),
          subtitle: Text("联系人电话号码:188888666888"),
        );
      })
    );
  }
}
```

###### 4.水平滚动

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return ListView(
      // 设置成水平滚动
      scrollDirection: Axis.horizontal,
      // 水平滚动必须要设置每一个item的宽度
      itemExtent: 100,
      // 水平滚动一般不适用ListTile，因为ListTile水平滚动很丑
      children: List.generate(100, (index) {
        return ListTile(
          leading: Icon(Icons.people),
          trailing: Icon(Icons.delete),
          title: Text("联系人${index+1}"),
          subtitle: Text("联系人电话号码:188888666888"),
        );
      })
    );
  }
}
```

###### 5.itemExtent

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return ListView(
      // 给每一个item设置固定的高度，如果是水平滚动，则是设置item的宽度
      // 没有设置则是默认高度，默认高度是按照内容计算的高度
      itemExtent: 100,
      children: List.generate(100, (index) {
        return ListTile(
          leading: Icon(Icons.people),
          trailing: Icon(Icons.delete),
          title: Text("联系人${index+1}"),
          subtitle: Text("联系人电话号码:188888666888"),
        );
      })
    );
  }
}
```

###### 6.一般不使用默认的构造器,使用ListView.builder

- 当子元素是确定的使用默认的构造器，默认构造器会直接创建所有的item
- 当子元素不确定个数使用builder构造器。builder构造器会让item实际在展示的时候才创建。

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      // 先告诉ListView将要展示100个item,大但是这100个item不会立即创建
      itemCount: 100,

      // 每一个item的高度
      // itemExtent: 40,

      // itemBuilder需要传递一个回调函数，当有item需要被展示到屏幕的时候，会调用
      // 这个构造函数, arg1:上下文， arg2:索引值
      itemBuilder: (BuildContext ctx, int index){
        return Text('Hello Word ${index+1}', style: TextStyle(fontSize: 20));
      }
    );
  }
}
```

###### 7.ListView.separated构造方法

- 创建具有分割线的Widget

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    // ListView.separated创建具有分割线的List
    return ListView.separated(
      itemCount: 100,
      itemBuilder: (BuildContext ctx, int index){
        return Text("Hello Word ${index+1}", style: TextStyle(fontSize: 20));
      }, 
      separatorBuilder: (BuildContext ctx, int index){
        // Divider是分割线的Widget,也可以用其他Widget做分割,thickness线条高度
        return Divider(color: Colors.red, thickness: 3);
      },
    );
  }
}
```

###### 8.固定区域内滚动，包裹一个Container

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    // 想让他在固定的区域内滚动则包裹一个Container
    return Container(
      height: 300,
      child: ListView.separated(
        itemCount: 100,
        itemBuilder: (BuildContext ctx, int index){
          return Text("Hello Word ${index+1}", style: TextStyle(fontSize: 20));
        }, 
        separatorBuilder: (BuildContext ctx, int index){
          // Divider是分割线的Widget,也可以用其他Widget做分割,thickness线条高度
          return Divider(color: Colors.red, thickness: 3);
        },
      ),
    );
  }
}
```

