import React, { Component } from 'react'
import { Descriptions } from 'antd'

class JobDetailComponent extends Component {
  _isMounted = false // 这个变量是用来标志当前组件是否挂载
  state = {
    zkPath: '',
    jobName: '',
    cron: '',
    shardingTotalCount: null,
    url: '',
    reqType: null,
    description: '',
    reporter: '',
    expectResult: '',
    timeout: null,
    useAsync: null,
    jobStatus: '',
    status: '',
    timeCreated: ''
  }

  componentDidMount () {
    this._isMounted = true
    if (typeof (this.props.location.params) !== 'undefined') {
      console.log(this.props.location.params)
      this.setState({
        ...this.props.location.params
        // namespace: this.props.location.params.zkPath,
        // jobName: this.props.location.params.jobName,
        // cron: this.props.location.params.cron,
        // shardingTotalCount: this.props.location.params.shardingTotalCount,
        // url: this.props.location.params.url,
        // reqType: this.props.location.params.reqType,
        // description: this.props.location.params.description,
        // reporter: this.props.location.params.reporter,
        // expectResult: this.props.location.params.expectResult,
        // timeout: this.props.location.params.timeout,
        // useAsync: this.props.location.params.useAsync,
        // jobStatus: this.props.location.params.status,
        // status: this.props.location.params.status,
        // timeCreated: this.props.location.params.timeCreated
      })
    }
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  render () {
    return (
      <Descriptions title="作业详情" column={2} bordered>
        <Descriptions.Item label="命名空间">{this.state.zkPath}</Descriptions.Item>
        <Descriptions.Item label="作业名称">{this.state.jobName}</Descriptions.Item>
        <Descriptions.Item label="CRON表达式">{this.state.cron}</Descriptions.Item>
        <Descriptions.Item label="分片数">{this.state.shardingTotalCount}</Descriptions.Item>
        <Descriptions.Item label="请求地址">{this.state.url}</Descriptions.Item>
        <Descriptions.Item label="请求类型">{this.state.reqType === 1 ? 'post' : 'get'}</Descriptions.Item>
        <Descriptions.Item label="描述">{this.state.description}</Descriptions.Item>
        <Descriptions.Item label="报告人">{this.state.reporter}</Descriptions.Item>
        <Descriptions.Item label="期望结果">{this.state.expectResult}</Descriptions.Item>
        <Descriptions.Item label="超时时间(分钟)">{this.state.timeout}</Descriptions.Item>
        <Descriptions.Item label="是否同步">{this.state.useAsync === 1 ? '否' : '是'}</Descriptions.Item>
        <Descriptions.Item label="作业状态">{this.state.status === '0' ? '已下线' : '在线'}</Descriptions.Item>
        <Descriptions.Item label="状态">{this.state.status === '0' ? '已下线' : '在线'}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{this.state.timeCreated}</Descriptions.Item>
      </Descriptions>
    )
  }
}

export default JobDetailComponent
