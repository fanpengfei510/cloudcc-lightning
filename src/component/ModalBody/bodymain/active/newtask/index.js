/**
 * Created by fanpf on 2017/5/24.
 */
import React, {Component} from 'react';
import {Input,DatePicker,Select,Button} from 'antd';

class NewTask extends Component{
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
            <p>到期日期</p>
            <DatePicker size={this.state.size}/>
          </div>
          <div className="search-input">
            <p><span>*</span> 被分配人</p>
            <div>
              <Input placeholder="请输入内容" size={this.state.size}/>
              <a href="#">查找</a>
            </div>
          </div>
          <div className="select-input">
            <p><span>*</span> 状态</p>
            <Select
              showSearch
              optionFilterProp="children"
              size={this.state.size}
            >
              <Option value="跟进">跟进</Option>
              <Option value="沟通中">沟通中</Option>
              <Option value="已签单">已签单</Option>
            </Select>
          </div>

          <div className="level">
            <p>优先级</p>
            <Select
              showSearch
              optionFilterProp="children"
              size={this.state.size}
            >
              <Option value="优先">优先</Option>
              <Option value="滞后">滞后</Option>
            </Select>
          </div>

          <div className="btn">
            <Button type="primary" size={this.state.size}>保存</Button>
          </div>
        </form>
      </div>
    )
  }
};

export default NewTask;