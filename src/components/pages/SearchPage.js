import React from "react";
import PropTypes from "prop-types";
import SingleStudent from '../component/SingleStudent';
import { Input, Col, Row } from 'antd';
const Search = Input.Search;


class SearchPage extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div style={{ textAlign: 'center', padding: '50px', background: '#F1F6F4' }}>
                    <h1 style={{}} >College Application Profiles</h1>
                    <h6>Find people similar to you. Unlock their application files and message them for advice.</h6>
                    <br />
                    <Row>
                        <Col className="gutter-row" span={12} offset={6}>
                            <Search
                                placeholder="Search By Colleges or Universities"
                                enterButton="Search"
                                size="large"
                                onSearch={value => console.log(value)}
                            />
                        </Col>
                    </Row>
                </div>

                <div className="container">
                    <div className="col-md-12">
                        <SingleStudent />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default SearchPage;
