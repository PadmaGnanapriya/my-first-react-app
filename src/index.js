import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import React, { Component } from "react";
import "./assets/style.css";
import quizService from "./quizService";
import QuectionBox from "./components/QuectionBox";
import QuestionBox from "./components/QuectionBox";

class QuizBee extends Component{
    state={
        quectionBank:[]
    };
    getQuections=()=>{
        quizService().then(question=>{
            this.setState({
                quectionBank:question
            });
        });
    };
    componentDidMount(){
        this.getQuections();
    }
    render(){
        return(
        <div className="container">
            <div className="title">MCQ</div>
            {this.state.quectionBank.length > 0 && 
            this.state.quectionBank.map(
                ({question, answers, correct, quectionId}) => (
                <QuestionBox question={question} options={answers} key={quectionId}/>
                )
                )}
        </div>
        );
    }
}

ReactDOM.render(<QuizBee />, document.getElementById("root"));