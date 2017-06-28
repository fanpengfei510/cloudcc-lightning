/**
 * @class 切换视图
 * Created by fanpf on 2017/5/18.
 */
import React,{Component} from 'react';
import {Icon,Menu,Dropdown} from 'antd';

class Tools extends Component{
  constructor(props){
    super(props);
    this.state = {
      viewToggle : [],
    }
  }

  onText = (index)=>{
    console.log(index.key)
  }

  render(){
    var result = this.state.viewToggle.map((value,index)=>{
      return (
        <Menu.Item key={value.title}><a href="#">{value.title}</a></Menu.Item>
      )
    })
    const menu = (
      <Menu className="view-dropdown" onClick={this.onText}>
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
            <a className="viewToggle" href="#">{this.state.viewToggle[0] ? this.state.viewToggle[0].title : ''} <Icon type="caret-down"/></a>
          </Dropdown>
        </div>
      </div>
    )
  }

  componentDidMount(){

  }
};

export default Tools;