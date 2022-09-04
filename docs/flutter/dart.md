### Dart

##### 1.安装

- 默认情况下所有的类都继承自object

```dart
// 1.下载后解压，配置环境变量
https://flutter.dev/docs/get-started/install/windows

// 2.环境变量的配置，配置到path里面
D:\SoftWare\flutter\bin
D:\SoftWare\flutter\bin\cache\dart-sdk\bin

// 3.检查配置,cmd
flutter --version
dart --version
    
// 4.vscode安装插件,搜索这两个插件并安装
dart
flutter
Code Runner						// 可以快速执行代码，不用命令行,即右键运行
```

##### 2.dart语法

- dart中没有关键字接口，默认情况下所有的class都是隐式接口

```dart
// 1.main函数
main(List<String> args) {
  print("hello word");
}

// 2.变量声明
main(List<String> args) {
  // 1.明确的声明
  String name = "why";

  // 2.类型推导（var/final/const）
  var age = 20;

  // 3.final声明常量
  final height = 1.88;

  // 4.const声明常量
  const address = "北京市";

  // final和const的区别(开发中final用的相对多一点)
  // const必须赋常量值(编译期间需要一个确定的值)
  // final可以通过计算/函数获取一个值(运行期间来确定一个值)
  final date = DateTime.now();
  print(date);

  // 创建对象可以不使用new
  final person1 = Person("dart");
}

// 定义类
class Person{
  String name;
  // 类中的构造函数
  Person(String name){
    this.name = name;
  }
}
```

##### 5.const创建类

```dart
// 定义类
class Person{
  final String name;
  // 类中的构造函数
  const Person(this.name);
}

// 创建对象,创建常量对象是使用const，而不是用new, 2.0版本以后，const可以省略
// const创建对象，传入的参数如果一样，那么它们是同一个对象
const person1 = Person("why");
const person2 = const Person("why")
```

##### 6.dart没有非零即真

```dart
// dart没有非零即真和非空即真，if中只能传true或者false
main(List<String> args) {
    var flag = true;
    if(flag){
        print("dart没有非零即真，非空即真")
    }
}

```

##### 7.字符串

```dart
main(List<String> args) {
  // 1.定义字符串类型,单引号，双引号，三引号都行(三引号可以进行分行)
  var str1 = 'abc';
  var str2 = "nice";
  var str3 = ''' word ''';

  // 2.字符串和表达式进行拼接
  var name = "why";
  var age = 19;
  var height = 1.88;

  // 字符串拼接用${},如果${}里面是变量{}可以省略
  var message = "my name is ${name}, age is $age, height=${height}";
  print(message);

  // runtimeType可以获取数据的类型，如果${}里面是表达式，则不可用省略
  var message2 = "name type is ${name.runtimeType}";
  print(message2);
}
```

##### 8.集合类型

- 列表List	集合Set	映射Map

```dart
main(List<String> args) {
  // 1.列表
  var names = ["nice","hadoop","spark"];
  names.add("hello");
  names.remove("nice");

  // 2.集合(集合用的最多的，就是去除数组中重复的元素)
  var movies = {"星际穿越","流浪地球"};
  // 去除集合中重复的元素，Set.from()接收一个可迭代对象
  var names2 = Set<String>.from(names).toList();

  // 3.映射,key必须是hash的，不可以根js一样直接name=""
  var info = {"name":"hadoop","age":12};
}
```

##### 9.函数的基本使用

- dart没有函数的重载!!

```dart
main(List<String> args) {
  // 使用函数
  print(sum(12, 13));
}

// 1.定义有返回值，有参数的函数
int sum(int num1, int num2){
  return num1 + num2;
}

// 2.返回值类型可以省略,根据返回类型自动判断(开发中不推荐)
sum2(num1,num2){
  return num1 + num2;
}
```

##### 10.函数的可选参数

```dart
main(List<String> args) {
  sayHello1("nice");

  // 调用位置可选参数,对位置有限定
  sayHello2("position",12);

  // 调用命名可选参数,传参数必须加上名字（对位置没有限制）
  sayHello3("why",age: 18);

}

// 1.必选参数，必须传
void sayHello1(String name){
  print(name);
}

// 可选参数: 位置可选参数，命名可选参数。

// 2.位置可选参数[int age, double heoght],可选参数可以有默认值
void sayHello2(String name, [int age = 20, double heoght]){
  print("name $name");
}

// 3.命名可选参数，可选参数可以有默认值
void sayHello3(String name,{int age = 20, double height}){
}
```

