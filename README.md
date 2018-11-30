# ledsqlite

> An LED Client App

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# node-gyp
node-gyp rebuild --target=2.0.12 --arch=ia32 --target_platform=win32 --dist-url=https://atom.io/download/electron/ --module_name=better_sqlite3 --module_path=../lib/binding/electron-v2.0-win32-x86

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
