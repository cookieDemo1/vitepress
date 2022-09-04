###### 1.pages/home/home.dart

- home页面将body内容抽取到home_content.dart中

```dart
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import './home_content.dart';

class QQHomePage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("首页"),
      ),
      body: QHomeContent()
    );
  }
}
```

###### 2.pages/home/home_content.dart

```dart

```

