import React, {useState} from 'react';
import { connect } from 'react-redux';
import Card from './Card'
import ContainerLeft from './ContainerLeft'
import {
    BrowserRouter as Router,
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
        console.log(changeState.showCards);
    };
    const showCards = () => {
        setChangeState( {
            showCards: true,
        })
        console.log(changeState.showCards);
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
                                            <Card numberCard={props.array.indexOf(item)} key={item.id}/>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div>
                        {
                            changeState.showCards === true &&
                            props.array.map((item) => {
                                return(
                                item.cards.map((el) => {
                                    return (
                                        <Link to={'/lesson/' + item.id} key={el.id}>
                                            <div>
                                                <h3>{el.question.title}</h3>
                                            </div>
                                        </Link>
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
