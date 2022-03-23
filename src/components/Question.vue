<script setup>
    import { ref, computed } from 'vue'

    const { question, mode, choose } = defineProps(['question', 'mode', 'choose'])

    const shouldShowTip = ref(false)
    

    const showTip = () => {
        shouldShowTip.value = true
    }

    const getMode = computed(() => {
        return ['fácil', 'médio', 'díficil'][mode] || 'Erro...🙄'
    })
</script>

<template>
    <header class="container">
        <div>Você está na dificuldade: {{getMode}}</div>
        <div>
            {{question.question}}
        </div>
    </header>
    <section>
        <div v-for="(options, index) in question.options" :key="index" @click="choose(index)">
            {{options}}
        </div>
    </section>
    <footer>
        <div v-show="question.tip">
            <button class="btn-tip" @click="showTip">Dica</button>
            <div v-show="shouldShowTip" class="tip-container">{{question.tip}}</div>
        </div>
    </footer>
</template>

<style>
</style>