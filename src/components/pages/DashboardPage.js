import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import _ from 'lodash'

import { Container, Row, Col, } from "reactstrap";
import { Link } from 'react-router-dom'
import { List, Divider } from 'antd';

import { TopArea, ProfileBox, Tips } from '../CommonStyles'




class DashboardPage extends React.Component {
  state = {
    incomplete: 0,
    s: false,
    bucket_list: [],
    publication_number: 0,
  }
  componentDidMount() {
    document.title = "Dashboard | HSA University Finder";
    let count = Math.round(_.size(this.props.user) / 30 * 100)
    const { langtest, unitotal, toefltotal, ieltstotal, job_experience, research_experience, undergradcgpa, intconference, intjournal, natconference, natjournal } = this.props.user;

    let ic = parseInt(intconference) || 0;
    let ij = parseInt(intjournal) || 0;
    let nc = parseInt(natconference) || 0;
    let nj = parseInt(natjournal) || 0;
    let publication_number = ic + ij + nc + nj;
    this.setState({ publication_number: publication_number })
    if (!!langtest && !!unitotal && !!job_experience && !!research_experience && !!undergradcgpa && !!publication_number && !!toefltotal || !!ieltstotal) {
      this.setState({ s: true })
    }
    this.setState({
      incomplete: count
    })

    this.setState({ bucket_list: this.props.user.bucket_list })

  }

  render() {
    const { langtest, unitest, unitotal, toefltotal, ieltstotal, job_experience, research_experience, undergradcgpa, publication_number } = this.props.user;


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
        number: this.state.publication_number
      },
    ];

    const { isConfirmed, user } = this.props;
    return (
      <React.Fragment>
        <div className="container-fluid">
          {!isConfirmed && <ConfirmEmailMessage />}
        </div>
        <TopArea>
          <h1 > Welcome Back to HSA University Finder</h1>
          <h5>It's always good to see you.</h5>
        </TopArea>
        <Container >
          <Row>
            <Col md={{ size: 3 }}>
              <ProfileBox style={{ minHeight: "200px" }}>
                <img
                  className="img-fluid "
                  src={user.photo}
                  alt="Gravatar"
                />
              </ProfileBox>

            </Col>
            <Col md={5} style={{ marginTop: '20px' }}>
              <div className="row">
                <Divider orientation="left"> <h3>Your Status</h3></Divider>
              </div>
              {!this.state.s && <Tips className="row">
                <span className="col-md-2">
                  <img src={require('../../assets/incomplete.png')} width={70} />
                </span>
                <span className="col-md-10">

                  <h3>Your profile is incomplete</h3>
                  <h6>Add to your profile to get the most out of it.</h6>
                  <Link
                    to="/profile-basics"
                  >Edit Your Profile</Link>
                </span>
              </Tips>}
              {this.state.s && <Tips className="row">
                <span className="col-md-2">
                  <img src="https://png.icons8.com/color/96/4AB05B/task-completed.png" width={80} style={{ marginRight: '10px', marginTop: '20px' }} />
                </span>
                <span className="col-md-10">

                  <h3>Great!</h3>
                  <h6>Now that you complete your profile, You can use the University Recommend Feature</h6>
                  <Link
                    to="/university-recommendation"
                  >Go to University Recommendation</Link>
                </span>
              </Tips>}

              <div className="row" style={{ marginTop: '40px', marginBottom: '40px' }}>

                <Divider orientation="left">  <h3>Short Listed University</h3></Divider>

                <div>
                  <ul>
                    <List
                      dataSource={this.state.bucket_list}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta className="lisst"
                            avatar={<img src={"https://png.icons8.com/doodle/24/4AB05B/checkmark.png"} alt="" />}
                            title={item.name}
                          />

                        </List.Item>
                      )}
                    />

                  </ul>
                </div>
              </div>
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
