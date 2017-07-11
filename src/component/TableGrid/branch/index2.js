/**
 * @class 看板视图
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {Tooltip,Spin} from 'antd';
import Sortable from 'sortablejs';
import sizeMe from 'react-sizeme';
import {Scrollbars} from 'react-custom-scrollbars';
import AnimationCount from 'react-count-animation';
import '../../../lib/css/count.min.css';
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

class Branch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: document.body.offsetHeight - 250,
      width: document.body.offsetWidth - 20,
      ulheight: document.body.offsetHeight - 360,
      count: 26875,
      data: [],
      item : [],
      loading : true,
      tabs : []
    }
  }

  sortableContainersDecorator = (componentBackingInstance) => {
    // check if backing instance not null
    if (componentBackingInstance) {
      let options = {
        handle: ".box", // Restricts sort start click/touch to the specified element
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  sortableGroupDecorator = (componentBackingInstance) => {
    const {count,item} = this.state;
    // check if backing instance not null
    if (componentBackingInstance) {
      let options = {
        draggable: ".item", // Specifies which items inside the element should be sortable
        group: "shared",
        animation: 150,
        onEnd : ()=>{
          console.log('end')
        },
        onAdd : (event)=>{
          console.log(item)
        },
        onRemove : (event)=>{
          console.log(item)
        },

      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  render() {
    const {width} = this.props.size;
    const {data,item} = this.state;
    const nodes = data.map((value,index)=>{

      var sum = 0;
      for(var i=0; i<data.length; i++){
        sum += value.sumFieldValue;
      }
      const settings = {
        start: 0,
        count: sum,
        duration: 1500,
        decimals: 2,
        useGroup: true,
        animation: 'up',
      };
      return(
        <li key={index}>
          <Tooltip placement="bottom" title={value.groupFieldValue}>
            <div className="stage">
              <span>{value.groupFieldValue} ({value.total})</span>
            </div>
          </Tooltip>
          <div className="count">
            <AnimationCount {...settings}/>
          </div>
          <div className="box" ref={this.sortableGroupDecorator} style={{minWidth: 250, height: this.state.ulheight}}>
            <div className="item" key={index}>
              <a href="#">{value.name}</a>
              <p>{value.createbyid}</p>
              <p>￥ {value.number}</p>
            </div>
          </div>
        </li>
      )
    });
    return (
      <Scrollbars style={{height: this.state.height, width: width}}>
        <div className="branch-box clearfix">
          <ul className="clearfix grid">
            {nodes}
          </ul>
        </div>
      </Scrollbars>
    )
  }

  componentDidMount() {
    const {viewboard} = this.props;
    this.getTabs(viewboard)
  }

  getTabs(url){
    const {tabs} = this.state;
    const that = this;
    fetch(url)
      .then(status)
      .then(json)
      .then((data)=>{
        const item = data.data.dataInfo.groupFieldData.map((value,index)=>{
          return {
            total : value.total,
            sumFieldValue : value.sumFieldValue,
            groupFieldValue : value.groupFieldValue,
            recordtype : value.recordtype
          }
        });
        that.setState({
          data : item
        })
      });
  }
}

const config = {monitorWidth: true}
const sizeMeHOC = sizeMe(config)
export default sizeMeHOC(Branch);