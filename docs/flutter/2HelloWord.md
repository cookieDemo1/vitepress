###### 1.HelloWord的demo  

lib/main.dart

```jsx
import 'package:flutter/material.dart';
// dart中main函数是入口
main(List<String> args) {
  // 1.runApp函数，需要传递一个widget
  // 在flutter里面，万物皆为widget,Text是widget的子类
  // Text()不是调用函数，而是创建Text实例，dart中new可以省略
  // Text必选穿一个命名参数,textDirection(文本方向)否则会报错
  runApp(Text(
    'Hello word',
    textDirection: TextDirection.ltr,
  ));
}
```

###### 2.HelloWrod进阶

```jsx
import 'package:flutter/material.dart';

// dart中main函数是入口
main(List<String> args) {
  // 修改之后想要看到效果，需要R(HotRestart)
  // 而不能使用r(HotReload)，HotReload只会执行build方法里面的代码
  runApp(Text(
    'Hello word',
    textDirection: TextDirection.ltr,
    // style设置字体的颜色和大小
    style: TextStyle(color: Colors.deepPurple, fontSize: 30),
  ));
}

```

###### 3.文字垂直水平居中

```jsx
import 'package:flutter/material.dart';

// dart中main函数是入口
main(List<String> args) {
  // 垂直水平居中，需要在外面在加一个Center的widget
  // Center有一个child具名参数
  runApp(Center(
    child: Text(
        'Hello word',
        textDirection: TextDirection.ltr,
        // style设置字体的颜色和大小
        style: TextStyle(color: Colors.deepPurple, fontSize: 30),
      )
  	)
  );
}

```

###### 4.包裹MaterialApp

```jsx
import 'package:flutter/material.dart';


main(List<String> args) {
  // 使用Material风格
  // MaterialApp保持让我们的App都是Materil风格的
  runApp(MaterialApp(
    home: Center(
      child: Text(
        'Hello word',
          // Material风格有自动的排版，有文字的对齐方式，所以这里不需要加
          // textDirection: TextDirection.ltr,
          style: TextStyle(color: Colors.deepPurple, fontSize: 30),
        )
      )
    )
  );
}

```

###### 5.包裹Scaffold

```jsx
import 'package:flutter/material.dart';

main(List<String> args) {
  // 使用Material风格
  // MaterialApp保持让我们的App都是Materil风格的
  runApp(MaterialApp(
    // 在MaterialApp里面嵌套Scaffold(脚手架，用来创建项目的答题布局)
    // Scaffold需要appBar(appBar可以不传)和body两个参数
    home: Scaffold(
      appBar: null,
      body: Center(
        child: Text(
          'Hello word',
            // Material风格有自动的排版，有文字的对齐方式，所以这里不需要加
            // textDirection: TextDirection.ltr,
            style: TextStyle(color: Colors.deepPurple, fontSize: 30),
          )
        ),
      )
    )
  );
}

```

###### 6.Scaffold中的AppBar

```jsx
import 'package:flutter/material.dart';

main(List<String> args) {
  runApp(MaterialApp(
    // Scaffold需要appBar和body两个参数
    home: Scaffold(
      // appBar需要传递一个AppBar或者TopBar
      appBar: AppBar(title: Text('第一个Flutter程序'),),
      body: Center(
        child: Text(
          'Hello word',
            // Material风格有自动的排版，有文字的对齐方式，所以这里不需要加
            // textDirection: TextDirection.ltr,
            style: TextStyle(color: Colors.deepPurple, fontSize: 30),
          )
        ),
      )
    )
  );
}

```

###### 6.AppBar中的文字居中

```jsx
import 'package:flutter/material.dart';


main(List<String> args) {

  runApp(MaterialApp(
    home: Scaffold(
      // appBar需要传递一个AppBar
      // AppBar居中需要包裹一个Center的widget
      appBar: AppBar(title: 
        Center(
          child: Text('第一个Flutter程序')
        )
      ),
      body: Center(
        child: Text(
          'Hello word',
            style: TextStyle(color: Colors.deepPurple, fontSize: 30),
          )
        ),
      )
    )
  );
}

```

