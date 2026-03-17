# 资金管理系统

一个基于前后端分离架构的资金管理系统，包含收款管理、退款管理和发票管理功能。

## 技术栈

### 后端
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 数据库（内存数据库）
- Maven

### 前端
- React 18
- Ant Design 5
- React Router 6
- Axios
- Day.js

## 功能模块

### 1. 收款管理
- 收款列表展示
- 新增收款
- 查看收款详情（只读）
- 修改收款信息
- 删除收款

### 2. 退款管理
- 退款列表展示
- 新增退款
- 查看退款详情（只读）
- 修改退款信息
- 删除退款

### 3. 发票管理
- 发票列表展示
- 新增发票
- 查看发票详情（只读）
- 修改发票信息
- 删除发票

## 项目结构

```
fund-management-system/
├── backend/                      # 后端Java项目
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/fund/
│   │   │   │   ├── entity/      # 实体类
│   │   │   │   │   ├── Payment.java
│   │   │   │   │   ├── Refund.java
│   │   │   │   │   └── Invoice.java
│   │   │   │   ├── repository/  # 数据访问层
│   │   │   │   ├── service/     # 业务逻辑层
│   │   │   │   ├── controller/  # 控制器层
│   │   │   │   ├── dto/         # 数据传输对象
│   │   │   │   └── config/      # 配置类
│   │   │   └── resources/
│   │   │       └── application.yml
│   │   └── test/
│   └── pom.xml
├── frontend/                     # 前端React项目
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/         # 布局组件
│   │   ├── pages/              # 页面组件
│   │   │   ├── PaymentList.js
│   │   │   ├── RefundList.js
│   │   │   └── InvoiceList.js
│   │   ├── services/           # API调用
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
└── README.md
```

## 快速开始

### 前置要求
- JDK 17+
- Node.js 16+
- Maven 3.6+

### 后端启动

1. 进入后端目录：
```bash
cd backend
```

2. 使用Maven构建并运行：
```bash
mvn clean install
mvn spring-boot:run
```

后端服务将在 `http://localhost:8080` 启动

### 前端启动

1. 进入前端目录：
```bash
cd frontend
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm start
```

前端应用将在 `http://localhost:3000` 启动

### 访问H2数据库控制台
后端启动后，可以访问 H2 数据库控制台：
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:funddb`
- Username: `sa`
- Password: (留空)

## API接口文档

### 收款管理 API
- `GET /api/payments` - 获取所有收款记录
- `GET /api/payments/{id}` - 根据ID获取收款记录
- `POST /api/payments` - 创建收款记录
- `PUT /api/payments/{id}` - 更新收款记录
- `DELETE /api/payments/{id}` - 删除收款记录

### 退款管理 API
- `GET /api/refunds` - 获取所有退款记录
- `GET /api/refunds/{id}` - 根据ID获取退款记录
- `POST /api/refunds` - 创建退款记录
- `PUT /api/refunds/{id}` - 更新退款记录
- `DELETE /api/refunds/{id}` - 删除退款记录

### 发票管理 API
- `GET /api/invoices` - 获取所有发票记录
- `GET /api/invoices/{id}` - 根据ID获取发票记录
- `POST /api/invoices` - 创建发票记录
- `PUT /api/invoices/{id}` - 更新发票记录
- `DELETE /api/invoices/{id}` - 删除发票记录

## 初始化数据

系统启动时会自动初始化一些测试数据，包括：
- 3条收款记录
- 2条退款记录
- 3条发票记录

## 开发说明

### 添加新的业务模块
1. 后端：创建对应的 Entity、Repository、Service、Controller 和 DTO
2. 前端：创建对应的页面组件和API调用方法
3. 在路由配置中添加新路由

### 数据库
当前使用H2内存数据库，数据在服务重启后会丢失。如需持久化存储，可以修改配置切换到MySQL或PostgreSQL。

## 许可证

MIT License
