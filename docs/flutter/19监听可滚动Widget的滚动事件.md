```dart
监听滚动有两种方式
    1.controller
        可以设置默认值offset
        可以监听滚动的位置
        不可以监听开始滚动和结束滚动
    2.NotificationListener
        可以监听开始滚动和结束滚动
```



###### 1.Controller监听滚动

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

class QHomePage extends StatefulWidget{
  @override
  State<StatefulWidget> createState() {
    return _QHomePageState();
  }
}


class _QHomePageState extends State<QHomePage>{
  // 1).创建controller
  // initialScrollOffset为初始的偏移量
  ScrollController controller = ScrollController(initialScrollOffset: 100);

  // 2).在initState生命周期中开启监听
  @override
  void initState() {
    super.initState();
    // controller调用addListener即可监听滚动
    controller.addListener(() {
      // controller.offset可以获取到偏移量
      print('监听到滚动: ${controller.offset}');
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('基础Widget'),
      ),
      body: ListView.builder(
        // 3).controller传递到ListView中
        // 不管使用ListView的哪个方法都有controller属性，进行监听
        // GridView和CustomView都有这个属性
        controller: controller,
        itemCount: 100,
        itemBuilder: (BuildContext ctx, int index){
          return ListTile(
            leading: Icon(Icons.people),
            title: Text('Concat$index'),
            subtitle: Text("联系电话：1111111111"),
          );
        }
      ),
      // 
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.arrow_upward),
        onPressed: (){
          // 4.点击按钮回到顶部,
          // controller有animateTo方法滚动到指定的位置,arg1(offset)
          controller.animateTo(0, duration: Duration(seconds: 1), curve: Curves.easeIn);
        },
      ),
    );
  }
}


```

###### 2.改进，当偏移量达到1000的时候才显示回到顶部的floatingActionButton

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

class QHomePage extends StatefulWidget{
  @override
  State<StatefulWidget> createState() {
    return _QHomePageState();
  }
}


class _QHomePageState extends State<QHomePage>{
  // 1.定义一个变量，判断是否显示回到顶部按钮
  bool isShowFloatingBtn = false;
  ScrollController controller = ScrollController(initialScrollOffset: 100);

  @override
  void initState() {
    super.initState();
    controller.addListener(() {
      print('监听到滚动: ${controller.offset}');
      // 2.监听滚动，当偏移大于1000的时候，设置为true,小于1000设置为false
      if(controller.offset > 1000){
        setState(() {
          isShowFloatingBtn = true;
        });
      }else{
        setState(() {
          isShowFloatingBtn = false;
        });
      }
    });
  }
  // 建议在dispose生命周期中取消监听
  @override
  void dispose(){
    super.dispose();
    controller.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('基础Widget'),
      ),
      body: ListView.builder(
        controller: controller,
        itemCount: 100,
        itemBuilder: (BuildContext ctx, int index){
          return ListTile(
            leading: Icon(Icons.people),
            title: Text('Concat$index'),
            subtitle: Text("联系电话：1111111111"),
          );
        }
      ),
      // 3.floatingActionButton根据isShowFloatingBtn的值判断是否显示按钮
      floatingActionButton: isShowFloatingBtn ? FloatingActionButton(
        child: Icon(Icons.arrow_upward),
        onPressed: (){
          controller.animateTo(0, duration: Duration(seconds: 1), curve: Curves.easeIn);
        },
      ): null,
    );
  }
}


```



###### =====================================================================



###### 1.Notication监听滚动

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

class QHomePage extends StatefulWidget{
  @override
  State<StatefulWidget> createState() {
    return _QHomePageState();
  }
}


class _QHomePageState extends State<QHomePage>{

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('基础Widget'),
      ),
      // 1.使用NotificationListener监听滚动，需要在外层包裹一个NotificationListener
      body: NotificationListener(
        // onNotification属性进行监听
        onNotification: (ScrollNotification notification){
          
          print('监听到滚动2');
          // 如果不希望滚动冒泡，返回一个true
          // 希望滚动冒泡返回一个false
          return true;
        },
        child: ListView.builder(
          itemCount: 100,
          itemBuilder: (BuildContext ctx, int index){
            return ListTile(
              leading: Icon(Icons.people),
              title: Text('Concat$index'),
              subtitle: Text("联系电话：1111111111"),
            );
          }
        )
      ), 
    );
  }
}


```

###### 2.Notification监听开始滚动和结束滚动

```dart
class _QHomePageState extends State<QHomePage>{
 
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('基础Widget'),
      ),
      // 1.使用NotificationListener监听滚动，需要在外层包裹一个NotificationListener
      body: NotificationListener(
        // onNotification属性进行监听
        onNotification: (ScrollNotification notification){

          // 通过判断notification的类型判断滚动开始和结束
          if(notification is ScrollStartNotification){
            print('开始滚动');
          }else if(notification is ScrollUpdateNotification){
            print("正在滚动");
          }else if(notification is ScrollEndNotification){
            print("结束滚动");
          }          

          return true;
        },
        child: ListView.builder(
          itemCount: 100,
          itemBuilder: (BuildContext ctx, int index){
            return ListTile(
              leading: Icon(Icons.people),
              title: Text('Concat$index'),
              subtitle: Text("联系电话：1111111111"),
            );
          }
        )
      ), 
    );
  }
}
```

###### 3.Notification获取滚动位置

```dart
class _QHomePageState extends State<QHomePage>{
 
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('基础Widget'),
      ),
      // 1.使用NotificationListener监听滚动，需要在外层包裹一个NotificationListener
      body: NotificationListener(
        // onNotification属性进行监听
        onNotification: (ScrollNotification notification){

          // 通过判断notification的类型判断滚动开始和结束
          if(notification is ScrollStartNotification){
            print('开始滚动');
          }else if(notification is ScrollUpdateNotification){
            print("正在滚动,当前滚动位置: ${notification.metrics.pixels}, 总滚动距离: ${notification.metrics.maxScrollExtent}");
          }else if(notification is ScrollEndNotification){
            print("结束滚动");
          }          

          return true;
        },
        child: ListView.builder(
          itemCount: 100,
          itemBuilder: (BuildContext ctx, int index){
            return ListTile(
              leading: Icon(Icons.people),
              title: Text('Concat$index'),
              subtitle: Text("联系电话：1111111111"),
            );
          }
        )
      ), 
    );
  }
}


```

