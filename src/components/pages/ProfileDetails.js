import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'

export class ProfileDetails extends Component {

    render() {

        return (
            <div>
                profile details
            </div>
        )
    }
}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails)



