import React, { Component } from 'react'
import { Button, Collapse, Divider, Form, Input, message, Pagination, Select, Table, Tag } from 'antd'
import AddGatJobForm from './forms/addGatJobForm'
import AddNameSpaceForm from './forms/addNameSpaceForm'
import OperateGatJobForm from './forms/operateGatJobForm'
import EditGatJobForm from './forms/editGatJobForm'
import { addGatJob, addNameSpace, deleteGatJob, gatJobList, updateAndRestart, updateGatJob, findSharding, getNameSpaceList, initGatJob, shutdownGatJob, startNow } from '../../../api/gatJob'
import ShardingForm from './forms/shardingForm'
import { Link } from 'react-router-dom'

const { Column } = Table
const { Panel } = Collapse

class GatJobComponent extends Component {
  _isMounted = false // 这个变量是用来标志当前组件是否挂载
  state = {
    list: [],
    namespaceList: [],
    loading: false,
    total: 0,
    listQuery: {
      page: 1,
      limit: 10,
      namespace: '',
      jonName: ''
    },
    addModalVisible: false,
    addModalLoading: false,
    addNameSpaceModalVisible: false,
    addNameSpaceModalLoading: false,
    editGatJobModalVisible: false,
    editGatJobModalLoading: false,
    operateGatJobModalVisible: false,
    operateGatJobModalLoading: false,
    editModalVisible: false,
    editModalLoading: false,
    showShardingModalVisible: false,
    showShardingModalLoading: false,
    currentRowData: {
      id: 0,
      zkPath: '',
      jobName: '',
      cron: '',
      url: ''
    },
    shardingList: []
  }

