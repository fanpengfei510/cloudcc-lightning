import React, {Component} from 'react';
import {Tabs} from 'antd';
import Post from './post';
import File from './file';
import Link from './link';
import Vote from './vote';
const TabPane = Tabs.TabPane;

class Micro extends Component {
  render() {
    return (
      <div className="active-tabs">
        <Tabs defaultActiveKey="1">
          <TabPane tab="张贴" key="1">
            <Post />
          </TabPane>
          <TabPane tab="文件" key="2">
            <File />
          </TabPane>
          <TabPane tab="链接" key="3">
            <Link />
          </TabPane>
          <TabPane tab="投票" key="4">
            <Vote />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
;

export default Micro;