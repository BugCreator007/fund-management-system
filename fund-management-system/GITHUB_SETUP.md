# GitHub仓库创建指南 - 自动化方式

## 方式一：使用GitHub API自动创建（需要Personal Access Token）

### 第一步：获取GitHub Personal Access Token

1. **登录GitHub**
   - 访问：https://github.com/login

2. **进入Settings**
   - 点击右上角头像
   - 选择 "Settings"（设置）

3. **创建Token**
   - 左侧菜单选择 "Developer settings"
   - 选择 "Personal access tokens" -> "Tokens (classic)"
   - 点击 "Generate new token" -> "Generate new token (classic)"

4. **配置Token权限**
   - **Note（备注）**: `fund-management-system`
   - **Expiration（过期时间）**: 选择 `No expiration` 或适当的时间
   - **勾选以下权限**（scopes）：
     - ✅ `repo` - 完整的仓库权限
     - ✅ `workflow` - 工作流权限

5. **生成并复制Token**
   - 点击页面底部的 "Generate token"
   - **重要**：立即复制生成的token（以 `ghp_` 开头）
   - 这个token只显示一次，请妥善保存

### 第二步：提供Token给我

请将您刚刚获得的Personal Access Token告诉我，我将帮您：
1. 自动创建GitHub仓库
2. 配置远程仓库地址
3. 推送代码到GitHub

### 安全提示
⚠️ Personal Access Token相当于您的GitHub密码，请：
- 不要分享给他人
- 完成后可以删除或重新生成
- 不要在公开的代码仓库中包含token

---

## 方式二：手动创建仓库（推荐）

如果您不想提供token，可以手动创建：

### 操作步骤

1. **访问GitHub创建页面**
   ```
   https://github.com/new
   ```

2. **填写仓库信息**
   - Repository name: `fund-management-system`
   - Description: `资金管理系统 - 前后端分离项目`
   - 选择 **Public**
   - **不要勾选**任何初始化选项（README、.gitignore、License）

3. **创建仓库**
   - 点击 "Create repository" 按钮

4. **创建后告诉我**
   - 创建成功后，告诉我您的GitHub用户名
   - 我会帮您推送代码

---

## 推荐流程

**如果您希望我自动创建**：
1. 按照上面的步骤获取Personal Access Token
2. 将token告诉我

**如果您希望手动创建**：
1. 在GitHub网站创建仓库
2. 告诉我您的GitHub用户名

两种方式都可以，请选择您喜欢的方式！🚀
