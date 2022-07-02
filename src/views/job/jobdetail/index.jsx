import React, { Component, Row, Col, Space, Card, Typography } from 'react'
import { message } from 'antd'
import { jobRecordList } from '@/api/gatJob'

class JobDetailComponent extends Component {
  _isMounted = false // 这个变量是用来标志当前组件是否挂载
  state = {
    list: [],
    loading: false,
    total: 0,
    jobDetail: {}
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

    this.fetchData()
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
    return (
            <div className="app-container">
                <div>dfefee</div>
            </div>
    )
  }
}

export default JobDetailComponent
