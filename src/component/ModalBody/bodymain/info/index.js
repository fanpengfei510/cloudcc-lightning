import React, {Component} from 'react';
import {Row, Col,Icon,Modal,Button,Input,Select,Tooltip} from 'antd';
const Option = Select.Option;

class Info extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      loading : false,
      visible : false
    }
  };

  showModal = ()=>{
    this.setState({visible:true})
  };

  handleCancel =()=>{
    this.setState({visible:false})
  };

  handleOk =()=>{
    this.setState({loading : true});
    setTimeout(()=>{
      this.setState({loading : false,visible : false})
    },3000);
  };
  render(){
    return(
      <div>
        <Modal
          visible={this.state.visible}
          title="基本信息"
          width='60%'
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>确定</Button>
          ]}
        >
          <div className="base-info">
            <Row>
              <Col span={12}>
                <div className="edit-box">
                  <div className="sub">
                    <Tooltip title="输入客户信息">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                    <span>客户名称</span>
                  </div>
                  <div className="main">
                    <Input />
                  </div>
                </div>
              </Col>
              <Col span={12} style={{textAlign : '-webkit-right'}}>
                <div className="edit-box">
                  <div className="sub">
                    <span>发票类型</span>
                  </div>
                  <div className="main">
                    <Select
                      showSearch
                      optionLabelProp="children"
                      style={{width:'200px'}}
                    >
                      <Option value='国税'>国税</Option>
                      <Option value='地税'>地税</Option>
                    </Select>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>

        <div className="base-info">
          <a href="#" className="title">基本信息</a>
          <Row>
            <Col span={12}>
              <div className="box">
                <div className="sub">
                  <Tooltip title="输入客户信息">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                  <span>客户名称</span>
                </div>
                <div className="main">
                  <span>孙经理</span>
                  <i className="icon-pencil"></i>
                </div>
              </div>
            </Col>
            <Col span={12} style={{textAlign : '-webkit-right'}}>
              <div className="box">
                <div className="sub">
                  <span>发票类型</span>
                </div>
                <div className="main">
                  <span>90</span>
                  <i className="icon-pencil"></i>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col span={12} >
              <div className="box">
                <div className="sub">
                  <span>电子邮件</span>
                </div>
                <div className="main">
                  <span>wangxinyu@163.com</span>
                  <i className="icon-pencil" onClick={this.showModal}></i>
                </div>
              </div>
            </Col>
            <Col span={12} style={{textAlign : '-webkit-right'}}>
              <div className="box">
                <div className="sub">
                  <span>自定义列表</span>
                </div>
                <div className="main">
                  <span></span>
                  <i className="icon-pencil"></i>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="base-info">
          <a href="#" className="title"><i className="icon-sort-down"></i>系统信息</a>
          <Row>
            <Col span={12}>
              <div className="box">
                <div className="sub">
                  <span>客户名称</span>
                </div>
                <div className="main">
                  <span>孙经理</span>
                  <i className="icon-pencil"></i>
                </div>
              </div>
            </Col>
            <Col span={12} style={{textAlign : '-webkit-right'}}>
              <div className="box">
                <div className="sub">
                  <span>发票类型</span>
                </div>
                <div className="main">
                  <span>90</span>
                  <i className="icon-pencil"></i>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col span={12} >
              <div className="box">
                <div className="sub">
                  <span>电子邮件</span>
                </div>
                <div className="main">
                  <span>wangxinyu@163.com</span>
                  <i className="icon-pencil"></i>
                </div>
              </div>
            </Col>
            <Col span={12} style={{textAlign : '-webkit-right'}}>
              <div className="box">
                <div className="sub">
                  <span>自定义列表</span>
                </div>
                <div className="main">
                  <span></span>
                  <i className="icon-pencil"></i>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
};

export default Info;