import React, {Component} from 'react';
import {Modal,Row,Col,Button,Form,Input,Tooltip,Icon,Checkbox,Radio,Select,Transfer,Table} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class NewsViewForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible : false,
      loading : false,
      size : "default",
      value : 1,
      current : 0,
      steps : true,
      steps2 : true,
      arr : [],
      mockData : [],
      targetKeys : [],
      title : '第一步：输入视图名称',
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0]
    }
  }

  one_next= (e)=>{
    var arr = this.state.arr;
    var that = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        arr = [];
        this.setState({
          steps : false,
          title : '第二步：指定过滤条件'
        })
        arr.push(
          {addhom : values.addhome},
          {viewname : values.viewname},
          {checkbox:values.checkbox},
          {phoneapp : values.phoneapp},
          {diction : values.diction}
          )
      }

    });
  }

  two_next = (e)=>{
    var that = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        this.setState({
          steps2 : false,
          title : '第三步：选择要显示的字段'
        })

      }
    });
  }

  save = ()=>{
    var that = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  }

  handleCancel =()=>{
    this.props.toggleModal({
      visible : false
    })
  };

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  getMock = ()=>{
    const targetKeys = [];
    const mockData = [];
    for(let i=0; i<20; i++){
      const data = {
        key : i.toString(),
        title : `内容条目 ${i+1}`,
        description : `内容描述 ${i+1}`,
        chosen : Math.random() * 2 > 1
      }
      if(data.chosen){
        targetKeys.push(data.key)
      }
      mockData.push(data)
    }
    this.setState({
      mockData,targetKeys
    })
  }

  filterOption = (inputValue,option)=>{
    return option.description.indexOf(inputValue) > -1
  }

  handleChange = (targetKeys)=>{
    this.setState({
      targetKeys
    })
  }

  render(){
    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);

    const {getFieldDecorator} = this.props.form;
    var {current,value,steps,steps2} = this.state;
    const FormLayout = {
      labelCol : {
        sm : {span : 11}
      },
      wrapperCol : {
        sm : {span : 13}
      }
    };

    const twoFormLayout = {
      labelCol : {
        sm : {span : 7}
      },
      wrapperCol : {
        sm : {span : 17}
      }
    };

    const isView = (
      <Tooltip title="是否可见">
        <Icon type="question-circle-o"/> 相关人员可见
      </Tooltip>
    )

    return(
      <div>
        <Modal
          visible={this.props.visible}
          width='60%'
          footer={null}
          onCancel={this.handleCancel}
          title={this.state.title}
          style={{top : 30}}
        >
          <div className="base-info">
            <Form onSubmit={this.handleSubmit}>
              {steps?
                <div>
                  <Row>
                    <Col span={10}>
                      <FormItem
                        label="视图名称"
                        {...FormLayout}
                      >
                        {getFieldDecorator('viewname',{
                          rules : [{required : true,message : '请填写视图名称'}]
                        })(
                          <Input placeholder="请输入视图名称" size={this.state.size}/>
                        )}
                      </FormItem>
                    </Col>
                    <Col span={8} offset={4}>
                      <FormItem
                        label={isView}
                        {...FormLayout}
                      >
                        {getFieldDecorator('checkbox',{
                          rules : [{required : false}]
                        })(
                          <Checkbox />
                        )}

                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <FormItem
                        label="添加到首页工作台"
                        {...FormLayout}
                      >
                        {getFieldDecorator('addhome',{
                          rules : [{required : false}]
                        })(
                          <Checkbox />
                        )}
                      </FormItem>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={10}>
                      <FormItem
                        label="是否启用到移动端"
                        {...FormLayout}
                      >
                        {getFieldDecorator('phoneapp',{
                          rules : [{required : false}]
                        })(
                          <Checkbox />
                        )}
                      </FormItem>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={10} offset={2}>
                      <FormItem
                        {...FormLayout}
                      >
                        {getFieldDecorator('diction',{
                          rules : [{required : false}]
                        })(
                          <RadioGroup onChange={this.onChange}>
                            <Radio value={1}>仅对我可见</Radio>
                            <Radio value={2}>所有用户皆可见</Radio>
                            <Radio value={3}>
                              某些用户组可见
                              {this.state.value === 3 ?
                                <div style={{marginTop : 10}}>
                                  <FormItem>
                                    {getFieldDecorator('isview',{
                                      rules : [{required:false}]
                                    })(
                                      <div>
                                        <span>选择：</span>
                                        <Select style={{width:100}}>
                                          <Option value="1" key="1">用户</Option>
                                          <Option value="2" key="2">角色</Option>
                                          <Option value="3" key="3">角色和下属</Option>
                                          <Option value="4" key="4">公用小组</Option>
                                        </Select>
                                        <Input style={{width:150,marginLeft : 10}}/>
                                        <Button type="default" style={{marginLeft : 10}}>搜索</Button>
                                      </div>
                                    )}
                                  </FormItem>
                                  <FormItem style={{marginTop:35,marginLeft:35}}>
                                    {getFieldDecorator('transfer',{
                                      rules : [{required : false}]
                                    })(
                                      <Transfer
                                        dataSource={this.state.mockData}
                                        showSearch
                                        filterOption={this.filterOption}
                                        targetKeys={this.state.targetKeys}
                                        onChange={this.handleChange}
                                        render={item => item.title}
                                      />
                                    )}
                                  </FormItem>
                                </div>
                                :
                                null}
                            </Radio>
                          </RadioGroup>
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="createViewBtn">
                      <Button type="primary" onClick={this.one_next}>下一步</Button>
                      <Button type="default" onClick={this.handleCancel}>取消</Button>
                    </Col>
                  </Row>
                </div>
                :
                steps2 ?
                  <div>
                    <Row>
                      <Col span={10}>
                        <FormItem
                          label="按所有人过滤"
                          {...twoFormLayout}
                        >
                          <RadioGroup>
                            <Radio value="1">所有潜在客户</Radio>
                            <Radio value="2">我的潜在客户</Radio>
                          </RadioGroup>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <FormItem
                          label='按附加字段过滤(可选)'
                        >
                          {getFieldDecorator('select',{
                            relus : [{required : false}]
                          })(
                            <div>
                              <table className="filter">
                                <thead>
                                <tr>
                                  <th>字段</th>
                                  <th>操作</th>
                                  <th>值</th>
                                  <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                  <td>
                                    <Select defaultValue={provinceData[0]} style={{width:200}} onChange={this.handleProvinceChange}>
                                      {provinceOptions}
                                    </Select>
                                  </td>
                                  <td>
                                    <Select value={this.state.secondCity} style={{ width: 120 }} onChange={this.onSecondCityChange}>
                                      {cityOptions}
                                    </Select>
                                  </td>
                                  <td>
                                    <Input style={{width:200}}/>
                                  </td>
                                  <td>与</td>
                                </tr>
                                </tbody>
                              </table>

                              <div className="subinfo">
                                <p>1,记录类型字段，选项列表字段和选项列表（多选）字段，建议最多输入10个关键字，用英文逗号隔开实现或关系，如：“北京,上海,广州”。</p>
                                <p>2,日期字段等于时可以使用“昨天”，“今天”，“明天”，“上个月”，“本月”，“下个月”，“上星期”，“本星期”，“下星期” 或 “yyyy-mm-dd”格式。</p>
                                <a href="javascript:void(0)">添加高级选项</a>
                              </div>
                            </div>
                          )}
                        </FormItem>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="createViewBtn">
                        <Button type="default" onClick={()=>this.setState({steps:true,title:'第一步：输入视图名称'})}>上一步</Button>
                        <Button type="primary" onClick={this.two_next}>下一步</Button>
                        <Button type="default" onClick={this.handleCancel}>取消</Button>
                      </Col>
                    </Row>
                  </div>
                  :
                  <div>

                    <Button type="default" onClick={()=>this.setState({steps2 : true,title :'第二步：指定过滤条件'})}>上一步</Button>
                    <Button type="primary" onClick={this.save}>保存</Button>
                    <Button type="default" onClick={this.handleCancel}>取消</Button>
                  </div>
              }
            </Form>
          </div>
        </Modal>
      </div>
    )
  }

  handleProvinceChange = (value) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  }
  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
  }

  componentDidMount(){
    this.getMock();
  }
}

const NewsView = Form.create()(NewsViewForm);
export default NewsView;