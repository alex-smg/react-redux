import React, {useState} from 'react'
import { connect } from 'react-redux'



const Survey = ({card}) => {
    return (
        <div className="survey">
            <div>
                <p>{card.question.title}</p>
            </div>
            <div>
                <button className="response">{card.question.response.response_1}</button>
                <button className="response">{card.question.response.response_2}</button>
                <button className="response">{card.question.response.response_3}</button>
            </div>
        </div>
    )
}



export default connect(
)(Survey)
