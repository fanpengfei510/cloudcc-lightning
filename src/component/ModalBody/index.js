import React, {Component} from 'react';
import {Affix} from 'antd';
import BodyTitle from './bodytitle';
import BodyShow from './bodyshow';
import BodyMain from './bodymain'

class ModalBody extends Component{
  render(){
    return(
      <div>
        <BodyTitle handleClose={this.props.onClose} handleScreen={this.props.onScreen}/>
        <BodyShow />
        <BodyMain />
      </div>
    )
  }
};

export default ModalBody;