const fs = require("fs")
const path = require("path")
const resolve = dir => path.resolve(__dirname, "../", dir)
console.log(resolve('vue3'))
/**
  "/vue3/": [
        {
          text: "Vue3",
          items: [
            {text: "快速开始", link: "/vue3/"},
            {text: "setup和ref和reactive", link: "/vue3/1setup和ref和reactive的基本使用"},
            {text: "reactive和ref的细节", link: "/vue3/2.reactive和ref的细节问题"},
            {text: "计算属性和监视", link: "/vue3/3.计算属性和监视"},
            {text: "计算属性和监视", link: "/vue3/3.计算属性和监视"},
            {text: "vue3生命周期", link: "/vue3/4.vue3生命周期"},
            {text: "计算属性和监视", link: "/vue3/自定义hook函数"},
            {text: "计算属性和监视", link: "/vue3/3.计算属性和监视"},
            {text: "计算属性和监视", link: "/vue3/3.计算属性和监视"},
            {text: "计算属性和监视", link: "/vue3/3.计算属性和监视"},
            {text: "计算属性和监视", link: "/vue3/3.计算属性和监视"},
            {text: "计算属性和监视", link: "/vue3/3.计算属性和监视"},
            {text: "计算属性和监视", link: "/vue3/3.计算属性和监视"},
            {text: "计算属性和监视", link: "/vue3/3.计算属性和监视"},
            {text: "计算属性和监视", link: "/vue3/3.计算属性和监视"},

          ]
        }
      ]
 */
function createSidebarConfig(title, dir){
  const result = {
    text: title,
    items: [
      {text: "快速开始", link: `/${dir}/`}
    ],
  }
  const dirPath = resolve(dir)
  let readDir
  try{
    readDir = fs.readdirSync(dirPath)
  }
  catch(e){
    console.log("读取文件夹错误", dirPath)
  }
  
  readDir = sortFileName(readDir)

  readDir.forEach(item => {
    if(item !== "index.md"){
      const text = item.replace(/.md/, '')
      const link = `/${dir}/${text}`
      result.items.push({text, link}) 
      
    }
  })

  return result

}

// 文件名的排序
function sortFileName(fileNames){
  // const fileNames = ['11c.jpg', '2c.jpg'];
  const regexp = /[^\d]+|\d+/g;
  const result = fileNames.map(name => ({ name, weights: name.match(regexp) })).sort((a, b) => {
    let pos = 0;
    const weightsA = a.weights;
    const weightsB = b.weights;
    let weightA = weightsA[pos];
    let weightB = weightsB[pos];
    while (weightA && weightB) {
      const v = weightA - weightB;
      if (!isNaN(v) && v !== 0) return v;
      if (weightA !== weightB) return weightA > weightB ? 1 : -1;
      pos += 1;
      weightA = weightsA[pos];
      weightB = weightsB[pos];
    }
    return weightA ? 1 : -1;
  });
  return result.map(x => x.name)
}


module.exports = {
  createSidebarConfig
}