##### 11.函数是一等公民(即函数非常灵活)

```dart
// 1.函数可以作为另一个函数的参数
main(List<String> args) {
  test(bar);
}

// 此函数的参数为Function类型，即需要传递一个函数
void test(Function foo){
  foo();
}

void bar(){
  print("bar函数被调用");
}

// 2.调用的时候传递匿名函数:  (){}
 test((){
    print("我是匿名函数");
  });

// 3.传递箭头函数(前提:函数体只有一行代码)
test(()=>print("箭头函数被调用"));
```

##### 12.参数为函数，且该函数有返回值有参数时，应该这样写

```dart
// 这里为调用
main(List<String> args) {
  test((num1, num2){
    return num1 + num2;
  });
}

// 使用typedef，一定要使用typedef
typedef Calculate = int Function(int num1, int num2);
void test(Calculate cala){
  var result = cala(20,30);
  print(result);
}
```

##### 13.函数作为返回值

```dart
main(List<String> args) {
  // 调用
  var cal = demo();
  var result = cal(10,20);
  print(result);
}

// typedef
typedef Calculate = int Function(int num1, int num2);
// 要求函数必须返沪一个typedef定义的Calculate类型的函数
Calculate demo(){
  return (num1,num2){
    return num1 * num2;
  };
}
```

##### 14.赋值运算符

```dart
main(List<String> args) {
  var name = null;
  // ??=  当原来的变量有值时，这个变量不执行。
  // 如果原来的变量为空时，赋值给这个变量
  name ??= 'lilei';
  print(name);

  // ?? 前面的数据有值，则使用前面这个变量
  // ?? 前面的数据为null，则使用后面的值
  var nick = "why";
  var temp = nick ?? 'lilei';
  print(temp);
}
```

##### 15.级联运算符

```dart
main(List<String> args) {
  // 普通创建对象的使用方法
  var p1 = Person();
  p1.name = "nice";
  p1.eat();
  p1.run();

  // 级联运算符，创建对象的使用方法,即创建对象后使用..运算符
  var p2 = Person()..name="why"..eat()..run();
}

// 定义一个对象
class Person{
  String name;
  
  void run(){
    print('running');
  }

  void eat(){
    print("eatching");
  }
}
```

##### 16.两种for循环

```dart
main(List<String> args) {

  var names = ["hadoop","spark"];

  // 第一种for循环
  for(var i=0; i<10; i++){
    print(i);
  }

  for(var i=0; i<names.length; i++){
    print(names[i]);
  }

  // 第二种for循环
  for(var name in names){
    print(name);
  }
}
```

##### 17.面向对象

- dart支持函数式编程，但是大多数情况下还是面向对象开发

```dart
main(List<String> args) {
  // 实例化
  var p = Person("nice",18);
  print(p);
}

// 定义类
class Person{
  String name;
  int age;

  // 平常的构造函数
  // Person(String name, int age){
  //   this.name = name;
  //   this.age = age;
  // }

  // 构造函数的语法糖
  Person(this.name,this.age);
}
```

##### 18.类的构造函数

```dart
main(List<String> args) {
  // 命名构造函数的使用
  var p1 = Person.withNameAgeHeight("nice", 12, 178.00);
  print(p1);
  // Map命名构造函数的使用
  var p2 = Person.fromMap({'name':'nice', 'age':12, 'height':12.00});
  print(p2);
}

class Person{
  String name;
  int age;
  double height;

  // 可选参数，相当于函数的重载，但是传的时候，height必须加名字
  Person(this.name, this.age, {this.height});

  // 命名构造函数
  Person.withNameAgeHeight(this.name, this.age, this.height);

  // Map命名构造函数，dynamic代表式任意类型的
  Person.fromMap(Map<String,dynamic> map){
    this.name = map['name'];
    this.age = map['age'];
    this.height = map['height'];
  }

  // 重写toString方法
  @override
  String toString() {
    return "$name $age $height";
  }
}
```

##### 19. 类的初始化列表

```dart
main(List<String> args) {
  var p = Person("why");
}

class Person{
  // final修饰的必须初始化
  final String name;
  final int age;

  // age不可以在{}里面初始化，因为它是final类型的。但是可以:age=10，初始化列表
  Person(this.name):age =10{
      
  }
    
   // 初始化列表在这种情况的时候用得到，当age是fianl的时候，又希望它可以传值，也可以不传值
  Person(this.name,{int age}): this.age = age ?? 10{

  }
}
```

