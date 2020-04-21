import React from 'react';
import { connect } from 'react-redux';
import Card from './Card'
import ContainerLeft from './ContainerLeft'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const mapStateToProps = state => {
    return {
        array: state.lesson
    }
}

function Home (props) {
    return(
        <div>
            <div className="homeContainer">
                <ContainerLeft/>
                <div className="containerCard">
                    {
                    props.array.map((item) => {
                        return(
                            <Link to={'/lesson/' + item.id}>
                                <div>
                                        <Card numberCard={props.array.indexOf(item)}/>
                                </div>
                            </Link>
                        )})
                    }
                </div>
            </div>
        </div>
    )

}

export default connect(mapStateToProps)(Home);
