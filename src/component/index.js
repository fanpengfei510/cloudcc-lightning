import React, {Component} from 'react';
import {Row, Col, Modal, Button} from 'antd';
import NavBar from './NavBar';
import Tools from './ViewTools';
import TableList from './TableList';
import TableGrid from './TableGrid';
import "whatwg-fetch";
import request from './NetRequest';

import 'antd/dist/antd.css'
import '../style/App.css';

//公用接口
const BASE_API = "http://localhost:3000";

//登录接口，获得banding
const SIGN_API = BASE_API + "/user";

//所有应用接口
const SYSTEM_API = BASE_API + "/applist";

//导航栏
const NAV_API = BASE_API + "/tabname";

//视图查看列表
const VIEW_LIST_API = BASE_API + "/vierlist";

//视图操作按钮
const VIEW_BtN = BASE_API + "/viewbtn";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: true,
      cookieBinding: ""
    }
  }

  /*
   * @method 列表与看板切换
   */
  handleState = (state) => {
    this.setState(state)
  };

  render() {
    const {grid, cookieBinding} = this.state;
    return (
      <div>

        {/*导航菜单*/}
        <NavBar
          system={SYSTEM_API}
          nav={NAV_API}
          binding={cookieBinding}
        />

        {/*视图查看，标准工作*/}
        <Tools
          onToggle={this.handleState.bind(this)}
        />

        {/*列表与看板切换*/}
        {grid ? <TableList /> : <TableGrid />}
      </div>
    );
  };

  componentDidMount() {
    /**
     *  @method 用户登录信息
     */

  };
}

function getCookie(cookie_name) {
  var allcookies = document.cookie;
  var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度
  // 如果找到了索引，就代表cookie存在，
  // 反之，就说明不存在。
  if (cookie_pos != -1) {
    // 把cookie_pos放在值的开始，只要给值加1即可。
    cookie_pos += cookie_name.length + 1;
    var cookie_end = allcookies.indexOf(";", cookie_pos);
    if (cookie_end == -1) {
      cookie_end = allcookies.length;
    }
    //这里就可以得到你想要的cookie的值了。。。
    var value = unescape(allcookies.substring(cookie_pos, cookie_end));
  }
  return value;
}

export default App;
