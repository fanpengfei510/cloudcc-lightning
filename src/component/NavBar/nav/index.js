/**
 * @class 导航
 * Created by fanpf on 2017/5/18.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {Row, Col, Menu, Modal} from 'antd';
import 'whatwg-fetch';

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.resolve(new Error(response.statusText))
  }
}

function json(response) {
  return response.json();
}

class Nav extends Component {
  constructor(porps) {
    super(porps);
    this.state = {
      loading: false,
      visible: false,
      systemItem: [],
      tabname: [],
      systemtext: "CloudCC",
      navId: "",
      bg: ['#ED8B00', '#963CBD', '#FFC72C', '#7EC4F1', '#BAAC93',
        '#418FDE', '#CF4747', '#BF398A', '#96E943', '#81EFA5',
        '#A3C589', '#6542DD', '#ED8B00', '#963CBD', '#FFC72C',
        '#7EC4F1', '#BAAC93', '#418FDE', '#CF4747', '#BF398A',
        '#96E943', '#81EFA5', '#A3C589', '#6542DD',],
      icon: ['icon-globe', 'icon-group', 'icon-bookmark', 'icon-calendar', 'icon-list-ol',
        'icon-cloud', 'icon-pencil', 'icon-desktop', 'icon-puzzle-piece', 'icon-folder',
        'icon-asterisk', 'icon-bell', 'icon-tachometer', 'icon-cube', 'icon-filter',
        'icon-fire', 'icon-leaf', 'icon-refresh', 'icon-send', 'icon-sitemap'],
    }
  }

  /*
   * @method 切换系统应用模态框
   */
  showModal = () => {
    this.setState({
      visible: true
    })
  }

  /*
   * @method 关闭系统应用模态框
   */
  handlecancel = () => {
    this.setState({visible: false})
  }

  /*
   * @method 点击系统应用切换
   */
  systemToggle = (e) => {

  };

  render() {
    const {visible, loading, systemItem, tabname, bg, icon} = this.state;
    var nodes = systemItem.map((value, index) => {
      return (
        <li key={value.id}>
          <div style={{whiteSpace: 'nowrap'}}>
            <span className="grap" style={{background: bg[index - 1]}}><i className={icon[index - 1]}></i></span>
            <div className="box">
              <a href="home_mainPage.action">{value.items}</a>
              <p>{value.items}</p>
            </div>
          </div>
        </li>
      )
    });

    var navbar = tabname.map((value, index) => {
      if (value.type == 'object') {
        return (
          <Menu.Item key={value.id}><a href="#" onClick={this.nav_link}>{value.tabname}</a></Menu.Item>
        );
      } else {
        return (
          <Menu.Item key={value.id}><a href={value.url}>{value.tabname}</a></Menu.Item>
        );
      }
    });

    return (
      <div style={{padding: "0 15px"}}>
        <Row>
          <Col className="nav-system">
            <a href="#" className="system-toogle ">
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <span onClick={this.showModal}>{this.state.systemtext}</span>
            </a>
          </Col>
          <Col className="nav-menu">
            <Menu
              mode="horizontal"
            >
              {navbar}
              <Menu.Item key="all"><a href="#">全部选项卡</a></Menu.Item>
            </Menu>
          </Col>
        </Row>

        <Modal
          width='80%'
          height="95%"
          visible={visible}
          title="全部应用程序"
          onOk={this.handleOk}
          onCancel={this.handlecancel}
          footer={null}
          style={{top: 30}}
        >
          <p className="systemSub">共有{systemItem.length}个系统</p>
          <ul className="systemContent clearfix">
            {nodes}
          </ul>
        </Modal>
      </div>
    )
  }

  componentDidMount() {
    let that = this;
    const {system,binding,nav} = this.props;
    fetch(system + binding,{
      credentials : 'include'
    })
      .then(status)
      .then(json)
      .then((data)=>{
        const systemItem = that.state.systemItem;
        let item = data.data.map((value,index)=>{
          return {
            items : value.label,
            id : value.id
          }
        });
        that.setState({
          systemItem : item
        })
      });

    this.getData(nav);
  }

  getData(url){
    var that = this;
    fetch(url)
      .then(status)
      .then(json)
      .then((data)=>{
        var tabname = that.state.tabname;
        console.log(data)
        var item = data.data.map((value,index)=>{
          return {
            tabname : value.tabName,
            id : value.id,
            url : value.url
          }
        });
        that.setState({
          tabname : item
        })
      })
  }
};

export default Nav;