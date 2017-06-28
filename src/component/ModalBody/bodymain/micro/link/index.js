import React, {Component} from 'react';
import {Menu,Dropdown,Icon,Form,Input,Button} from 'antd';
const FormItem = Form.Item;

const menu = (
  <Menu>
    <Menu.Item key="1">我的追随者</Menu.Item>
    <Menu.Item key="2">我的小组</Menu.Item>
    <Menu.Item key="3">所有人</Menu.Item>
  </Menu>
)
class Link extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      formLayout : 'vertical'
    }
  }
  render(){
    return(
      <div className="micro">
        <p>到
          <Dropdown overlay={menu} trigger={['click']}>
            <a href="#"> 我的追随者 <Icon type="caret-down"/></a>
          </Dropdown>
        </p>

        <Form>
          <FormItem
            label="链接URL"
          >
          <Input />
          </FormItem>

          <FormItem
            label="链接名称"
          >
            <Input />
          </FormItem>

          <FormItem>
            <Input type="textarea" rows={3} className="content-input"/>
          </FormItem>

          <FormItem style={{textAlign : 'right'}}>
            <Button type="primary" size="large">发表</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Link;