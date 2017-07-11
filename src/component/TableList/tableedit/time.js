/**
 * Created by fanpf on 2017/5/19.
 */
import React,{Component} from 'react';
import {DatePicker,Icon} from  'antd';
import moment from 'moment';
const {MonthPicker,RangePicker} = DatePicker;

class EditableCell extends Component{
  constructor(prpos){
    super(prpos);
    this.state = {
      value : this.props.value,
      editable : false,
    }
  }

  onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  check = ()=> {
    this.setState({
      editable : false
    });
    if(this.props.onChange){
      this.props.onChange(this.state.value);
      if(this.props.value !== this.state.value){
        this.props.isEdit({editchange: true})
        console.log('true')
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
                <DatePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Select Time"
                  onChange={this.onChange}
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