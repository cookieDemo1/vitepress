###### 1.Container大小

```jsx
// 1.默认Container根据子元素的大小决定Container的大小
// 2.设置了宽高则为设置的大小
// 3.扩展到父容器的大小，没有子Widget并且没有设置宽高的时候，就是扩展到父容器的大小
```

###### 1.有Child，根据Child决定大小

```jsx
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.orange,
      child: Icon(Icons.pets, size: 50, color: Colors.white),
    );
  }
}
```

###### 2.设置宽高，则以设置的为宽高

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.orange,
      width: 100,
      height: 100,
      // child: Text('Hello Word'),
    );
  }
}
```

###### 3.没有设置宽高，没有子Widget， 则扩展到父容器大小

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.orange,
      // child: Text('Hello Word'),
    );
  }
}
```

###### 4.默认Container里面的子Widget也是水平垂直居中的

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Container(
      // 即默认的alignment的值是center
      // 不设置alignment，图标会居中，文本不会
      alignment: Alignment.center,
      width: 500,
      height: 500,
      color: Colors.orange,
      child: Icon(Icons.pets, size: 50, color: Colors.white),
    );
  }
}

```

###### 5.Container常用属性

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Container(
      // (-1,-1)子元素在左上角
      alignment: Alignment(-1, -1),
      
      // padding: 20,内边距会算在宽度之内
      padding: EdgeInsets.all(20),

      // margin: 20, 外边距(外边距不会算在元素尺寸里面)
      margin: EdgeInsets.all(20),

      // width和height是double类型
      width: 500,
      height: 500,

      color: Colors.orange,
      child: Icon(Icons.pets, size: 50, color: Colors.white),
    );
  }
}

```

###### 6.Container其他属性

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Container(
      // (-1,-1)子元素在左上角
      alignment: Alignment(-1, -1),
      
      // padding: 20,内边距会算在宽度之内
      padding: EdgeInsets.all(20),

      // margin: 20, 外边距(外边距不会算在元素尺寸里面)
      margin: EdgeInsets.all(20),

      // width和height是double类型
      width: 200,
      height: 200,

      // transform用来做形变
      transform: Matrix4.rotationZ(100),

      // decoration给我们的Container做修饰的, color属性和decoration是冲突的，它们
      // 只能提供其中一个值
      decoration: BoxDecoration(
        color: Colors.orange,
        // 边框
        border: Border.all(
          width: 5,
          color: Colors.yellow
        ),
        // 圆角
        borderRadius: BorderRadius.circular(10),

        // 阴影,boxShadow需要传递一个数组,可以给多个阴影
        boxShadow: [
          // color:阴影颜色， offset：x和y轴的便宜， spreadRadius延伸， blurRadius模糊10
          BoxShadow(color: Colors.red, offset: Offset(10, 10), spreadRadius: 5, blurRadius: 10),
          BoxShadow(color: Colors.red, offset: Offset(-10, -10), spreadRadius: 5, blurRadius: 10),

        ]
      ),

      // color: Colors.orange,
      child: Icon(Icons.pets, size: 50, color: Colors.white),
    );
  }
}
```

