/**
 * Created by fanpf on 2017/5/23.
 */
import React, {Component} from 'react';
import {Row, Col} from 'antd';

class BodyShow extends Component {
  render() {
    return (
      <div className="body-show">
        <Row gutter={10}>
          <Col span={3}>
            <p>职务</p>
            <a href="#">董事长</a>
          </Col>
          <Col span={3}>
            <p>公司</p>
            <a href="#" title="北京神州云动科技股份有限公司">北京神州云动科技股份有限公司</a>
          </Col>
          <Col span={3}>
            <p>电话</p>
            <a href="#">1355658787</a>
          </Col>
          <Col span={3}>
            <p>电子邮件</p>
            <a href="#">dongshiz@163.com</a>
          </Col>
        </Row>
      </div>
    )
  }
};

export default BodyShow;