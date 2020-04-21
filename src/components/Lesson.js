import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import {useStore} from 'react-redux';
import {nextCard} from "../actions/actions";



const Lesson = ({item, nextCard}) => {
    const store = useStore();
    const [cardState, setCardState] = useState({
        card: item.cards.find(el => el.id === store.getState().showCard.indexCard)
    });
    const [showState, setShowState] = useState({
        show: cardState.card.question.title
    });

    useEffect(() => {
        console.log(store.getState());
    })


    const generateCard = () => {
        nextCard(4);
        console.log(item.cards.find(el => el.id === store.getState().showCard.indexCard));
        setCardState({
            card: item.cards.find(el => el.id === store.getState().showCard.indexCard)
        });
        let test = item.cards.find(el => el.id === store.getState().showCard.indexCard)
        console.log(test)
        setShowState({
            show: test.question.title
        });
    };

    const swip = () => {
        document.querySelector('#card-'+ cardState.card.id).classList.add('transition');
        document.querySelector('#card-'+ cardState.card.id).classList.add('transitionh2');
        setShowState({
            show: showState.show === cardState.card.question.response.goodResponse ? cardState.card.question.title : cardState.card.question.response.goodResponse
        });
    }

    const next = () => {
        console.log(store.getState());
        generateCard();
        console.log(store.getState());
    };
    return (
        <div className="lesson">
            <div className="containerCardLesson">
                <div className="cardLesson" onClick={()=> swip()}>
                    <div id={"card-"+cardState.card.id} className="question">
                        <h3 id={"title-"+cardState.card.id}>{
                           showState.show
                        }</h3>
                    </div>
                    <div>

                    </div>
                </div>
                <button onClick={() => next()}>CONTINUE</button>
            </div>
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        showCard : state.showCard,
        item: state.lesson.find(lesson => lesson.id = id)
    }
};


export default connect(
    mapStateToProps, { nextCard }
)(Lesson)
