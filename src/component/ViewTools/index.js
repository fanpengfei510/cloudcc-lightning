/**
 * @class 视图切换，视图操作，视图搜索，标准工具
 * Created by fanpf on 2017/5/18.
 */
import React,{Component} from 'react';
import {Row, Col} from 'antd'
import ViewSelect from './viewselect';
import ViewButton from './viewbutton';
import ViewSearch from './viewsearch';
import ViewOperation from './viewoperation';

class Tools extends Component{
  render() {
    const {prefix,viewlist,viewToggle,btn} = this.props;
    return (
      <div className="tools">
        <Row>
          <Col span={12}>
            {/*切换查看视图*/}
            <ViewSelect
              viewlist={viewlist}
              viewToggle={viewToggle}
              viewId={this.props.viewId}
              prefix={this.props.prefix}
            />
          </Col>
          <Col span={12}>
            {/*视图操作按钮*/}
            <ViewButton
              viewbtn={this.props.viewbtn}
              btn={btn}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {/*视图搜索*/}
            <ViewSearch
              search={this.props.search}
            />
          </Col>
          <Col span={12}>
            {/*标准工作操作*/}
            <ViewOperation
              onClicked={this.props.onToggle}/>
          </Col>
        </Row>
      </div>
    )
  }
};

export default Tools;