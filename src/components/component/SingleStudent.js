import React from "react";
import PropTypes from "prop-types";
import { Card } from 'antd';
import { Link } from 'react-router-dom'

class SingleStudent extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Link
                    to="/profile-details/123"
                >
                    <Card
                        hoverable
                        style={{ width: 200 }}
                        cover={<img alt="example" src="https://www.admitsee.com/uploads/_framed/x1-220893-a04da4a3e3c6a7931dc43a9c6ec263b4-senior_portrait.jpg.pagespeed.ic.PF51U-87RJ.webp" />}
                    >
                        <Card.Meta
                            title="UPenn ‘19"
                            description="Accepted to RPI, Drexel, RIT, Pitt, VA Tech"
                        />
                    </Card>
                </Link>

            </React.Fragment>
        );
    }
}


export default SingleStudent;
