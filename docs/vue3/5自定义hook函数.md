###### 1.自定义hook函数

```jsx
使用vue3的组合API封装的可复用的功能函数
自定义hook的作用类似于vue2中的mixin技术
自定义Hook的优势：很清楚复用功能代码的来源，更清除易懂
```

###### 2.鼠标点击显示鼠标点击的坐标

```jsx
// 1.App.vue
<template>
  <h2>自定义Hook函数操作</h2>
  <h2>x:{{ x }}, y:{{ y }}</h2>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const x = ref(-1);
    const y = ref(-1);

    // 点击事件的回调函数
    const clickHandler = (e: any) => {
      x.value = e.pageX;
      y.value = e.pageY;
    };
    // 页面已经加载完毕，再进行点击操作
    // 页面加载完毕的生命周期
    onMounted(() => {
      window.addEventListener("click", clickHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("click", clickHandler);
    });
    return {
      x,
      y,
    };
  },
});
</script>
```

###### 3.将上面的代码变成一个Hook函数

```jsx
// 1.新建src/hooks/useMousePosition.ts (自定义hook函数)
import { ref, onMounted, onBeforeUnmount } from "vue";
export default function () {
  const x = ref(-1);
  const y = ref(-1);

  const clickHandler = (e: MouseEvent) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };

  onMounted(() => {
    window.addEventListener("click", clickHandler);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", clickHandler);
  });
  return {
    x,
    y,
  };
}

// 2.App.vue
<template>
  <h2>自定义Hook函数操作</h2>
  <h2>x:{{ x }}, y:{{ y }}</h2>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
// 引入hook
import useMousePosition from "./hooks/useMousePosition";
export default defineComponent({
  name: "App",
  setup() {
    // 解构hook函数返回的x和y
    const { x, y } = useMousePosition();
    return {
      x,
      y,
    };
  },
});
</script>
```

###### 4.封装Ajax请求的hook函数

```jsx
// 1.src/hooks/useRequest.ts
import { ref } from 'vue';
import Axios from 'axios'
// 发送Ajax的请求
export default function (url: string) {
  const loading = ref(true)
  const data = ref(null)
  const errorMsg = ref('')

  Axios.get(url).then(res => {
    // 改变加载状态
    loading.value = false
    data.value = res.data
  }).catch(err => {
    loading.value = false
    errorMsg.value = err.message || '未知错误'
  })
  return {
    loading,
    data,
    errorMsg
  }
}

// 2.App.vue
<template>
  <h2>自定义Hook函数操作</h2>

  <h2>loading {{ loading }}</h2>
  <h2>data {{ data }}</h2>
  <h2>errorMsg {{ errorMsg }}</h2>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
// 引入hook
import useRequest from "./hooks/useRequest";
export default defineComponent({
  name: "App",
  setup() {
    const { loading, data, errorMsg } = useRequest("地址1");
    return {
      loading,
      data,
      errorMsg,
    };
  },
});
</script>
```

