import React, {Component} from 'react';
import {Row, Col, Modal, Button,Input,Icon} from 'antd';
import NavBar from './NavBar';
import Tools from './ViewTools';
import TableList from './TableList';
import TableGrid from './TableGrid';
import EditableCell from './TableList/tableedit';
import SelectCell from './TableList/tableedit/select'
import TimeCell from './TableList/tableedit/time';
import "whatwg-fetch";
import request from './NetRequest';
import ReactModal from 'react-modal';
import ModalBody from './ModalBody';

import '../style/App.css';

//公用接口
const BASE_API = "http://localhost:3000";

//视图查看列表
const VIEW_LIST_API = BASE_API + "/vierlist";

//视图操作按钮
const VIEW_BtN = BASE_API + "/viewbtn";

//选项卡列表表头
const LIST_HEAD = BASE_API + "/listhead";

//选项卡列表内容
const LIST_CONTENT = BASE_API + '/listcontent';

//看板信息
const VIEW_BOARD = BASE_API + '/viewboard';

//看板第二个接口信息
const VIEW_BOARD2 = BASE_API + '/viewboard2';

//高级搜索
const SEARCH = BASE_API + '/search&objPrefix=';

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  else {
    return Promise.reject(new Error(response.statusText));
  }
}
function json(response) {
  return response.json();
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: true,
      cookieBinding: "",
      viewToggle : [],
      prefix:"",
      btn:[],
      column : [],
      viewid :"",
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
      content : [],
      showModal : false,
    };

    this.getviewid = this.getviewid.bind(this);
    this.getlist = this.getlist.bind(this);
    this.getContent = this.getContent.bind(this);
    this.viewid = this.viewid.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  /*
   * @method 列表与看板切换
   */
  handleState = (state) => {
    this.setState(state)
  };

  /*
   * @method 导航元素点击获取prefix更改视图列表内容
   */
  prefix = (value)=>{
    //视图切换列表
    const that = this;
    const viewid = getCookie('viewId');
    this.getlist(value.prefix)
    this.getContent(value.prefix,viewid)
    //视图操作按钮和列表数据头
    this.getviewid(value.prefix,viewid)

  };

  viewid = (value)=>{
    this.getviewid("001",value.key)
  };

  handleClose = ()=>{
    this.setState({
      showModal : false
    })
  };

  render() {
    const {grid, cookieBinding,viewToggle,prefix,btn,column,content} = this.state;
    return (
      <div>
        {/*滑动显示详情页*/}
        <div>
          <ReactModal
            isOpen={this.state.showModal}
            contentLable="onRequestClose Example"
            className="Modal"
            overlayClassName="Overlay"
          >
            <ModalBody onClose={this.handleClose}/>
          </ReactModal>
        </div>

        {/*导航菜单*/}
        <NavBar
          binding={cookieBinding}
          prefix={this.prefix}
        />

        {/*视图查看，标准工作*/}
        <Tools
          onToggle={this.handleState.bind(this)}
          viewToggle={viewToggle}
          prefix={this.prefix}
          btn={btn}
          viewId={this.viewid}
          search={SEARCH}
        />

        {/*列表与看板切换*/}
        {grid ?
          <TableList
            column={column}
            content={content}
          /> :

          <TableGrid
            viewboard={VIEW_BOARD}
            viewboard2={VIEW_BOARD2}
          />}
      </div>
    );
  };

  componentDidMount() {
    /**
     *  @method 获取cookie
     */
    document.cookie = "prefix="+"004";
    document.cookie="viewId="+"aec2017A4F9D2F2v0ksU";
    const viewid = getCookie('viewId');
    const prefix = getCookie('prefix');

    this.getlist(prefix);
    this.getContent(prefix,viewid)
    //视图操作按钮和列表数据头
    this.getviewid(prefix,viewid)
  };

  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  onSearch = () => {
    const {column} = this.state;
    const {searchText} = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: column.map((record) => {
        const match = record.name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: (
            <span>
              {record.name.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    })
  }

  /**
   * @method 内联编辑数据发生变化
   * @param index
   * @param key
   * @returns {function(*)}
   */
  oncellchange(index, key){
    return (value) => {
      const dataSource = [...this.state.content];
      dataSource[index][key] = value;
      this.setState({dataSource});
    };
  }

  getlist = (prefix)=>{
    const that = this;
    fetch(VIEW_LIST_API + "&objPrefix=" + prefix)
      .then(status)
      .then(json)
      .then((data)=>{
        const viewToggle = that.state.viewToggle;
        const item = data.data.map((value,index)=>{
          return {
            title : value.label,
            id : value.id
          }
        });
        that.setState({
          viewToggle : item
        })
      });
  };

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  getviewid(prefix,viewid){
    const that = this;
    const {searchText} = this.state;
    fetch(VIEW_BtN + "objPrefix=" + prefix + "&viewId=" + viewid )
      .then(status)
      .then(json)
      .then((data)=> {
        const {btn, column} = that.state;
        const item = data.data.listBtn.map((value, index) => {
          return {
            name: value.label,
            id: value.id
          }
        });
        const node = data.data.headLabel.map((value,index)=>{
          if(value.apiname == "name"){
            return {
              title : value.nameLabel,
              dataIndex : value.apiname,
              key : value.apiname,
              width: 130,
              filterDropdown: (
                <div className="custom-filter-dropdown">
                  <Input
                    placeholder="请输入内容"
                    value={searchText}
                    onChange={that.onInputChange}
                    onPressEnter={that.onSearch}
                  />
                  <Button type="primary" onClick={that.onSearch}>搜索</Button>
                </div>
              ),
              render: (text, record, index) => (
                <EditableCell
                  value ={text}
                  onChange={this.oncellchange(index, 'name')}
                />
              ),
            }
          }else if(value.schemefieldType == "S" && value.apiname != "name"){
            return {
              title : value.nameLabel,
              dataIndex : value.apiname,
              key : value.apiname,
              width:200,
              filterDropdown: (
                <div className="custom-filter-dropdown">
                  <Input
                    placeholder="请输入内容"
                    value={searchText}
                    onChange={that.onInputChange}
                    onPressEnter={that.onSearch}
                  />
                  <Button type="primary" onClick={that.onSearch}>搜索</Button>
                </div>
              ),
              render: (text, record, index) => (
                <EditableCell
                  value = {text}
                  onChange={this.oncellchange(index, 'name')}
                />
              ),
            }
          } else if(value.schemefieldType == "L"){
            return {
              title: value.nameLabel,
              dataIndex: value.apiname,
              key: value.apiname,
              width : 200,
              filters: [{
                text: value.nameLabel,
                value: value.nameLabel,
              }],
              render: (text, record, index) => (
                <SelectCell
                  value={text}
                  // isEdit={this.onChangeState.bind(this)}
                />
              ),
            }
          } else if(value.schemefieldType == "X"){
            return {
              title: value.nameLabel,
              dataIndex: value.apiname,
              key: value.apiname,
              width : 200,
              render: (text, record, index) => (
                <EditableCell
                  value={text}
                  // isEdit={this.onChangeState.bind(this)}
                />
              )
            }
          } else if(value.schemefieldType == "F"){
            return {
              title: value.nameLabel,
              dataIndex: value.apiname,
              key: value.apiname,
              width : 150,
              onFilter: (value, record) => record.name.indexOf(value) === 0,
              sorter: (a, b) => a.address.length - b.address.length,
              render: (text, record, index) => (
                <TimeCell
                  value={text}
                  // isEdit={this.onChangeState.bind(this)}
                />
              )
            }
          }
          return {
            title : value.nameLabel,
            dataIndex : value.apiname,
            key : value.apiname,
            width : 200
          }
        });
        that.setState({
          btn: item,
          column: node
        })
      })
  }

  getContent(prefix,viewid){
    const that = this;
    fetch(LIST_CONTENT + "objPrefix=" + prefix + "&viewId=" + viewid )
      .then(status)
      .then(json)
      .then((data)=>{
        that.setState({
          content : data.data.listObj
        })
      });
  }
}

function getCookie(cookie_name) {
  var allcookies = document.cookie;
  var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度
  // 如果找到了索引，就代表cookie存在，
  // 反之，就说明不存在。
  if (cookie_pos != -1) {
    // 把cookie_pos放在值的开始，只要给值加1即可。
    cookie_pos += cookie_name.length + 1;
    var cookie_end = allcookies.indexOf(";", cookie_pos);
    if (cookie_end == -1) {
      cookie_end = allcookies.length;
    }
    //这里就可以得到你想要的cookie的值了。。。
    var value = unescape(allcookies.substring(cookie_pos, cookie_end));
  }
  return value;
}

export default App;
