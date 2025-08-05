# 订阅管理系统 - API接口文档

## 📋 概述

本文档详细描述了订阅管理系统的所有API接口，包括认证方式、请求格式、响应格式和错误处理。

**相关文档**：
- [开发文档中心](./开发文档中心.md) - 详细的技术架构和开发指南
- [快速开始指南](./快速开始指南.md) - 5分钟快速启动项目

### 🔐 认证方式

系统使用API Key进行认证，需要在请求头中包含：

```
Authorization: Bearer your_api_key_here
```

### 📊 响应格式

所有API响应都遵循统一的JSON格式：

```json
{
  "success": true,
  "data": {},
  "message": "操作成功",
  "timestamp": "2024-12-19T10:30:00Z"
}
```

### ❌ 错误响应格式

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": {}
  },
  "timestamp": "2024-12-19T10:30:00Z"
}
```

## 🏥 健康检查

### GET /api/health

检查服务健康状态

**请求参数**: 无

**响应示例**:
```json
{
  "message": "Subscription Management Backend is running!",
  "status": "healthy"
}
```

## 📊 订阅管理接口

### 获取订阅列表

#### GET /api/subscriptions

获取所有订阅列表

**查询参数**:
- `status` (可选): 订阅状态筛选 (active, trial, cancelled)
- `category` (可选): 分类筛选
- `search` (可选): 搜索关键词
- `page` (可选): 页码，默认1
- `limit` (可选): 每页数量，默认20

**响应示例**:
```json
{
  "success": true,
  "data": {
    "subscriptions": [
      {
        "id": 1,
        "name": "Netflix",
        "plan": "Standard",
        "billing_cycle": "monthly",
        "next_billing_date": "2024-01-15",
        "last_billing_date": "2023-12-15",
        "amount": 29.99,
        "currency": "USD",
        "payment_method_id": 1,
        "start_date": "2023-01-01",
        "status": "active",
        "category_id": 1,
        "renewal_type": "auto",
        "notes": "流媒体服务",
        "website": "https://netflix.com",
        "created_at": "2023-12-19T10:30:00Z",
        "updated_at": "2023-12-19T10:30:00Z",
        "category": {
          "id": 1,
          "value": "video",
          "label": "Video Streaming"
        },
        "payment_method": {
          "id": 1,
          "value": "creditcard",
          "label": "Credit Card"
        }
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 20
  }
}
```

### 获取单个订阅

#### GET /api/subscriptions/:id

获取指定ID的订阅详情

**路径参数**:
- `id`: 订阅ID

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Netflix",
    "plan": "Standard",
    "billing_cycle": "monthly",
    "next_billing_date": "2024-01-15",
    "last_billing_date": "2023-12-15",
    "amount": 29.99,
    "currency": "USD",
    "payment_method_id": 1,
    "start_date": "2023-01-01",
    "status": "active",
    "category_id": 1,
    "renewal_type": "auto",
    "notes": "流媒体服务",
    "website": "https://netflix.com",
    "created_at": "2023-12-19T10:30:00Z",
    "updated_at": "2023-12-19T10:30:00Z",
    "category": {
      "id": 1,
      "value": "video",
      "label": "Video Streaming"
    },
    "payment_method": {
      "id": 1,
      "value": "creditcard",
      "label": "Credit Card"
    }
  }
}
```

### 创建订阅

#### POST /api/protected/subscriptions

创建新的订阅

**请求体**:
```json
{
  "name": "Netflix",
  "plan": "Standard",
  "billing_cycle": "monthly",
  "next_billing_date": "2024-01-15",
  "amount": 29.99,
  "currency": "USD",
  "payment_method_id": 1,
  "start_date": "2023-01-01",
  "status": "active",
  "category_id": 1,
  "renewal_type": "auto",
  "notes": "流媒体服务",
  "website": "https://netflix.com"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Netflix",
    "plan": "Standard",
    "billing_cycle": "monthly",
    "next_billing_date": "2024-01-15",
    "last_billing_date": null,
    "amount": 29.99,
    "currency": "USD",
    "payment_method_id": 1,
    "start_date": "2023-01-01",
    "status": "active",
    "category_id": 1,
    "renewal_type": "auto",
    "notes": "流媒体服务",
    "website": "https://netflix.com",
    "created_at": "2023-12-19T10:30:00Z",
    "updated_at": "2023-12-19T10:30:00Z"
  },
  "message": "订阅创建成功"
}
```

### 更新订阅

#### PUT /api/protected/subscriptions/:id

更新指定ID的订阅

**路径参数**:
- `id`: 订阅ID

**请求体**: 同创建订阅，但字段都是可选的

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Netflix Premium",
    "plan": "Premium",
    "billing_cycle": "monthly",
    "next_billing_date": "2024-01-15",
    "last_billing_date": "2023-12-15",
    "amount": 39.99,
    "currency": "USD",
    "payment_method_id": 1,
    "start_date": "2023-01-01",
    "status": "active",
    "category_id": 1,
    "renewal_type": "auto",
    "notes": "流媒体服务",
    "website": "https://netflix.com",
    "created_at": "2023-12-19T10:30:00Z",
    "updated_at": "2023-12-19T10:35:00Z"
  },
  "message": "订阅更新成功"
}
```

### 删除订阅

#### DELETE /api/protected/subscriptions/:id

删除指定ID的订阅

**路径参数**:
- `id`: 订阅ID

**响应示例**:
```json
{
  "success": true,
  "message": "订阅删除成功"
}
```

### 批量导入订阅

#### POST /api/protected/subscriptions/bulk

批量导入订阅数据

**请求体**:
```json
{
  "subscriptions": [
    {
      "name": "Netflix",
      "plan": "Standard",
      "billing_cycle": "monthly",
      "next_billing_date": "2024-01-15",
      "amount": 29.99,
      "currency": "USD",
      "payment_method_id": 1,
      "start_date": "2023-01-01",
      "status": "active",
      "category_id": 1,
      "renewal_type": "auto",
      "notes": "流媒体服务",
      "website": "https://netflix.com"
    }
  ]
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "imported": 1,
    "errors": [],
    "total": 1
  },
  "message": "批量导入成功"
}
```

## 📈 分析接口

### 获取费用统计

#### GET /api/analytics/expenses

获取费用统计信息

**查询参数**:
- `period` (可选): 统计周期 (monthly, yearly, all)
- `year` (可选): 年份
- `month` (可选): 月份

**响应示例**:
```json
{
  "success": true,
  "data": {
    "total_monthly": 299.99,
    "total_yearly": 3599.88,
    "by_category": [
      {
        "category": "Video Streaming",
        "amount": 89.97,
        "percentage": 30.0
      }
    ],
    "by_payment_method": [
      {
        "payment_method": "Credit Card",
        "amount": 299.99,
        "percentage": 100.0
      }
    ],
    "trend": [
      {
        "month": "2024-01",
        "amount": 299.99
      }
    ]
  }
}
```

### 获取即将到期的订阅

#### GET /api/analytics/upcoming-renewals

获取即将到期的订阅列表

**查询参数**:
- `days` (可选): 天数，默认30

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Netflix",
      "next_billing_date": "2024-01-15",
      "amount": 29.99,
      "currency": "USD",
      "days_until_renewal": 5
    }
  ]
}
```

