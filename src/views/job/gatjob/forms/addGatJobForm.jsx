import React, { Component } from 'react'
import { Modal, Form, Input, Select, Radio, InputNumber } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const formItemLayout = {
  labelCol: {
    sm: { span: 4 }
  },
  wrapperCol: {
    sm: { span: 16 }
  }
}

const { TextArea } = Input

class AddGatJobForm extends Component {
  _isMounted = false // 这个变量是用来标志当前组件是否挂载
  state = {
    loading: false
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render () {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading
    } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal title="新增作业" width="800px" visible={visible} onCancel={onCancel} onOk={onOk} confirmLoading={confirmLoading}>
        <Form {...formItemLayout}>
          <Form.Item label="命名空间:">
            {getFieldDecorator('zkPath', {
              rules: [{ required: true, message: '命名空间必填' }]
            })(<Select showSearch style={{ width: 260 }}>
              {this.props.namespaceList.map(namespace => <Select.Option key={namespace} value={namespace}>{namespace}</Select.Option>)}
            </Select>)}
          </Form.Item>
          <Form.Item label="作业名称:" name="jobName">
            {getFieldDecorator('jobName', {
              rules: [{ required: true, message: '作业名称必填' }]
            })(<Input placeholder="作业名称"/>)}
          </Form.Item>
          <Form.Item label="CRON表达式:" name="cron">
            {getFieldDecorator('cron', {
              rules: [{ required: true, message: 'CRON必填' }]
            })(<Input placeholder="CRON表达式，例如：0 5 1 * * ?"/>)}
          </Form.Item>
          <Form.Item label="作业分片总数:">
            {getFieldDecorator('shardingTotalCount', {
              rules: [{ required: true, message: '作业分片总数必填' }],
              initialValue: 1
            })(<InputNumber min={1} />)}
          </Form.Item>
          <Form.Item label="作业URL:">
            {getFieldDecorator('url', {
              rules: [{ required: true, message: '作业URL必填' }]
            })(<TextArea rows={2} placeholder="作业URL" />)}
          </Form.Item>
          <Form.Item label="请求类型:">
            {getFieldDecorator('reqType', {
              rules: [{ required: true, message: '请求类型必选' }],
              initialValue: 1
            })(<Radio.Group>
              <Radio value={1} > post </Radio>
              <Radio value={2} > get </Radio>
            </Radio.Group>)}
          </Form.Item>
          <Form.Item label="作业描述" name="description">
            {getFieldDecorator('description')(<TextArea rows={2} placeholder="作业描述" />)}
          </Form.Item>
          <Form.Item label="报告人" name="reporter">
            {getFieldDecorator('reporter')(<Input placeholder="报告人（工号，以逗号分隔）" />)}
          </Form.Item>
          <Form.Item label="期望结果">
            {getFieldDecorator('expectResult', {
              initialValue: 'OK'
            })(<Input />)}
          </Form.Item>
          <Form.Item label="超时时间(分钟)" name="timeout">
            {getFieldDecorator('timeout', {
              initialValue: 1
            })(<InputNumber min={1} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: 'AddGatJobForm' })(AddGatJobForm)
