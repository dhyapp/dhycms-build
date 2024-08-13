<div align="center">
<br />
  <h1>🚀导航蚁CMS系统</h1>
<br />

让人眼前一亮的基于NodeJS、Vue的导航、文章内容管理系统（CMS），支持友链来源统计、友链自助收录、站群管理、内容加密传输、图片加密传输、基于Telegram-Cloudflare的图床等...

<br />

[![stars](https://img.shields.io/github/stars/dhyapp/dhycms-build?style=flat-square&logo=GitHub)](https://github.com/dhyapp/dhycms-build)
![Node](https://img.shields.io/badge/Node-v20+-red)
![MongoDB](https://img.shields.io/badge/MongoDB-v6+-blue)
![Redis](https://img.shields.io/badge/Redis-required-green)
![Yarn](https://img.shields.io/badge/Yarn-required-red)

</div>

## ✨ Features

- **开箱即用** - 导航、文章、站群管理、内容图片加密传输、友链自助收录、数据统计
- **NodeJS** - 基于NodeJS
- **Vue** - 代码使用 Vue3 书写
- **Ant Design Vue** - 由 [Ant Design Vue](https://antdv.com/components/overview) 组件库强力驱动

## 🌈 使用

### Docker一键部署（推荐）

拉取 DHYCMS 镜像：
```
docker pull dhycms/dhycms:lastest
```

DHYCMS Docker 容器内置了应用程序以及所有依赖环境，开启容器即自动运行：
```
docker run -d -it --name dhycms-prod --privileged=true -p 8801:22 -p 7200:7200 -p 17017:17017 -p 7107:7107 -p 8802-8999:8802-8999 dhycms/dhycms:lastest
```
`-d`: 保持容器后台运行<br>
`dhycms-prod`: 容器名，可任意修改<br>
`--privileged=true`: 开启特权，使其容器可以运行内核参数<br>
`-p 8801:22`: 暴露容器 SSH 端口`22`到宿主环境端口`8801`<br>
`-p 7200:7200`: 暴露应用程序 dhycms 端口`7200`到宿主环境端口`7200`<br>
`-p 17017:17017`: 暴露容器 MongoDB 端口`17017`到宿主环境端口`17017`<br>
`-p 7107:7107`: 暴露容器 Redis 端口`7107`到宿主环境端口`7107`<br>
`-p 8802-8999`: 暴露容器范围端口`8802-8999`到宿主环境端口`8802-8999`，此范围端口为站群管理预设端口

您也可以开启所有端口映射：
```
docker run -d -it --name dhycms-prod --privileged=true -P dhycms/dhycms:lastest
```

### 手动部署

#### 1. 修改配置 server/config.mjs

本系统依赖于NodeJS v18+环境、MongoDB v6+、Redis数据库
> 注意：MongoDB 数据库必须开启无权限，否则站群管理功能无法使用。

修改`secret:"custom-secret"`中的`custom-secret`为自定义密码<br>
修改`port:27017`中的`27017`为MongoDB数据库端口，`password:""`必须为空<br>
修改`port:6379`中的`6379`为Redis端口<br>
修改`password:"a123123"`中的`a123123`为Redis密码<br>
修改`db:0`中的`0`为Redis数据库下标<br>
```
# 安装 node 项目管理工具
yarn add pm2 -g

# 项目目录下安装依赖
yarn install --production

# 运行项目
yarn start

# 查看项目运行状态
pm2 list

# 查看运行日志
pm2 logs
```

## 📝 声明

- 本项目适用于学习交流，请勿用于非法用途。一经发现，本站有权终止其服务。

## 📔 更新内容

* <span style="color:#999"> 2024-08-13:</span> DHYCMS 2.0版本发布