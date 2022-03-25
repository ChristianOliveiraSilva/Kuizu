<script setup>
    import { ref, computed } from 'vue'

    const { question, mode, choose, questionNumber } = defineProps(['question', 'mode', 'choose', 'questionNumber'])


    const shouldShowTip = ref(false)

    const showTip = () => {
        shouldShowTip.value = true
    }

    const getMode = computed(() => {
        return ['fácil', 'médio', 'díficil'][mode] || 'Erro...🙄'
    })

    const getColorMode = computed(() => {
        return ['easy-color', 'medium-color', 'hard-color'][mode]
    })

    const getLetter = (value) => {
        return ['A.', 'B.', 'C.', 'D.'][value] || 'Erro...🙄'
    }
</script>

<template>
    <header class="">
        <p class="mode-and-number">Você está na dificuldade: <span :class="getColorMode">{{getMode}}</span> | Pergunta: {{questionNumber}}</p>
        
        <div class="question">
            <p>
                Pergunta {{questionNumber}}: {{question.question}}
            </p>
        </div>
    </header>
    <section class="option-container">
        <div class="option" v-for="(options, index) in question.options" :key="index" @click="choose(index)">
            {{getLetter(index)}} {{options}}
        </div>
    </section>
    <footer>
        <div v-show="question.tip" class="tip-container">
            <button class="btn-tip" @click="showTip" v-show="!shouldShowTip">Dica</button>
            <div v-show="shouldShowTip">{{question.tip}}</div>
        </div>
    </footer>
</template>

<style>

.question-container {  /* out of this component */
    padding: 45px;
}

.mode-and-number {
    text-align: right;
}

.question {
    padding: 12px;
    border: 1px solid #ccc;
}

.option-container {
    border: 1px solid #ccc;
    border-top: 0;
    padding: 5px 30px 15px;
}

.option {
    margin-block: 5px;
    padding: 10px;
    cursor: pointer;
    transition: .5s;
}

.option:hover {
    background-color: #ccc;
}

.btn-tip {
    padding: 15px;
    border: 0;
    background-color: #ccc;
    color: #666;
    cursor: pointer;
}

</style>