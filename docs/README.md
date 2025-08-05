# 订阅管理系统 - 开发文档中心

## 📋 项目概述

订阅管理系统是一个现代化的订阅服务管理平台，帮助用户轻松管理和跟踪各种订阅服务的费用和续费情况。

### 🎯 核心特性
- **智能订阅管理** - 完整的订阅生命周期管理
- **多货币支持** - 支持8种主要货币，实时汇率更新
- **费用分析报告** - 强大的数据分析和可视化
- **响应式设计** - 完美适配桌面和移动设备
- **本地优先** - 基于SQLite的本地数据存储
- **Docker部署** - 一键部署，开箱即用
- **🌍 国际化支持** - 完整的中英文双语支持

## 📚 文档导航

### 🚀 快速开始
- **[快速开始指南](./快速开始指南.md)** - 5分钟快速启动项目
- **[API接口文档](./API接口文档.md)** - 完整的API接口说明

## 🏗️ 技术架构

### 前端技术栈
- **框架**: React 18 + TypeScript
- **构建工具**: Vite 6.3.1
- **样式**: Tailwind CSS + shadcn/ui
- **状态管理**: Zustand 4.5.0
- **路由**: React Router DOM 6.22.1
- **图表**: Recharts 2.15.3

### 后端技术栈
- **运行时**: Node.js 20+
- **框架**: Express 5.1.0
- **数据库**: SQLite + better-sqlite3 12.1.1
- **定时任务**: node-cron 3.0.3
- **API认证**: API Key

### 部署技术栈
- **容器化**: Docker + Docker Compose
- **进程管理**: dumb-init
- **健康检查**: 内置健康检查端点

## 🚀 快速启动

### 环境要求
- Node.js 20+
- Docker (推荐)

### 一键启动 (Docker)

#### docker run

```bash
docker run -d \
  --name subscription-manager \
  --restart unless-stopped \
  --user 0 \
  -p 3001:3001 \
  -e API_KEY="your_secret_api_key_here" \
  -e TIANAPI_KEY="your_tianapi_key_here" \
  -e PORT="3001" \
  -e BASE_CURRENCY="CNY" \
  -e NODE_ENV="production" \
  -e VITE_API_URL="/api" \
  -e DATABASE_PATH="/app/data/database.sqlite" \
  zhoujie218/subscription-manager:latest
```

#### docker compose

```bash
# 克隆项目
git clone <repository-url>
cd subscription-management

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，设置 API_KEY

# 启动服务
docker-compose up -d

# 访问应用
# 前端界面: http://localhost:3001
```

### 本地开发
```bash
# 安装依赖
npm install
cd server && npm install && cd ..

# 初始化数据库
cd server && npm run db:init && cd ..

# 启动服务
# 终端1: cd server && npm start
# 终端2: npm run dev

# 访问应用
# 前端界面: http://localhost:5173
# 后端API: http://localhost:3001/api
```

## 📁 项目结构

```
subscription-management/
├── src/                    # 前端源码
│   ├── components/        # React组件
│   │   ├── ui/           # 基础UI组件
│   │   ├── subscription/ # 订阅相关组件
│   │   ├── dashboard/    # 仪表板组件
│   │   ├── charts/       # 图表组件
│   │   └── layouts/      # 布局组件
│   ├── pages/            # 页面组件
│   ├── store/            # 状态管理
│   ├── services/         # API服务
│   ├── utils/            # 工具函数
│   ├── types/            # TypeScript类型
│   └── locales/          # 国际化文件
├── server/               # 后端源码
│   ├── controllers/      # 控制器层
│   ├── services/         # 服务层
│   ├── routes/           # 路由层
│   ├── middleware/       # 中间件
│   ├── db/              # 数据库相关
│   ├── config/          # 配置文件
│   └── utils/           # 工具函数
├── docs/                # 文档目录
└── docker-compose.yml   # Docker配置
```

## 🗄️ 数据库设计

