###### 1.Row

```dart
Row和Column都继承自Flex这个Widget
    
Row和Column也有主轴和交叉轴
    
Flex组件和Row,Column属性主要的区别就是Flex多一个direction属性
    当direction的值为Axis.horizontal的时候则是Row
    当direction的值为Axis.vertical的时候，则是Column
```

###### 2.Row例子

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
    // 开发中直接使用Flex非常少，一般直接用Row或者Column
    return Row(
      // 三个Container水平排布
      children: <Widget>[
        Container(width: 80, height: 80, color: Colors.red),
        Container(width: 120, height: 60, color: Colors.blue),
        Container(width: 90, height: 70, color: Colors.black),

      ],
    );
  }
}
```

###### 2.mainAxisAlignmnet属性

- 主轴上的排列方式

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Row(
      // 主轴上的对齐方式默认是 start，起使位置开始排列
      // mainAxisAlignment: MainAxisAlignment.start,
      
      // end, 主轴结束位置开始排列
      // mainAxisAlignment: MainAxisAlignment.end,

      // center 排在中间
      // mainAxisAlignment: MainAxisAlignment.center,
      
      // spaceAround 两边间距等分
      // mainAxisAlignment: MainAxisAlignment.spaceAround,

      // 间距等分，左边元素左边没有间距，右边元素右边没有间距
      // mainAxisAlignment: MainAxisAlignment.spaceBetween,

      // 所有间距平分
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      
      children: <Widget>[
        Container(width: 80, height: 80, color: Colors.red),
        Container(width: 120, height: 60, color: Colors.blue),
        Container(width: 90, height: 70, color: Colors.black),
        Container(width: 100, height: 120, color: Colors.orange),
      ],
    );
  }
}


```

###### 3TextDirection

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Row(

      // 间距等分，左边元素左边没有间距，右边元素右边没有间距
      mainAxisAlignment: MainAxisAlignment.spaceBetween,

      // 内容从右往左排，不止是文字，一般不用这个属性
      // textDirection: TextDirection.rtl,
      
      children: <Widget>[
        Container(width: 80, height: 80, color: Colors.red),
        Container(width: 120, height: 60, color: Colors.blue),
        Container(width: 90, height: 70, color: Colors.black),
        Container(width: 100, height: 120, color: Colors.orange),
      ],
    );
  }
}
```

###### 4.mainAxisSize

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      /**
       * Row特点：水平方向尽可能占据比较大的空间，垂直方向包裹内容
       * 
       * 水平方向也是希望包裹内容，可以设置mainAxisSize=min
       * 默认值是max
       */
      child: Row(
        // 水平方向不是占据一行，而是包裹内容
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Icon(Icons.bug_report),
          Text('Bug报告')
        ],
      ),
      onPressed: (){
        print("RaiseButton");
      }
    );
  }
}
```

###### 5. crossAxisAlignment交叉轴上对齐方式

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Row(
      // 主轴剩余空间分配
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      // mainAxisSize默认值是Max 
      mainAxisSize: MainAxisSize.max,

      // 交叉轴上 start位置对齐
      // crossAxisAlignment: CrossAxisAlignment.start,
      
      // 交叉轴结束位置对齐
      // crossAxisAlignment: CrossAxisAlignment.end,

      // 交叉轴中心点对齐
      // crossAxisAlignment: CrossAxisAlignment.center,

      // 基线对齐，y有文本的时候才有效果
      // 基线对齐要先设置基线，有两个枚举值，选哪个都一样
      // crossAxisAlignment: CrossAxisAlignment.baseline,
      // textBaseline: TextBaseline.alphabetic,

      // 将子Widget交叉轴的高度，拉伸至最大
      // 先将Row拉伸至最大，子元素再拉伸
      crossAxisAlignment: CrossAxisAlignment.stretch,
      
      children: <Widget>[
        Container(width: 80, height: 80, color: Colors.red),
        Container(width: 120, height: 60, color: Colors.blue),
        Container(width: 90, height: 70, color: Colors.black),
        Container(width: 100, height: 120, color: Colors.orange),
      ],
    );
  }
}

```

###### 6.verticalDirection

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Column(
    
      // 当父元素为Column时，子元素的主轴排列顺序
      verticalDirection: VerticalDirection.up,
    
      children: <Widget>[
        Container(width: 80, height: 80, color: Colors.red),
        Container(width: 120, height: 60, color: Colors.blue),
        Container(width: 90, height: 70, color: Colors.black),
        Container(width: 100, height: 120, color: Colors.orange),
      ],
    );
  }
}
```

###### 7.Column

```dart
Column和Row属性类似,只有两个区分
    row  => textDirection: TextDirection.rtl,
    column => verticalDirection: VerticalDirection.up,
```

###### 8.分配剩余空间给子元素

