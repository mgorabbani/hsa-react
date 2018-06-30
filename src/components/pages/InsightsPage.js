import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Layout, Card } from 'antd';
import SingleUniversity from '../component/SingleUniversity';
import StudentMaps from './StudentMaps'
const { Header, Footer, Sider, Content } = Layout;
const gridStyle = {
    width: '50%',
    textAlign: 'left',
};


export class Insights extends Component {

    componentDidMount() {
        document.title = "Insights | HSA University Finder";
    }
    render() {

        return (
            <Layout style={{ minHeight: '85vh' }}>
                <Sider theme="light" width={300}>
                    <Content style={{ padding: '10px', }}>
                        <h3> Student Location Map</h3>
                    </Content>
                </Sider>
                <Content>
                    <StudentMaps />
                </Content>
            </Layout>
        )
    }
}



export default connect()(Insights)



