import React, {Component} from 'react';
import {Input,DatePicker,Select,Button} from 'antd';

class NewEvent extends Component{
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
            <p><span>*</span> 开始时间</p>
            <DatePicker size={this.state.size}/>
          </div>

          <div className="time-input">
            <p><span>*</span> 结束时间</p>
            <DatePicker size={this.state.size}/>
          </div>

          <div className="search-input">
            <p>被分配人</p>
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

          <div className="btn">
            <Button type="primary" size={this.state.size}>保存</Button>
          </div>
        </form>
      </div>
    )
  }
};

export default NewEvent;