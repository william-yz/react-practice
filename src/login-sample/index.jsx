import React from 'react'

import { Card, Form, Input, Checkbox, Button, Icon } from 'antd'

import './login.css'

const FormItem = Form.Item

export default function () {
  return (
    <div>
      <Card
        className="login-panel"
        title={(<div className="login-title">登录</div>)}
      >
        <Form>
          <FormItem
            validateStatus="warning"
            hasFeedback
            help="请输入正确的手机号码"
          >
            <Input
              prefix={<Icon type="user" style={{ fontSize: 13 }} />}
              placeholder="手机号"
              size="large"
            />
          </FormItem>
          <FormItem
            validateStatus="error"
            hasFeedback
            help="请输入正确的手机号码"
          >
            <Input
              placeholder="密码" size="large"
            />
          </FormItem>
          <FormItem>
            <Checkbox>下次自动登录</Checkbox>
            <a className="login-forgot">忘记密码了?</a>
            <Button type="primary" className="login-button" size="large">
              登录
            </Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  )
}