### 获取最近支付的订阅

#### GET /api/analytics/recently-paid

获取最近支付的订阅列表

**查询参数**:
- `days` (可选): 天数，默认30

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Netflix",
      "last_billing_date": "2023-12-15",
      "amount": 29.99,
      "currency": "USD",
      "days_since_payment": 4
    }
  ]
}
```

## 💰 支付历史接口

### 获取支付历史

#### GET /api/payment-history

获取支付历史列表

**查询参数**:
- `subscription_id` (可选): 订阅ID筛选
- `start_date` (可选): 开始日期
- `end_date` (可选): 结束日期
- `status` (可选): 支付状态 (succeeded, failed, refunded)
- `page` (可选): 页码
- `limit` (可选): 每页数量

**响应示例**:
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "id": 1,
        "subscription_id": 1,
        "payment_date": "2023-12-15",
        "amount_paid": 29.99,
        "currency": "USD",
        "billing_period_start": "2023-12-15",
        "billing_period_end": "2024-01-14",
        "status": "succeeded",
        "notes": "自动续费",
        "created_at": "2023-12-15T10:30:00Z",
        "subscription": {
          "id": 1,
          "name": "Netflix",
          "plan": "Standard"
        }
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 20
  }
}
```

### 创建支付记录

#### POST /api/protected/payment-history

