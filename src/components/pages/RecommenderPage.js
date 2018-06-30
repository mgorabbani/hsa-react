import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateUserUni } from '../../actions/users'
import { Layout, Card, Button, notification } from 'antd';
import _ from 'lodash'
import ObjectID from "bson-objectid";
import SingleUniversity from '../component/SingleUniversity';
import API from '../../api';
const { Sider, Content } = Layout;
const gridStyle = {
    width: '50%',
    textAlign: 'left',
};

export class RecommendUni extends Component {
    state = {
        university: [],
        bucket_list: [],
        rank: ''
    }
    componentDidMount() {
        document.title = "Recommendation | HSA University Finder";

        API.user.recommendUniversity(this.props.user).then(d => {

            this.setState({ university: d.docs, rank: d.dept })
        })
        this.setState({ bucket_list: this.props.user.bucket_list })

    }
    updateList(e) {

        const todo = { name: e, _id: ObjectID() }

        this.state.bucket_list.push(todo);
        this.setState({ bucket_list: this.state.bucket_list });


    }
    handleRemove(name) {
        // Filter all todos except the one to be removed


        API.user.uniBucketRemove({ data: name }).then(e => {
            const remainder = this.state.bucket_list.filter((list) => {
                if (list.name !== name)
                    return list;
            });
            this.setState({ bucket_list: remainder });
            notification['error']({
                message: 'University Removed From the List!',
            });
        })
    }
    render() {

        return (
            <Layout>
                <Sider theme="light" width={300} style={{ padding: '10px', minHeight: '100vh' }} >
                    <h3>Short List</h3>
                    {_.map(this.state.bucket_list, (e, key) => {
                        return <li key={key} style={{ padding: '10px', fontWeight: 'bold', color: '#272727' }} >{e.name}<span style={{ marginTop: '-5px', right: '10px', position: 'absolute' }}>
                            <Button onClick={() => this.handleRemove(e.name)} type="danger" shape="circle" icon="close" /></span></li>
                    })}
                </Sider>
                <Content>

                    {this.state.university.map((data, k) => {

                        // if (data.Name)
                        return < Card.Grid style={gridStyle} key={k} >
                            <SingleUniversity
                                gre={this.props.user.uniquant}
                                data={data}
                                dept={this.state.rank}
                                updateList={(e) => this.updateList(e)}
                            />
                        </Card.Grid>
                    })}
                </Content>
            </Layout >
        )
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
}



export default connect(mapStateToProps, { updateUserUni })(RecommendUni)



