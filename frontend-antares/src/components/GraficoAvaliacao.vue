<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  avaliacao: Object,
  criterios: Array
});

const canvas = ref(null);
let myChart = null;

const createChart = () => {
  if (!props.avaliacao || !props.criterios || !Array.isArray(props.criterios)) {
    console.error('Dados de avaliação ou critérios não fornecidos ou inválidos');
    return;
  }

  // Dados e lógica para criar o gráfico
  // ...
};

onMounted(createChart);
watch(() => [props.avaliacao, props.criterios], createChart);
</script>
