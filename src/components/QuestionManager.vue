<script setup>
    import Question from "./Question.vue";
    import { ref } from 'vue'

    import { questions as easyQuestions} from "../questions/easy/question"
    import { questions as mediumQuestions} from "../questions/medium/question"
    import { questions as hardQuestions} from "../questions/hard/question"

    const { addPoints } = defineProps(['addPoints'])

    const result = ref(null)
    const questionNumber = ref(0)
    const question = ref(null)
    const mode = ref(null)

    const changeMode = function(newMode) {
        mode.value = newMode
        question.value = getQuestion()
    }

    const showResult = function(isSuccess) {
        result.value = isSuccess

        setTimeout(() => {
            result.value = null
        }, 1000);
    }

    const getQuestion = () => {
        let questions = [];
        questionNumber.value++

        switch (mode.value) {
            case 0:
                questions = easyQuestions
                break;
            case 1:
                questions = mediumQuestions
                break;
            case 2:
                questions = hardQuestions
                break;
            default:
                throw new Error('Bug')
        }
        
        return questions[Math.floor(Math.random() * questions.length)]
    }

    const choose = (value) => {
        if (value == question.value.correct) {
            addPoints(question.value.points)
            showResult(true)
        } else {
            showResult(false)
        }

        question.value = getQuestion()
    }

</script>

<template>
    <div v-if="mode === null" class="flex-container">
        <div class="mode easy-hover" @click="changeMode(0)">Fácil</div>
        <div class="mode medium-hover" @click="changeMode(1)">Médio</div>
        <div class="mode hard-hover" @click="changeMode(2)">Díficil</div>
    </div>
    <div v-else-if="result === true" class="flex-fluid-container easy-hover">
        certa resposta
    </div>
    <div v-else-if="result === false" class="flex-fluid-container hard-hover">
        Erroooooouuuuuu
    </div>
    <div v-else class="question-container">
        <Question :question="question" :mode="mode" :choose="choose" :questionNumber="questionNumber" />
    </div>
</template>

<style>
    :root {
        --easy-color: #009933;
        --medium-color: #ffb833;
        --hard-color: #b30000;
    }

    .flex-fluid-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .flex-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        height: 100%;
    }

    .mode {
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 25px;
        cursor: pointer;
    }

    .easy-hover:hover {
        background-color: var(--easy-color);
        color: white;
    }

    .medium-hover:hover {
        background-color: var(--medium-color);
        color: white;
    }

    .hard-hover:hover {
        background-color: var(--hard-color);
        color: white;
    }

    .easy-color {
        color: var(--easy-color);
    }

    .medium-color {
        color: var(--medium-color);
    }

    .hard-color {
        color: var(--hard-color);
    }


</style>