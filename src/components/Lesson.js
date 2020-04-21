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
        show: cardState.card.question.title,
        swipCard: true
    });

    const generateCard = () => {
        let limit = item.cards.length;
        console.log(cardState);
        if ( cardState.card.id +1 < limit) {
            console.log('test')
            nextCard(limit);
            setCardState({
                card: item.cards.find(el => el.id === store.getState().showCard.indexCard)
            });
            let test = item.cards.find(el => el.id === store.getState().showCard.indexCard)
            setShowState({
                show: test.question.title
            });
        }

    };

    const swip = () => {
        let card = document.querySelector('#card-'+ cardState.card.id);
        let title = document.querySelector('#title-'+ cardState.card.id);

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
        setShowState({
            show: showState.show === cardState.card.question.response.goodResponse ? cardState.card.question.title : cardState.card.question.response.goodResponse
        });
    }

    const next = () => {
        generateCard();
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
                <button className="button" onClick={() => next()}>CONTINUE</button>
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
