<template>
  <q-page class="">
    <div class="text-h6">
      <div class="background-image">
        <div class="content-container">
          <div class="pading q-pt-xl q-pa-md">
            <h2 class="title">Unb na Mão</h2>
            <p class="subtitle">
              Descomplicamos seu acesso às informações da
              Universidade de Brasília, tornando a gestão acadêmica pessoal uma
              tarefa mais simples.
            </p>
          </div>
        </div>
      </div>
      <div class="features">
        <div class="feature">
          <h3>Controle Acadêmico</h3>
          <p>Gerencie disciplinas, presença e avaliações de forma simples.</p>
        </div>
        <div class="feature">
          <h3>Cardápio do RU</h3>
          <p>Consulte o cardápio semanal do Restaurante Universitário.</p>
        </div>
        <div class="feature">
          <h3>Mural de Oportunidades</h3>
          <p>Explore vagas de estágio e atividades extracurriculares.</p>
        </div>
        <!-- Adicione mais funcionalidades secundárias conforme necessário -->
      </div>
    </div>
  </q-page>
</template>

<script></script>

<style scoped>
.background-image {
  width: 100%;
  height: 400px; /* Ajuste a altura para ser igual à altura do conteúdo */
  z-index: -1;
  background-image: url('assets/imgs/Backgroundunb.png');
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(1px);
}

.content-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Adjust the color and transparency as needed */
}
.q-page {
  background: #a5dbff31; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #74ff7426,
    #ffffff,
    #55bbff58
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #74ff7426,
    #ffffff,
    #55bbff58
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.welcome-content {
  text-align: center; /* Centralizar o texto */
  padding: 20vh 0; /* Ajuste o espaçamento vertical conforme necessário */
}

.title {
  font-size: 7vw;
  font-weight: bold;
  color: white; /* Azul - você pode alterar para a cor desejada */
  display: inline-block; /* Garante que a borda não ocupe toda a largura */
  padding-bottom: 5px;
  white-space: nowrap;
  text-shadow: 3px 3px 4px rgba(11, 0, 107, 0.5);
  font-family: 'Montserrat', sans-serif;/* Impede que o texto seja quebrado */
}

.subtitle {
  font-size: 1em; /* Tamanho da fonte do subtítulo */
  color: #fff; /* Cor branca */
  max-width: 700px;
}

.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 20px;
}

.feature {
  flex: 1;
  max-width: 400px;
  min-width: 250px;
  margin: 10px;
  padding: 20px;
  background-color: rgb(181, 181, 181);
  border-radius: 8px;
  text-align: center; /* Centralizar texto */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6); /* Adicionar sombra */
}

h3 {
  font-size: 1.5em;
  font-weight: bold; /* Adicionando negrito */
  margin-bottom: 10px;
}

.feature p {
  font-size: 1.1em;
}
</style>
