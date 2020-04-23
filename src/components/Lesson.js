import React, {useState} from 'react'
import { connect } from 'react-redux'
import {useStore} from 'react-redux';
import {nextCard, resolveCard, unresolveCard} from "../actions/actions";



const Lesson = ({item, nextCard, idLesson, resolveCard, unresolveCard}) => {
    const store = useStore();
    const [cardState, setCardState] = useState({
        card: item.cards.find(el => el.id === store.getState().showCard.indexCard)
    });
    const [showState, setShowState] = useState({
        show: cardState.card.question.title,
        cardOrQuestion: 1,
    });

    const generateCard = () => {
        let limit = item.cards.length;
        console.log(cardState);
        if (cardState.card.id +1 === limit) {
            unresolveCard(idLesson);
            console.log('test')
        }
        else if ( cardState.card.id + 1 < limit) {
            nextCard(limit);
        }
        setCardState({
            card: item.cards.find(el => el.id === store.getState().showCard.indexCard)
        });
        let test = item.cards.find(el => el.id === store.getState().showCard.indexCard)
        setShowState({
            show: test.question.title,
            cardOrQuestion: Math.floor(Math.random() * 2) + 1,
        });
        cardOrQuestion = 'question';

    };

    const swip = () => {
        setShowState({
            show: showState.show === cardState.card.question.response.goodResponse ? cardState.card.question.title : cardState.card.question.response.goodResponse,
            cardOrQuestion: 1
        });
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
    };

    const checkResponse = (id, response) => {
        if (response === cardState.card.question.response.goodResponse) {
            document.querySelector('#'+ id).style.backgroundColor = '#32cdff';
            resolveCard(idLesson, cardState.card.id)
        } else {
            document.querySelector('#'+ id).style.backgroundColor = '#FF5B45'
        }
    };

    let cardOrQuestion = 'card';
    const next = () => {
        generateCard();
    };
    function returnCard() {
        return (
            <div className="cardLesson">
                <div id={"card-" + cardState.card.id} className="question" onClick={() => swip()}>
                    <div className="containerTitleQuestion">
                        <h3 id={"title-"+ cardState.card.id} className="titleQuestion">{showState.show}</h3>
                    </div>
                </div>
            </div>
        )
    }
    function returnSurvey() {
        return (
            <div className="survey">
                <div className="containerQuestion">
                    <p>{cardState.card.question.title}</p>
                </div>
                <div className="containerResponse">
                    <button id="response_1" onClick={()=> checkResponse('response_1', cardState.card.question.response.response_1)} className="response">{cardState.card.question.response.response_1}</button>
                    <button id="response_2" onClick={()=> checkResponse('response_2' ,cardState.card.question.response.response_2)} className="response">{cardState.card.question.response.response_2}</button>
                    <button id="response_3" onClick={()=> checkResponse('response_3', cardState.card.question.response.response_3)} className="response">{cardState.card.question.response.response_3}</button>
                </div>
            </div>
        )
    }
    return (
        <div className="lesson">
            <div className="containerCardLesson">
                {
                    showState.cardOrQuestion === 1 ? returnCard() : returnSurvey()
                }
                <button className="button" onClick={() => next()}>CONTINUE</button>
            </div>
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    return {
        showCard : state.showCard,
        item: state.lesson.find(lesson => lesson.id = id),
        idLesson : id
    }
};


export default connect(
    mapStateToProps, { nextCard, resolveCard, unresolveCard }
)(Lesson)
