/**
 * @class 视图操作
 * Created by fanpf on 2017/5/18.
 */
import React, {Component} from 'react';
import {Button, Radio, Icon, Menu, Dropdown} from 'antd'
import 'whatwg-fetch';
const SubMenu = Menu.SubMenu;

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  else {
    return Promise.reject(new Error(response.statusText));
  }
}
function json(response) {
  return response.json();
}

class ViewButton extends Component {
  render() {
    const {btn} = this.props;
    var nodes = btn.map((value,index)=>{
      if(index < 3){
        return (
          <Radio.Button value={value.name} key={index}>{value.name}</Radio.Button>
        )
      }
    });

    var node = btn.map((value,index)=>{
      if(index > 2){
        return (
          <Menu.Item key={index} value={value.name}>{value.name}</Menu.Item>
        )
      }
    })

    const menu = (
      <Menu className="view-btn-dropdown">
        {node}
        <SubMenu title="报表">
          <Menu.Item key="1">济南报工统计</Menu.Item>
          <Menu.Item key="2">月度报工工时</Menu.Item>
          <Menu.Item key="3">本月报工KPI</Menu.Item>
          <Menu.Item key="4">上周工作总结（汇总日报工）</Menu.Item>
        </SubMenu>
        <SubMenu title="工具">
          <Menu.Item key="5">批量发送电子邮件</Menu.Item>
          <Menu.Item key="6">批量发送短信</Menu.Item>
          <Menu.Item key="7">查重合并</Menu.Item>
        </SubMenu>
      </Menu>
    );

    return (
      <div style={{textAlign: "right"}}>
        <Radio.Group size="large">
          {nodes}
          <Dropdown overlay={menu} trigger={['click']}>
            <Radio.Button value="down"><Icon type="caret-down"/></Radio.Button>
          </Dropdown>
        </Radio.Group>
      </div>
    )
  }

  componentDidMount(){
    const that = this;
    const {viewbtn} = this.props;
    fetch(viewbtn)
      .then(status)
      .then(json)
      .then((data)=>{
        const {btn} = that.state;
        const item = data.data.listBtn.map((value,index)=>{
          return {
            name : value.label,
            id : value.id
          }
        });
        that.setState({
          btn : item
        })
      })
  }
};

export default ViewButton;