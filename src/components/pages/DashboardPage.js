import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";

import { Container, Row, Col } from "reactstrap";
import gravatarUrl from "gravatar-url";
import heroIMG from '../../assets/dashboard.jpg';
import { TopArea, ProfileBox, Sphr, Tips } from '../CommonStyles'
class DashboardPage extends React.Component {
  render() {
    const { isConfirmed, user } = this.props;
    return (
      <React.Fragment>
        <div className="container-fluid">
          {!isConfirmed && <ConfirmEmailMessage />}
        </div>
        <TopArea>
          <h1 > Welcome Back to HSA Students!</h1>
          <h5>It's always good to see you.</h5>
        </TopArea>
        <Container >
          <Row>
            <Col md={{ offset: 1, size: 3 }}>
              <ProfileBox>
                <img
                  className="img-fluid "
                  src={gravatarUrl(user.email, { size: 200 })}
                  alt="Gravatar"
                />
              </ProfileBox>
            </Col>
            <Col md={6} style={{ marginTop: '20px' }}>
              <div className="row">
                <h6>Your Status</h6>
              </div>
              <Tips className="row">
                <span className="col-md-2">
                  <img src={require('../../assets/incomplete.png')} width={70} />
                </span>
                <span className="col-md-10">
                  <h3>Your profile is incomplete</h3>
                  <h6>Add to your profile to get the most out of it.</h6>
                </span>
              </Tips>
            </Col>
          </Row>
        </Container>
      </React.Fragment >

    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    user: state.user
  };
}

export default connect(mapStateToProps)(DashboardPage);