创建新的支付记录

**请求体**:
```json
{
  "subscription_id": 1,
  "payment_date": "2023-12-15",
  "amount_paid": 29.99,
  "currency": "USD",
  "billing_period_start": "2023-12-15",
  "billing_period_end": "2024-01-14",
  "status": "succeeded",
  "notes": "自动续费"
}
```

### 更新支付记录

#### PUT /api/protected/payment-history/:id

更新支付记录

**路径参数**:
- `id`: 支付记录ID

### 删除支付记录

#### DELETE /api/protected/payment-history/:id

删除支付记录

**路径参数**:
- `id`: 支付记录ID

## ⚙️ 设置接口

### 获取设置

#### GET /api/settings

获取系统设置

**响应示例**:
```json
{
  "success": true,
  "data": {
    "currency": "CNY",
    "theme": "system",
    "show_original_currency": true
  }
}
```

### 更新设置

#### PUT /api/protected/settings

更新系统设置

**请求体**:
```json
{
  "currency": "USD",
  "theme": "dark",
  "show_original_currency": false
}
```

## 💱 汇率接口

### 获取汇率列表

#### GET /api/exchange-rates

获取所有汇率

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "from_currency": "CNY",
      "to_currency": "USD",
      "rate": 0.1538,
      "created_at": "2023-12-19T10:30:00Z",
      "updated_at": "2023-12-19T10:30:00Z"
    }
  ]
}
```

### 更新汇率

#### PUT /api/protected/exchange-rates

更新汇率数据

**请求体**:
```json
{
  "rates": [
    {
      "from_currency": "CNY",
      "to_currency": "USD",
      "rate": 0.1538
    }
  ]
}
```

### 手动更新汇率

#### POST /api/protected/exchange-rates/update

手动触发汇率更新

**响应示例**:
```json
{
  "success": true,
  "data": {
    "updated_count": 8,
    "last_update": "2023-12-19T10:30:00Z"
  },
  "message": "汇率更新成功"
}
```

## 📂 分类和支付方式接口

### 获取分类列表

#### GET /api/categories

获取所有分类

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "value": "video",
      "label": "Video Streaming",
      "created_at": "2023-12-19T10:30:00Z",
      "updated_at": "2023-12-19T10:30:00Z"
    }
  ]
}
```

### 创建分类

#### POST /api/protected/categories

创建新分类

**请求体**:
```json
{
  "value": "gaming",
  "label": "Gaming"
}
```

### 更新分类

#### PUT /api/protected/categories/:value

更新分类

**路径参数**:
- `value`: 分类值

**请求体**:
```json
{
  "value": "gaming",
  "label": "Gaming & Entertainment"
}
```

### 删除分类

#### DELETE /api/protected/categories/:value

删除分类

**路径参数**:
- `value`: 分类值

### 获取支付方式列表

#### GET /api/payment-methods

