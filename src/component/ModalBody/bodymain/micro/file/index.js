import React, {Component} from 'react';
import {Upload,Menu,Dropdown,message,Button,Icon,Input,Row,Col} from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="1">我的追随者</Menu.Item>
    <Menu.Item key="2">我的小组</Menu.Item>
    <Menu.Item key="3">追随者</Menu.Item>
  </Menu>
);

const props = {
  name : 'file',
  action : '//cloudcc.com/file',
  headers : {
    authorization : 'authorization-text'
  },
  onChange(info){
    if(info.file.status !== 'uploading'){
      console.log('uploading')
    }
    if(info.file.status === 'done'){
      console.log('done')
    }else if(info.file.status === 'error'){
      message.error(`${info.filename}`)
    }
  }
};
class File extends Component{
  render(){
    return(
      <div className="micro">
        <p>到
          <Dropdown overlay={menu} trigger={['click']}>
            <a href="#"> 我的追随者 <Icon type="caret-down"/></a>
          </Dropdown>
        </p>

        <Row className="upload">
          <Col span={24}>
            <Upload {...props}>
              <Button type="default">选择文件</Button> 最大文件大小为20M
            </Upload>
          </Col>
        </Row>
        <Input rows={3} type="textarea" className="content-input"/>

        <Row className="row">
          <Col offset={12} span={12} style={{textAlign:'right'}}>
            <Button type="primary" size="large">发表</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default File;