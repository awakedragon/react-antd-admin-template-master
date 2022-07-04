import React, { Component } from 'react'
import {
  Table,
  Form,
  Button,
  Input,
  Collapse,
  Pagination, message
} from 'antd'
import { jobRecordList } from '@/api/gatJob'
import colunm from './colunm'

const { Panel } = Collapse

const columns = colunm.map((item) => {
  return item
})

class JobRecordComponent extends Component {
  _isMounted = false // 这个变量是用来标志当前组件是否挂载
  state = {
    list: [],
    loading: false,
    total: 0,
    listQuery: {
      page: 1,
      limit: 10,
      jobName: ''
    }
  }

  fetchData = () => {
    jobRecordList(this.state.listQuery).then((response) => {
      response = response.data
      if (response.code === 0) {
        this.setState({
          list: response.data.rows,
          total: response.data.total
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
    console.log(this.props.location.reqParams)
    if (typeof (this.props.location.reqParams) !== 'undefined') {
      this.setState(
        (state) => ({
          listQuery: {
            page: 1,
            limit: 10,
            jobName: this.props.location.reqParams
          }
        }),
        () => {
          this.fetchData()
        }
      )
    } else {
      this.fetchData()
    }
    this.setState({ loading: false })
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  queryByJobNameChange = (e) => {
    const value = e.target.value
    this.setState((state) => ({
      listQuery: {
        ...state.listQuery,
        jobName: value,
        page: 1
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

  render () {
    const orangeButtonStyle = { color: '#fff', background: '#ff8000', borderColor: '#ff8000' }
    return (
      <div className="app-container">
        <Collapse defaultActiveKey={['1']}>
          <Panel header="筛选" key="1">
            <Form layout="inline">
              <Form.Item label="作业名称:">
                <Input onChange={this.queryByJobNameChange} defaultValue={this.state.listQuery.jobName} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" icon="search" onClick={this.fetchData} style={orangeButtonStyle}>
                  搜索
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
          pagination={false}
          columns={columns}
        >
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
      </div>
    )
  }
}

export default JobRecordComponent
