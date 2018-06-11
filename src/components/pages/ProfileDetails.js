import React, { Component } from 'react'

import { connect } from 'react-redux'

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