###### 7.重构(将runApp里面的代码抽取到自定义的Widget中)

```jsx
import 'package:flutter/material.dart';

// 此时main函数只有一行，写成箭头函数
main() => runApp(QHomePage());

/**
 * flutter中widget分为两种
 *    有状态的widget(StatefulWidget), 有状态(data)需要改变
 *    无状态的widget(StatelessWidget), 没有状态(data)需要改变
 * 创建Widget的时候最好先确定这是不是一个有状态的widget
 */

// 将上面嵌套的代码抽取出来
// 因为runApp必须传递一个Widget,所以继承Widget(可以选择继承有状态的Widget或无状态的Widget)
// 继承自无状态的Widget,那么这个Widget组件的数据是写死的，或者通过父组件传递过来的
class QHomePage extends StatelessWidget{
  // 继承StatelessWidget需要重写build抽象方法
  // build函数返回什么就代表这个自定义的Widget渲染什么
  @override
  Widget build(BuildContext context) {  
    return MaterialApp(
    // 在MaterialApp里面嵌套Scaffold(脚手架，用来创建项目的答题布局)
    // Scaffold需要appBar和body两个参数
    home: Scaffold(
      // appBar需要传递一个AppBar
      // AppBar居中需要包裹一个Center的widget
      appBar: AppBar(title: 
        Center(
          child: Text('第一个Flutter程序')
        )
      ),
      body: Center(
        child: Text(
          'Hello word',
            // Material风格有自动的排版，有文字的对齐方式，所以这里不需要加
            // textDirection: TextDirection.ltr,
            style: TextStyle(color: Colors.blue, fontSize: 30),
          )
        ),
      )
    );
  }
}


```

###### 8.继续将home对应的widget拆分

```jsx
import 'package:flutter/material.dart';

// 此时main函数只有一行，写成箭头函数
main() => runApp(MyApp());


/**
 * flutter中widget分为两种
 *    有状态的widget(StatefulWidget), 有状态(data)需要改变
 *    无状态的widget(StatelessWidget), 没有状态(data)需要改变
 * 创建Widget的时候最好先确定这是不是一个有状态的widget
 */

// 将上面嵌套的代码抽取出来
// 因为runApp必须传递一个Widget,所以继承Widget(可以选择继承有状态的Widget或无状态的Widget)
// 继承自无状态的Widget,那么这个Widget组件的数据是写死的，或者通过父组件传递过来的
class MyApp extends StatelessWidget{
  // 继承StatelessWidget需要重写build抽象方法
  // build函数返回什么就代表这个自定义的Widget渲染什么
  @override
  Widget build(BuildContext context) {  
    return MaterialApp(
    // 在MaterialApp里面嵌套Scaffold(脚手架，用来创建项目的答题布局)
    // Scaffold需要appBar和body两个参数
    home: QHomePage()
    );
  }
}

// Widget可以继续拆分
class QHomePage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar需要传递一个AppBar
      // AppBar居中需要包裹一个Center的widget
      appBar: AppBar(title: 
        Center(
          child: Text('第一个Flutter程序')
        )
      ),
      body: Center(
        child: Text(
          'Hello word',
            // Material风格有自动的排版，有文字的对齐方式，所以这里不需要加
            // textDirection: TextDirection.ltr,
            style: TextStyle(color: Colors.blue, fontSize: 30),
          )
        ),
      );
  }
}

```

###### 8.继续拆分

