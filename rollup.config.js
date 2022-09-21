import path from "path"
import ts from "rollup-plugin-typescript"
import dts from 'rollup-plugin-dts'
export default [
  {
    input: "./src/core/index.ts",//入口
    output: [//出口
      /*
        * format:输出类型
        * es => import export
        * cjs => require exports
        * umd => AMD CMD global
        */
      {
        file: path.resolve(__dirname, './dist/index.esm.js'),//出口文件位置
        format: "es",//输出类型
      },
      {
        file: path.resolve(__dirname, './dist/index.cjs.js'),//出口文件位置
        format: "cjs",//输出类型
      },
      {
        file: path.resolve(__dirname, './dist/index.js'),//出口文件位置
        format: "umd",//输出类型
        name: "tracker"
      }
    ],
    plugins:[
      ts()
    ]
  },
  {
    //输出声明文件
    input: "./src/core/index.ts",//入口
    output: [//出口
      {
        file: path.resolve(__dirname, './dist/index.d.js'),//出口文件位置
        format: "es",//输出类型
      },
    ],
    plugins:[
      dts()
    ]
  }
]