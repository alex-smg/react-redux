import { NEXT_CARD } from '../actions/actionTypes'

const initState = {
    showCard : {
        indexCard : 0,
    },
    lesson: [
         {
             id: 0,
             title: 1,
             cards : [
                {
                    id: 0,
                    title: "Carte 1",
                    question: {
                        title : " 1 - Lorem ipsum dolor sit amet ?",
                        response: {
                            1: "response 1",
                            2: "response 2",
                            3: "response 3",
                            goodResponse: 1,
                        }
                    }
                },
                 {
                     id: 1,
                    title: "Carte 2",
                    question: {
                        title : "2 - Lorem ipsum dolor sit amet ?",
                        response: {
                            1: "response 1",
                            2: "response 2",
                            3: "response 3",
                            goodResponse: 3,
                        }
                    }
                },
                 {
                     id: 2,
                    title: "Carte 3",
                    question: {
                        title : "3 - Lorem ipsum dolor sit amet ?",
                        response: {
                            1: "response 1",
                            2: "response 2",
                            3: "response 3",
                            goodResponse: 2,
                        }
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
            if (state.showCard.indexCard + 1 <= action.limit) {
                newState.showCard.indexCard  = state.showCard.indexCard + 1;
            }
            break;

        default:
            return state;
    }
    return newState;
}

export default rootReducer;
