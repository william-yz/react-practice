# [宏途 Jet Lab](http://www.angularjs.org/)
***

## 目的 Purpose

修炼，闭关，下山

## 技术栈 Stack

* 测试框架： [jasmine](http://jasmine.github.io/2.4/introduction.html)

## 安装 Installation

### 平台与工具 Platform & tools

首先你需要安装 [Node.js](https://nodejs.org/) 然后通过 [npm](http://npmjs.org) 安装 Bower

    ```
    npm install -g bower
    ```

### 下载源代码

	```
	git clone git@git.ht.com:WFDEV/HongtooJetLab.git
	```

### App Server

我们的服务端程序是 [Express.js](http://expressjs.com/)， 它需要依赖第三方中间件， 因此你需要安装这些依赖组件

* 安装全局依赖组件

    ```
    npm install -g nodemon
    ```
* 安装依赖组件 (从项目的根目录 from the project root folder):

    ```
    cd serve
    npm install
    ```

  (这些依赖项目在 server/package.json 文件中声明)

### Client App

我们的客户端程序是纯 HTML/Javascript 程序，但是同样它需要依赖第三方的Javacript组件，因此你也需要安装这些依赖组件

* 安装依赖组件 (从项目的根目录 from the project root folder):

    ```
    cd client
    bower install
    ```

  (这些依赖项目在 client/bower.json 文件中声明)

* 安装Grunt Cli (从项目的根目录 from the project root folder):

    ```
    cd client
    npm install -g grunt-cli
    ```

* 编译源代码 (从项目的根目录 from the project root folder):

    ```
    cd client
    grunt build
    ```

  (这些依赖项目在 client/package.json 文件中声明)


## 运行 Running
### 启动服务器

* 运行测试

    ```
    cd server
    npm run test
    ```

