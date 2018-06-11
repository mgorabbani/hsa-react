import React from "react";

import { Row, Col } from 'antd';

import Steps from '../forms/Steps'
import 'antd/dist/antd.css';




class ProfileBasics extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div style={{ textAlign: 'center', padding: '50px', background: '#F1F6F4' }}>
                    <h1 style={{}} >LET’S GET TO KNOW EACH OTHER.</h1>
                    <h6>Find people similar to you. Unlock their application files and message them for advice.</h6>
                </div>

                <div className="container m50">
                    <Row>
                        <Col span={16} offset={4}>
                            <Steps />
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}


export default ProfileBasics;
