/**
 * @class 标准工具
 * Created by fanpf on 2017/5/18.
 */
import React,{Component} from 'react';
import {Button,Icon,Menu,Dropdown,Radio,Modal,Row,Col,Tooltip} from 'antd';

import NewsModal from './createview'

class ViewOperation extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      visible : false
    }
  }

  /*
   * @method 创建视图，编辑试图，删除试图操作
   */
  onShow = ({key})=> {
    switch({key}.key){
      case "1":
        this.setState({
          visible : true
        })
        break;
      case "2":
        this.setState({
          visible : true
        })
        break;
    }
  };

  /*
   * @method 选项卡页列表与看板切换
   */
  onGrid = ({key})=> {
    if({key}.key=="list"){
      this.props.onClicked({
      grid : true
      })
    }else if({key}.key=="grid"){
      this.props.onClicked({
        grid : false
        })
    }
  };

  /*
   * @method 改变父级模态框状态
   */
  handleModal = (visible)=> {
    this.setState(visible)
  };

  onEditTd = ()=> {
    console.log('编辑')
  }
  render(){
    const viewmode = (
      <Menu  onClick={this.onShow}>
        <Menu.Item key="1">创建新视图</Menu.Item>
        <Menu.Item key="2">编辑视图</Menu.Item>
        <Menu.Item key="3">视图排序</Menu.Item>
        <Menu.Item key="4">删除视图</Menu.Item>
      </Menu>
    );

    const displaymode = (
      <Menu onClick={this.onGrid}>
        <Menu.Item key="list"><i className="icon-th-list"></i>列表显示</Menu.Item>
        <Menu.Item key="grid"><i className="icon-th"></i>网格显示</Menu.Item>
        <Menu.Item key="setting"><i className="icon-gears"></i>看板设置</Menu.Item>
      </Menu>
    );
    return(
      <div>
        {/*新建视图，编辑视图模态框*/}
        <NewsModal visible={this.state.visible} toggleModal={this.handleModal.bind(this)}/>
        <div style={{textAlign : "right"}} className="view-tools">
          <Dropdown overlay={viewmode} trigger={['click']}>
            <Button><i className="icon-gear"></i><Icon type="caret-down"/></Button>
          </Dropdown>
          <Dropdown overlay={displaymode} trigger={['click']}>
            <Button><i className="icon-th-list"></i><Icon type="caret-down"/></Button>
          </Dropdown>
          <Button><i className="icon-filter"></i></Button>
          <Button><i className="icon-pencil" onClick={this.onEditTd}></i></Button>
          <Radio.Group style={{marginLeft : 4}}>
            <Radio.Button value="out" className="btnGroup"><i className="icon-signin"></i></Radio.Button>
            <Radio.Button value="print" className="btnGroup"><i className="icon-print"></i></Radio.Button>
          </Radio.Group>
        </div>
      </div>
    )
  }
};

export default ViewOperation;