/**
 * @class 视图搜索
 * Created by fanpf on 2017/5/18.
 */
import React,{Component} from 'react';
import {Input,Popover,Select} from 'antd';
import PublicSearch from '../../PublicSearch'
const Option = Select.Option;

const provinceData = ['无','创建人','创建时间'];
const cityData = {
  无 : ['无'],
  创建人 : ['王宇','小健','王菲'],
  创建时间: ['2017/02/22','201705/11','2017/10/01']
};

class ViewSearch extends Component{
  constructor(porps){
    super(porps);
    this.state = {
      value : '',
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
    }
  }

  handleselect = (e)=>{
    console.log(e)
  }
  render(){
    const content = (
      <PublicSearch
        class={this.state.cities}
        level={this.state.secondCity}
        ClassArray={provinceData}
        LevelArray={cityData}
        onVisibleChange={this.handleselect}
      />
    )
    return(
      <div>
        <div style={{float : "left"}}>
          <Input
            style={{ width: "170px" }}
            placeholder="搜索视图内容"
            value = {this.state.value}
            onChange = {this.handlerSearch}
            addonAfter={(<a href="#">搜索</a>)}
          />
        </div>

        <Popover
          content={content}
          trigger='click'
          placement="bottomLeft"
        >
          <a href="#" style={{marginLeft : 10,lineHeight : '28px'}}>高级搜索</a>
        </Popover>
      </div>
    )
  };

  componentDidMount() {

  }

  handlerSearch = (e)=> {
    this.setState({
      value : e.target.value
    })
  }
};

export default ViewSearch;