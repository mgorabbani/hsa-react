import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Layout } from 'antd';
import StudentMaps from './StudentMaps'
const { Sider, Content } = Layout;


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



