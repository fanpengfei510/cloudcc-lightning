/**
 * @class 全站搜索框
 * Created by fanpf on 2017/5/17.
 */
import React,{Component} from 'react';
import {Input,Icon} from 'antd';

class Search extends Component{
  constructor(porps) {
    super(porps);
    this.state = {
      value : ''
    }
  }

  render(){
    const { userName } = this.state;
    const suffix = this.state.value ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return(
      <div>
        <Input
          type="text"
          prefix={<Icon type="search" />}
          placeholder="请输入内容..."
          value={this.state.value}
          onChange={this.onChangeUserName}
          suffix={suffix}
          size="large"
          onPressEnter={this.onEnter}
        />
      </div>
    )
  };

  emitEmpty=()=>{
    this.setState({ value: '' });
  };

  onChangeUserName =(e) =>{
    this.setState({
      value : e.target.value
    })
  };

  onEnter = () =>{
    alert('111')
  }
};

export default Search;