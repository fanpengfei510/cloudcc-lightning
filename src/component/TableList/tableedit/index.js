/**
 * Created by fanpf on 2017/5/19.
 */
import React,{Component} from 'react';
import {Input,Icon} from  'antd';


class EditableCell extends Component{
  constructor(prpos){
    super(prpos);
    this.state = {
      value : this.props.value,
      editable : false,
    }
  }

  handleChange = (e)=> {
    const value = e.target.value;
    this.setState({value})
  };

  /**
   * @method 原始数据是否发生改变
   */
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange && this.props.value !== this.state.value) {
      this.props.onChange(this.state.value);
      console.log('111')
    }
  };

  edit = ()=> {
    this.setState({
      editable : true
    })
  };

  render(){
    const {value,editable} = this.state;
    return(
      <div>
        <div className="editable-cell">
          {
            editable ?
              <div className="editable-cell-input-wrapper">
                <Input
                  value = {value}
                  onChange = {this.handleChange}
                  onPressEnter={this.check}
                />
                <Icon
                  type="check"
                  className = "editable-cell-icon-check"
                  onClick={this.check}
                />
              </div>
              :
              <div className="editable-cell-text-wrapper">
                {value || ''}
                <Icon
                  type = 'edit'
                  className = 'editable-cell-icon'
                  onClick={this.edit}
                />
              </div>
          }
        </div>
      </div>
    )
  }
};

export default EditableCell;