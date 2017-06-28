/**
 * @class 顶部导航
 * Created by fanpf on 2017/5/17.
 */
import React, { Component } from 'react';
import {Row,Col} from 'antd';
import Search from './search'
import User from './user';
import Nav from './nav'
import sizeMe from 'react-sizeme';

import 'antd/dist/antd.css'
import '../../lib/css/font-awesome.css'
import '../../style/App.css';

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      prefix : ''
    }
  }

  changePrefix(prefix){
    this.setState({
      prefix : prefix
    })
  }
  render(){
    const {width} = this.props.size;
    return (
      <div>
        <Row className="header">
          <Row className="header-search">
            <Col span={6}>
              <img src="https://login.cloudcc.com/images/getApplogo.png" alt="神州云动" style={{height:'36px'}}/>
            </Col>
            <Col span={12}>
              {/*全站搜索框*/}
              <Search/>
            </Col>
            <Col span={6} style={{textAlign:'right'}}>
              {/*用户信息*/}
              <User/>
            </Col>
          </Row>
          <Row style={{width:width,overflow:'hidden'}}>
            {/*导航菜单*/}
            <Nav
              system={this.props.system}
              nav={this.props.nav}
              binding={this.props.binding}
              changePrefix={this.changePrefix.bind(this)}
            />
          </Row>
        </Row>
      </div>
    );
  };
  componentDidMount(){

  }
};

const config = {monitorWidth : true}
const sizeMeHOC = sizeMe(config)

export default sizeMeHOC(NavBar);