##### 20.构造函数重定向

```dart
main(List<String> args) {
  var p = Person("nice");
  print(p.age);
}

class Person{
  String name;
  int age;

  // 构造函数重定向
  // 即在初始化列表的时候，调用另一个构造函数
  Person(String name): this._internal(name,0);

  // 另外一个构造函数
  Person._internal(this.name, this.age);
}
```

##### 21.工厂构造函数

- 普通构造函数，会默认返回创建出来的对象，不能手动返回一个对象。
- 工厂构造函数，需要自己手动返回一个对象。
- 工厂构造函数最大的特点就是可以手动的返回对象，而对象来自哪里我们可以随意

```dart
main(List<String> args) {
  // 这里尽量用final
  final p1 = Person.withName("nice");
  final p2 = Person.withName("nice");
  // identical用来判断两个对象是否是同一个对象
  print(identical(p1,p2));

}

// 工厂构造函数，如果传入的color或者name相同时，返回的是同一个对象
class Person{
  String name;
  String color;

  // 先创建一个普通的构造函数
  Person(this.name,this.color);

  // static代表是类属性,创建一个Map,用来记录name的缓存
  // 当要创建对象的时候，判断缓存中有没有创建过对象,如果缓存中有直接手动的返回
  // 如果没有创建过，则手动创建并且手动返回
  static final Map<String, Person> _nameCache = {};
  static final Map<String, Person> _colorCache = {};

  // factory定义工厂构造函数，name相同，返回同一个对象的factory
  factory Person.withName(String name){
    // 判断缓存中有没有name的对象，如果有则从缓存中取出，然后返回
    if (_nameCache.containsKey(name)){
      return _nameCache[name];
    
    // 如果缓存中没有，则调用上面定义的构造函数，创建对象，并且放到缓存，然后将对象返回
    }else{
      final p = Person(name, "default");
      _nameCache[name] = p;
      return p;
    }
  }

  // color相同返回同一个对象的factory
  factory Person.withColot(String color){
    if (_colorCache.containsKey(color)){
      return _colorCache[color];
    }else{
      final p = Person("default", color);
      _colorCache[color] = p;
      return p;
    }
  }
}
```

##### 22.类的setter和getter

```dart
main(List<String> args) {

  final p = Person();
  // 这种方式，相当于直接访问我们的属性
  // p.name= "why";

  // getter和setter的使用，语法有点儿奇葩
  p.setName = "nice";
  print(p.getName);
}

class Person{
  // 没有private，public属性，顶多只能加_name,代表只能在当前包下使用
  String name;

  // setter的定义，使用set关键字(可以写成箭头函数)
  set setName(String name){
    this.name = name;
  }

  // getter的定义，使用get关键字，前面要加返回类型，没有小括号（可以写成箭头函数）
  String get getName{
    return this.name;
  }
}
```

##### 23.const构造函数

```dart
main(List<String> args) {

  // 使用const构造函数创建对象，如果传的参数一样，则返回的是同一个对象
  const p1 = Person('why');
  const p2 = Person('why');
  print(identical(p1,p2));

}

class Person{
  final String name;
  final String color = 'red';

  const Person(this.name);
}
```

##### 24.类的继承

```dart
main(List<String> args) {
  Person("nice",12);
}

// 父类
class Animal{
  int age;
  Animal(this.age);
}

// 子类，通过extends继承
class Person extends Animal{
  String name;
  // 在构造函数的初始化列表种需要调用父类的构造函数，使用super()
  Person(this.name, int age): super(age);
}
```

##### 25.抽象类

- 抽象类可以通过工厂构造函数返回实例，但是不能返回自身的类所创建的对象，可以返回子类
- Map和List就是这样的
- external关键字的作用：将方法的声明和方法的实现分离。方法的实现通过@patch注解，实现
- 即@patch主要是为了实现抽象类中的方法

```dart
main(List<String> args) {
  
}

// 1.定义抽象类
// 抽象类不能实例化，只有函数的声明。方法也可以有方法体(有方法以的方法，不是抽象方法，子类可以不实现)
abstract class Shape{
  double getArea();
  // 有方法体的不是抽象方法
  String getInfo(){
    return "shape";
  }
}

// 2.使用抽象类
// 注意1:实现抽象类，必须实现其中的抽象方法，
class Rectangle extends Shape{
  // 实现抽象方法
  @override
  double getArea() {
    return 12.00;
  }
}
```

