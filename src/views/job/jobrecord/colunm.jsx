/* eslint-disable react/display-name */
import React from 'react'
import { Tag } from 'antd'
import moment from 'moment'

export default [
  {
    title: '序号',
    key: 'index',
    dataIndex: 'index',
    hideInSearch: true,
    render: (text, record, index) => {
      return index + 1
    }
  },
  {
    title: '作业名称',
    key: 'jobName',
    dataIndex: 'jobName',
    hideInSearch: false,
    filters: true,
    onFilter: true
  },
  {
    title: '结果',
    key: 'statusCode',
    hideInSearch: true,
    render: (text, record) => {
      const statusCode = record.statusCode
      const body = record.body
      return (
          <span>{ statusCode } | { body }</span>
      )
    }
  },
  {
    title: '错误类型',
    key: 'errorType',
    dataIndex: 'errorType',
    hideInSearch: true
  },
  {
    title: '错误信息',
    key: 'errorMsg',
    dataIndex: 'errorMsg',
    hideInSearch: true
  },
  {
    title: '作业状态',
    key: 'status',
    hideInSearch: true,
    render: (text, record) => {
      if (record.status === 1) {
        return (
          <Tag color="green">成功</Tag>
        )
      } else if (record.status === 2) {
        return (
          <Tag color="red">失败</Tag>
        )
      } else if (record.status === 3) {
        return (
          <Tag color="blue">执行中</Tag>
        )
      } else {
        return (
          <Tag color="red">等待回调</Tag>
        )
      }
    }
  },
  {
    title: '开始时间',
    key: 'startTime',
    hideInSearch: true,
    render: (text, record) => {
      const startTime = moment(new Date(record.startTime)).format('YYYY-MM-DD HH:mm:ss')
      return (
        <div>
          {startTime}
        </div>
      )
    }
  },
  {
    title: '完成时间',
    key: 'completeTime',
    dataIndex: 'completeTime',
    hideInSearch: true,
    render: (text, record) => {
      const completeTime = moment(new Date(record.completeTime)).format('YYYY-MM-DD HH:mm:ss')
      return (
        <div>
          {completeTime}
        </div>
      )
    }
  }
]
