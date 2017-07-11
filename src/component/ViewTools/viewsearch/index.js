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
  };

  PopoverVisible = (visible)=>{
    if(visible == false){
      console.log('search')
    }
  };

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
          onVisibleChange={this.PopoverVisible}
        >
          <a href="#" style={{marginLeft : 10,lineHeight : '28px'}}>高级搜索</a>
        </Popover>
      </div>
    )
  };

  handlerSearch = (e)=> {
    this.setState({
      value : e.target.value
    })
  }

  componentDidMount(){
    const {search} = this.props;
    const prefix = getCookie('prefix');
  }
};

function getCookie(cookie_name) {
  var allcookies = document.cookie;
  var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度
  // 如果找到了索引，就代表cookie存在，
  // 反之，就说明不存在。
  if (cookie_pos != -1) {
    // 把cookie_pos放在值的开始，只要给值加1即可。
    cookie_pos += cookie_name.length + 1;
    var cookie_end = allcookies.indexOf(";", cookie_pos);
    if (cookie_end == -1) {
      cookie_end = allcookies.length;
    }
    //这里就可以得到你想要的cookie的值了。。。
    var value = unescape(allcookies.substring(cookie_pos, cookie_end));
  }
  return value;
}

export default ViewSearch;