import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
class OperateGatJobForm extends Component {
  render () {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading,
      currentRowData,
      title,
      operation
    } = this.props
    const { getFieldDecorator } = form
    const { id, jobName, zkPath } = currentRowData
    return (
      <Modal title={title} width="800px" visible={visible} onCancel={onCancel} onOk={onOk} confirmLoading={confirmLoading}>
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off">
            <p>{'确认【'} {operation} {'】命名空间为【'} {zkPath} {'】，作业名称为【'} {jobName} {'】的这条作业吗？'}</p>
            <Form.Item label="id:" name="id" hidden={true}>
                {getFieldDecorator('id', {
                  initialValue: id
                })(<Input placeholder="id"/>)}
            </Form.Item>
            <Form.Item label="命名空间:" name="namespace" hidden={true}>
                {getFieldDecorator('namespace', {
                  initialValue: zkPath
                })(<Input placeholder="命名空间"/>)}
            </Form.Item>
            <Form.Item label="作业名称:" name="jobName" hidden={true}>
                {getFieldDecorator('jobName', {
                  initialValue: jobName
                })(<Input placeholder="作业名称"/>)}
            </Form.Item>
            <Form.Item label="操作类型:" name="title" hidden={true}>
                {getFieldDecorator('title', {
                  initialValue: title
                })(<Input placeholder="操作类型"/>)}
            </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: 'OperateGatJobForm' })(OperateGatJobForm)
