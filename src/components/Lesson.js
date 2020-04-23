import React, {useState} from 'react'
import { connect, useStore } from 'react-redux'
import {nextCard, resolveCard, unresolveCard} from "../actions/actions";
import Card from './Card';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";


const Lesson = ({item, nextCard, idLesson, resolveCard, unresolveCard}) => {
    const store = useStore();
    const [cardState, setCardState] = useState({
        card: item.cards.find(el => el.id === store.getState().showCard.indexCard),
    });
    const [showState, setShowState] = useState({
        show: cardState.card.question.title,
        cardOrQuestion: 1,
    });

    const generateCard = () => {
        let limit = item.cards.length;
        if(store.getState().showCard.indexCard === 'done') {
            return <Redirect to='/'/>;
        } else {
            if (cardState.card.id +1 === limit) {
                unresolveCard(idLesson);
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
                cardOrQuestion: Math.floor(Math.random() * 3) + 1,
            });
        }
    };

    const checkResponse = (id, response) => {
        if (response === cardState.card.question.response.goodResponse) {
            document.querySelector('#'+ id).classList.add('goodResponse');
            resolveCard(idLesson, cardState.card.id)
            console.log(store.getState().lesson);
        } else {
            document.querySelector('#'+ id).classList.add('badResponse');
        }
    };

    let cardOrQuestion = 'card';
    const next = () => {
        generateCard();
        let button  = document.querySelectorAll('.response')
        button.forEach(el => {
            el.classList.remove('goodResponse');
            el.classList.remove('badResponse');
        })
    };
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
        <div className="Lesson">
            <div className="Lesson_Container">
                {
                    showState.cardOrQuestion === 1 ?
                            <div className="Lesson_Container_card">
                                <Card indexOfLesson={item.id}/>
                            </div>
                            : returnSurvey()
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
