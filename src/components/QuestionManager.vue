<script setup>
    import Question from "./Question.vue";
    import { ref, computed } from 'vue'

    import { questions as easyQuestions} from "../questions/easy/question"
    import { questions as mediumQuestions} from "../questions/medium/question"
    import { questions as hardQuestions} from "../questions/hard/question"

    const { addPoints } = defineProps(['addPoints'])

    const questionNumber = ref(0)
    const question = ref(null)
    const mode = ref(null)

    const changeMode = function(newMode) {
        mode.value = newMode
        question.value = currentQuestion()
    }

    const currentQuestion = () => {
        let questions = [];

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
                break;
        }
        
        return questions[Math.floor(Math.random() * questions.length)]
    }

    const choose = (value) => {
        if (value == question.value.correct) {
            addPoints(question.value.points)
        } else {
            alert('você errou!')
        }

        question.value = currentQuestion()
    }
</script>

<template>
    <div v-if="mode === null" class="flex-container">
        <div class="mode easy-hover" @click="changeMode(0)">Fácil</div>
        <div class="mode medium-hover" @click="changeMode(1)">Médio</div>
        <div class="mode hard-hover" @click="changeMode(2)">Díficil</div>
    </div>
    <div v-else class="">
        <Question :question="question" :mode="mode" :choose="choose" />
    </div>
</template>

<style>
    :root {
        --easy-color: #009933;
        --medium-color: #ffb833;
        --hard-color: #b30000;
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


</style>