import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import _ from 'lodash'
import { Container, Row, Col } from "reactstrap";
import gravatarUrl from "gravatar-url";
import { List } from 'antd';

import { TopArea, ProfileBox, Sphr, Tips } from '../CommonStyles'




class DashboardPage extends React.Component {
  state = {
    incomplete: 0
  }
  componentDidMount() {
    let count = Math.round(_.size(this.props.user) / 30 * 100)
    console.log(count, 'ccc')
    this.setState({
      incomplete: count
    })
  }

  render() {
    const { langtest, unitest, unitotal, toefltotal, ieltstotal, job_experience, research_experience, undergradcgpa, publication_number } = this.props.user;
    console.log(this.props)
    const data = [
      {
        title: unitest,
        icon: 'approval',
        number: unitotal
      },
      {
        title: langtest,
        icon: 'read',
        number: langtest == 'TOEFL' ? toefltotal : ieltstotal
      },
      {
        title: 'UG CGPA',
        icon: 'graduation-cap',
        number: undergradcgpa
      },
      {
        title: 'Work Exp',
        icon: 'business-filled',
        number: job_experience
      },
      {
        title: 'Research Exp',
        icon: 'saving-book',
        number: research_experience
      },
      {
        title: 'Publications',
        icon: 'us-news',
        number: publication_number
      },
    ];
    console.log('counting', )
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
            <Col md={{ size: 3 }}>
              <ProfileBox style={{ minHeight: "200px" }}>
                <img
                  className="img-fluid "
                  src={gravatarUrl(user.email, { size: 200 })}
                  alt="Gravatar"
                />
              </ProfileBox>

            </Col>
            <Col md={5} style={{ marginTop: '20px' }}>
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
            <Col md={{ size: 4 }} style={{ marginTop: "30px" }} >
              <List
                grid={{ xs: 4, sm: 4, md: 2 }}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<img src={"https://png.icons8.com/color/48/4AB05B/" + item.icon + ".png"} alt="" />}
                      title={item.number}
                      description={item.title}
                    />

                  </List.Item>
                )}
              />
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
