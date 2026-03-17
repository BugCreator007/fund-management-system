# 资金管理系统 - 部署指南

## 项目已成功创建并提交到Git

项目代码已成功生成并初始化为Git仓库。要将其提交到GitHub，请按以下步骤操作：

## 提交到GitHub步骤

### 方法一：使用GitHub CLI (推荐)

1. **安装GitHub CLI**
   ```bash
   # macOS
   brew install gh

   # Windows
   # 从 https://cli.github.com/ 下载安装
   ```

2. **登录GitHub**
   ```bash
   gh auth login
   ```

3. **创建仓库并推送**
   ```bash
   cd /Users/lu/WorkBuddy/20260317164910/fund-management-system
   gh repo create fund-management-system --public --source=. --remote=origin --push
   ```

### 方法二：手动创建GitHub仓库

1. **在GitHub网站创建新仓库**
   - 访问 https://github.com/new
   - 仓库名称：`fund-management-system`
   - 设置为Public或Private
   - **不要**初始化README、.gitignore或LICENSE

2. **连接远程仓库并推送**
   ```bash
   cd /Users/lu/WorkBuddy/20260317164910/fund-management-system
   git remote add origin https://github.com/YOUR_USERNAME/fund-management-system.git
   git branch -M main
   git push -u origin main
   ```

## 本地运行项目

### 后端运行

1. **进入后端目录**
   ```bash
   cd backend
   ```

2. **运行Spring Boot应用**
   ```bash
   mvn spring-boot:run
   ```
   或
   ```bash
   ./mvnw spring-boot:run  # 如果使用Maven Wrapper
   ```

3. **验证后端启动**
   - 访问：http://localhost:8080
   - H2控制台：http://localhost:8080/h2-console
     - JDBC URL: `jdbc:h2:mem:funddb`
     - 用户名：`sa`
     - 密码：（留空）

### 前端运行

1. **进入前端目录**
   ```bash
   cd frontend
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm start
   ```

4. **访问应用**
   - 浏览器打开：http://localhost:3000

## 项目特性

### 已实现的功能

#### 1. 收款管理
- ✅ 列表展示所有收款记录
- ✅ 新增收款
- ✅ 查看收款详情（只读模式）
- ✅ 修改收款信息
- ✅ 删除收款
- ✅ 表单验证

#### 2. 退款管理
- ✅ 列表展示所有退款记录
- ✅ 新增退款
- ✅ 查看退款详情（只读模式）
- ✅ 修改退款信息
- ✅ 删除退款
- ✅ 表单验证

#### 3. 发票管理
- ✅ 列表展示所有发票记录
- ✅ 新增发票
- ✅ 查看发票详情（只读模式）
- ✅ 修改发票信息
- ✅ 删除发票
- ✅ 表单验证

### 技术亮点

#### 后端
- Spring Boot 3.2.0 最新版本
- RESTful API设计
- JPA数据持久化
- 自动初始化测试数据
- 跨域配置（CORS）
- DTO模式进行数据传输

#### 前端
- React 18 + Hooks
- Ant Design 5 UI组件库
- React Router 6 路由管理
- Axios HTTP客户端
- 响应式布局
- 中文本地化支持

## 数据库结构

系统使用H2内存数据库，启动时自动创建以下表：

### payments（收款表）
- id: 主键
- payment_no: 收款编号（自动生成）
- customer_name: 客户名称
- amount: 金额
- payment_method: 支付方式
- status: 状态
- description: 描述
- bank_account: 银行账户
- transaction_no: 交易流水号
- payment_time: 收款时间
- create_time: 创建时间
- update_time: 更新时间

### refunds（退款表）
- id: 主键
- refund_no: 退款编号（自动生成）
- original_payment_no: 原收款编号
- customer_name: 客户名称
- amount: 金额
- refund_method: 退款方式
- status: 状态
- reason: 退款原因
- bank_account: 银行账户
- transaction_no: 交易流水号
- refund_time: 退款时间
- create_time: 创建时间
- update_time: 更新时间

### invoices（发票表）
- id: 主键
- invoice_no: 发票编号（自动生成）
- invoice_type: 发票类型
- customer_name: 客户名称
- customer_tax_no: 客户税号
- amount: 金额
- tax_amount: 税额
- status: 状态
- related_payment_no: 关联收款编号
- title: 发票抬头
- content: 发票内容
- invoice_date: 开票日期
- create_time: 创建时间
- update_time: 更新时间

## 常见问题

### Q1: 后端启动失败
**A:** 确保已安装JDK 17或更高版本，可以使用 `java -version` 检查

### Q2: 前端无法连接后端
**A:** 确保后端服务已在8080端口启动，检查防火墙设置

### Q3: 数据丢失
**A:** H2是内存数据库，服务重启后数据会丢失。如需持久化，修改配置文件切换到MySQL或PostgreSQL

### Q4: 如何切换到MySQL数据库
**A:** 修改 `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/funddb
    username: your_username
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
```
并在pom.xml中添加MySQL驱动依赖。

## 后续开发建议

1. **用户认证与授权**
   - 集成Spring Security
   - 实现登录功能
   - 添加角色权限管理

2. **数据持久化**
   - 切换到MySQL/PostgreSQL
   - 配置数据备份策略

3. **功能增强**
   - 添加数据导出功能（Excel）
   - 实现数据统计报表
   - 添加搜索和筛选功能
   - 实现批量操作

4. **性能优化**
   - 添加分页查询
   - 实现缓存机制
   - 优化数据库查询

5. **测试覆盖**
   - 添加单元测试
   - 添加集成测试
   - 配置CI/CD流程

## 联系支持

如有问题或建议，请通过以下方式联系：
- 创建GitHub Issue
- 提交Pull Request

---

**祝您使用愉快！**
