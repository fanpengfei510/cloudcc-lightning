import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {Tooltip} from 'antd';
import Sortable from 'sortablejs';
import sizeMe from 'react-sizeme';
import {Scrollbars} from 'react-custom-scrollbars';
import AnimationCount from 'react-count-animation';
import '../../../lib/css/count.min.css'

class Branch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: document.body.offsetHeight - 250,
      width: document.body.offsetWidth - 20,
      ulheight: document.body.offsetHeight - 360,
      count : 26875,
      arr: [{
        name: 'advanced',
        pull: true,
        put: true
      }, {
        name: 'advanced',
        pull: true,
        put: true
      }, {
        name: 'advanced',
        pull: true,
        put: true
      }, {
        name: 'advanced',
        pull: true,
        put: true
      }, {
        name: 'advanced',
        pull: true,
        put: true
      }, {
        name: 'advanced',
        pull: true,
        put: true
      }]
    }
  }

  render() {
    const {count} = this.state;
    const settings = {
      start: 100,
      count: count,
      duration: 1500,
      decimals: 2,
      useGroup: true,
      animation: 'up',
    };
    const settings2 = {
      start: 100,
      count: 8643,
      duration: 1500,
      decimals: 2,
      useGroup: true,
      animation: 'up',
    };
    const settings3 = {
      start: 100,
      count: 678,
      duration: 1500,
      decimals: 2,
      useGroup: true,
      animation: 'up',
    };
    const settings4 = {
      start: 0.00,
      count: 0.00,
      duration: 1500,
      decimals: 2,
      useGroup: true,
      animation: 'up',
    };
    const {width} = this.props.size;
    return (
      <Scrollbars style={{height: this.state.height, width: width}}>
        <div className="branch-box clearfix">
          <ul className="clearfix grid">
            <li>
              <Tooltip placement="bottom" title="客户公司资质">
                <div className="stage">
                  <span>资质 (10)</span>
                </div>
              </Tooltip>
              <div className="count">
                <AnimationCount {...settings}/>
              </div>
              <ul className="box" ref="advanced1" style={{minWidth: '321px', height: this.state.ulheight}}>
                <li className="item">
                  <a href="#" onClick={this.onnumber}>孙经理1</a>
                  <p>宏德集团</p>
                  <p>北京市</p>
                  <p>Sunwuyi@163.com</p>
                </li>
                <li className="item">
                  <a href="#">孙经理2</a>
                  <p>宏德集团</p>
                  <p>北京市</p>
                  <p>Sunwuyi@163.com</p>
                </li>
              </ul>
            </li>
            <li>
              <Tooltip placement="bottom" title="客户公司资质">
                <div className="stage">
                  <span>资质 (10)</span>
                </div>
              </Tooltip>
              <div className="count">
                <AnimationCount {...settings2}/>
              </div>
              <ul className="box" ref="advanced2" style={{minWidth: '200px', height: this.state.ulheight}}>
                <li className="item">
                  <a href="#">孙经理1</a>
                  <p>宏德集团</p>
                  <p>北京市</p>
                  <p>Sunwuyi@163.com</p>
                </li>
                <li className="item">
                  <a href="#">孙经理2</a>
                  <p>宏德集团</p>
                  <p>北京市</p>
                  <p>Sunwuyi@163.com</p>
                </li>
              </ul>
            </li>
            <li>
              <Tooltip placement="bottom" title="未转换成功客户">
                <div className="stage">
                  <span>未转换 (15)</span>
                </div>
              </Tooltip>
              <div className="count">
                <AnimationCount {...settings3}/>
              </div>
              <ul className="box" ref="advanced3" style={{minWidth: '321px', height: this.state.ulheight}}>
                <li className="item">
                  <a href="#">asdfasdf2</a>
                  <p>asdfasdf团</p>
                  <p>北京市</p>
                  <p>Sunwuyi@163.com</p>
                </li>
              </ul>
            </li>
            <li>
              <Tooltip placement="bottom" title="未转换成功客户">
                <div className="stage">
                  <span>未转换 (15)</span>
                </div>
              </Tooltip>
              <div className="count">
                <AnimationCount {...settings4}/>
              </div>
              <ul className="box" ref="advanced4" style={{minWidth: '321px', height: this.state.ulheight}}>
                <li className="item">
                  <a href="#">孙经理2</a>
                  <p>宏德集团</p>
                  <p>北京市</p>
                  <p>Sunwuyi@163.com</p>
                </li>
                <li className="item">
                  <a href="#">孙经理3</a>
                  <p>宏德集团</p>
                  <p>北京市</p>
                  <p>Sunwuyi@163.com</p>
                </li>
              </ul>
            </li>
            <li>
              <Tooltip placement="bottom" title="未转换成功客户">
                <div className="stage">
                  <span>未转换 (15)</span>
                </div>
              </Tooltip>
              <div className="count">
              </div>
              <ul className="box" ref="advanced5" style={{minWidth: '321px', height: this.state.ulheight}}>

              </ul>
            </li>
            <li>
              <Tooltip placement="bottom" title="您已接触的客户">
                <div className="stage">
                  <span>已接触 (15)</span>
                </div>
              </Tooltip>
              <div className="count">
              </div>
              <ul className="box" ref="advanced6" style={{minWidth: '321px', height: this.state.ulheight}}>

              </ul>
            </li>
          </ul>
        </div>
      </Scrollbars>
    )
  }

  componentDidMount() {
    this.state.arr.map((value, index) => {
      Sortable.create(ReactDOM.findDOMNode(this.refs['advanced' + (index + 1)]), {
        group: value,
        animation: 150,
        ghostClass: "ghost",
        chosenClass: "chosen",
        dragClass: "sortable-drag",
      });
    });
  }
}

const config = {monitorWidth: true}
const sizeMeHOC = sizeMe(config)
export default sizeMeHOC(Branch);