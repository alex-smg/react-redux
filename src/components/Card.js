import React, {useState} from 'react'
import {connect} from 'react-redux'

function Card (props) {
    const [showState, setShowState] = useState({
        show: props.item.question.title,
        responseOrResult: 1,
    });

    const swip = () => {
        setShowState({
            responseOrResult: showState.responseOrResult === 1 ? 2 : 1
        });
        let card = document.querySelector('#card-'+ props.id);
        let title = document.querySelector('#title-'+ props.id);

        if(card.classList[1] === 'transition') {
            card.classList.add('transition2');
            card.classList.remove('transition');
            title.classList.add('transitionh22');
            title.classList.remove('transitionh2');
        } else {
            card.classList.add('transition');
            card.classList.remove('transition2');
            title.classList.add('transitionh2');
            title.classList.remove('transitionh22');
        }
    };

    return (
        <div className="cardLesson">
            <div id={"card-" + props.id} className="question" onClick={() => swip()}>
                <div className="containerTitleQuestion">
                    <h3 id={"title-"+ props.id} className="titleQuestion">{
                        showState.responseOrResult === 1 ? props.item.question.title : props.item.question.response.goodResponse
                    }</h3>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const index =  state.showCard.indexCard;
    const itemState = state.lesson[ownProps.indexOfLesson].cards.find(el => el.id === ownProps.id);
    return {
        index: index,
        item: itemState
    }
};

export default connect(
    mapStateToProps
)(Card)