### 核心表结构
- **subscriptions** - 订阅信息表
- **payment_history** - 支付历史表
- **categories** - 分类表
- **payment_methods** - 支付方式表
- **exchange_rates** - 汇率表
- **settings** - 系统设置表
- **monthly_category_summary** - 月度分类汇总表

详细数据库设计请参考 [开发文档中心](./开发文档中心.md#数据库设计)

## 🔧 开发指南

### 代码规范
- **TypeScript**: 严格类型检查
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **Git Hooks**: 提交前检查

### 常用命令
```bash
# 前端开发
npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm run lint             # 代码检查

# 后端开发
cd server
npm start               # 启动后端服务
npm run db:init         # 初始化数据库
npm run db:reset        # 重置数据库

# Docker操作
docker-compose up -d    # 启动服务
docker-compose down     # 停止服务
docker-compose logs -f  # 查看日志
```

## 📊 核心功能

### 1. 订阅管理
- ✅ 完整的CRUD操作
- ✅ 批量导入功能
- ✅ 状态管理 (active/trial/cancelled)
- ✅ 续费类型 (auto/manual)

### 2. 多货币支持
- ✅ 支持8种主要货币
- ✅ 实时汇率更新
- ✅ 自动汇率转换

### 3. 费用分析
- ✅ 月度/年度统计
- ✅ 分类分析
- ✅ 趋势图表
- ✅ 支付方式分析

### 4. 数据管理
- ✅ CSV/JSON导入导出
- ✅ 支付历史管理
- ✅ 分类和支付方式管理

### 5. 国际化支持
- ✅ 中英文双语支持
- ✅ 语言切换功能
- ✅ 本地化用户体验

## 🔐 安全机制

### API认证
- **API Key认证**: 所有受保护的路由需要API Key
- **中间件验证**: 统一的认证中间件
- **错误处理**: 完善的错误处理机制

### 数据安全
- **本地存储**: SQLite本地数据库
- **数据备份**: 支持数据导出备份
- **输入验证**: 完善的输入验证机制

## 📈 性能优化

### 前端优化
- **代码分割**: React.lazy() 懒加载
- **状态管理**: Zustand轻量级状态管理
- **缓存策略**: 合理的缓存机制
- **响应式设计**: 移动端优化

### 后端优化
- **数据库索引**: 关键字段索引优化
- **连接池**: SQLite连接优化
- **缓存机制**: 汇率缓存等
- **异步处理**: 定时任务异步处理

## 🧪 测试策略

### 单元测试
- **前端测试**: React组件测试
- **后端测试**: API接口测试
- **工具函数测试**: 核心逻辑测试

### 集成测试
- **API测试**: 完整的API流程测试
- **数据库测试**: 数据库操作测试
- **端到端测试**: 完整用户流程测试

## 📋 开发任务

### 当前进度
- **已完成**: 15个任务 (60%)
- **进行中**: 3个任务 (12%)
- **待开始**: 7个任务 (28%)

### 本周重点
1. 完成单元测试覆盖 (80%以上)
2. 完成性能优化
3. 完善错误处理机制

详细任务列表请参考 [开发文档中心](./开发文档中心.md#项目进度)

## 🐛 常见问题

### 数据库问题
```bash
# 数据库连接失败
cd server && npm run db:init

# 数据库重置
cd server && npm run db:reset
```

### API问题
```bash
# API请求失败 - 检查API Key
# 确保.env文件中有正确的API_KEY
API_KEY=your_secret_api_key_here
```

### Docker问题
```bash
# 容器启动失败
docker-compose build --no-cache
docker-compose up -d
```

## 📞 技术支持

### 获取帮助
- **GitHub Issues**: 报告bug和功能建议
- **项目文档**: 查看详细的技术文档
- **代码注释**: 代码中有详细的中文注释

### 贡献指南
1. Fork项目
2. 创建功能分支
3. 提交代码
4. 创建Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 
