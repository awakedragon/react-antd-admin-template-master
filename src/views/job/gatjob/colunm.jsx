/* eslint-disable react/display-name */
import React from 'react'
import { Tag, Button, Divider } from 'antd'
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'

export default [
  {
    title: '序号',
    key: 'index',
    width: '50px',
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
    dataIndex: 'jobName',
    render: (text, record) => {
      return (<Link to={`/job/gatjobrecord?jobName=${text}`}>{text}</Link>)
    }
  },
  {
    title: '作业表达式',
    dataIndex: 'cron',
    width: '150px'
  },
  {
    title: '作业请求地址',
    dataIndex: 'url'
  },
  {
    title: '作业描述',
    dataIndex: 'description'
  },
  {
    title: '作业状态',
    dataIndex: 'status',
    render: (text, record) => {
      if (record.status === '0') {
        	return (<Tag color="red">已下线</Tag>)
      } else {
        return (<Tag color="green">在线</Tag>)
	  }
    }
  },
  {
    title: '指令',
    dataIndex: 'command',
    width: '217px',
    render: (text, record) => {
      if (record.status === '0') {
        return (
					<span>
						<Button key="1" type="primary" size="small">启动</Button>
					</span>
        )
      } else {
        return (
			<span>
				<Button key="1" type="primary" size="small">分片</Button>
				<Divider type="vertical" />
				<Button key="2" type="primary" size="small">执行</Button>
				<Divider type="vertical" />
				<Button key="3" type="default" size="small">终止</Button>
			</span>
        )
      }
    }
  },
  {
    title: '操作',
    dataIndex: 'operate',
    width: '217px',
    render: (text, record) => {
      if (record.status === '0') {
        return (
					<span>
						<Button key="1" type="primary" size="small">详情</Button>
						<Divider type="vertical" />
						<Button key="2" type="primary" size="small">编辑</Button>
						<Divider type="vertical" />
						<Button key="3" type="default" size="small">删除</Button>
					</span>
        )
      } else {
        return (
					<span>
						<Button key="1" type="primary" size="small">详情</Button>
					</span>
        )
      }
    }
  }
]