```jsx
import 'package:flutter/material.dart';

// 此时main函数只有一行，写成箭头函数
main() => runApp(MyApp());


/**
 * flutter中widget分为两种
 *    有状态的widget(StatefulWidget), 有状态(data)需要改变
 *    无状态的widget(StatelessWidget), 没有状态(data)需要改变
 * 创建Widget的时候最好先确定这是不是一个有状态的widget
 */

// 将上面嵌套的代码抽取出来
// 因为runApp必须传递一个Widget,所以继承Widget(可以选择继承有状态的Widget或无状态的Widget)
// 继承自无状态的Widget,那么这个Widget组件的数据是写死的，或者通过父组件传递过来的
class MyApp extends StatelessWidget{
  // 继承StatelessWidget需要重写build抽象方法
  // build函数返回什么就代表这个自定义的Widget渲染什么
  @override
  Widget build(BuildContext context) {  
    return MaterialApp(
    // 在MaterialApp里面嵌套Scaffold(脚手架，用来创建项目的答题布局)
    // Scaffold需要appBar和body两个参数
    home: QHomePage()
    );
  }
}

// Widget可以继续拆分
class QHomePage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar需要传递一个AppBar
      // AppBar居中需要包裹一个Center的widget
      appBar: AppBar(title: 
        Center(
          child: Text('第一个Flutter程序')
        )
      ),
      body: QContentPage()
      );
  }
}

// Home继续拆分Content
class QContentPage extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return Center(
    child: Text(
      'Hello word',
        // Material风格有自动的排版，有文字的对齐方式，所以这里不需要加
        // textDirection: TextDirection.ltr,
        style: TextStyle(color: Colors.blue, fontSize: 30),
      )
    );
  }
}
```

###### 9.继承自StatelessWidget的注意事项

```dart
class QContentPage extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    // 因为继承自StatelessWidget代表是一个无状态的Widget,所以这里面定义的变量必须是final类型的 
    final flag = true;
    return Center(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text("同意协议"),
          Checkbox(value: flag, onChanged: (value) => print(value))
        ],
      ),
    );
  }
}
```

###### 10.StatefulWidget的基本使用

```jsx
import 'package:flutter/material.dart';

// 此时main函数只有一行，写成箭头函数
main() => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context) {  
    return MaterialApp(
    home: QHomePage()
    );
  }
}

class QHomePage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: 
        Center(
          child: Text('第一个Flutter程序')
        )
      ),
      body: QContentPage()
      );
  }
}

// 这里有一个checkbox框，它对应的值是可以改变的
// 因为StatelessWidget是无状态的，所以需要继承自StatefulWidget
// 在flutter开发中，所有的Widget都不能定义状态
// State中才能指定状态，StatefullWidget需要实现createState方法，里面可以返回一个State保存状态
class QContentPage extends StatefulWidget{
  // 继承自StatefulWidget必须要重写CreateState方法
  // 它创建一个单独的类，这个类负责维护状态，
  @override
  State<StatefulWidget> createState() {
    return QContentState();
  }
}

// 将CreateState需要返回的类抽离出来
// 指定泛型为QContentPage
// State中才能指定状态
class QContentState extends State<QContentPage>{
  // 定义CheckBox对应的状态
  var flag = true;
  @override
  Widget build(BuildContext context) {
    // 这个State里面有个this.widget代表对父Widget的引用
    print(this.widget);
    return Center(
      // 一行要放多个元素，使用Row这个Widget
      // row传递一个chidlren的具名参数，只为一个Widget数组
      // Center只知道对子Widget进行居中，而row本身就占据一行
      // 即Center组件只对Row进行居中，并不对Row里面的子元素进行居中
      // Row使用类似于flex进行布局
      child: Row(
        // mainAxisAlignment row在主轴上的对齐方式 
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Text("同意协议"),
          // 当没有冲突时，this.flag可以直接写成flag
          Checkbox(
            value: flag,
            onChanged: (value) {
              // 不能直接修改flag值，需要通过setState修改，和react类似
              print(value);
              setState(() { 
                flag = value;
              });
            }
          )
        ],
      ),
    );
  }
}

```



###### build方法解析

```jsx
Flutter在拿到我们自己创建的StatelessWidget(无状态Widget)时，就会执行它的build方法

我们需要在build方法中告诉Flutter,我们的Widget希望渲染什么元素，比如一个TextWidget

StatelessWidget没办法主动去执行build方法，当我们使用的数据改变时，build方法会被重新执行
```

build方法什么情况下被执行

```jsx
1.当我们的StatelessWidget第一次插入到Widget树中时(也就是第一次被创建时)
2.当我们的父Widget发生改变时，子Widget会被重新构建
3.如果我们的Widget依赖InheritedWidget的一些数据，InheritedWidget数据发生改变时
```

