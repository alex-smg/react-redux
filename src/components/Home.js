import React, {useState} from 'react';
import { connect } from 'react-redux';
import Card from './Card'
import ContainerLeft from './ContainerLeft'
import {
    Link
} from "react-router-dom";


const Home = (props) => {

    const [changeState, setChangeState] = useState({
        showCards: false,
    });

    const showLessons = () => {
        setChangeState( {
            showCards: false,
        });
    };
    const showCards = () => {
        setChangeState( {
            showCards: true,
        });
    }
    return(
        <div>
            <div className="homeContainer">
                <ContainerLeft/>
                <div className="containerCard">
                    <div className="select">
                        <button onClick={() => showLessons()}>
                            Lessons
                        </button>
                        <button onClick={() => showCards()}>
                            Cards
                        </button>
                    </div>

                    <div>
                        {
                            changeState.showCards !== true &&
                            props.array.map((item) => {
                                return (
                                    <Link to={'/lesson/' + item.id}>
                                        <div>
                                            <div className="card">
                                                <div className="div">
                                                    <h2>{item.title}</h2>
                                                    <div className="progress progressHome">
                                                        <div className="insideProgress" style={{width: (item.cardResolve * 100) / item.cards.length + '%'}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div className="allCards">
                        {
                            changeState.showCards === true &&
                            props.array.map((item) => {
                                return(
                                item.cards.map((el) => {
                                    return (
                                        <div className="wrap">
                                            <Card indexOfLesson={item.id} id={el.id}/>
                                        </div>
                                    )
                                })
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )

};

const mapStateToProps = state => {
    return {
        array: state.lesson
    }
};

export default connect(mapStateToProps)(Home);
