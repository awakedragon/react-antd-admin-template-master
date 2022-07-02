import React, { Component } from 'react'
import { Button, Collapse, Form, Input, message, Pagination, Select, Table, Tag, Divider } from 'antd'
import { zkJobList } from '@/api/zkJob'
import { getNameSpaceList } from '../../../api/gatJob'
import { listShardingInfo, startNow, deleteZKJob } from '../../../api/zkJob'
import ShardingForm from './forms/shardingForm'
import OperateZkJobForm from './forms/operateZkJobForm'

const { Column } = Table
const { Panel } = Collapse

class ZkJobComponent extends Component {
  _isMounted = false // 这个变量是用来标志当前组件是否挂载
  state = {
    list: [],
    namespaceList: [],
    shardingList: [],
    loading: false,
    total: 0,
    listQuery: {
      namespace: '',
      jobName: ''
    },
    editModalVisible: false,
    editModalLoading: false,
    showShardingModalVisible: false,
    showShardingModalLoading: false,
    operateZkJobModalVisible: false,
    operateZkJoModalLoading: false,
    currentRowData: {
      id: 0,
      zkPath: '',
      jobName: '',
      cron: '',
      url: ''
    }
  }

  fetchData = () => {
    zkJobList(this.state.listQuery).then((response) => {
      response = response.data
      if (response.code === 0) {
        const list = response.data.rows
        const total = response.data.total
        if (this._isMounted) {
          this.setState({ list, total })
        }
      } else {
        message.error('数据加载失败:' + response.msg, 3)
      }
    }).catch(e => {
      message.error('数据加载失败,请重试!', 3)
    })
  }

  resetForm = () => {
    this.setState({
      listQuery: {
        namespace: '',
        jobName: ''
      }
    })
  }

  fetchNameSpaceList = _ => {
    getNameSpaceList().then((response) => {
      response = response.data
      if (response.code === 0) {
        this.setState({
          namespaceList: response.data
        })
      } else {
        message.error('命名空间加载失败:' + response.msg, 3)
      }
    }).catch(e => {
      message.error('命名空间加载失败,请重试!', 3)
    })
  }

