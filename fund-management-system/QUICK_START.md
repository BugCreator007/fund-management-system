# 资金管理系统 - 快速开始指南

## 🚀 5分钟快速启动

### 前置条件检查

确保已安装以下工具：
- ✅ JDK 17 或更高版本
- ✅ Node.js 16 或更高版本
- ✅ Maven 3.6 或更高版本

检查命令：
```bash
java -version    # 检查Java版本
node -v          # 检查Node.js版本
mvn -v           # 检查Maven版本
```

## 📦 启动步骤

### 第一步：启动后端服务

```bash
# 进入后端目录
cd backend

# 启动Spring Boot应用
mvn spring-boot:run
```

**看到以下输出表示启动成功：**
```
Started FundManagementApplication in X.XXX seconds
```

后端服务地址：`http://localhost:8080`

### 第二步：启动前端应用

打开**新的终端窗口**：

```bash
# 进入前端目录
cd frontend

# 安装依赖（首次运行）
npm install

# 启动开发服务器
npm start
```

**看到以下输出表示启动成功：**
```
Compiled successfully!
You can now view fund-management-frontend in the browser.
  Local:            http://localhost:3000
```

前端应用地址：`http://localhost:3000`

## 🌐 访问系统

打开浏览器访问：**http://localhost:3000**

## 📱 系统功能

### 主菜单
- **收款管理** - 管理客户收款记录
- **退款管理** - 处理客户退款业务  
- **发票管理** - 开具和管理发票

### 操作按钮说明
- **查看** - 查看详细信息（只读，不可修改）
- **修改** - 修改详细信息（可编辑并提交）
- **删除** - 删除记录（需确认）
- **新增** - 创建新记录

## 🧪 测试数据

系统已预置测试数据，登录后即可看到：

### 收款数据（3条）
- 张三科技有限公司 - ¥15,000
- 李四贸易公司 - ¥28,000
- 王五实业集团 - ¥50,000

### 退款数据（2条）
- 张三科技有限公司 - ¥5,000
- 李四贸易公司 - ¥3,000

### 发票数据（3条）
- 张三科技有限公司 - ¥15,000（已开具）
- 李四贸易公司 - ¥28,000（已开具）
- 王五实业集团 - ¥50,000（待开具）

## 🔧 常见问题

### Q1: 后端启动失败
**解决方法：**
1. 确认JDK版本：`java -version`
2. 检查Maven配置：`mvn -v`
3. 清理并重新构建：`mvn clean install`

### Q2: 前端无法启动
**解决方法：**
1. 检查Node.js版本：`node -v`
2. 删除node_modules并重新安装：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Q3: 前端无法连接后端
**解决方法：**
1. 确认后端已在8080端口启动
2. 访问 `http://localhost:8080/api/payments` 测试API
3. 检查防火墙设置

### Q4: 数据丢失
**说明：** 当前使用H2内存数据库，重启后数据会重置。
**解决方法：** 修改配置切换到MySQL或PostgreSQL

## 📊 访问H2数据库控制台

1. 后端启动后访问：`http://localhost:8080/h2-console`
2. 使用以下配置连接：
   - JDBC URL: `jdbc:h2:mem:funddb`
   - User Name: `sa`
   - Password: (留空)
3. 点击"Connect"即可查看数据库

## 🎯 下一步

系统已可正常使用，接下来可以：

1. **创建新记录** - 点击"新增"按钮
2. **编辑现有数据** - 点击"修改"按钮
3. **查看详细信息** - 点击"查看"按钮
4. **删除记录** - 点击"删除"按钮

## 💡 开发建议

### 修改配置
- 后端配置：`backend/src/main/resources/application.yml`
- 前端配置：`frontend/src/services/api.js`

### 添加新功能
1. 后端：创建Entity、Repository、Service、Controller
2. 前端：创建页面组件和API调用

### 数据持久化
修改 `application.yml` 切换到MySQL/PostgreSQL

## 📚 更多文档

- [完整README](README.md) - 详细项目文档
- [部署指南](DEPLOYMENT_GUIDE.md) - 生产环境部署
- [项目总结](PROJECT_SUMMARY.md) - 项目概览

## 🆘 获取帮助

如遇到问题：
1. 检查控制台错误信息
2. 查阅完整文档
3. 创建GitHub Issue

---

**祝您使用愉快！** 🎉

如有任何问题，欢迎随时反馈！
