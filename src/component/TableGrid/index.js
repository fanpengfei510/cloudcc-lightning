/**
 * @class 看板视图
 * Created by fanpf on 2017/6/1.
 */
import React, {Component} from 'react';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;
import Branch from './branch';
import Branch2 from './branch/index2';

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

class TableGrid extends Component {
  constructor(props){
    super(props);
    this.state = {
      tab : []
    }
  }
  render() {
    const {viewboard,viewboard2} = this.props;
    const {tab} = this.state;
    const item = tab.map((value,index)=>{
      return(
        <TabPane tab={value.name} key={index}>
          <Branch
            viewboard={viewboard}
          />
        </TabPane>
      )
    });
    return (
      <div className="grid-box" >
        <Tabs defaultActiveKey="0">
          {item}
          {/*<TabPane tab="分销业务机会 (8)" key="1">*/}
            {/*<Branch*/}
              {/*viewboard={viewboard}*/}
            {/*/>*/}
          {/*</TabPane>*/}
          {/*<TabPane tab="代理业务机会 (10)" key="2">*/}
            {/*<Branch2*/}
              {/*viewboard={viewboard2}*/}
            {/*/>*/}
          {/*</TabPane>*/}
          {/*<TabPane tab="未划分类别 (3)" key="3">*/}
            {/*<Branch />*/}
          {/*</TabPane>*/}
        </Tabs>
      </div>
    )
  }

  componentDidMount(){
    this.getTab(this.props.viewboard2)
  }

  getTab(url){
    const {tab} = this.state;
    const that = this;
    fetch(url)
      .then(status)
      .then(json)
      .then((data)=>{
        const item = data.data.dataInfo.recordTypeData.map((value,index)=>{
          return {
            sum : value.recordTypeSum,
            name : value.recordtypeccname,
            total : value.recordTypeTotal,
            recordtype : value.recordtype
          }
        });
        that.setState({
          tab : item
        })
      });
  }
}

export default TableGrid;