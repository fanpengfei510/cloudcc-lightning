/**
 * Created by fanpf on 2017/5/24.
 */
import React, {Component} from 'react';
import {Input,DatePicker,Select,Button} from 'antd';

class SavePhone extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      size : 'large'
    }
  }
  render(){
    return(
      <div className="active">
        <form action="#">
          <div className="search-input">
            <p>主题</p>
            <div>
              <Input placeholder="请输入内容" size={this.state.size}/>
              <a href="#">查找</a>
            </div>
          </div>

          <div className="time-input">
            <p>留言</p>
            <Input type="textarea" autosize={{minRows : 2,maxRows : 6}}/>
          </div>

          <div className="search-input">
            <p>名称</p>
            <div>
              <Input placeholder="请输入内容" size={this.state.size}/>
              <a href="#">查找</a>
            </div>
          </div>

          <div className="search-input">
            <p>相关项</p>
            <div>
              <Input placeholder="请输入内容" size={this.state.size}/>
              <a href="#">查找</a>
            </div>
          </div>

          <div className="btn">
            <Button type="primary" size={this.state.size}>发送</Button>
          </div>
        </form>
      </div>
    )
  }
};

export default SavePhone;