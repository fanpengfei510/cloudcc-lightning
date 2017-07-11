/**
 * @class 切换视图
 * Created by fanpf on 2017/5/18.
 */
import React,{Component} from 'react';
import {Icon,Menu,Dropdown} from 'antd';

//公用接口
const BASE_API = "http://localhost:3000";

//视图查看列表
const VIEW_LIST_API = BASE_API + "/vierlist";

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

class Tools extends Component{
  constructor(props){
    super(props);
    this.state = {
      viewlist : '最近查看'
    };

    this.viewlist = this.viewlist.bind(this);
  }

  viewlist = (e)=>{
    e.preventDefault();
    this.setState({
      viewlist : e.target.getAttribute('value')
    })
  };
  render(){
    const {viewToggle} = this.props;
    var result = viewToggle.map((value,index)=>{
      return (
        <Menu.Item key={value.id}><a href="#" onClick={this.viewlist} value={value.title}>{value.title}</a></Menu.Item>
      )
    })
    const menu = (
      <Menu className="view-dropdown" onClick={this.props.viewId}>
        <Menu.Item><a href="#" onClick={this.viewlist} value="最近查看">最近查看</a></Menu.Item>
        {result}
      </Menu>
    );
    return(
      <div>
        <div className="grap">
          <span className="view-grap"><i className="icon-2x icon-umbrella"></i></span>
        </div>
        <div className="view-body">
          <span className="sub-title">潜在客户</span>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="viewToggle" href="#">{this.state.viewlist} <Icon type="caret-down"/></a>
          </Dropdown>
        </div>
      </div>
    )
  }
};

export default Tools;