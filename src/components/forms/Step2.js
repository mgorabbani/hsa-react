import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

import { updateUserInfo } from '../../actions/users'
import { Radio, Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  onchange = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      this.props.updateUserInfo(values)

    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '880',
    })(
      <Select style={{ width: 100 }} onChange={() => this.onchange()} >
        <Option value="880">+880</Option>
        <Option value="01">+1</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit} onChange={() => this.onchange()} >
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Bangladeshi Alma Mater&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('bd_uni', {
            initialValue: this.props.user.bd_uni
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Undergrad CGPA"
        >
          {getFieldDecorator('undergradcgpa', {
            initialValue: this.props.user.undergradcgpa
          })(
            <Input onChange={() => this.onchange()} />
          )}
        </FormItem>

        <FormItem
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
        </FormItem>
        {this.props.user.unitest && <FormItem
          {...formItemLayout}
          label={this.props.user.unitest + " Test Score"}
        >
          TOTAL:
          {getFieldDecorator('unitotal', {
            initialValue: this.props.user.unitotal
          })(
            <Input
              type="text"
              onChange={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          Verbal:
          {getFieldDecorator('univarbal', {
            initialValue: this.props.user.univarbal
          })(<Input
            type="text"

            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
          Quant:  {getFieldDecorator('uniquant', {
            initialValue: this.props.user.uniquant
          })(
            <Input
              type="text"
              onChange={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          AW:  {getFieldDecorator('uniawa', {
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

        {this.props.user.langtest && <FormItem
          {...formItemLayout}
          label={this.props.user.langtest + " Test Score"}
        >
          TOTAL:  {getFieldDecorator('langtotal', {
            initialValue: this.props.user.langtotal
          })(
            <Input
              type="text"

              onChange={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          R:  {getFieldDecorator('langreading', {
            initialValue: this.props.user.langreading
          })(
            <Input
              type="text"

              onChange={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          W:
          {getFieldDecorator('langwriting', {
            initialValue: this.props.user.langwriting
          })(<Input
            type="text"
            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
          L: {getFieldDecorator('langlistening', {
            initialValue: this.props.user.langlistening
          })(<Input
            type="text"
            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />
          )}
          S:  {getFieldDecorator('langspeaking', {
            initialValue: this.props.user.langspeaking
          })(<Input
            type="text"
            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
        </FormItem>}
        <FormItem
          {...formItemLayout}
          label="Research publications"
        >

          International Journal:  {getFieldDecorator('intjournal', {
            initialValue: this.props.user.intjournal
          })(
            <Input
              type="text"

              onChange={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          International Conference Paper:  {getFieldDecorator('intconference', {
            initialValue: this.props.user.intconference
          })(
            <Input
              type="text"

              onChange={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          National Journal:
          {getFieldDecorator('natjournal', {
            initialValue: this.props.user.natjournal
          })(<Input
            type="text"
            onChange={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
          National Conference Paper: {getFieldDecorator('natconference', {
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
          label="Job Experience"
        >
          {getFieldDecorator('job_experience', {
            initialValue: this.props.user.job_experience
          })(
            <Input placeholder="In Years" onChange={() => this.onchange()} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Research Experience"
        >
          {getFieldDecorator('research_experience', {
            initialValue: this.props.user.research_experience
          })(
            <Input placeholder="In Months" onChange={() => this.onchange()} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Applied University"
        >
          {getFieldDecorator('applied_university', {
            initialValue: this.props.user.applied_university
          })(
            <Input placeholder="How many universities have you applied to?" onChange={() => this.onchange()} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Accepted University"
        >
          {getFieldDecorator('accepted_university', {
            initialValue: this.props.user.accepted_university
          })(
            <Input onChange={() => this.onchange()} placeholder="How many universities have you been accepted to?" />
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
