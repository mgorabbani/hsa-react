import React from "react";
import { connect } from "react-redux";
import Step1 from './Step1';
import Step2 from './Step2';
// import Step3 from './Step3';
import api from "../../api";
import { Steps, Button, notification } from 'antd';
const Step = Steps.Step;



class StepsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            user: [],
        };
    }

    steps = [{
        title: 'Personal Information',
        content: <Step1 />,
    }, {
        title: 'Student Profile',
        content: <Step2 />,
    }];


    next() {
        const current = this.state.current + 1;
        this.setState({ current });
        api.user.updateUserInfo(this.props.user).then(() => {
            notification['success']({
                message: 'Your personal info has been updated!',
            });
        })
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render() {
        const { current } = this.state;


        return (
            <div style={{ paddingBottom: '60px' }} >
                <Steps current={current}>
                    {this.steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <br />
                <div className="steps-content">{this.steps[this.state.current].content}</div>
                <br />
                <div className="steps-action">
                    {
                        this.state.current < this.steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }

                    {
                        this.state.current > 0
                        &&
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
            </Button>
                    }
                    &nbsp;&nbsp;
                    {
                        this.state.current === this.steps.length - 1
                        &&
                        <Button type="primary" onClick={() => {
                            api.user.updateUserInfo(this.props.user).then(() => {
                                notification['success']({
                                    message: 'Your Profile has been updated!',
                                });
                            })
                        }}>Done</Button>
                    }
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        history: state.history
    };
}

export default connect(mapStateToProps, null)(
    StepsList
);
