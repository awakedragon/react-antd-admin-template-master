/* eslint-disable react/display-name */
import React from 'react'
import { Tag, Button, Divider } from 'antd'

export default [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => {
      return index + 1
    }
  },
  {
    title: '命名空间',
    dataIndex: 'zkPath'
  },
  {
    title: '作业名称',
    dataIndex: 'jobName'
  },
  {
    title: '作业表达式',
    dataIndex: 'cron'
  },
  {
    title: '分片数',
    dataIndex: 'shardingTotalCount'
  },
  {
    title: '作业描述',
    dataIndex: 'description'
  },
  {
    title: '作业状态',
    dataIndex: 'status',
    render: (text, record) => {
      if (record.status === 'OK' || record.status === 'SHARDING_FLAG') {
        return (<Tag color="green">{record.status}</Tag>)
      } else if (record.status === 'DISABLED' || record.status === 'CRASHED') {
        return (<Tag color="red">{record.status}</Tag>)
      } else {
        return (<Tag color="gold">{record.status}</Tag>)
      }
    }
  },
  {
    title: '操作',
    dataIndex: 'operate',
    render: (text, record) => {
      return (
				<span>
					<Button key="1" type="primary" size="small">分片</Button>
					<Divider type="vertical" />
					<Button key="2" type="primary" size="small">执行</Button>
					<Divider type="vertical" />
					<Button key="3" type="default" size="small">删除</Button>
				</span>
      )
    }
  }
]
