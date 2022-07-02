import React, {Component} from "react";
import {Button, Form, message, Modal, Table, Tag} from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import {disableSharding, enableSharding, listShardingInfo} from "../../../../api/zkJob";

moment.locale("zh-cn");
const { Column } = Table;

class ShardingForm extends Component {

    state = {
        list: [],
        loading: false,
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            list: nextProps.shardingList
        });
    }

    fetchData = (requestParams) => {
        let shardingListData = [];
        listShardingInfo(requestParams).then((response) => {
            response = response.data;
            if (response.code === 0) {
                shardingListData = response.data;
            } else {
                message.error("查询分片详情失败:" + response.msg, 3);
            }
            this.setState({
                list: shardingListData,
            });
        }).catch(e => {
            message.error("查询分片详情失败:" + e.msg, 3);
        })
    }

    takeEffect = (row, zkPath, jobName) => {
        const { item } = row;
        var requestParams = {
            jobName: jobName,
            namespace: zkPath,
            item: item,
        }
        enableSharding(requestParams).then((response) => {
            response = response.data;
            if (response.code === 0) {
                message.success("生效成功");
                this.fetchData(requestParams);
            } else {
                message.error("生效失败:" + response.msg, 3);
            }
        }).catch(e => {
            message.error("生效失败:" + e.msg, 3);
        })
    };

    loseEfficacy = (row, zkPath, jobName) => {
        const { item } = row;
        var requestParams = {
            namespace: zkPath,
            jobName: jobName,
            item: item,
        }
        disableSharding(requestParams).then((response) => {
            this.setState({ operateGatJobModalVisible: false, operateGatJobModalLoading: false });
            response = response.data;
            if (response.code === 0) {
                message.success("失效操作成功");
                this.fetchData(requestParams);
            } else {
                message.error("失效操作失败:" + response.msg, 3);
            }
        }).catch(e => {
            message.error("失效操作失败:" + e.msg, 3);
        })
    };

  render() {

      let greenButtonStyle = { color: "#fff", background: "#67c23a", borderColor: "#67c23a" }
      let redButtonStyle = { color: "#fff", background: "#ff8000", borderColor: "#ff8000" }

      const { visible, onCancel, confirmLoading, currentRowData } = this.props;
      const { zkPath, jobName } = currentRowData;

    return (
      <Modal title="分片详情" width="800px" visible={visible} onCancel={onCancel} confirmLoading={confirmLoading}
             footer={[<Button key="back" onClick={onCancel}>关闭</Button>]}>
          <Table
              bordered
              rowKey={(record) => record.id}
              dataSource={this.state.list}
              loading={this.state.loading}
              pagination={false}>
              <Column title="分片项" dataIndex="item" align="center"/>
              <Column title="服务器IP" dataIndex="serverIp" align="center"/>
              <Column title="进程ID" dataIndex="instanceId" align="center"/>
              <Column title="状态" dataIndex="status" align="center"
                      render = {(text, record) => {
                          if (record.status === 'OK' || record.status === 'SHARDING_FLAG') {
                              return (<Tag color="green">{record.status}</Tag>);
                          }  else if (record.status === 'DISABLED' || record.status === 'CRASHED') {
                              return (<Tag color="red">{record.status}</Tag>);
                          } else {
                              return (<Tag color="gold">{record.status}</Tag>);
                          }}}/>/>
              <Column title="操作" dataIndex="description" align="center"
                      render = {(text, record) => {
                          if (record.status === 'DISABLED') {
                              return (<Button key="1" type="primary" size="small" onClick={this.takeEffect.bind(null, record, zkPath, jobName)} style={greenButtonStyle}>生效</Button>);
                          } else {
                              return (<Button key="1" type="primary" size="small" onClick={this.loseEfficacy.bind(null, record, zkPath, jobName)} style={redButtonStyle}>失效</Button>);
                          }}}/>/>
          </Table>
      </Modal>
    );
  }
}

export default Form.create({ name: "ShardingForm" })(ShardingForm);
