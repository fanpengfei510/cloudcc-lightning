/**
 * @class 高级搜索组件
 * Created by fanpf on 2017/6/26.
 */
import React, {Component} from 'react';
import {Select, Popover, Input, Form,Row,Col,Icon} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
let uuid = 0;

class Search_Plug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: this.props.class,
      secondCity: this.props.level,
      displayOption: true,
      clearOption: true
    }
  }

  /**
   * @method 表单内数据
   * @param e
   */
  onSearchSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log(value)
      }
    })
  };

  /**
   * @method 字段内容
   * @param value
   */
  handleClassA = (value) => {
    this.props.onVisibleChange(value)
    this.setState({
      cities: this.props.LevelArray[value],
      secondCity: this.props.LevelArray[value][0],
    })
  };

  /**
   * @method 操作值
   * @param value
   */
  onSecondLevelChange = (value) => {
    this.setState({
      secondCity: value,
    });
  };

  /**
   * @method 显示高级选项
   */
  isToggle = () => {
    this.setState({
      displayOption: false
    })
  };

  /**
   * @methos 清除高级选项
   */
  isClear = () => {
    this.setState({
      displayOption: true
    })
  };

  /**
   * @method 添加行
   */
  addRow = () => {
    uuid++;
    const {form} = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    form.setFieldsValue({
      keys : nextKeys
    })
  };

  /**
   * @method 删除行(待完善)
   * @param k
   */
  removeRow = (k)=>{
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  render() {
    const {ClassArray, LevelArray} = this.props;
    const {displayOption} = this.state;
    const provinceOptions = ClassArray.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
    const {getFieldDecorator,getFieldValue} = this.props.form;

    getFieldDecorator('keys',{initialValue : []});
    const keys = getFieldValue('keys');
    const formItems = keys.map((k,index)=>{
      return(
        <FormItem
          style={{marginBottom: 0}}
          key={k}
          required={false}
        >
          {getFieldDecorator('row', {
            rules: [{required: false}]
          })(
            <Row style={{marginTop : 5}}>
              <Col span={6}>
                <Select
                  defaultValue={ClassArray[0]}
                  style={{width: '170px'}}
                  onChange={this.handleClassA}
                  getPopupContainer={(triggerNode => triggerNode)}
                >
                    {provinceOptions}
                </Select></Col>
              <Col span={6}>
                <Select
                  value={this.state.secondCity}
                  style={{width: '170px'}}
                  onChange={this.onSecondLevelChange}
                  getPopupContainer={(triggerNode => triggerNode)}
                >
                    {cityOptions}
                </Select></Col>
              <Col span={7}>
                <Input
                  style={{verticalAlign:'top'}}
                />
              </Col>
              <Col span={3}> 与</Col>
            </Row>
          )}
          <Icon
            className="dynamic-delete-button"
            type="close-circle"
            disabled={keys.length === 1}
            onClick={() => this.removeRow(k)}
          />
        </FormItem>
      )
    });
    return (
      <div>
        <Form onSubmit={this.onSearchSubmit}>
            <div className="search-box">
              <Row>
                <Col span={6}>字段</Col>
                <Col span={6}>操作</Col>
                <Col span={7}>值</Col>
                <Col span={3}></Col>
              </Row>
              <FormItem style={{marginBottom: 0}}>
                {getFieldDecorator('key', {
                  rules: [{required: false}]
                })(
                <Row style={{marginTop : 5}}>
                  <Col span={6}>
                    <Select
                      defaultValue={ClassArray[0]}
                      style={{width: '170px'}}
                      onChange={this.handleClassA}
                      getPopupContainer={(triggerNode => triggerNode)}
                    >
                    {provinceOptions}
                  </Select></Col>
                  <Col span={6}>
                    <Select
                      value={this.state.secondCity}
                      style={{width: '170px'}}
                      onChange={this.onSecondLevelChange}
                      getPopupContainer={(triggerNode => triggerNode)}
                    >
                    {cityOptions}
                  </Select></Col>
                  <Col span={7}>
                    <Input
                      style={{verticalAlign:'top'}}
                    />
                  </Col>
                  <Col span={3}>与</Col>
                </Row>
                )}
              </FormItem>

              {formItems}

              <p>1,记录类型字段，选项列表字段和选项列表（多选）字段，建议最多输入10个关键字，用英文逗号隔开实现或关系，如：“北京,上海,广州”。</p>
              <p>2,日期字段等于时可以使用“昨天”，“今天”，“明天”，“上个月”，“本月”，“下个月”，“上星期”，“本星期”，“下星期” 或 “yyyy-mm-dd”格式。</p>
              {displayOption ?
                <a href="#" onClick={this.isToggle}>添加高级选项</a>
                :
                <div className="clear-option">
                  <a href="#" onClick={this.addRow}>添加行</a>
                  <a href="#">删除行</a>
                  <br />
                  <a href="#" onClick={this.isClear}>清除高级选项</a>
                  <p>高级筛选条件:</p>
                  <Input />
                  <img src="https://app.cloudcc.com//images/cloudcc/classic/boolean_filter.gif" alt=""/>
                </div>
              }
            </div>
        </Form>
      </div>
    )
  }
}

/**
 * @propTypes 验证
 * @type {{ClassArray, LevelArray, cities, secondCity}}
 */
Search_Plug.propTypes = {
  ClassArray: React.PropTypes.array,
  LevelArray: React.PropTypes.object,
  cities: React.PropTypes.array,
  secondCity: React.PropTypes.array
};

const Search = Form.create()(Search_Plug);
export default Search;