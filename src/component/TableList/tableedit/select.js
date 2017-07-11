/**
 * Created by fanpf on 2017/5/19.
 */
import React,{Component} from 'react';
import {Select,Icon} from  'antd';
const Option = Select.Option;

function handleChange(value){
  console.log(`select ${value}`)
}

class EditableCell extends Component{
  constructor(prpos){
    super(prpos);
    this.state = {
      value : this.props.value,
      editable : false,
    }
  }

  check = ()=> {
    this.setState({
      editable : false
    });
    if(this.props.onChange){
      this.props.onChange(this.state.value);
      if(this.props.value !== this.state.value){
        this.props.isEdit({editchange: true})
      }
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
                <Select defaultValue="--请选择--" style={{width : '80%'}} onChange={handleChange}>
                  <Option value="1">北京市</Option>
                  <Option value="2">上海</Option>
                  <Option value="3">广州</Option>
                  <Option value="4">深圳</Option>
                </Select>
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