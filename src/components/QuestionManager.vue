<script setup>
    import Question from "./Question.vue";
    import QuestionUtils from "./QuestionUtils";

    import ModeEnum from "./Enums/ModeEnum";
    import ScreenEnum from "././Enums/ScreenEnum";

    import { ref } from 'vue'

    const { addPoints, points } = defineProps(['addPoints', 'points'])

    const screen = ref(ScreenEnum.chooseMode)
    const questionUtils = new QuestionUtils()

    const changeMode = function(difficulty) {
        questionUtils.defineQuestionsByDifficulty(difficulty)
        questionUtils.defineCurrentQuestion()

        screen.value = ScreenEnum.question
    }

    const showResult = function(isSuccess) {
        screen.value = isSuccess ? ScreenEnum.success : ScreenEnum.error

        setTimeout(() => {
            if (questionUtils.hasGameYet()) {
                questionUtils.defineCurrentQuestion()
                screen.value = ScreenEnum.question
            } else {
                finishGame()
            }
        }, 1000);
    }

    const finishGame = function () {
        screen.value = ScreenEnum.finish
    }

    const chooseAnswer = (value) => {
        if (value == questionUtils.getQuestion().correct) {
            addPoints(questionUtils.getQuestion().points)
            showResult(true)
        } else {
            showResult(false)
        }
    }

</script>

<template>
    <div v-if="screen === ScreenEnum.finish" class="flex-container">
        <p>Acabou! Voce fez: {{points}}</p>
    </div>
    <div v-else-if="screen === ScreenEnum.chooseMode" class="flex-container">
        <div class="mode easy-hover" @click="changeMode(ModeEnum.easy)">Fácil</div>
        <div class="mode medium-hover" @click="changeMode(ModeEnum.medium)">Médio</div>
        <div class="mode hard-hover" @click="changeMode(ModeEnum.hard)">Díficil</div>
    </div>
    <div v-else-if="screen === ScreenEnum.success" class="flex-fluid-container easy-hover">
        certa resposta
    </div>
    <div v-else-if="screen === ScreenEnum.error" class="flex-fluid-container hard-hover">
        Erroooooouuuuuu
    </div>
    <div v-else-if="screen === ScreenEnum.question" class="question-container">
        <Question :question="questionUtils.getQuestion()" :mode="questionUtils.getMode()" :chooseAnswer="chooseAnswer" :questionNumber="questionUtils.getQuestionNumber()" />
    </div>
    <div v-else>Opsss... Alguma coisa aconteceu de estranho</div>
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