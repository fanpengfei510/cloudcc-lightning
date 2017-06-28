import React, {Component} from 'react';
import {Tabs} from 'antd';
import NewTask from './newtask';
import NewEvent from './newevent';
import SavePhone from './savephone';
import SendEmail from './sendemail';
const TabPane = Tabs.TabPane;

class Active extends Component {
  render() {
    return (
      <div className="active-tabs">
        <Tabs>
          <TabPane tab="新建任务" key="1">
            <NewTask />
          </TabPane>
          <TabPane tab="新建事件" key="2">
            <NewEvent />
          </TabPane>
          <TabPane tab="记录电话" key="3">
            <SavePhone />
          </TabPane>
          <TabPane tab="发送电子邮件" key="4">
            <SendEmail />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
;

export default Active;