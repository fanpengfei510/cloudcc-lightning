import React, {Component} from 'react';
import {Row, Col, Tabs} from 'antd';
import List from './list';
import Info from './info';
import Micro from './micro';

import Active from './active';
const TabPane = Tabs.TabPane;

class BodyMain extends Component {
  render() {
    return (
      <div className="body-main">
        <Row gutter={60}>
          <Col span={15} style={{borderRight: '1px solid #D8DDE6'}}>
            <Tabs>
              <TabPane tab="相关列表" key="1">
                <List />
              </TabPane>
              <TabPane tab="详细信息" key="2">
                <Info />
              </TabPane>
            </Tabs>
          </Col>
          <Col span={9}>
            <Tabs>
              <TabPane tab="活动" key="3">
                <Active />
              </TabPane>
              <TabPane tab="微贴" key="4">
                <Micro />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}
;

export default BodyMain;