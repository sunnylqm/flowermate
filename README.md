# flowermate

本示例代码仅用于教学。

[apk下载](https://github.com/sunnylqm/flowermate/releases/download/20210319/app-release.apk)


热更新添加页面演示（master分支发现页面为空白，plant-store分支添加了一个简单的商城页面）：

![output](https://user-images.githubusercontent.com/615282/111874977-4c3aee00-89d2-11eb-82bb-8e26d08829d0.gif)






## 环境配置

请参考 <https://reactnative.cn/docs/getting-started/>

## 运行

```bash
yarn
# ios模拟器上运行
npx pod-install
yarn ios
# 安卓设备上运行
yarn android
```

## 项目结构

项目建议结构

```

├── android  
├── assets // 静态资源   
├── index.js // 入口文件  
├── ios  
├── patches // 有时要给第三方打补丁(patch-package)  
├── scripts // 放一些自动化辅助脚本  
└── src  
  ├── components // 全局复用的非全屏组件  
  ├── routers // 页面路由结构声明(stack, tab, drawer)  
  ├── screens // 全屏页面组件(可以继续嵌套 components)  
  ├── reduxState // redux 相关  
  │   ├── actions.ts  
  │   ├── reducers  
  │   ├── store.ts  
  │   └── selectors.ts  
  ├── types // 类型声明  
  ├── utils // 辅助函数、常量、配置等   
  │   ├── navService.ts   
  │   ├── constants.ts  
  │   ├── config.ts  
  │   └── request.ts  
  └── App.tsx  
```

## 版权声明

App图标取自[Flaticon](https://www.flaticon.com/)，由[Freepik](https://www.flaticon.com/authors/freepik)制作。可在申明原作者版权的前提下自由使用。

启动背景图为本人拍摄，可自由使用。
