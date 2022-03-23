<script>
  const points = 0;
</script>

<template>
  <header>
    <h3 class="title">Kuizu - Quiz |</h3>
    <a class="active" href="">Jogo</a>
    <a href="">Como jogar?</a>
    <div style="flex-grow: 1; text-align: right;">
      Pontuação: {{points}}
    </div>
  </header>
  <section>

  </section>
  <footer>
    <h3 class="title">Feito por Christian de Oliveira Silva</h3>
  </footer>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #eee;
    color: #444;
  }

  a {
    text-decoration: none;
    color: unset;
  }

  a.active {
    color: dodgerblue;
  }

  #app {
    display: grid;
    grid-template-rows: auto 70vh auto;
    padding: 25px;
    font-family: 'Titillium Web', sans-serif;
  }

  .title {
    font-weight: bold;
    font-size: 25px;
  }

  #app > header,
  #app > footer {
    padding: 20px 12px;
  }

  #app > header {
    display: flex;
    gap: 10px;
    align-items: baseline;
  }
  
  #app > section {
    border: 1px solid #aaa;
    box-shadow: 4px 4px 4px #aaa;
  }
</style>