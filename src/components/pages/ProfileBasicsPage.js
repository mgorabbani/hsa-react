import React from "react";

import { Row, Col } from 'antd';

import Steps from '../forms/Steps'
import 'antd/dist/antd.css';




class ProfileBasics extends React.Component {
    componentDidMount() {
        document.title = "Profile | HSA University Finder";
    }
    render() {
        return (
            <React.Fragment>
                <div style={{ textAlign: 'center', padding: '50px', background: '#F1F6F4' }}>
                    <h1 style={{}} >LET’S GET TO KNOW EACH OTHER.</h1>
                    <h6>Let us pick the perfect match universities for you!</h6>
                </div>

                <div className="container m50">
                    <Row>
                        <Col span={18} offset={3}>
                            <Steps />
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}


export default ProfileBasics;
