/**
 * Created by fanpf on 2017/5/23.
 */
import React, {Component} from 'react';
import {Table} from 'antd';

const columns = [
  {
    title : '操作',
    dataIndex : 'operation',
    render : text => <a href="#">{text}</a>
  },{
  title: '姓名',
  dataIndex: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
}, {
  title: '地址',
  dataIndex: 'address',
}, {
    title: '电话',
    dataIndex: 'phone',
  }, {
    title: '金额',
    dataIndex: 'price',
  }];

const data = [{
  key: '1',
  operation : '编辑',
  name: '王宇',
  age: 32,
  address: '北京市海淀区',
  phone: '13552526565',
  price: '100,000'
}, {
  key: '2',
  operation : '编辑',
  name: '孙鑫',
  age: 42,
  address: '中关村硅谷大厦',
  phone: '13552526565',
  price: '100,000'
}, {
  key: '3',
  operation : '编辑',
  name: '赵玉琳',
  age: 32,
  address: '朝阳国贸',
  phone: '13552526565',
  price: '100,000'
}];

class List extends Component{
  constructor(porps) {
    super(porps);
    this.state = {
      pagination : false
    }
  }
  render(){
    return(
      <div>
        <div className="list-title">
          <div className="title">
            <span className="grap"><i className="icon-user"></i></span>
            <h4>联系人(<span>10+</span>)</h4>
          </div>
          <Table {...this.state} columns={columns} dataSource={data} size='small'/>
        </div>
        <div className="list-title">
          <div className="title">
            <span className="grap"><i className="icon-user"></i></span>
            <h4>联系人(<span>10+</span>)</h4>
          </div>
          <Table {...this.state} columns={columns} dataSource={data} size='small'/>
        </div>
      </div>
    )
  }
};

export default List;