  componentDidMount () {
    this._isMounted = true
    this.setState({ loading: true })
    this.fetchData()
    this.fetchNameSpaceList()
    this.setState({ loading: false })
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  jobNameChange = (e) => {
    const value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        jobName: value
      }
    }))
  }

  nameSpaceChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        namespace: value
      }
    }))
  }

  changePage = (pageNumber, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          page: pageNumber
        }
      }),
      () => {
        this.fetchData()
      }
    )
  }

  changePageSize = (current, pageSize) => {
    this.setState(
      (state) => ({
        listQuery: {
          ...state.listQuery,
          page: 1,
          limit: pageSize
        }
      }),
      () => {
        this.fetchData()
      }
    )
  }

  showShardingModal = (row) => {
    let shardingListData = []
    const { zkPath, jobName } = row
    const requestParams = {
      namespace: zkPath,
      jobName
    }
    listShardingInfo(requestParams).then((response) => {
      this.setState({ showShardingModalVisible: false, showShardingbModalLoading: false })
      response = response.data
      if (response.code === 0) {
        shardingListData = response.data
      } else {
        message.error('查询分片详情失败:' + response.msg, 3)
      }
      this.setState({
        currentRowData: Object.assign({}, row),
        showShardingModalVisible: true,
        shardingList: shardingListData
      })
    }).catch(e => {
      message.error('查询分片详情失败:' + e.msg, 3)
    })
  }

  showStartNowZkJobModal = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      title: '执行',
      operation: '立即执行',
      operateZkJobModalVisible: true
    })
  }

  showDeleteZkJobJobModal = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      title: '删除',
      operation: '删除',
      operateZkJobModalVisible: true
    })
  }

  handleOperateZkJobOk = _ => {
    const { form } = this.operateZkJobFormRef.props
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      const values = {
        ...fieldsValue
      }
      this.setState({ operateGatJobModalLoading: true })
      switch (fieldsValue.title) {
        case '执行':
          this.startNowZkJobHandle(values, form)
          break
        case '删除':
          this.deleteZkJobHandle(values, form)
          break
        default:
          break
      }
    })
  }

  startNowZkJobHandle = (values, form) => {
    startNow(values).then((response) => {
      form.resetFields()
      this.setState({ operateZkJobModalVisible: false, operateZkJobModalLoading: false })
      response = response.data
      if (response.code === 0) {
        message.success('执行成功!', 3)
      } else {
        message.error('执行失败:' + response.msg, 3)
      }
      this.fetchData()
    }).catch(e => {
      message.error('执行失败,请重试!')
    })
  }

  deleteZkJobHandle = (values, form) => {
    deleteZKJob(values).then((response) => {
      form.resetFields()
      this.setState({ operateZkJobModalVisible: false, operateZkJobModalLoading: false })
      response = response.data
      if (response.code === 0) {
        message.success('删除成功!', 3)
      } else {
        message.error('删除失败:' + response.msg, 3)
      }
      this.fetchData()
    }).catch(e => {
      message.error('删除失败:' + e.msg, 3)
    })
  }

  handleShardingCancel = _ => {
    this.setState({
      showShardingModalVisible: false
    })
  }

  handleOperateZkJobCancel = _ => {
    this.setState({
      operateZkJobModalVisible: false
    })
  }

  renderNamespaceList = () => {
    return this.state.namespaceList.map(namespace => <Select.Option key={namespace} value={namespace}>{namespace}</Select.Option>)
  }

  render () {
    const greenButtonStyle = { color: '#fff', background: '#67c23a', borderColor: '#67c23a' }
    const orangeButtonStyle = { color: '#fff', background: '#ff8000', borderColor: '#ff8000' }
    const redButtonStyle = { color: '#fff', background: '#f56c6c', borderColor: '#f56c6c' }

    return (
      <div className="app-container">
        <Collapse defaultActiveKey={['1']}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="命名空间:">
                  <Select
                      showSearch
                    style={{ width: 200 }}
                    onChange={this.nameSpaceChange}
                    allowClear={true}>
                  {this.renderNamespaceList()}
                </Select>
              </Form.Item>
              <Form.Item label="作业名称:">
                <Input onChange={this.jobNameChange} style={{ width: 240 }}/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.fetchData} style={orangeButtonStyle}>
                  搜索
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.resetForm} style={orangeButtonStyle}>
                  重置
                </Button>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
        <br />
        <Table
          bordered
          rowKey={(record) => record.id}
          dataSource={this.state.list}
          loading={this.state.loading}
          pagination={false}>
        <Column title="序号" key="index" width={50} align="center" render={(text, record, index) => { return index + 1 }} />
        <Column title="ID" key="id" dataIndex="id" width={1} align="center" className="notshow" />
        <Column title="命名空间" dataIndex="zkPath" width={200} align="center"/>
        <Column title="作业名称" dataIndex="jobName" width={200} align="center"/>
        <Column title="作业表达式" dataIndex="cron" width={200} align="center"/>
        <Column title="分片数" dataIndex="shardingTotalCount" width={200} align="center"/>
        <Column title="作业描述" dataIndex="description" width={200} align="center"/>
        <Column title="作业状态" dataIndex="status" width={100} align="center"
                render = {(text, record) => {
                  if (record.status === 'OK' || record.status === 'SHARDING_FLAG') {
                    return (<Tag color="green">{record.status}</Tag>)
                  } else if (record.status === 'DISABLED' || record.status === 'CRASHED') {
                    return (<Tag color="red">{record.status}</Tag>)
                  } else {
                    return (<Tag color="gold">{record.status}</Tag>)
                  }
                }}
        />
        <Column title="指令" dataIndex="command" width={210} align="center"
                render= {(text, record) => {
                  if (record.status === '0') {
                    return (
                        <span>
                        <Button key="1" type="primary" size="small" onClick={this.showStartGatJobModal.bind(null, record)} style={greenButtonStyle}>启动</Button></span>
                    )
                  } else {
                    return (
                        <span>
                          <Button key="1" onClick={this.showShardingModal.bind(null, record)} type="primary" style={greenButtonStyle} size="small">分片</Button>
                          <Divider type="vertical" />
                          <Button key="2" onClick={this.showStartNowZkJobModal.bind(null, record)} type="primary" style={greenButtonStyle} size="small">执行</Button>
                          <Divider type="vertical" />
                          <Button key="3" onClick={this.showDeleteZkJobJobModal.bind(null, record)} type="primary" style={redButtonStyle} size="small">删除</Button>
                        </span>
                    )
                  }
                }
                }/>
        </Table>
        <br />
        <Pagination
          total={this.state.total}
          pageSizeOptions={['10', '20', '40']}
          showTotal={(total) => `共${total}条数据`}
          onChange={this.changePage}
          current={this.state.listQuery.page}
          onShowSizeChange={this.changePageSize}
          showSizeChanger
          showQuickJumper
          hideOnSinglePage={true}
        />
        <ShardingForm
            currentRowData={this.state.currentRowData}
            shardingList={this.state.shardingList}
            visible={this.state.showShardingModalVisible}
            confirmLoading={this.state.showShardingModalLoading}
            onCancel={this.handleShardingCancel}
        />
        <OperateZkJobForm
            currentRowData={this.state.currentRowData}
            wrappedComponentRef={operateZkJobFormRef => this.operateZkJobFormRef = operateZkJobFormRef}
            visible={this.state.operateZkJobModalVisible}
            confirmLoading={this.state.operateZkJoModalLoading}
            onCancel={this.handleOperateZkJobCancel}
            onOk={this.handleOperateZkJobOk}
            title={this.state.title}
            operation={this.state.operation}
        />
      </div>
    )
  }
}

export default ZkJobComponent
