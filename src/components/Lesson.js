import React, {useState} from 'react'
import { connect, useStore } from 'react-redux'
import {nextCard, resolveCard, unresolveCard} from "../actions/actions";
import Card from './Card';


const Lesson = ({item, nextCard, idLesson, resolveCard, unresolveCard}) => {
    const store = useStore();
    const [cardState, setCardState] = useState({
        card: item.cards.find(el => el.id === store.getState().showCard.indexCard),
        cardResolve: false,
        pourcentResolve: (item.cardResolve * 100) / item.cards.length + '%'
    });
    const [showState, setShowState] = useState({
        show: cardState.card.question.title,
    });

    const generateCard = () => {
        let limit = item.cards.length;
        if(item.cardResolve === limit) {
            setCardState({
                card: item.cards.find(el => el.id === store.getState().showCard.indexCard),
                cardResolve: true,
                pourcentResolve: (item.cardResolve * 100) / item.cards.length + '%'
            });
            alert('Survey Finished')
        } else {
            if ( cardState.card.id + 1 <= limit) {
                nextCard(limit);
                setCardState({
                    card: item.cards.find(el => el.id === store.getState().showCard.indexCard),
                    pourcentResolve: (item.cardResolve * 100) / item.cards.length + '%'
                });
                let test = item.cards.find(el => el.id === store.getState().showCard.indexCard)
                setShowState({
                    show: test.question.title,
                    cardOrQuestion: showState.cardOrQuestion === 1 ? 2 : 1,
                });
            }
        }
    };

    const checkResponse = (id, response) => {
        if (response === cardState.card.question.response.goodResponse) {
            document.querySelector('#'+ id).classList.add('goodResponse');
            resolveCard(idLesson, cardState.card.id);
            console.log((item.cardResolve * 100) / item.cards.length+'%')
            setCardState({
                card: item.cards.find(el => el.id === store.getState().showCard.indexCard),
                pourcentResolve: (item.cardResolve * 100) / item.cards.length + '%'
            });
            if (cardState.pourcentResolve === '100%') {
                alert('Survey Finished')
            }
        } else {
            document.querySelector('#'+ id).classList.add('badResponse');
        }
    };

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
            <div className="progress">
                <div className="insideProgress" style={{width: cardState.pourcentResolve}}></div>
            </div>
            <div className="Lesson_Container">
                {
                    showState.cardOrQuestion === 1 ?
                            <div className="Lesson_Container_card">
                                <Card indexOfLesson={item.id} id={store.getState().showCard.indexCard}/>
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
