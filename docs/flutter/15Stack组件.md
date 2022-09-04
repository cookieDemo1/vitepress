###### 1.Stack组件

```dart
Flutter中默认不会出现元素和元素的重叠的，而Stack可以实现层叠布局。
```

###### 1.Statck组件基础使用

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    // Stack默认的大小是包裹内容的
    return Stack(
      // 默认按照子元素的顺序进行层叠，先写的在下方，后写的在上面
      
      // alignment从什么位置开始排列子元素，默认是左上角
      // center为中间，即水平和垂直的交叉点
      // alignment: AlignmentDirectional.center,
      alignment: AlignmentDirectional.center,


      // fit: StackFit.expand,将子元素拉伸到仅可能大
      fit: StackFit.expand,
      children: <Widget>[
        Container(width: 150, height: 150, color: Colors.blue),
        Image.asset('assets/img/1.jpg'),
        Text('进击的巨人')
      ],
    );
  }
}
```

##### 2.Stack包裹Container显示拉伸的大小

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Container(
      // 使用Container限制Stack使用StatkFit.expand时拉伸的大小
      width: 400,
      height: 400,
    // Stack默认的大小是包裹内容的
      child: Stack(
        alignment: AlignmentDirectional.center,
        // fit: StackFit.expand,将子元素拉伸到仅可能大
        fit: StackFit.expand,
        children: <Widget>[
          Container(width: 150, height: 150, color: Colors.blue),
          Image.asset('assets/img/1.jpg'),
          Text('进击的巨人')
        ],
      ),
    ); 
    
  }
}
```

###### 3.Positioned进行定位

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: AlignmentDirectional.bottomStart,
      // fit属性很少用
      // fit: StackFit.expand,
      children: <Widget>[
        Image.asset('assets/img/1.jpg'),
        Container(width: 150, height: 150, color: Colors.blue),
        // Positioned基于父元素定位，right:0代表距离右边0，即元素显示在右侧
        Positioned(
          right: 0,
          top: 0,
          child: Text('进击的巨人', style: TextStyle(color: Colors.pinkAccent),)
        ) 
      ],
    );
  }
}
```

###### 4.overflow属性

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: AlignmentDirectional.bottomStart,

      // overflow: Overflow.visible 元素超出父元素，显示
      // overflow: Overflow.clip    默认值时clip，超出裁剪
      overflow: Overflow.visible,
      children: <Widget>[
        Image.asset('assets/img/1.jpg'),

        Positioned(
          // bottom负数则元素的位置会超出父元素
          bottom: -30,
          child: Container(width: 150, height: 150, color: Colors.blue)
        ),
        
        Positioned(
          right: 0,
          top: 0,
          child: Text('进击的巨人', style: TextStyle(color: Colors.pinkAccent),)
        ) 
      ],
    );
  }
}
```

###### 5.Stack例子

```dart
class _QHomeContentState extends State<QHomeContent>{
  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: AlignmentDirectional.bottomStart,
      children: <Widget>[
        Image.asset('assets/img/1.jpg'),

        // 文字在图片的下方，并且居中
        Container(
          // 宽度设置无限的，则占满父元素宽度
          width: double.infinity,
          // alpha(透明度)的值是一个0-255的值
          color: Color.fromARGB(100, 0 , 0, 0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text('进击的巨人真不错', style: TextStyle(color: Colors.white))
            ],
          )
        )
      ],
    );
  }
}
```

###### 6.Stack例子2

```dart
class _QHomeContentState extends State<QHomeContent>{
  // 1.先定义color
  var color = Colors.white;
  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: AlignmentDirectional.bottomStart,
      children: <Widget>[
        Image.asset('assets/img/1.jpg'),
        Container(
          width: double.infinity,
          color: Color.fromARGB(100, 0 , 0, 0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text('进击的巨人真不错', style: TextStyle(color: color)),
             
              IconButton(
                // 2.图标颜色使用变量color
                icon: Icon(Icons.favorite, color: color),
                // 3.点击Icon修改Icon的颜色, IconButton有onPressed属性
                onPressed: () {
                  setState(() {
                    color = Colors.red;
                  });
                },
              )
            ],
          )
        )
      ],
    );
  }
}
```

