###### 1.商品列表例子

```dart
import 'package:flutter/material.dart';

main() => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: QHomePage(),
    );
  }
}

class QHomePage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('商品列表')),
      body: QHomeContent(),
    );
  }
}

class QHomeContent extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    // 将Column替换成ListView，否则会超出布局边界，即不可滚动，但是元素又超出了屏幕
    // 替换成ListView可滚动
    return ListView(
      children: <Widget>[
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
      ],
    );
  }
}

// 这是一个商品列表的Widget,使用这个Widget需要传递三个参数
// title, desc, imageURL,因为StatelessWidget是不可变的所以这三个参数是final类型的
class QHomeProductItem extends StatelessWidget{
  final String title;
  final String desc;
  final String imageURL;

  // 构造函数，给上面的常量赋值
  QHomeProductItem(this.title, this.desc, this.imageURL);

  // 将标题和描述对应的style抽取出来
  final style1 = TextStyle(fontSize: 25, color: Colors.blue);
  final style2 = TextStyle(fontSize: 20);

  @override
  Widget build(BuildContext context) {
    // 将标题和描述对应的style抽取出来
    // 建议抽取到build函数外面，否则每次重新执行build都会创建这两个常量
    // final style1 = TextStyle(fontSize: 25, color: Colors.blue);
    // final style2 = TextStyle(fontSize: 20);
    
    // Column做垂直布局的Widget
    return Column(
      children: <Widget>[
        Text(title, style: style1),
        // 间距需要用新的Widget来做
        // 间距可以用SizeBox控制，如果想垂直的间距就传递height具名参数
        SizedBox(height: 8),
        Text(desc, style: style2,),
        SizedBox(height: 8),
        // Image.network()是异步加载图片的，有专门的IO线程
        Image.network(imageURL)
      ],
    );
  }

}

```

###### 2.商品列表改进，增加边距

```dart
import 'package:flutter/material.dart';

main() => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: QHomePage(),
    );
  }
}

class QHomePage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('商品列表')),
      body: QHomeContent(),
    );
  }
}

class QHomeContent extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
        SizedBox(height: 6),
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
        SizedBox(height: 6),
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
        SizedBox(height: 6),
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
      ],
    );
  }
}

class QHomeProductItem extends StatelessWidget{
  final String title;
  final String desc;
  final String imageURL;

  QHomeProductItem(this.title, this.desc, this.imageURL);

  final style1 = TextStyle(fontSize: 25, color: Colors.blue);
  final style2 = TextStyle(fontSize: 20);

  @override
  Widget build(BuildContext context) {
    // 加边框使用Container Widget包裹
    // Container中child放子widget, decoration放一些装饰，例如边框等
    return Container(
      // padding内边距
      padding: EdgeInsets.all(8),
      decoration: BoxDecoration(
        // 边框
        border: Border.all(
          // 边框宽度
          width: 5,
          // 边框颜色
          color: Colors.black
        )
      ),
      child: Column(
        children: <Widget>[
          Text(title, style: style1),
          SizedBox(height: 8),
          Text(desc, style: style2,),
          SizedBox(height: 8),
          // Image.network()是异步加载图片的，有专门的IO线程
          Image.network(imageURL)
        ],
      )
    );
  }
}

```

###### 3.Column的交叉轴上的对齐方式

```dart
import 'package:flutter/material.dart';

main() => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: QHomePage(),
    );
  }
}

class QHomePage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('商品列表')),
      body: QHomeContent(),
    );
  }
}

class QHomeContent extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
        SizedBox(height: 6),
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
        SizedBox(height: 6),
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
        SizedBox(height: 6),
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
      ],
    );
  }
}

class QHomeProductItem extends StatelessWidget{
  final String title;
  final String desc;
  final String imageURL;

  QHomeProductItem(this.title, this.desc, this.imageURL);

  final style1 = TextStyle(fontSize: 25, color: Colors.blue);
  final style2 = TextStyle(fontSize: 20);

  @override
  Widget build(BuildContext context) {
    // 加边框使用Container Widget包裹,Container相当于div
    // Container中child放子widget, decoration放一些装饰，例如边框等
    return Container(
      padding: EdgeInsets.all(8),
      decoration: BoxDecoration(
        border: Border.all(
          width: 5,
          color: Colors.black
        )
      ),
      // 默认Column里面的元素水平方向是居中对齐的，因为Column就相当于flex布局
      // 主轴上是上下排布的，但交叉轴上是水平对齐的，所以要设置坐对齐，要设置交叉轴
      child: Column(
        // 交叉轴设置成start就是从左对齐
        crossAxisAlignment: CrossAxisAlignment.start,
        // 也可以设置主轴的一些位置
        // mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Text(title, style: style1),
          SizedBox(height: 8),
          Text(desc, style: style2,),
          SizedBox(height: 8),
          Image.network(imageURL)
        ],
      )
    );
  }
}

```

###### 4.Column和Row的区别

```jsx
对于Column来说，纵轴是主轴
对于Row来说，横轴是主轴
```

###### 5.使用Row只让标题左对齐

```jsx
import 'package:flutter/material.dart';

main() => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: QHomePage(),
    );
  }
}

class QHomePage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('商品列表')),
      body: QHomeContent(),
    );
  }
}

class QHomeContent extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
        SizedBox(height: 6),
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
        SizedBox(height: 6),
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
        SizedBox(height: 6),
        QHomeProductItem('Apple', 'App Store', 'https://img2.baidu.com/it/u=687165824,30436929&fm=26&fmt=auto&gp=0.jpg'),
      ],
    );
  }
}

class QHomeProductItem extends StatelessWidget{
  final String title;
  final String desc;
  final String imageURL;

  QHomeProductItem(this.title, this.desc, this.imageURL);

  final style1 = TextStyle(fontSize: 25, color: Colors.blue);
  final style2 = TextStyle(fontSize: 20);

  @override
  Widget build(BuildContext context) {
    // 加边框使用Container Widget包裹,Container相当于div
    // Container中child放子widget, decoration放一些装饰，例如边框等
    return Container(
      // padding内边距
      padding: EdgeInsets.all(8),
      decoration: BoxDecoration(
        // 边框
        border: Border.all(
          // 边框宽度
          width: 5,
          // 边框颜色
          color: Colors.black
        )
      ),
      // 默认Column里面的元素水平方向是居中对齐的，因为Column就相当于flex布局
      // 主轴上是上下排布的，但交叉轴上是水平对齐的，所以要设置坐对齐，要设置交叉轴
      child: Column(
        children: <Widget>[
          // Text外层包裹一个Row,只让Text靠左对齐
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Text(title, style: style1),
            ],
          ),
          
          SizedBox(height: 8),
          Text(desc, style: style2,),
          SizedBox(height: 8),
          // Image.network()是异步加载图片的，有专门的IO线程
          Image.network(imageURL)
        ],
      )
    );
  }
}
```