  fetchData = () => {
    gatJobList(this.state.listQuery).then((response) => {
      if (response.data.code === 0) {
        this.setState({
          list: response.data.data.rows,
          total: response.data.data.total
        })
      } else {
        message.error('数据加载失败:' + response.data.msg, 3)
      }
    }).catch(e => {
      message.error('数据加载失败,请重试!')
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

  nameSpaceChange = (value) => {
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        page: 1,
        namespace: value
      }
    }))
  }

  jobNameChange = (e) => {
    const value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        page: 1,
        jobName: value
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

  handleOk = _ => {
    const { form } = this.addGatJobFormRef.props
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      const values = {
        ...fieldsValue
      }
      this.setState({ addModalLoading: true })
      addGatJob(values).then((response) => {
        form.resetFields()
        this.setState({ addModalVisible: false, addModalLoading: false })
        if (response.data.code === 0) {
          message.success('添加作业成功!')
        } else {
          message.error('添加作业失败:' + response.msg, 3)
        }
        this.fetchData()
      }).catch(e => {
        message.error('添加作业失败,请重试!')
      })
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

  handleAddNameSpaceOk = _ => {
    const { form } = this.addNameSpaceFormRef.props
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      const values = {
        ...fieldsValue
      }
      this.setState({ addNameSpaceModalLoading: true })
      addNameSpace(values).then((response) => {
        form.resetFields()
        this.setState({ addNameSpaceModalVisible: false, addNameSpaceModalLoading: false })
        response = response.data
        if (response.code === 0) {
          message.success('创建成功!', 3)
        } else {
          message.error('创建失败:' + response.msg, 3)
        }
      }).catch(e => {
        message.error('创建失败:' + e.msg, 3)
      })
      this.fetchNameSpaceList()
    })
  }

  handleEditGatJobOk = _ => {
    const { form } = this.editGatJobFormRef.props
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      const values = {
        ...fieldsValue
      }
      this.setState({ editGatJobModalLoading: true })
      updateGatJob(values).then((response) => {
        form.resetFields()
        this.setState({ editGatJobModalVisible: false, editGatJobModalLoading: false })
        response = response.data
        if (response.code === 0) {
          message.success('修改成功!', 3)
        } else {
          message.error('修改失败:' + response.msg, 3)
        }
        this.fetchData()
      }).catch(e => {
        message.error('修改失败,请重试!')
      })
    })
  }

  handleTakeEffectGatJobOk = _ => {
    const { form } = this.editGatJobFormRef.props
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      const values = {
        ...fieldsValue
      }
      this.setState({ editGatJobModalLoading: true })
      updateAndRestart(values).then((response) => {
        form.resetFields()
        this.setState({ editGatJobModalVisible: false, editGatJobModalLoading: false })
        response = response.data
        if (response.code === 0) {
          message.success('保存并生效操作成功!', 3)
        } else {
          message.error('保存并生效操作失败:' + response.msg, 3)
        }
        this.fetchData()
      }).catch(e => {
        message.error('保存并生效操作失败,请重试!')
      })
    })
  }

  initGatJobHandler = (values, form) => {
    initGatJob(values).then((response) => {
      form.resetFields()
      this.setState({ operateGatJobModalVisible: false, operateGatJobModalLoading: false })
      response = response.data
      if (response.code === 0) {
        message.success('启动成功!', 3)
      } else {
        message.error('启动失败:' + response.msg, 3)
      }
      this.fetchData()
    }).catch(e => {
      message.error('启动失败,请重试!')
    })
  }

  shutdownGatJobHandle = (values, form) => {
    shutdownGatJob(values).then((response) => {
      form.resetFields()
      this.setState({ operateGatJobModalVisible: false, operateGatJobModalLoading: false })
      response = response.data
      if (response.code === 0) {
        message.success('终止成功!', 3)
      } else {
        message.error('终止失败:' + response.msg, 3)
      }
      this.fetchData()
    }).catch(e => {
      message.error('终止失败,请重试!')
    })
  }

  startNowGatJobHandle = (values, form) => {
    startNow(values).then((response) => {
      form.resetFields()
      this.setState({ operateGatJobModalVisible: false, operateGatJobModalLoading: false })
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

  deleteGatJobHandle = (values, form) => {
    deleteGatJob(values).then((response) => {
      form.resetFields()
      this.setState({ operateGatJobModalVisible: false, operateGatJobModalLoading: false })
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

  handleStartGatJobOk = _ => {
    const { form } = this.operateGatJobFormRef.props
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return
      }
      const values = {
        ...fieldsValue
      }
      this.setState({ operateGatJobModalLoading: true })
      switch (fieldsValue.title) {
        case '启动':
          this.initGatJobHandler(values, form)
          break
        case '终止':
          this.shutdownGatJobHandle(values, form)
          break
        case '执行':
          this.startNowGatJobHandle(values, form)
          break
        case '删除':
          this.deleteGatJobHandle(values, form)
          break
        default:
          break
      }
    })
  }

  handleAddNameSpaceCancel = _ => {
    this.setState({
      addNameSpaceModalVisible: false
    })
  }

  handleShardingCancel = _ => {
    this.setState({
      showShardingModalVisible: false
    })
  }

  showAddNameSpaceModal = () => {
    this.setState({
      addNameSpaceModalVisible: true
    })
  }

  showAddGatJobModal = () => {
    this.setState({
      addModalVisible: true
    })
  }

  showEditGatJobModal = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      editGatJobModalVisible: true
    })
  }

  showDeleteGatJobModal = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      title: '删除',
      operation: '删除',
      operateGatJobModalVisible: true
    })
  }

  showStartGatJobModal = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      title: '启动',
      operation: '上线',
      operateGatJobModalVisible: true
    })
  }

  showShutdownGatJobModal = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      title: '终止',
      operation: '终止',
      operateGatJobModalVisible: true
    })
  }

  showStartNowGatJobModal = (row) => {
    this.setState({
      currentRowData: Object.assign({}, row),
      title: '执行',
      operation: '立即执行',
      operateGatJobModalVisible: true
    })
  }

  showShardingModal = (row) => {
    let shardingListData = []
    const { id, zkPath } = row
    const requestParams = {
      id,
      namespace: zkPath
    }
    findSharding(requestParams).then((response) => {
      this.setState({ showShardingModalVisible: false, showShardingModalLoading: false })
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

  handleCancel = _ => {
    this.setState({
      addModalVisible: false
    })
  }

  handleEditGatJobCancel = _ => {
    this.setState({
      editGatJobModalVisible: false
    })
  }

  handleStartGatJobCancel = _ => {
    this.setState({
      operateGatJobModalVisible: false
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
              <Form.Item name='nameSpace' label="命名空间:">
                <Select
                    defaultValue={''}
                    showSearch
                    style={{ width: 200 }}
                    onChange={this.nameSpaceChange}
                    allowClear={true}
                >
                  {this.renderNamespaceList()}
                </Select>
              </Form.Item>
              <Form.Item name='jobName' label="作业名称:">
                <Input onChange={this.jobNameChange} style={{ width: 240 }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.fetchData} style={orangeButtonStyle}>
                  搜索
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="plus" onClick={this.showAddNameSpaceModal} style={orangeButtonStyle} >
                  添加命名空间
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="plus" onClick={this.showAddGatJobModal} style={orangeButtonStyle}>
                  添加作业
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
          <Column title="命名空间" dataIndex="zkPath" width={200} align="center"/>
          <Column title="作业名称" width={200} align="center"
                  render = {(text, record) => {
                    return <Link to={{
                      pathname: '/job/jobdetail',
                      params: record
                    }}>{record.jobName}</Link>
                  }}
          />
          <Column title="作业表达式" dataIndex="cron" width={200} align="center"/>
          <Column title="作业请求地址" dataIndex="url" width={200} align="center"/>
          <Column title="作业描述" dataIndex="description" width={200} align="center"/>
          <Column title="作业状态" dataIndex="status" width={100} align="center"
                  render = {(text, record) => {
                    if (record.status === '0') {
                      return (<Tag color="red">已下线</Tag>)
                    } else {
                      return (<Tag color="green">在线</Tag>)
                    }
                  }}
          />
          <Column title="指令" dataIndex="command" width={210} align="center"
                render= {(text, record) => {
                  if (record.status === '0') {
                    return (
                      <span><Button key="1" type="primary" size="small" onClick={this.showStartGatJobModal.bind(null, record)} style={greenButtonStyle}>启动</Button></span>
                    )
                  } else {
                    return (
                      <span>
                        <Button key="1" onClick={this.showShardingModal.bind(null, record)} type="primary" style={greenButtonStyle} size="small">分片</Button>
                        <Divider type="vertical" />
                        <Button key="2" onClick={this.showStartNowGatJobModal.bind(null, record)} type="primary" style={greenButtonStyle} size="small">执行</Button>
                        <Divider type="vertical" />
                        <Button key="3" onClick={this.showShutdownGatJobModal.bind(null, record)} type="primary" style={orangeButtonStyle} size="small">终止</Button>
                      </span>
                    )
                  }
                }
              }/>
          <Column title="操作" dataIndex="operate" width={210} align="center"
            render = {(text, record) => {
              if (record.status === '0') {
                return (
                  <span>
                    <Button key="1" type="primary" size="small" style={greenButtonStyle}>
                      <Link to={{ pathname: '/job/jobrecord', reqParams: record.jobName }}>详情</Link></Button>
                    <Divider type="vertical" />
                    <Button key="2" type="primary" size="small" onClick={this.showEditGatJobModal.bind(null, record)} style={orangeButtonStyle}>编辑</Button>
                    <Divider type="vertical" />
                    <Button key="3" type="default" size="small" onClick={this.showDeleteGatJobModal.bind(null, record)} style={redButtonStyle}>删除</Button>
                  </span>
                )
              } else {
                return (<span><Button key="1" type="primary" size="small" style={greenButtonStyle}><Link to={{ pathname: '/job/jobrecord', reqParams: record.jobName }}>详情</Link></Button></span>)
              }
            }}/>
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
        <AddGatJobForm
          wrappedComponentRef={addGatJobFormRef => this.addGatJobFormRef = addGatJobFormRef}
          visible={this.state.addModalVisible}
          confirmLoading={this.state.addModalLoading}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          namespaceList={this.state.namespaceList}
        />
        <EditGatJobForm
            currentRowData={this.state.currentRowData}
            wrappedComponentRef={editGatJobFormRef => this.editGatJobFormRef = editGatJobFormRef}
            visible={this.state.editGatJobModalVisible}
            confirmLoading={this.state.editGatJobModalLoading}
            onCancel={this.handleEditGatJobCancel}
            onOk={this.handleEditGatJobOk}
            onEffect={this.handleTakeEffectGatJobOk}
            namespaceList={this.state.namespaceList}
        />
        <OperateGatJobForm
            currentRowData={this.state.currentRowData}
            wrappedComponentRef={operateGatJobFormRef => this.operateGatJobFormRef = operateGatJobFormRef}
            visible={this.state.operateGatJobModalVisible}
            confirmLoading={this.state.operateGatJobModalLoading}
            onCancel={this.handleStartGatJobCancel}
            onOk={this.handleStartGatJobOk}
            title={this.state.title}
            operation={this.state.operation}
        />
        <AddNameSpaceForm
            wrappedComponentRef={addNameSpaceFormRef => this.addNameSpaceFormRef = addNameSpaceFormRef}
            visible={this.state.addNameSpaceModalVisible}
            confirmLoading={this.state.addNameSpaceModalLoading}
            onCancel={this.handleAddNameSpaceCancel}
            onOk={this.handleAddNameSpaceOk}
        />
        <ShardingForm
            currentRowData={this.state.currentRowData}
            shardingList={this.state.shardingList}
            visible={this.state.showShardingModalVisible}
            confirmLoading={this.state.showShardingModalLoading}
            onCancel={this.handleShardingCancel}
        />
      </div>
    )
  }
}

export default GatJobComponent
