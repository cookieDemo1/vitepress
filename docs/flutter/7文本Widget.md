###### 1.Text Widget

```jsx
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

class QHomeContent extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return TextDemo();
  }
}

class TextDemo extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Text(
      // 1.data为必传参数,类型是一个字符串
      "Hello Word\n莫听传令SDFSDFSDFSDF",
      
      // 2.style为文本的样式
      style: TextStyle(
        fontSize: 30,
        color: Colors.blue,
        fontWeight: FontWeight.w900,
        // 字间距
        letterSpacing: 2,

      ),
      // 3文本居中，默认是包裹元素的宽度，所以看不出居中
      textAlign: TextAlign.center,

      // 文本最多只有一行，第一行除外的文字会隐藏
      maxLines: 1,

      // 文字超出，显示省略号
      overflow: TextOverflow.ellipsis,

      // 文本缩放，默认是1
      textScaleFactor: 1.5,

    );
  }
}
```

###### 2.Rich 富文本

```jsx
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

class QHomeContent extends StatelessWidget{
  @override
  Widget build(BuildContext context) {

    return Text.rich(
      // 如果想一行内的文字有多个颜色可以使用TextSpan
      TextSpan(
        // text: "Hello Word",
        // style: TextStyle(color: Colors.red, fontSize: 20)
        children: [
          TextSpan(text: "Hello Word", style: TextStyle(fontSize: 20, color: Colors.black45)),
          TextSpan(text: "Hello Word", style: TextStyle(fontSize: 20, color: Colors.red)),
          TextSpan(text: "Hello Word", style: TextStyle(fontSize: 20, color: Colors.blue)),
        ]
      )
    );
  }
}

```

###### 4.Rich一般用来做图文显示

```jsx
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

class QHomeContent extends StatelessWidget{
  @override
  Widget build(BuildContext context) {

    // Text.rich用来做图文显示
    return Text.rich(
      // 如果想一行内的文字有多个颜色可以使用TextSpan
      TextSpan(
        // text: "Hello Word",
        // style: TextStyle(color: Colors.red, fontSize: 20)
        children: [
          // TextSpan一般用来做一些文字的显示
          TextSpan(text: "Hello Word", style: TextStyle(fontSize: 20, color: Colors.black45)),
          // Widget可以用来做一些小图标, color指定图标的颜色
          WidgetSpan(child: Icon(Icons.favorite, color: Colors.pink,)),
          TextSpan(text: "Hello Word", style: TextStyle(fontSize: 20, color: Colors.red)),
          TextSpan(text: "Hello Word", style: TextStyle(fontSize: 20, color: Colors.blue)),
        ]
      )
    );
  }
}



class TextDemo extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Text(
      // 1.data为必传参数,类型是一个字符串
      "Hello Word\n莫听传令SDFSDFSDFSDF",
      
      // 2.style为文本的样式
      style: TextStyle(
        fontSize: 30,
        color: Colors.blue,
        fontWeight: FontWeight.w900,
        // 字间距
        letterSpacing: 2,

      ),
      // 3文本居中，默认是包裹元素的宽度，所以看不出居中
      textAlign: TextAlign.center,

      // 文本最多只有一行，第一行除外的文字会隐藏
      maxLines: 1,

      // 文字超出，显示省略号
      overflow: TextOverflow.ellipsis,

      // 文本缩放，默认是1
      textScaleFactor: 1.5,

    );
  }
}
```

