import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import _ from 'lodash';
import { updateUserInfo } from '../../actions/users'
import { Radio, Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Spin } from 'antd';
import API from "../../api";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    bdunilist: [],
    uniload: false
  };

  onchange = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

      }
      if (values.bd_uni && values.bd_uni !== this.props.user.bd_uni && values.bd_uni.length > 2) {

        this.setState({ uniload: true })
        API.user.getBDUnilist(values.bd_uni).then((unilist) => {
          function ObjToArray(obj) {
            var arr = obj instanceof Array;

            return (arr ? obj : Object.keys(obj)).map(function (i) {
              var val = arr ? i : obj[i];
              if (typeof val === 'object')
                return ObjToArray(val);
              else
                return val;
            });
          }


          let univlist = ObjToArray(unilist.data)
          let newdbd = univlist.map(e => e[1])

          this.setState({ bdunilist: newdbd, uniload: false })
        })
      }
      this.props.updateUserInfo(values)

    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { bdunilist } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    return (
      <Form onChange={() => this.onchange()} >
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Bangladeshi Alma Matter&nbsp;
              <Tooltip title="Please let us know the latest Bangladeshi university you studied in.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('bd_uni', {
            initialValue: this.props.user.bd_uni
          })(
            <AutoComplete
              showSearch={true}
              dataSource={bdunilist}
              onChange={() => this.onchange()}
              onSelect={(s) => this.props.form.setFieldsValue({ 'bd_uni': s })}
              placeholder="Type University Name"
            >
              <Input suffix={<Spin spinning={this.state.uniload} indicator={<Icon type="loading" className="certain-category-icon" />} />} />
            </AutoComplete>


          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Undergrad CGPA&nbsp;
              <Tooltip title="Your undergraduate current CGPA converted into the scale of 4.0.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('undergradcgpa', {
            initialValue: this.props.user.undergradcgpa, rules: [{ required: true, message: 'Your undergraduate current CGPA converted into the scale of 4.0.' }]
          })(
            <Input onChange={() => this.onchange()} />
          )}
        </FormItem>

        {/* <FormItem
          {...formItemLayout}
          label="Test Type"
        >
          {getFieldDecorator('unitest', {
            initialValue: this.props.user.unitest
          })(
            <RadioGroup onChange={() => this.onchange()} >
              <RadioButton value="GRE">GRE</RadioButton>
              <RadioButton value="GMAT">GMAT</RadioButton>
              <RadioButton value="SAT">SAT</RadioButton>
            </RadioGroup>
          )}
        </FormItem> */}
        {<FormItem
          {...formItemLayout}
          label={(
            <span>
              Estimated/Actual GRE Score&nbsp;
              <Tooltip title="We need your GRE score in order to recommend you the right university. If you have't appeared for GRE yet, please provide us an estimated score. You can always update it later.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >

          Verbal:
          {getFieldDecorator('univarbal', {
            initialValue: this.props.user.univarbal, rules: [{ required: true, message: "We need your GRE score in order to recommend you the right university. If you have't appeared for GRE yet, please provide us an estimated score. You can always update it later." }]
          })(<Input
            type="text"

            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
          Quantitative:  {getFieldDecorator('uniquant', {
            initialValue: this.props.user.uniquant
          })(
            <Input
              type="text"
              onChange={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          Analytical Writing:  {getFieldDecorator('uniawa', {
            initialValue: this.props.user.uniawa
          })(
            <Input
              type="text"
              onChange={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
        </FormItem>
        }

        <FormItem
          {...formItemLayout}
          label="Language Test"
        >
          {getFieldDecorator('langtest', {
            initialValue: this.props.user.langtest
          })(
            <RadioGroup onChange={() => this.onchange()} >
              <RadioButton value="TOEFL">TOEFL</RadioButton>
              <RadioButton value="IELTS">IELTS</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        {this.props.user.langtest == 'TOEFL' && <FormItem
          {...formItemLayout}
          label={this.props.user.langtest + " Test Score"}
        >

          Reading:  {getFieldDecorator('toeflreading', {
            initialValue: this.props.user.toeflreading
          })(
            <Input
              type="text"

              onChange={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          Writing:
          {getFieldDecorator('toeflwriting', {
            initialValue: this.props.user.toeflwriting
          })(<Input
            type="text"
            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
          Listening: {getFieldDecorator('toefllistening', {
            initialValue: this.props.user.toefllistening
          })(<Input
            type="text"
            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />
          )}
          Speaking:  {getFieldDecorator('toeflspeaking', {
            initialValue: this.props.user.toeflspeaking
          })(<Input
            type="text"
            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
        </FormItem>}


        {this.props.user.langtest == 'IELTS' && <FormItem
          {...formItemLayout}
          label={this.props.user.langtest + " Test Score"}
        >

          Reading:  {getFieldDecorator('ieltsreading', {
            initialValue: this.props.user.ieltsreading
          })(
            <Input
              type="text"
              onChange={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          Writing:
          {getFieldDecorator('ieltswriting', {
            initialValue: this.props.user.ieltswriting
          })(<Input
            type="text"
            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
          Listening: {getFieldDecorator('ieltslistening', {
            initialValue: this.props.user.ieltslistening
          })(<Input
            type="text"
            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />
          )}
          Speaking:  {getFieldDecorator('ieltsspeaking', {
            initialValue: this.props.user.ieltsspeaking
          })(<Input
            type="text"
            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
        </FormItem>}

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Major/Field of Study&nbsp;
              <Tooltip title="Which Department do you study in?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('major', {
            initialValue: this.props.user.major, rules: [{ required: true, message: 'We need your department name in order to choose the right university for you.' }]
          })(
            <Select onChange={() => this.onchange()} placeholder="Please select your major"
              onSelect={(s) => this.props.form.setFieldsValue({ 'major': s })}>
              <Option value="Engr">Engineering</Option>
              <Option value="ISE">Industrial / Manufacturing / Systems Engineering</Option>
              <Option value="Elec">Electrical / Electronic / Communications Engineering</Option>
              <Option value="CS">Computer Science / Engineering</Option>
              <Option value="Agri">Agriculture / Horticulture / Forestry / Plant Sciences</Option>
              <Option value="Petro">Petroleum Engineering</Option>
              <Option value="Biomed">Biomedical / Bioengineering Engineering</Option>
              <Option value="Aero">Aerospace / Aeronautical / Astronautical Engineering</Option>
              <Option value="Mech">Mechanical Engineering</Option>
              <Option value="Nuclear">Nuclear Engineering</Option>
              <Option value="Chem">Chemical Engineering</Option>
              <Option value="Environ">Environmental / Environmental Health Engineering</Option>
              <Option value="Civil" >Civil / Structural Engineering</Option>
              <Option value="Materials">Materials Science / Engineering</Option>
            </Select>
          )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Number of Research publications&nbsp;
              <Tooltip title="Please indicate the number of publications you have in each category. This will help us choose you a better matched university.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >

          <span style={{ minWidth: '200px', display: 'inline-block' }}>International Journal: </span> {getFieldDecorator('intjournal', {
            initialValue: this.props.user.intjournal
          })(
            <Input
              type="text"

              onChange={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          <span style={{ minWidth: '205px', display: 'inline-block' }}>International Conference Paper: </span> {getFieldDecorator('intconference', {
            initialValue: this.props.user.intconference
          })(
            <Input
              type="text"

              onChange={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          <br />
          <span style={{ minWidth: '205px', display: 'inline-block' }}>National Journal:</span>
          {getFieldDecorator('natjournal', {
            initialValue: this.props.user.natjournal
          })(<Input
            type="text"
            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
          <span style={{ minWidth: '205px', display: 'inline-block' }}>National Conference Paper:</span> {getFieldDecorator('natconference', {
            initialValue: this.props.user.natconference
          })(<Input
            type="text"
            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />
          )}
        </FormItem>




        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Job Experience&nbsp;
              <Tooltip title="Please indicate how many months of relevant Job Experience you have. This will help us choose you a better matched university.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('job_experience', {
            initialValue: this.props.user.job_experience
          })(
            <Input placeholder="In Months" onChange={() => this.onchange()} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Research Experience&nbsp;
              <Tooltip title="Please indicate how many months of relevant Research Experience you have. This will help us choose you a better matched university.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('research_experience', {
            initialValue: this.props.user.research_experience
          })(
            <Input placeholder="In Months" onChange={() => this.onchange()} />
          )}
        </FormItem>


      </Form >
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);




function mapStateToProps(state) {
  return {
    user: state.user
  };
}



export default connect(mapStateToProps, { updateUserInfo: updateUserInfo })(
  WrappedRegistrationForm
);
