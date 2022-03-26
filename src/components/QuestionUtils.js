

import { questions as easyQuestions} from "../questions/easy/question"
import { questions as mediumQuestions} from "../questions/medium/question"
import { questions as hardQuestions} from "../questions/hard/question"

import ModeEnum from "./Enums/ModeEnum";
import ScreenEnum from "././Enums/ScreenEnum";

export default class QuestionUtils {
    
    constructor() {
        this.questionsDone = []
        this.questions = null
        this.question = null
        this.mode = null
        this.questionNumber = null
    }

    getMode () {
        return this.mode
    }

    getQuestionNumber () {
        return this.questionNumber
    }

    getQuestion () {
        return this.question
    }

    defineQuestionsByDifficulty(difficulty) {
        this.mode = difficulty
        this.questions = [easyQuestions, mediumQuestions, hardQuestions][difficulty]
    }

    hasGameYet () {
        return this.getQuestionNumber() != this.questions.length
    }

    defineCurrentQuestion() {
        this.questionNumber++

        let random = Math.floor(Math.random() * this.questions.length)
        while (this.questionsDone.includes(random)) {
            random = Math.floor(Math.random() * this.questions.length)
        }
        this.questionsDone.push(random)
        
        this.question = this.questions[random]
    }
}