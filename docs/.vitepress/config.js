const util = require("./util")

const vue3Side = util.createSidebarConfig("Vue3", "vue3")
const flutterSide = util.createSidebarConfig("Fluter", "flutter")
const reactSide = util.createSidebarConfig("React", "react")
const JsTsSide = util.createSidebarConfig("JsTs", "jsts")
const GoSide = util.createSidebarConfig("Go", "go")
const pythonSide = util.createSidebarConfig("Python", "python")


module.exports = {
  title: "Note VitePress",
  description: "Just playing around.",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      {text: "Vue3", link: "/vue3/"},
      {text: "Flutter", link: "/flutter/"},
      {text: "React", link: "/react/"},
      {text: "JsTs", link: "/jsts/"},
      {text: "Go", link: "/go/"},
      {text: "Python", link: "/python/"},
    
    ],
    
    sidebar: {
      "/vue3/": [vue3Side],
      "/flutter/": [flutterSide],
      "/react/": [reactSide],
      "/jsts/": [JsTsSide],
      "/go/": [GoSide],
      "/python/": [pythonSide],
    },

  },
}


