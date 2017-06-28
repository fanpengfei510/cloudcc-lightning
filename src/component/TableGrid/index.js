/**
 * @class 看板视图
 * Created by fanpf on 2017/6/1.
 */
import React, {Component} from 'react';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;
import Branch from './branch';

class TableGrid extends Component {
  
  render() {
    return (
      <div className="grid-box" >
        <Tabs defaultActiveKey="1">
          <TabPane tab="分销业务机会 (8)" key="1">
            <Branch />
          </TabPane>
          <TabPane tab="代理业务机会 (10)" key="2">
            <Branch />
          </TabPane>
          <TabPane tab="未划分类别 (3)" key="3">
            <Branch />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default TableGrid;