- 包裹Flexible设置fit属性

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.center,
      // 剩余空间分配给元素，需要使用Flexible
      children: <Widget>[
        Flexible(
          // fit: FlexFit.tight会将剩余空间分配给子元素
          fit: FlexFit.tight,
          child: Container(width: 80, height: 80, color: Colors.red)
        ),
        Flexible(
          fit: FlexFit.tight,
          child: Container(width: 120, height: 60, color: Colors.blue)
        ),
        Flexible(
          fit: FlexFit.tight,
          child: Container(width: 90, height: 70, color: Colors.black)
        )
      ],
    );
  }
}
```

###### 9.剩余空间都分给第一个元素，则只第一个元素包裹Flexible

- 并设置fit属性

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.center,
      // 剩余空间分配给元素，需要使用Flexible
      children: <Widget>[
        Flexible(
          // fit: FlexFit.tight会将剩余空间分配给子元素
          fit: FlexFit.tight,
          child: Container(width: 80, height: 80, color: Colors.red)
        ),
        Container(width: 120, height: 60, color: Colors.blue),
        Container(width: 90, height: 70, color: Colors.black)
      ],
    );
  }
}
```

###### 10.fit默认值

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.center,
      // 剩余空间分配给元素，需要使用Flexible
      children: <Widget>[
        Flexible(
          // fit: FlexFit.tight会将剩余空间分配给子元素
          fit: FlexFit.tight,
          child: Container(width: 80, height: 80, color: Colors.red)
        ),
        Flexible(
          // 默认值是loose,会预留给这个flex一定的空白空间
          fit: FlexFit.loose,
          child: Container(width: 120, height: 60, color: Colors.blue)
        ),
        Flexible(
          // 默认值是loose,会预留给这个Flex一定的空白空间
          // 不写默认值是loose
          child: Container(width: 90, height: 70, color: Colors.black)
        )
      ],
    );
  }
}

// ===================== 华丽的分割线 ===========================

// 如果其他子元素没有包裹Flexible，则这个Flexible直接占满剩余空间
return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.center,
      // 剩余空间分配给元素，需要使用Flexible
      children: <Widget>[
        Flexible(
          // fit: FlexFit.tight会将剩余空间分配给子元素
          fit: FlexFit.tight,
          child: Container(width: 80, height: 80, color: Colors.red)
        ),
	   // 其他子元素没有包裹Flexible，则剩余空间会全部分配给上面的Flexible
        child: Container(width: 120, height: 60, color: Colors.blue)
        child: Container(width: 90, height: 70, color: Colors.black)

      ],
    );
  }
}
```

###### 11.flex属性

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.center,
      // 剩余空间分配给元素，需要使用Flexible
      children: <Widget>[
        // 三个加flex属性，直接无视掉width,每个元素占父元素的1份 2份 3份
        // flex: 1
        // flex: 2
        // flex: 3
        
        Flexible(
          // fit: FlexFit.tight会将剩余空间分配给子元素
          fit: FlexFit.tight,
          flex: 1,
          child: Container(width: 100, height: 80, color: Colors.red)
        ),
        Flexible(
          fit: FlexFit.tight,
          flex: 2,
          child: Container(width: 100, height: 60, color: Colors.blue)
        ),
        Flexible(
          fit: FlexFit.tight,
          flex: 3,
          child: Container(width: 100, height: 70, color: Colors.black)
        )
      ],
    );
  }
}
```

###### 12.开发中一般使用Expanded

- Expanded相当于是Fleible这个Widget设置了FlexFit.tight

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.center,
      // 剩余空间分配给元素，使用Expanded
      children: <Widget>[        
        Expanded(
          child:Container(width: 100, height: 80, color: Colors.red)
        ), 
        Expanded(
          child: Container(width: 100, height: 60, color: Colors.blue)
        ),
        Expanded(
          child: Container(width: 100, height: 70, color: Colors.black)
        )
      ],
    );
  }
}
```

###### 13.超出Row可用空间收缩，使用Expanded

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.center,
      // 超出Row可用空间收缩，使用Expanded
      children: <Widget>[        
        Expanded(
          child:Container(width: 300, height: 80, color: Colors.red)
        ), 
        Expanded(
          child: Container(width: 200, height: 60, color: Colors.blue)
        ),
        Expanded(
          child: Container(width: 100, height: 70, color: Colors.black)
        )
      ],
    );
  }
}
```

###### 14.Expanded可以写flex属性

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      crossAxisAlignment: CrossAxisAlignment.center,
      // 超出Row可用空间收缩，使用Expanded, 可以写Flex属性
      // 写Flex则按父元素宽度，直接比例给每个元素
      // 即 Row宽度 * 1/5, Row宽度 * 2/5, Row宽度 * 3/5
      // 貌似跟width就无关了
      children: <Widget>[        
        Expanded(
          flex: 1,
          child:Container(width: 300, height: 80, color: Colors.red)
        ), 
        Expanded(
          flex: 2,
          child: Container(width: 200, height: 60, color: Colors.blue)
        ),
        Expanded(
          flex: 3,
          child: Container(width: 100, height: 70, color: Colors.black)
        )
      ],
    );
  }
}
```

