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
      startGame(localStorage.difficult)
   }
   else{
      score.value = JSON.parse(localStorage.score)
      level.value = JSON.parse(localStorage.level)
      exams.value = JSON.parse(localStorage.exams)
      quest.value = exams.value[level.value-1][0]
   }
})

function startGame(hard){
   localStorage.already = true

   score.value = 0
   level.value = 1

   localStorage.score = JSON.stringify(score.value)
   localStorage.level = JSON.stringify(level.value)
   
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
         //let exam = mathGen.genOneSignExam()
         let exam = mathGen.genQuadraticEquations()
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
}

function handleAnswer(){
   if(userAnswer.value == exams.value[level.value-1][1]){
      //временно 
      console.log(true)

      localStorage.score = JSON.stringify(++score.value)
   }

   if(level.value + 1 > 6){
      //временно 
      console.log(`stop`)
      localStorage.clear()
      location.reload()

      return 0
   }

   localStorage.level = JSON.stringify(++level.value)
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
         <!-- в input добавть @key-up.enter ивент    p.s optional -->
         <input type="text" v-model="userAnswer" placeholder="Enter ur answer">
         <button @click="handleAnswer"> Submit </button>
      </div>
   </div>
</main>
</template>

<style lang='scss' scoped>
// написать стили
</style>
