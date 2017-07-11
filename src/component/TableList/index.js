/**
 * @class 视图列表
 * Created by fanpf on 2017/5/18.
 */
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {Table, Input, Button, Icon, Row, Col, Popconfirm,Pagination} from 'antd';
import ReactModal from 'react-modal';
import ModalBody from '../ModalBody';
import TableCol from './tablecol/ColumnPopover';
import {Scrollbars} from 'react-custom-scrollbars';
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
      height: document.body.offsetHeight - 280,
      showModal: false,
      overlay: "Overlay",
      data : this.props.content
    };
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  handleEdite = (e) => {
    const value = e.target.value;
    this.setState({ value });
  };

  render() {
    let {value,visible} = this.state;
    let {column,content} = this.props;
    var itemwidth = 0;
    column.map((value,index)=>{
      itemwidth += value.width;
    });
    return (
      <div>
        <div style={{borderTop: "1px solid #D8DDE6"}}>
          <Table onChange={this.handleEdite} {...this.state} columns={column} dataSource={content}
                 rowSelection={rowSelection} scroll={{y: this.state.height,x:itemwidth}} loading={this.state.loading}/>
        </div>
        <div className="tablePage">
          <Pagination
            total={85}
            size="small"
            showTotal={(total,range)=>`${range[0]}-${range[1]} 共计 ${total} 条`}
            pageSize={20}
            defaultCurrent={1}
            showSizeChanger
            showQuickJumper
          />
        </div>
      </div>
    )
  };

  /*
   * @metho 内联编辑后保存
   */
  onSave = () => {

  };

  componentDidMount() {
    this.setState({
      loading: false
    })
  };
};

export default TableList;