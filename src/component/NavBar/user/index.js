/**
 * @class 用户信息
 * Created by fanpf on 2017/5/17.
 */
import React, {Component} from 'react';
import {Popover} from 'antd';
import 'whatwg-fetch';

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

class User extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      user: []
    }
  }

  render() {
    const list = (
      <div className="userinfo">
        <p><a href="#">个人中心</a></p>
        <p><a href="#">新版界面</a></p>
        <p><a href="#">退出</a></p>
      </div>
    )
    return (
      <div className="user">
        <Popover content={list} placement="topRight" >
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495021503373&di=0a038c09f2c1186f9284d220f7ae8064&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Dda2850f591eef01f4d4110c1d5ceb513%2F1b4c510fd9f9d72a0efef98cd12a2834359bbb8d.jpg"
            alt="" width="32" href="32"/>
          <a href="#">{this.state.user} <span className="caret"></span></a>
        </Popover>

        <div className="icon">
          <a href="http://www.baidu.com" target="_blank"><i className="icon-2x icon-gear"></i></a>
          <a href="#"><i className="icon-2x icon-question-sign"></i></a>
          <a href="#"><i className="icon-2x icon-play-circle"></i></a>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const that = this;
    const {user} = this.props;
    fetch(user)
      .then(status)
      .then(json)
      .then((data)=>{
        const {user} = that.state;
        const name = data.data.userName;
        that.setState({
          user : name
        })
      })
  }
}

export default User;