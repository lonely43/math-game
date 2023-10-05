<script async setup>
import { onMounted, ref } from 'vue';
import mathGen from './gameFunctions';

const score = ref(0)
const level = ref(0)

const exams = ref([])
const quest = ref(0)

const userAnswer = ref()

onMounted(()=>{
   document.title = localStorage.difficult

   if(localStorage.already == null || localStorage.already == false){
      return startGame(localStorage.difficult)
   }

   score.value = JSON.parse(localStorage.score)
   level.value = JSON.parse(localStorage.level)
   exams.value = JSON.parse(localStorage.exams)
   quest.value = exams.value[level.value-1][0]
})

function startGame(hard){
   localStorage.already = true

   localStorage.score = 0
   localStorage.level = 1
   genExams(hard)
}

function genExams(hard){
   if(hard == "Easy"){
      for(let i = 0;i < 6; i++){
         let exam = mathGen.genOneSignExam()
         exams.value.push([exam.question, exam.answer])
      }
   }
   if(hard == "Medium"){
      for(let i = 0;i < 6; i++){
         let exam = mathGen.genOneSignExam()
         mathGen.genQuadraticEquations()
         exams.value.push([exam.question, exam.answer])
      }
   }
   if(hard == "Hard"){
      for(let i = 0;i < 6; i++){
         let exam = mathGen.genOneSignExam()
         exams.value.push([exam.question, exam.answer])
      }
   }

   localStorage.exams = JSON.stringify(exams.value)
   quest.value = exams.value[level.value-1][0]
}

// сделать review
function handleAnswer(){
   if(userAnswer.value == exams.value[level.value-1][1]){
      console.log(true)

      score.value++
      localStorage.score = JSON.stringify(score.value)
   }
   if(level.value + 1 > 6){
      console.log(`stop`)
      return 0
   }

   level.value++
   userAnswer.value = null
   quest.value = exams.value[level.value-1][0]
}

</script>

<template>
<main>
   <div class="score">
      <h1> {{ level }} / 6</h1>
   </div>
   <div class="game">
      <div class="exam">
         <h1> {{ quest }} ? </h1>
      </div>
      <div class="answer">
         <!-- в input добавть @key-up.enter ивент   p.s optional -->
         <input type="text" v-model="userAnswer" placeholder="Enter ur answer">
         <button @click="handleAnswer"> Submit </button>
      </div>
   </div>
</main>
</template>

<style lang='scss' scoped>
// написать стили
</style>
