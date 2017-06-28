/**
 * @class 视图列表
 * Created by fanpf on 2017/5/18.
 */
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {Table, Input, Button, Icon, Row, Col, Popconfirm} from 'antd';
import EditableCell from './tableedit';
import ReactModal from 'react-modal';
import ModalBody from '../ModalBody';
import TableCol from './tablecol/ColumnPopover';
import 'whatwg-fetch';

// const data = [{
//   key: '1',
//   name: '王宇',
//   phone: 13611111111,
//   company: '新疆中特建材有限公司',
//   get: 'lead池北京',
//   create: '2017-05-19 13:51:24',
//   source: "公司网站"
// }, {
//   key: '2',
//   name: '孙鑫',
//   phone: 23622222222,
//   company: '深圳克伦特印刷有限公司',
//   get: '李晓静',
//   create: '2017-05-19 10:35:24',
//   source: "百度推广"
// }, {
//   key: '3',
//   name: '吴志华',
//   phone: 33633333333,
//   company: '北京悦途',
//   get: 'lead池公海',
//   create: '2017-05-19 12:18:55',
//   source: "百度推广"
// }, {
//   key: '4',
//   name: '小李',
//   phone: 43644444444,
//   company: '海口远大购物中心',
//   get: '白伟',
//   create: '2017-05-19 10:38:13',
//   source: "百度推广"
// }, {
//   key: '5',
//   name: '黄西',
//   phone: 53655555555,
//   company: '西安欧陆港进出口贸易有限公司',
//   get: '马春雪',
//   create: '2017-05-19 11:17:26',
//   source: "电话"
// }, {
//   key: '6',
//   name: '赵磊',
//   phone: 63666666666,
//   company: '连云港全华汽车销售有限公司',
//   get: '陈峰',
//   create: '2017-05-19 11:24:11',
//   source: "电话"
// }, {
//   key: '7',
//   name: '王宇',
//   phone: 13611111111,
//   company: '新疆中特建材有限公司',
//   get: 'lead池北京',
//   create: '2017-05-19 13:51:24',
//   source: "电话"
// }, {
//   key: '8',
//   name: '孙鑫',
//   phone: 23622222222,
//   company: '深圳克伦特印刷有限公司',
//   get: '李晓静',
//   create: '2017-05-19 10:35:24',
//   source: "电话"
// }, {
//   key: '9',
//   name: '吴志华',
//   phone: 33633333333,
//   company: '北京悦途',
//   get: 'lead池公海',
//   create: '2017-05-19 12:18:55',
//   source: "百度推广"
// }, {
//   key: '10',
//   name: '小李',
//   phone: 43644444444,
//   company: '海口远大购物中心',
//   get: '白伟',
//   create: '2017-05-19 10:38:13',
//   source: "公司网站"
// }, {
//   key: '11',
//   name: '黄西',
//   phone: 53655555555,
//   company: '西安欧陆港进出口贸易有限公司',
//   get: '马春雪',
//   create: '2017-05-19 11:17:26',
//   source: "百度推广"
// }, {
//   key: '12',
//   name: '赵磊',
//   phone: 63666666666,
//   company: '连云港全华汽车销售有限公司',
//   get: '陈峰',
//   create: '2017-05-19 11:24:11',
//   source: "公司网站"
// }];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pagination: false,
      size: 'middle',
      height: document.body.offsetHeight - 270,
      filteredInfo: null,
      sortedInfo: null,
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
      showModal: false,
      visible: false,
      overlay: "Overlay",
      editchange: false,
      columns : []
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  onInputChange = (e) => {
    this.setState({searchText: e.target.value});
  };

  onSearch = () => {
    const {searchText} = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: data.map((record) => {
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
    });
  };

  handleOpenModal() {
      this.setState({showModal: true});
    }

  handleCloseModal() {
    this.setState({showModal: false});
  }

  render() {
    let {filteredInfo, sortedInfo,columns} = this.state;
    filteredInfo = filteredInfo || {};
    sortedInfo = sortedInfo || {};

    // const columns = [{
    //   title: '姓名',
    //   dataIndex: 'name',
    //   key: 'name',
    //   width: 150,
    //   fixed: 'left',
    //   render: text => <a href="javascript:void(0)">{text}</a>,
    //   filterDropdown: (
    //     <div className="custom-filter-dropdown">
    //       <Input
    //         ref={ele => this.searchInput = ele}
    //         placeholder="Search name"
    //         value={this.state.searchText}
    //         onChange={this.onInputChange}
    //         onPressEnter={this.onSearch}
    //       />
    //       <Button type="primary" onClick={this.onSearch}>搜索</Button>
    //     </div>
    //   ),
    //   filterIcon: <Icon type="filter" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
    //   filterDropdownVisible: this.state.filterDropdownVisible,
    //   onFilterDropdownVisibleChange: visible => this.setState({filterDropdownVisible: visible}, () => this.searchInput.focus()),
    //   onFilter: (value, record) => record.address.indexOf(value) === 0,
    // },
    //   {
    //     title: '电话',
    //     dataIndex: 'phone',
    //     key: 'phone',
    //     width: 260,
    //     sorter: (a, b) => a.phone - b.phone,
    //     sortOrder: sortedInfo.columnKey === 'phone' && sortedInfo.order,
    //     render: (text, record, index) => (
    //       <EditableCell
    //         value={text}
    //         onChange={this.oncellchange(index, '电话')}
    //         isEdit={this.onChangeState.bind(this)}
    //       />
    //     )
    //   }, {
    //     title: '公司名称',
    //     dataIndex: 'company',
    //     key: 'company',
    //     width: 280,
    //     render: (text, record, index) => (
    //       <EditableCell
    //         value={text}
    //         onChange={this.oncellchange(index, '公司名称')}
    //         isEdit={this.onChangeState.bind(this)}
    //       />
    //     )
    //   }, {
    //     title: '所有人',
    //     dataIndex: 'get',
    //     key: 'get',
    //     width: 230
    //   }, {
    //     title: '创建时间',
    //     dataIndex: 'create',
    //     key: 'create',
    //     width: 250
    //   }, {
    //     title: '客户来源',
    //     dataIndex: 'source',
    //     key: 'source',
    //     width: 250,
    //     filters: [
    //       {text: "电话", value: "电话"},
    //       {text: "公司官网", value: "公司官网"}
    //     ],
    //     filteredValue: filteredInfo.source || null,
    //     onFilter: (value, record) => record.source.includes(value)
    //   }, {
    //     title: <TableCol
    //       columns={this.state.data}
    //       onCheckBoxAndWidthChange={columns => this.setState({columns: columns})}
    //       buttonStyle={{marginRight: '12px'}}
    //       widthChange
    //     />,
    //     fixed: 'right',
    //     width: 50
    //   }];

    var nodes = columns.map((value,index)=>{
      return(
        {title : value.name,dataIndex : value.apiname,key : value.apiname}
      )
    });

    const {editchange} = this.state;
    return (
      <div style={{borderTop: "1px solid #D8DDE6", borderBottom: "1px solid #D8DDE6"}}>
        <Table onChange={this.handleChange} {...this.state} columns={nodes}
               rowSelection={rowSelection} scroll={{y: this.state.height}} loading={this.state.loading}/>
        <div>
          {/*
              <ReactModal
            isOpen={this.state.showModal}
            className="Modal"
            overlayClassName={this.state.overlay}
          >
            <ModalBody
              onClose={this.handleClose}
              onScreen={this.handleOnScreen}
            />
          </ReactModal>
          */}
        </div>
        {
          editchange ?
            <div className="isEdit">
              <Button type="primary" size="large" onClick={this.onSave}>保存</Button>
              <Popconfirm title="您确定放弃此次编辑的内容么？" onConfirm={this.onconfirm} onCancel={this.oncancel} okText="确定"
                          cancelText="取消">
                <Button type="default" size="large">取消</Button>
              </Popconfirm>
            </div>
            : null
        }
      </div>
    )
  };

  /*
   * @metho 内联编辑后保存
   */
  onSave = () => {

  };

  /*
   * @method 内联编辑，取消保存
   */
  onconfirm() {
    this.setState({
      editchange: false
    })
  }

  /*
   * @method 侧滑弹出框
      handleOnScreen = () => {
        if (this.state.overlay == "Overlay") {
          this.setState({
            overlay: "Overlay OverlayLeft"
          })
        } else {
          this.setState({
            overlay: "Overlay"
          })
        }
      };
   */

  /*
   * @method 关闭侧滑框
      handleClose = () => {
        this.setState({
          showModal: false
        })
      };
   */

  componentDidMount() {
    this.setState({
      loading: false
    })
  };

  getURL(url){

  }
};
export default TableList;