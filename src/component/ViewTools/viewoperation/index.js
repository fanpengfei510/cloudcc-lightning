/**
 * @class 标准工具
 * Created by fanpf on 2017/5/18.
 */
import React,{Component} from 'react';
import {Button,Icon,Menu,Dropdown,Radio,Modal,Row,Col,Tooltip,Select} from 'antd';
const Option = Select.Option;
import NewsModal from './createview'

class ViewOperation extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      visible : false,
      setting : false,
      delview : false
    };
    this.onShow = this.onShow.bind(this);
    this.onGrid = this.onGrid.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.onok = this.onok.bind(this);
    this.onclear = this.onclear.bind(this);
  }

  /*
   * @method 创建视图，编辑试图，删除试图操作
   */
  onShow = ({key})=> {
    switch({key}.key){
      case "1":
        this.setState({
          visible : true
        });
        break;
      case "2":
        this.setState({
          visible : true
        });
        break;
      case "3":
        console.log('3')
        break;
      case "4":
        this.setState({
          delview : true
        })
        break;
    }
  };

  /*
   * @method 选项卡页列表与看板切换
   */
  onGrid = ({key})=> {
    switch({key}.key){
      case "list":
        this.props.onClicked({
          grid : true
        });
        break;
      case "grid":
        this.props.onClicked({
          grid : false
        });
        break;
      case "setting":
        this.setState({
          setting : true
        });
        break;
    }
  };

  /*
   * @method 改变父级模态框状态
   */
  handleModal = (visible)=> {
    this.setState(visible)
  };

  onok = ()=>{
    this.setState({
      setting : false,
      delview : false
    })
  };

  onclear = ()=>{
    this.setState({
      setting : false,
      delview : false
    })
  };

  onEditTd = ()=> {
    console.log('编辑')
  };
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

        <Modal
          title="看板设置"
          visible={this.state.setting}
          onOk={this.onok}
          onCancel={this.onclear}
          width="45%"
        >
          <p style={{margin:'5px 0'}}>汇总方式</p>
          <Select defaultValue="--无--" style={{width:'100%',marginBottom:'15px'}} size="large">
            <Option value="总金额">总金额</Option>
            <Option value="年收入">年收入</Option>
            <Option value="员工数量">员工数量</Option>
          </Select>
          <p style={{margin:'5px 0'}}>分组项目</p>
          <Select defaultValue="--无--" style={{width:'100%'}} size="large">
            <Option value="更新状态">更新状态</Option>
            <Option value="潜在客户所有人">潜在客户所有人</Option>
            <Option value="潜在客户来源">潜在客户来源</Option>
          </Select>
        </Modal>

        <Modal
          title="删除视图"
          visible={this.state.delview}
          onOk={this.onok}
          onCancel={this.onclear}
        >
          <p>您确定是否删除此视图？</p>
        </Modal>

      </div>
    )
  }
};

export default ViewOperation;