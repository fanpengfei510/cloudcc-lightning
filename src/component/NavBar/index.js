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

import '../../lib/css/font-awesome.css'
//公用接口
const BASE_API = "http://localhost:3000";
//用户信息
const SIGN_API = BASE_API + "/user";

//所有应用接口
const SYSTEM_API = BASE_API + "/applist";

//导航栏
const NAV_API = BASE_API + "/tabname";
class NavBar extends Component {
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
              <User
                user={SIGN_API}
              />
            </Col>
          </Row>
          <Row style={{width:width,overflow:'hidden',height:38}}>
            {/*导航菜单*/}
            <Nav
              system={SYSTEM_API}
              nav={NAV_API}
              binding={this.props.binding}
              prefix={this.props.prefix}
              getViewSelect={this.props.getViewSelect}
            />
          </Row>
        </Row>
      </div>
    );
  };
};

const config = {monitorWidth : true}
const sizeMeHOC = sizeMe(config)

export default sizeMeHOC(NavBar);
