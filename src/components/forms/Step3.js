import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { updateUserInfo } from "../../actions/users";
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import API from "../../api";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;



class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    usaunilist: [],
  };
  onchange = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

      }
      if (values.incoming_university.length > 2) {

        API.user.getUSAUnilist(values.incoming_university).then((unilist) => {

          let univlist = unilist.data.map(e => e.name);

          this.setState({ usaunilist: univlist })
        })
      }
      this.props.updateUserInfo(values)

    });
  }
  componentDidMount = () => {
    this.setState({
      autoCompleteResult: []
    })
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


    return (
      <Form onChange={() => this.onchange()} >
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Incoming University Name&nbsp;
            </span>
          )}
        >
          {getFieldDecorator('incoming_university', {
            initialValue: this.props.user.incoming_university
          })(<AutoComplete
            dataSource={this.state.usaunilist}
            onChange={() => this.onchange()}
            onSelect={(s) => this.props.form.setFieldsValue({ 'incoming_university': s })}
            placeholder="Type University Name"
          />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Admission In"
        >
          {getFieldDecorator('admission_in', {
            initialValue: this.props.user.admission_in
          })(
            <Select onBlur={() => this.onchange()} >
              <Option value="PhD">PhD</Option>
              <Option value="Masters">Masters</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Field of Study/Major"
        >
          {getFieldDecorator('major', {
            initialValue: this.props.user.major
          })(
            <Input placeholder='Computer Science' onBlur={() => this.onchange()} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Research Area"
        >
          {getFieldDecorator('research_area', {
            initialValue: this.props.user.research_area
          })(
            <Input placeholder='Human Computer Interaction' onBlur={() => this.onchange()} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Financial Aid"
        >
          {getFieldDecorator('financial_aid', {
            initialValue: this.props.user.financial_aid
          })(
            <Select mode="multiple" onBlur={() => this.onchange()} >
              <Option value="TA">Teaching Assistentship</Option>
              <Option value="RA">Research Assistentship</Option>
              <Option value="GA">Graduate Assistentship</Option>
              <Option value="FS">Fellowship</Option>
              <Option value="FT">Full Tuition Waiver</Option>
              <Option value="PT">In State/Partial Tuition Waiver</Option>
              <Option value="OT">Others</Option>

            </Select>
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
