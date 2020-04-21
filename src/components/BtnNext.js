import React from "react";
import { connect } from 'react-redux'
import { nextCard } from '../actions/actions'

const BtnNext = ({nextCard}) => {
    return(<div>

        </div>
    )
}

export default connect(
    null,
    { nextCard }
)(BtnNext);
