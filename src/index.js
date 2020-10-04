import { render } from "@testing-library/react";
import ReactDOM from "react-dom";
import React, { Component } from "react";
import "./assets/style.css";
import quizService from "./quizService";
import QuectionBox from "./components/QuectionBox";
import QuestionBox from "./components/QuectionBox";

class QuizBee extends Component{
    state={
        quectionBank:[],
        score:0,
        responses:0
    };
    getQuections=()=>{
        quizService().then(question=>{
            this.setState({
                quectionBank:question
            });
        });
    };
    computeAnswer=(answer, correctAnswer)=>{
        if(answer===correctAnswer){
            this.setState({
                score:this.state.score+1
            });
        }
        this.setState({
            responses:this.state.responses<5? this.state.responses+1:5
        });
    }
    componentDidMount(){
        this.getQuections();
    }
    render(){
        return(
        <div className="container">
            <div className="title">MCQ Test</div>
            {this.state.quectionBank.length > 0 && 
            this.state.responses<5 &&
            this.state.quectionBank.map(
                ({question, answers, correct, quectionId}) => (
                <QuestionBox question={question} options={answers} key={quectionId} selected={answer => this.computeAnswer(answer)}/>
                )
                )}
                {this.state==5?(<h2>{this.state.score}</h2>):null}
        </div>
        );
    }
}

ReactDOM.render(<QuizBee />, document.getElementById("root"));