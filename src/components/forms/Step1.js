import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { updateUserInfo } from '../../actions/users'

import { message, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
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
      initialValue: '+88',
    })(
      <Select style={{ width: 100 }}>
        <Option value="+88">+88</Option>
      </Select>
    );
    console.log("usersss", this.props.user)
    return (

      < Form onSubmit={this.handleSubmit} >
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Name&nbsp;
            </span>
          )}
        >
          {getFieldDecorator('name', {
            initialValue: this.props.user.name,
            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
          })(
            <Input onBlur={() => this.onchange()} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            initialValue: this.props.user.email,
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }],
          })(
            <Input disabled onBlur={() => this.onchange()} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Phone Number"
        >
          {getFieldDecorator('phone', { initialValue: this.props.user.phone, })(
            <Input onBlur={() => this.onchange()} addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Facebook URL"
        >
          {getFieldDecorator('fb_url', { initialValue: this.props.user.fb_url, })(
            <Input onBlur={() => this.onchange()} placeholder="https://facebook.com/username" />
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