##### 26.隐式接口

```dart
main(List<String> args) {
  
}

// Dart中，没有关键字来定义接口
// 默认情况下，所有的类都是隐式接口
class Runner{
  void running(){

  }
}

class Flyer{
  void flying(){

  }
}

// Dart只有单继承，所以可以通过实现接口的方式，实现上面那两个类
// 当将一个类当作接口使用时，必须实现这个接口中的所有方法。
class SuperMan implements Runner,Flyer{
  @override
  void flying() {
  }

  @override
  void running() {
  }

}
```

##### 27.Mixin混入的使用

```dart
main(List<String> args) {
  final sm = SuperMan();
  sm.running();
  sm.flying();
  
}

// 定义可混入的类不能使用class,使用mixin定义，使用with进行混入
mixin Runner{
  void running(){
    print("running");
  }
}

mixin Flyer{
  void flying(){
    print("flying");
  }
}

// 使用with进行混入,混入相当于继承两个类，里面的方法都有，且不用重新实现
class SuperMan with Runner,Flyer{

}
```

##### 28.类属性和类方法

```dart
main(List<String> args) {
  
}

class Person{
  // 成员属性 or 成员变量
  String name;

  // 静态属性 or 类属性(通过类调用，只有一份)
  static String courseTime;

  // 对象方法
  void eating(){}

  // 静态方法 or 类方法 (可以通过类调用)
  static void gotoCourse(){
    print("去上课");
  }
  
}
```

##### 29.枚举enum

```dart
main(List<String> args) {

  // Colors.values可以获取到所有的枚举值
  print(Colors.values);

  // 枚举最常用的地方就是swith
  final color = Colors.red;
    
  switch(color){
    case Colors.red:
      print("红色");
      break;
    case Colors.blue:
      print("蓝色");
      break;
    case Colors.green:
      print("绿色");
      break;
  }
}

// enum定义枚举
enum Colors{
  red,
  blue,
  green
}
```

##### 30.库的使用（使用系统库）

- 在dart中，一个.dart文件就是一个库文件
- 我们的List，Map等，在核心库里面不用导入

```dart
// 导入系统库
import 'dart:io';
import 'dart:isolate';
import 'dart:math';
main(List<String> args) {
  final num1 = 20;
  final num2 = 30;
  // min是math库中的函数
  print(min(num1,num2));
}
```

##### 32.使用自己的库(即自己写的.dart文件)

```dart
// 1.新建utils文件夹，在文件夹里创建math_utils.dart文件
int sum(num1, num2){
  return num1 + num2;
}

// 参数最好写上类型
int mul(int num1, int num2){
  return num1 * num2;
}

// 下划线是区分私有和公共的方式，_的方法，导入的.dart文件中不可用
int _min(int num1, int num2){
  return num1 * num2;
}

// 2.使用自定义库
// 导入自定义库
import './utils/math_utils.dart';
main(List<String> args) {
  // 使用自定义库中的函数
  print(sum(10, 20));
  print(mul(10, 20));
}

// 3.as关键字给导入的库起别名
import './utils/math_utils.dart' as mUtils;
main(List<String> args) {
  // 使用自定义库中的函数
  print(mUtils.sum(10, 20));
  print(mUtils.mul(10, 20));
}

// 4.show指定要导入的内容(只倒入sum)
import './utils/math_utils.dart' show sum
    
// 5.hide 指定不导入的内容
import './utils/math_utils.dart' hide mul
```

##### 33.导入文件夹中的所有.dart文件

```dart
// 1.在文件夹中新建utils.dart,导出该文件夹中的所有.dart文件
export 'math_utils.dart'
export 'date_utils.dart'
    
// 2.然后用的时候，直接导入utils.dart即可
import './utils/utils.dart'
```

##### 34.使用第三方库文件

-  https://pub.dev/ 			dart所有的库文件都在这个地址

```dart
// 1.必须在项目中创建pubspec.yaml
// 这里依赖一个http库
name: coderwhy
descreption: a dart libray
dependencies:
  http: ^0.12.0+4
      
// 2.命令行安装库,项目根路径
// 安装完第三方库会生成三个文件，我们先不用管这些文件
pub get
      
// 3.文件中使用第三方库,引入第三方库必须使用package: 开头
import 'package:http/http.dart' as http;
```

##### 35.异步

```dart
// 没有异步
```