获取所有支付方式

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "value": "creditcard",
      "label": "Credit Card",
      "created_at": "2023-12-19T10:30:00Z",
      "updated_at": "2023-12-19T10:30:00Z"
    }
  ]
}
```

### 创建支付方式

#### POST /api/protected/payment-methods

创建新支付方式

**请求体**:
```json
{
  "value": "alipay",
  "label": "Alipay"
}
```

### 更新支付方式

#### PUT /api/protected/payment-methods/:value

更新支付方式

**路径参数**:
- `value`: 支付方式值

### 删除支付方式

#### DELETE /api/protected/payment-methods/:value

删除支付方式

**路径参数**:
- `value`: 支付方式值

## 📊 月度分类汇总接口

### 获取月度汇总

#### GET /api/monthly-category-summary

获取月度分类汇总数据

**查询参数**:
- `year` (可选): 年份
- `month` (可选): 月份

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "year": 2024,
      "month": 1,
      "category_id": 1,
      "total_amount_in_base_currency": 89.97,
      "base_currency": "CNY",
      "transactions_count": 3,
      "updated_at": "2023-12-19T10:30:00Z",
      "category": {
        "id": 1,
        "value": "video",
        "label": "Video Streaming"
      }
    }
  ]
}
```

### 更新月度汇总

#### POST /api/protected/monthly-category-summary/update

手动更新月度汇总数据

**响应示例**:
```json
{
  "success": true,
  "data": {
    "updated_records": 5,
    "last_update": "2023-12-19T10:30:00Z"
  },
  "message": "月度汇总更新成功"
}
```

## 🔄 订阅续费调度器接口

### 获取调度器状态

#### GET /api/subscription-renewal-scheduler/status

获取订阅续费调度器状态

**响应示例**:
```json
{
  "success": true,
  "data": {
    "is_running": true,
    "last_run": "2023-12-19T10:30:00Z",
    "next_run": "2023-12-20T10:30:00Z",
    "processed_count": 5,
    "error_count": 0
  }
}
```

### 手动处理续费

#### POST /api/protected/subscription-renewal-scheduler/process

手动触发订阅续费处理

**响应示例**:
```json
{
  "success": true,
  "data": {
    "processed": 3,
    "errors": 0,
    "details": [
      {
        "subscription_id": 1,
        "status": "renewed",
        "next_billing_date": "2024-01-15"
      }
    ]
  },
  "message": "续费处理完成"
}
```

## ❌ 错误代码

| 错误代码 | 描述 | HTTP状态码 |
|---------|------|-----------|
| `INVALID_API_KEY` | API密钥无效 | 401 |
| `MISSING_API_KEY` | 缺少API密钥 | 401 |
| `SUBSCRIPTION_NOT_FOUND` | 订阅不存在 | 404 |
| `CATEGORY_NOT_FOUND` | 分类不存在 | 404 |
| `PAYMENT_METHOD_NOT_FOUND` | 支付方式不存在 | 404 |
| `INVALID_BILLING_CYCLE` | 无效的计费周期 | 400 |
| `INVALID_STATUS` | 无效的状态 | 400 |
| `INVALID_CURRENCY` | 无效的货币 | 400 |
| `DUPLICATE_CATEGORY` | 分类已存在 | 409 |
| `DUPLICATE_PAYMENT_METHOD` | 支付方式已存在 | 409 |
| `FOREIGN_KEY_CONSTRAINT` | 外键约束违反 | 400 |
| `VALIDATION_ERROR` | 数据验证错误 | 400 |
| `INTERNAL_ERROR` | 内部服务器错误 | 500 |

## 📝 数据格式说明

### 日期格式
所有日期字段使用ISO 8601格式：`YYYY-MM-DD`

### 时间戳格式
所有时间戳字段使用ISO 8601格式：`YYYY-MM-DDTHH:mm:ssZ`

### 货币格式
- 金额字段使用 `DECIMAL(10,2)` 格式
- 汇率字段使用 `DECIMAL(15,8)` 格式

### 枚举值

#### 订阅状态 (status)
- `active`: 活跃
- `trial`: 试用
- `cancelled`: 已取消

#### 计费周期 (billing_cycle)
- `monthly`: 月付
- `yearly`: 年付
- `quarterly`: 季付

#### 续费类型 (renewal_type)
- `auto`: 自动续费
- `manual`: 手动续费

#### 支付状态 (status)
- `succeeded`: 成功
- `failed`: 失败
- `refunded`: 已退款

#### 主题 (theme)
- `light`: 浅色主题
- `dark`: 深色主题
- `system`: 跟随系统

---

*最后更新: 2024年12月*
*版本: 1.0.0* 