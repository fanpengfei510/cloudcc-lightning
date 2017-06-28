/**
 * Created by fanpf on 2017/5/24.
 */
import React, {Component} from 'react';
import {Input,Form,Button} from 'antd';
const FormItem = Form.Item;

const search = (
  <a href="#">查找</a>
)

class SendEmail extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      size : 'large'
    }
  }
  render(){
    const formlayout = {
      labelCol : {
        sm : {span : 5}
      },
      wrapperCol : {
        sm : {span : 19}
      }
    };

    return(
      <div className="active">
        <Form>
          <FormItem
            label="发件人"
            {...formlayout}
          >
            <Input/>
          </FormItem>
          <FormItem
            label="收件人"
            {...formlayout}
          >
            <Input addonAfter={search}/>
          </FormItem>
          <FormItem
            label="密件抄送"
            {...formlayout}
          >
            <Input/>
          </FormItem>
          <FormItem
            label="主题"
            {...formlayout}
          >
            <Input/>
          </FormItem>
          <FormItem>
            <Input type="textarea" autosize={{minRows : 4,maxRows : 6}}/>
          </FormItem>

          <FormItem className="btn">
            <Button type="primary" size={this.state.size}>保存</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
};

export default SendEmail;