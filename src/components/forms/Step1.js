import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { createUserRequest } from "../../actions/users";


import { Form, Input } from 'antd';
const FormItem = Form.Item;
class Step1 extends React.Component {
  state = {
    data: {
      email: "",
      username: "",
      password: ""
    },
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.serverErrors });
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data);
    }
  };

  validate = data => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    if (!data.username) errors.username = "Can't be blank";

    return errors;
  };

  render() {
    const { data, errors } = this.state;

    return (

      <Form layout="inline">
        <label htmlFor="">Name: </label>
        <Input />
        <label htmlFor="">Name: </label>
        <Input />
        <label htmlFor="">Name: </label>
        <Input />
        <label htmlFor="">Name: </label>
        <Input />
        <label htmlFor="">Name: </label>
        <Input />
        <label htmlFor="">Name: </label>
        <Input />
        <label htmlFor="">Name: </label>
        <Input />
        <label htmlFor="">Name: </label>
        <Input />

      </Form >
    );
  }
}

function mapStateToProps(state) {
  return {
    serverErrors: state.formErrors.signup
  };
}

Step1.propTypes = {
  submit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { submit: createUserRequest })(
  Step1
);
