import React, {Component} from "react";
import {Button, Form, message, Modal, Table, Tag} from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import {disableSharding, enableSharding, findSharding} from "../../../../api/gatJob";

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
        findSharding(requestParams).then((response) => {
            response = response.data;
            if (response.code === 0) {
                shardingListData = response.data;
            } else {
                message.error("查询分片详情失败:" + response.msg, 5);
            }
            this.setState({
                list: shardingListData,
            });
        }).catch(e => {
            message.error("查询分片详情失败:" + e.msg, 5);
        })
    }

    takeEffect = (row, id, zkPath) => {
        const { item } = row;
        var requestParams = {
            id: id,
            namespace: zkPath,
            item: item,
        }
        enableSharding(requestParams).then((response) => {
            this.setState({ operateGatJobModalVisible: false, operateGatJobModalLoading: false });
            response = response.data;
            if (response.code === 0) {
                message.success("生效成功");
                this.fetchData(requestParams);
            } else {
                message.error("生效失败:" + response.msg, 5);
            }
        }).catch(e => {
            message.error("生效失败:" + e.msg, 5);
        })
    };

    loseEfficacy = (row, id, zkPath) => {
        const { item } = row;
        var requestParams = {
            id: id,
            namespace: zkPath,
            item: item,
        }
        disableSharding(requestParams).then((response) => {
            this.setState({ operateGatJobModalVisible: false, operateGatJobModalLoading: false });
            response = response.data;
            if (response.code === 0) {
                message.success("失效操作成功");
                this.fetchData(requestParams);
            } else {
                message.error("失效操作失败:" + response.msg, 5);
            }
        }).catch(e => {
            message.error("失效操作失败:" + e.msg, 5);
        })
    };

  render() {

      let greenButtonStyle = { color: "#fff", background: "#67c23a", borderColor: "#67c23a" }
      let redButtonStyle = { color: "#fff", background: "#ff8000", borderColor: "#ff8000" }

      const { visible, onCancel, confirmLoading, currentRowData } = this.props;
      const { id, zkPath } = currentRowData;

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
                              return (<Button key="1" type="primary" size="small" onClick={this.takeEffect.bind(null, record, id, zkPath)} style={greenButtonStyle}>生效</Button>);
                          } else {
                              return (<Button key="1" type="primary" size="small" onClick={this.loseEfficacy.bind(null, record, id, zkPath)} style={redButtonStyle}>失效</Button>);
                          }}}/>/>
          </Table>
      </Modal>
    );
  }
}

export default Form.create({ name: "ShardingForm" })(ShardingForm);
