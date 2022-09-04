###### 1.计数器例子

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
      appBar: AppBar(
        title: Text('商品列表'),
      ),
      body: QHomeContent(),
    );
  }
}

// Widget不加下划线，暴露出去使用的
// StatefulWidget没有build方法，它的build方法是放到State中的
class QHomeContent extends StatefulWidget{
  @override
  State<StatefulWidget> createState() {
    return _QHomeContentState();
  }
}

/**
 * 为什么Flutter在设计的时候StatefulWidget的build方法放在State中
 *  1.build出来的Widget是需要依赖State中的变量(状态/数据)
 *  2.在Flutter的运行过程中：
 *    Widget是不断的销毁和创建的
 *    当我们自己的状态发生改变时，并并不希望重新创建一个新的State
 */

// State一般用下划线开头，因为下划线开头的变量在别的地方是不能引用的
class _QHomeContentState extends State<QHomeContent>{
  int count = 0;
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              // RaisedButton有一个必传的命名可选参数onPressed,它是一个callback函数
              // 这个函数没有参数没有返回值
              // RaisedButton的child时放按钮里面的文字或者图标之类的
              RaisedButton(
                child: Text('+', style: TextStyle(fontSize: 20, color: Colors.white),),
                color: Colors.orange,
                onPressed: (){
                  setState(() {
                    count++;
                  });
                }
              ),
              RaisedButton(
                child: Text('-', style: TextStyle(fontSize: 20, color: Colors.white),),
                color: Colors.blue,
                onPressed: () {
                  setState(() {
                    count--;
                  });
                }
              ),
            ],
          ),
          Text('当前计数: $count', style: TextStyle(fontSize: 20),)
        ],
      ),
    );
  }
}

```

###### 2.如果嵌套太深可以抽取成函数

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
      appBar: AppBar(
        title: Text('商品列表'),
      ),
      body: QHomeContent(),
    );
  }
}

// Widget不加下划线，暴露出去使用的
// StatefulWidget没有build方法，它的build方法是放到State中的
class QHomeContent extends StatefulWidget{
  @override
  State<StatefulWidget> createState() {
    return _QHomeContentState();
  }
}

/**
 * 为什么Flutter在设计的时候StatefulWidget的build方法放在State中
 *  1.build出来的Widget是需要依赖State中的变量(状态/数据)
 *  2.在Flutter的运行过程中：
 *    Widget是不断的销毁和创建的
 *    当我们自己的状态发生改变时，并并不希望重新创建一个新的State
 */

// State一般用下划线开头，因为下划线开头的变量在别的地方是不能引用的
class _QHomeContentState extends State<QHomeContent>{
  int count = 0;
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          // 将button抽取成 _getRowButtons函数
          _getRowButtons(),
          Text('当前计数: $count', style: TextStyle(fontSize: 20),)
        ],
      ),
    );
  }
  
  // 将button抽取成 _getRowButtons函数
  Widget _getRowButtons(){
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        // RaisedButton有一个必传的命名可选参数onPressed,它是一个callback函数,这个函数没有参数没有返回值
        // RaisedButton的child时放按钮里面的文字或者图标之类的
        RaisedButton(
          child: Text('+', style: TextStyle(fontSize: 20, color: Colors.white),),
          color: Colors.orange,
          onPressed: (){
            setState(() {
              count++;
            });
          }
        ),
        RaisedButton(
          child: Text('-', style: TextStyle(fontSize: 20, color: Colors.white),),
          color: Colors.blue,
          onPressed: () {
            setState(() {
              count--;
            });
          }
        ),
      ],
    );
  }

}

```

###### 3.this.widget指向父类

```dart
this.widget指向父类

// 拿到父类中的name属性
this.widget.name


// main.dart
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
      appBar: AppBar(
        title: Text('商品列表'),
      ),
      body: QHomeContent(),
    );
  }
}


class QHomeContent extends StatefulWidget{
  // 1.父widget定义一个属性
  final String message = "Hello word";
  @override
  State<StatefulWidget> createState() {
    return _QHomeContentState();
  }
}


class _QHomeContentState extends State<QHomeContent>{
  int count = 0;
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          // 将button抽取成 _getRowButtons函数
          _getRowButtons(),
          Text('当前计数: $count', style: TextStyle(fontSize: 20),),
          // 2.子widget通过this.widget.message拿到父widget中的属性,this可省略
          Text('${this.widget.message}')
        ],
      ),
    );
  }
  
  // 将button抽取成 _getRowButtons函数
  Widget _getRowButtons(){
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        RaisedButton(
          child: Text('+', style: TextStyle(fontSize: 20, color: Colors.white),),
          color: Colors.orange,
          onPressed: (){
            setState(() {
              count++;
            });
          }
        ),
        RaisedButton(
          child: Text('-', style: TextStyle(fontSize: 20, color: Colors.white),),
          color: Colors.blue,
          onPressed: () {
            setState(() {
              count--;
            });
          }
        ),
      ],
    );
  }

}

```

