import React, {Component} from 'react';
import {Menu,Dropdown,Icon,Input,Row,Col,Button} from 'antd';

const onClick = function({key}){
  console.log({key})
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">我的追随者</Menu.Item>
    <Menu.Item key="2">我的小组</Menu.Item>
    <Menu.Item key="3">所有人</Menu.Item>
  </Menu>
)

class Post extends Component{
  render(){
    return(
      <div className="micro">
        <p>到
          <Dropdown overlay={menu} trigger={['click']}>
            <a href="#"> 我的追随者 <Icon type="caret-down"/></a>
          </Dropdown>
        </p>
        <Input type="textarea" rows={3} className="content-input"/>

        <Row className="row">
          <Col span={12} style={{textAlign:'left',lineHeight : '32px'}}>
            <Icon type="link" title="添加附件"/>
            <Icon type="user-add" title="添加人员"/>
          </Col>
          <Col span={12} style={{textAlign:'right'}}>
            <Button type="primary" size="large">发表</Button>
          </Col>
        </Row>
      </div>
    )
  }
};

export default Post;