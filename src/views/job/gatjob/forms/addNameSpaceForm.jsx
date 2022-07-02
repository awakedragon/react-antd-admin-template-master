import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
class AddNameSpaceForm extends Component {
  render () {
    const {
      visible,
      onCancel,
      onOk,
      form,
      confirmLoading
    } = this.props

    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 }
      },
      wrapperCol: {
        sm: { span: 16 }
      }
    }
    return (
      <Modal title="新增命名空间" width="800px" visible={visible} onCancel={onCancel} onOk={onOk} confirmLoading={confirmLoading}>
        <Form {...formItemLayout}>
          <Form.Item label="命名空间:">
            {getFieldDecorator('namespace', {
              rules: [{ required: true, message: '命名空间必填' }]
            })(<Input placeholder="命名空间"/>)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({ name: 'AddNameSpaceForm' })(AddNameSpaceForm)
