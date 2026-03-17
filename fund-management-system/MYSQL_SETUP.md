# MySQL数据库配置指南

## 数据库信息

- **数据库名称**: funddb
- **用户名**: gulu
- **密码**: Gxl@987654321
- **端口**: 3306
- **字符集**: utf8mb4

## 配置完成情况

✅ 已完成以下配置：

### 1. Maven依赖
- ✅ 添加MySQL驱动依赖 (mysql-connector-j)
- ✅ 保留H2数据库（用于开发测试）

### 2. Spring Boot配置
- ✅ 配置MySQL数据源
- ✅ 设置JPA方言为MySQL
- ✅ 启用自动表结构更新 (ddl-auto: update)
- ✅ 配置时区和SSL

### 3. 数据库初始化脚本
- ✅ 创建schema.sql文件
- ✅ 自动创建funddb数据库

## 使用MySQL数据库

### 前置条件

确保已安装并启动MySQL服务：

```bash
# macOS 使用Homebrew安装MySQL
brew install mysql
brew services start mysql

# 或检查MySQL服务状态
mysql.server status
```

### 自动创建数据库

Spring Boot启动时会自动执行以下操作：

1. **连接MySQL服务器**
   - 使用配置的用户名和密码
   - 创建funddb数据库（如果不存在）

2. **创建表结构**
   - 自动根据JPA实体类创建表
   - 使用Hibernate的ddl-auto: update模式

3. **初始化数据**
   - DataInitializer类会插入测试数据

### 启动应用

```bash
cd /Users/lu/WorkBuddy/20260317164910/fund-management-system/backend
mvn spring-boot:run
```

首次启动时会看到以下日志：

```
Creating database `funddb`...
Hibernate: create table payments (...)
Hibernate: create table refunds (...)
Hibernate: create table invoices (...)
Initializing test data...
```

## 验证数据库连接

### 方法1：使用MySQL命令行

```bash
mysql -u gulu -p
# 输入密码: Gxl@987654321

# 连接后执行
USE funddb;
SHOW TABLES;
```

预期输出：
```
+----------------+
| Tables_in_funddb |
+----------------+
| invoices       |
| payments       |
| refunds        |
+----------------+
```

### 方法2：使用Spring Boot日志

启动应用后，查看控制台输出，应该看到：
```
Successfully connected to MySQL database
```

### 方法3：使用JPA查询

访问API端点测试数据：
```bash
# 测试收款API
curl http://localhost:8080/api/payments

# 测试退款API
curl http://localhost:8080/api/refunds

# 测试发票API
curl http://localhost:8080/api/invoices
```

## 表结构说明

### payments（收款表）
```sql
CREATE TABLE payments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  payment_no VARCHAR(255),
  customer_name VARCHAR(255),
  amount DECIMAL(19,2),
  payment_method VARCHAR(255),
  status VARCHAR(255),
  description TEXT,
  bank_account VARCHAR(255),
  transaction_no VARCHAR(255),
  payment_time DATETIME,
  create_time DATETIME,
  update_time DATETIME
);
```

### refunds（退款表）
```sql
CREATE TABLE refunds (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  refund_no VARCHAR(255),
  original_payment_no VARCHAR(255),
  customer_name VARCHAR(255),
  amount DECIMAL(19,2),
  refund_method VARCHAR(255),
  status VARCHAR(255),
  reason TEXT,
  bank_account VARCHAR(255),
  transaction_no VARCHAR(255),
  refund_time DATETIME,
  create_time DATETIME,
  update_time DATETIME
);
```

### invoices（发票表）
```sql
CREATE TABLE invoices (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  invoice_no VARCHAR(255),
  invoice_type VARCHAR(255),
  customer_name VARCHAR(255),
  customer_tax_no VARCHAR(255),
  amount DECIMAL(19,2),
  tax_amount DECIMAL(19,2),
  status VARCHAR(255),
  related_payment_no VARCHAR(255),
  title VARCHAR(255),
  content TEXT,
  invoice_date DATETIME,
  create_time DATETIME,
  update_time DATETIME
);
```

## 数据持久化优势

### 使用MySQL vs H2

| 特性 | H2 | MySQL |
|------|-----|-------|
| 数据持久化 | ❌ 内存中，重启丢失 | ✅ 持久化存储 |
| 生产环境 | ❌ 不适合 | ✅ 生产级 |
| 并发性能 | ⚠️ 有限 | ✅ 优秀 |
| 复杂查询 | ⚠️ 有限 | ✅ 强大 |
| 工具支持 | ⚠️ 有限 | ✅ 丰富 |
| 备份恢复 | ❌ 不支持 | ✅ 支持 |

## 备份和恢复

### 备份数据库

```bash
# 备份整个数据库
mysqldump -u gulu -p funddb > funddb_backup.sql

# 备份特定表
mysqldump -u gulu -p funddb payments > payments_backup.sql
```

### 恢复数据库

```bash
# 恢复数据库
mysql -u gulu -p funddb < funddb_backup.sql
```

## 故障排除

### 问题1：连接失败

**错误信息**: `Communications link failure`

**解决方案**:
1. 检查MySQL服务是否启动：
   ```bash
   mysql.server status
   ```

2. 启动MySQL服务：
   ```bash
   brew services start mysql
   # 或
   mysql.server start
   ```

### 问题2：权限错误

**错误信息**: `Access denied for user 'gulu'@'localhost'`

**解决方案**:
1. 确认用户名和密码正确
2. 创建用户（如果不存在）：
   ```sql
   CREATE USER 'gulu'@'localhost' IDENTIFIED BY 'Gxl@987654321';
   GRANT ALL PRIVILEGES ON *.* TO 'gulu'@'localhost';
   FLUSH PRIVILEGES;
   ```

### 问题3：时区错误

**错误信息**: `The server time zone value '...' is unrecognized`

**解决方案**：
已在配置文件中添加：`serverTimezone=UTC`

如果还有问题，可以修改为：
```yaml
url: jdbc:mysql://localhost:3306/funddb?useSSL=false&serverTimezone=Asia/Shanghai
```

## 切换回H2数据库

如果需要切换回H2数据库进行开发测试：

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:funddb
    driver-class-name: org.h2.Driver
    username: sa
    password:
  
  jpa:
    hibernate:
      ddl-auto: create-drop
```

## 性能优化建议

### 1. 连接池配置

在application.yml中添加：
```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

### 2. JPA查询优化

- 使用@NamedQuery定义命名查询
- 对大表启用分页
- 合理使用@EntityGraph

### 3. 索引优化

为常用查询字段添加索引：
```java
@Entity
@Table(name = "payments", indexes = {
    @Index(name = "idx_payment_no", columnList = "payment_no"),
    @Index(name = "idx_customer_name", columnList = "customer_name")
})
public class Payment {
    // ...
}
```

## 总结

✅ **MySQL配置已完成**
- 数据库连接配置
- 表结构自动创建
- 测试数据自动初始化
- 持久化存储已启用

现在您可以：
1. 启动后端服务
2. 数据会自动保存到MySQL
3. 重启服务后数据不会丢失
4. 使用MySQL工具管理数据

---

**配置完成！** 🎉
