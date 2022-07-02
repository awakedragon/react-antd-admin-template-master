import React, { Component } from 'react'
import { Modal, Form, Input, Select, Radio, InputNumber, Button } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

class EditGatJobForm extends Component {
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
      onEffect,
      form,
      confirmLoading,
      currentRowData
    } = this.props
    const { TextArea } = Input
    const { getFieldDecorator } = form
    const { id, zkPath, jobName, cron, shardingTotalCount, url, reqType, description, reporter, expectResult, timeout } = currentRowData
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 }
      },
      wrapperCol: {
        sm: { span: 16 }
      }
    }
    return (
      <Modal title="修改作业信息" width="800px" visible={visible} onCancel={onCancel} onOk={onOk} confirmLoading={confirmLoading}
             footer={[<Button key="cancel" onClick={onCancel}>取消</Button>,
               <Button key="confirm" type="primary" onClick={onOk}>确认</Button>,
               <Button key="saveAndTakeEffect" type="primary" onClick={onEffect}>保存并生效</Button>]}>
        <Form {...formItemLayout}>
          <Form.Item label="id:" name="id" hidden={true}>
            {getFieldDecorator('id', {
              initialValue: id
            })(<Input placeholder="id"/>)}
          </Form.Item>
          <Form.Item label="命名空间:">
            {getFieldDecorator('zkPath', {
              rules: [{ required: true, message: '命名空间必填' }],
              initialValue: zkPath
            })(<Select showSearch style={{ width: 240 }}>
              {/* eslint-disable-next-line react/prop-types */}
              {this.props.namespaceList.map(namespace => <Select.Option key={namespace} value={namespace}>{namespace}</Select.Option>)}
            </Select>)}
          </Form.Item>
          <Form.Item label="作业名称:" name="jobName">
            {getFieldDecorator('jobName', {
              rules: [{ required: true, message: '作业名称必填' }],
              initialValue: jobName
            })(<Input placeholder="作业名称"/>)}
          </Form.Item>
          <Form.Item label="CRON表达式:" name="cron">
            {getFieldDecorator('cron', {
              rules: [{ required: true, message: 'CRON必填' }],
              initialValue: cron
            })(<Input placeholder="CRON表达式，例如：0 5 1 * * ?"/>)}
          </Form.Item>
          <Form.Item label="作业分片总数:">
            {getFieldDecorator('shardingTotalCount', {
              rules: [{ required: true, message: '作业分片总数必填' }],
              initialValue: shardingTotalCount
            })(<InputNumber min={1} />)}
          </Form.Item>
          <Form.Item label="作业URL:">
            {getFieldDecorator('url', {
              rules: [{ required: true, message: '作业URL必填' }],
              initialValue: url
            })(<TextArea rows={2} placeholder="作业URL" />)}
          </Form.Item>
          <Form.Item label="请求类型:">
            {getFieldDecorator('reqType', {
              rules: [{ required: true, message: '请求类型必选' }],
              initialValue: reqType
            })(<Radio.Group>
              <Radio value={1} > post </Radio>
              <Radio value={2} > get </Radio>
            </Radio.Group>)}
          </Form.Item>
          <Form.Item label="作业描述" name="description">
            {getFieldDecorator('description', {
              initialValue: description
            })(<TextArea rows={2} placeholder="作业描述" />)}
          </Form.Item>
          <Form.Item label="报告人" name="reporter">
            {getFieldDecorator('reporter', {
              initialValue: reporter
            })(<Input placeholder="报告人（工号，以逗号分隔）" />)}
          </Form.Item>
          <Form.Item label="期望结果">
            {getFieldDecorator('expectResult', {
              initialValue: expectResult
            })(<Input />)}
          </Form.Item>
          <Form.Item label="超时时间(分钟)" name="timeout">
            {getFieldDecorator('timeout', {
              initialValue: timeout
            })(<InputNumber min={1} />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: 'EditGatJobForm' })(EditGatJobForm)
