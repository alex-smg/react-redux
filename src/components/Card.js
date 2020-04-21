import React from 'react'
import { connect } from 'react-redux'

function Card (props) {
    return (
        <div className="card">
            <h2>{props.item.title}</h2>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const itemState = state.lesson[ownProps.numberCard];
    return {
        item: itemState
    }
};

export default connect(
    mapStateToProps
)(Card)
