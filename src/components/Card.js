import React, {useState} from 'react'
import { connect } from 'react-redux'

function Card (props) {

    console.log(props);

    const [showState, setShowState] = useState({
        show: props.item.question.title,
        cardOrQuestion: 1,
    });

    const swip = () => {
        setShowState({
            show: showState.show === props.item.question.response.goodResponse ? props.item.question.title : props.item.question.response.goodResponse,
            cardOrQuestion: 1
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
                    <h3 id={"title-"+ props.id} className="titleQuestion">{showState.show}</h3>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const itemState = state.lesson[ownProps.indexOfLesson].cards.find(el => el.id === ownProps.id);
    return {
        item: itemState
    }
};

export default connect(
    mapStateToProps
)(Card)
