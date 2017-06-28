/**
 * Created by fanpf on 2017/5/23.
 */
import React, {Component} from 'react';
import {Row,Col,Button,Radio,Menu,Dropdown,Icon,Tooltip,Affix} from 'antd';

const viewmode = (
  <Menu>
    <Menu.Item key="1">编辑</Menu.Item>
    <Menu.Item key="2">复制</Menu.Item>
    <Menu.Item key="3">删除</Menu.Item>
    <Menu.Item key="4">共享</Menu.Item>
    <Menu.Item key="5">查找重复</Menu.Item>
    <Menu.Item key="6">提交批量审批</Menu.Item>
  </Menu>
);

class BodyTitle extends Component{
  render(){
    return(

      <div style={{padding:"25px 20px"}}>
        <div className="opertaion">
          <Tooltip title="全屏">
            <Icon type="arrows-alt" onClick={this.props.handleScreen}/>
          </Tooltip>
          <Tooltip title="关闭">
            <Icon type="close" onClick={this.props.handleClose}/>
          </Tooltip>
        </div>
        <Row className="body-title">
          <Col span={12}>
            <i className="icon-desktop"></i>
            <h4>客户：<span>吴磊 详细信息</span></h4>
          </Col>
          <Col span={12} style={{textAlign:'right'}}>
            <Button type="default">+ 新建</Button>
            <Radio.Group style={{marginLeft : 10}}>
              <Radio.Button>新建对象</Radio.Button>
              <Dropdown overlay={viewmode} trigger={['click']}>
                <Radio.Button><Icon type="caret-down"/></Radio.Button>
              </Dropdown>
            </Radio.Group>

            <Radio.Group style={{marginLeft : 10}}>
              <Radio.Button value="out" className="btnGroup"><i className="icon-signin"></i></Radio.Button>
              <Radio.Button value="print" className="btnGroup"><i className="icon-print"></i></Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
      </div>

    )
  }
};

export default BodyTitle;