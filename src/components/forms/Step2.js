import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

import { updateUserInfo } from '../../actions/users'
import { Form, Input, InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


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
      <Select style={{ width: 100 }} onBlur={() => this.onchange()} >
        <Option value="880">+880</Option>
        <Option value="01">+1</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit} onBlur={() => this.onchange()} >
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
            <Input onBlur={() => this.onchange()} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="GRE/GMAT/SAT Test Score"
        >
          TOTAL:
          {getFieldDecorator('gretotal', {
            initialValue: this.props.user.gretotal
          })(
            <Input
              type="text"
              onBlur={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          Verbal:
          {getFieldDecorator('grevarbal', {
            initialValue: this.props.user.grevarbal
          })(<Input
            type="text"

            onBlur={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
          Quant:  {getFieldDecorator('grequant', {
            initialValue: this.props.user.grequant
          })(
            <Input
              type="text"
              onBlur={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          AW:  {getFieldDecorator('greawa', {
            initialValue: this.props.user.greawa
          })(
            <Input
              type="text"
              onBlur={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="TOEFL Test Score"
        >
          TOTAL:  {getFieldDecorator('toefltotal', {
            initialValue: this.props.user.toefltotal
          })(
            <Input
              type="text"

              onBlur={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          R:  {getFieldDecorator('toeflreading', {
            initialValue: this.props.user.toeflreading
          })(
            <Input
              type="text"

              onBlur={() => this.onchange()}
              style={{ width: '50px', marginRight: '3%' }}
            />)}
          W:
          {getFieldDecorator('toeflwriting', {
            initialValue: this.props.user.toeflwriting
          })(<Input
            type="text"
            onBlur={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
          L: {getFieldDecorator('toefllistening', {
            initialValue: this.props.user.toefllistening
          })(<Input
            type="text"
            onBlur={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />
          )}
          S:  {getFieldDecorator('toeflspeaking', {
            initialValue: this.props.user.toeflspeaking
          })(<Input
            type="text"
            onBlur={() => this.onchange()}
            style={{ width: '50px', marginRight: '3%' }}
          />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Research publications"
        >
          {getFieldDecorator('publication_number', {
            initialValue: this.props.user.publication_number
          })(
            <Input placeholder="3" onBlur={() => this.onchange()} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Job Experience"
        >
          {getFieldDecorator('job_experience', {
            initialValue: this.props.user.job_experience
          })(
            <Input placeholder="In Years" onBlur={() => this.onchange()} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Research Experience"
        >
          {getFieldDecorator('research_experience', {
            initialValue: this.props.user.research_experience
          })(
            <Input placeholder="In Months" onBlur={() => this.onchange()} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Applied University"
        >
          {getFieldDecorator('applied_university', {
            initialValue: this.props.user.applied_university
          })(
            <Input placeholder="How many universities have you applied to?" onBlur={() => this.onchange()} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Accepted University"
        >
          {getFieldDecorator('accepted_university', {
            initialValue: this.props.user.accepted_university
          })(
            <Input onBlur={() => this.onchange()} placeholder="How many universities have you been accepted to?" />
          )}
        </FormItem>


      </Form>
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
