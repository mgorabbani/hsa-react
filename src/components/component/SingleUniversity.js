import React from "react";
import { connect } from 'react-redux'

import { Card, Row, Progress, Icon, Button, notification } from 'antd';
import { Link } from 'react-router-dom'
import API from '../../api'

function toDolar(e) {
    return (e).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
class SingleUniversity extends React.Component {

    state = {
        disablebutton: false
    }
    constructor(props) {
        super(props)
    }
    addtolist() {
        API.user.uniBucket(this.props.data.Name).then(e => {
            notification['success']({
                message: 'University Added to the List!',
            });
            this.props.updateList(this.props.data.Name)
            this.setState({ disablebutton: true })
        })
    }
    componentDidMount() {
        // console.log(this.props.user.bucket_list.name, 'lissst')
        if (this.props.user) {
            let found = this.props.user.bucket_list.find(e => {
                if (e.name == this.props.data.Name) {
                    return true;
                }
                return false
            })
            this.setState({ disablebutton: found })
        }

    }
    render() {
        let { Name, AcceptanceRate, PCIS, PCOS, PYIS, PYOS, AvgGREQ, ResearchExpense, Enrollment, rank, } = this.props.data;
        let dept = this.props.dept;
        dept = this.props.data[dept];
        let grecheck = (this.props.gre >= AvgGREQ) ? '#42EA6A' : 'red'
        ResearchExpense = toDolar(ResearchExpense)
        return (
            <React.Fragment>

                <Card title={Name} style={{ margin: 0 }}
                    extra={<span><Icon type="caret-up" style={{ fontSize: 17, color: '#2048EE' }} /> <b>{dept}</b></span>} type="inner"
                    actions={[<b>Avg GRE-Q:<p style={{ color: grecheck }}>{AvgGREQ}</p></b>, <b>Research Expenese: <p>${ResearchExpense}</p></b>, <b>Yearly Enrollment: <p>{Enrollment}</p></b>]}
                >
                    <Card.Meta
                        avatar={<div style={{ textAlign: 'center' }}>
                            <Progress type="circle" percent={Math.round(AcceptanceRate * 100)} width={80} /> <br />
                            <span>Acceptance Rate</span>
                        </div>}
                        description={
                            <div>
                                {(PCIS != 0) && <p>Per Credit In State fee <b>${toDolar(PCIS)}</b></p>}
                                {(PCOS != 0) &&
                                    <p>Per Credit Out of State fee <b> ${toDolar(PCOS)}</b></p>}
                                {(PYIS != 0) &&
                                    <p>Per Credit In State fee <b>${toDolar(PYIS)}</b></p>}
                                {(PYOS != 0) &&
                                    <p>Per Year Out of State fee <b> ${toDolar(PYOS)}</b></p>}
                                <Button type="primary" disabled={this.state.disablebutton} onClick={() => this.addtolist()}>{!this.state.disablebutton ? 'Add to List' : 'Added'}</Button>
                            </div>}
                        style={{ textAlign: 'right' }}
                    />
                </Card>



            </React.Fragment >
        );
    }
}


const mapStateToProps = (state) => {
    return { user: state.user }
}



export default connect(mapStateToProps)(SingleUniversity)
