import {NEXT_CARD, RESOLVE_CARD} from '../actions/actionTypes'

const initState = {
    showCard : {
        indexCard : 0,
    },
    lesson: [
         {
             id: 0,
             title: 1,
             cardResolve: 0,
             cards : [
                {
                    id: 0,
                    title: "Carte 1",
                    question: {
                        title : " 1 - Lorem ipsum dolor sit amet ?",
                        response: {
                            response_1: "response 1",
                            response_2: "response 2",
                            response_3: "response 3",
                            goodResponse: "response 1",
                        },
                        resolve: false
                    }
                },
                 {
                     id: 1,
                    title: "Carte 2",
                    question: {
                        title : "2 - Lorem ipsum dolor sit amet ?",
                        response: {
                            response_1: "response 1",
                            response_2: "response 2",
                            response_3: "response 3",
                            goodResponse: "response 2",
                        },
                        resolve: false,
                    }
                },
                 {
                     id: 2,
                    title: "Carte 3",
                    question: {
                        title : "3 - Lorem ipsum dolor sit amet ?",
                        response: {
                            response_1: "response 1",
                            response_2: "response 2",
                            response_3: "response 3",
                            goodResponse: "response 3",
                        },
                        resolve: false
                    }
                },
                {
                     id: 3,
                    title: "Carte 4",
                    question: {
                        title : "4 - Lorem ipsum dolor sit amet ?",
                        response: {
                            response_1: "response 1",
                            response_2: "response 2",
                            response_3: "response 3",
                            goodResponse: "response 3",
                        },
                        resolve: false
                    }
                },
                 {
                     id: 4,
                    title: "Carte 5",
                    question: {
                        title : "5 - Lorem ipsum dolor sit amet ?",
                        response: {
                            response_1: "response 1",
                            response_2: "response 2",
                            response_3: "response 3",
                            goodResponse: "response 3",
                        },
                        resolve: false
                    }
                },
                 {
                     id: 5,
                    title: "Carte 6",
                    question: {
                        title : "6 - Lorem ipsum dolor sit amet ?",
                        response: {
                            response_1: "response 1",
                            response_2: "response 2",
                            response_3: "response 3",
                            goodResponse: "response 3",
                        },
                        resolve: false
                    }
                },
                 {
                     id: 6,
                    title: "Carte 7",
                    question: {
                        title : "7 - Lorem ipsum dolor sit amet ?",
                        response: {
                            response_1: "response 1",
                            response_2: "response 2",
                            response_3: "response 3",
                            goodResponse: "response 3",
                        },
                        resolve: false
                    }
                },

             ]
        },
    ]
}

const rootReducer = (state = initState, action) => {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case NEXT_CARD:
            if (state.showCard.indexCard + 1 <= action.limit -1 && state.lesson[0].cards[state.showCard.indexCard + 1].question.resolve === false) {
                newState.showCard.indexCard  = state.showCard.indexCard + 1;
            } else {
                let unresolve = [];
                newState.lesson[0].cards.forEach(card => {
                    if(card.question.resolve === false && unresolve.length < 2) {
                        unresolve.push(card);
                    }
                });
                if (unresolve.length === 0) {
                    newState.lesson[0].cardResolve += 1 ;
                } else {
                    newState.showCard.indexCard = unresolve[0].id;
                }
            }
            break;
        case RESOLVE_CARD:
            const findLesson = newState.lesson.indexOf(newState.lesson.find(el => el.id === action.idLesson));
            const cardResolve = newState.lesson[findLesson].cards.indexOf(newState.lesson[findLesson].cards.find(el => el.id === action.idCard));
            newState.lesson[findLesson].cards[cardResolve].question.resolve = true;
            newState.lesson[findLesson].cardResolve += 1;
            break;
        default:
            return state;
    }
    return newState;
}

export default rootReducer;
