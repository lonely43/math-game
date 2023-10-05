<script async setup>
import { onMounted, ref } from 'vue';

const hard = ref(0)
const score = ref(0)
const level = ref(1)

const exams = ref([])
const quest = ref(0)

const userAnswer = ref()

onMounted(()=>{
   // переписать нахуй все
   hard.value = localStorage.difficult
   document.title = hard.value
   
   score.value = (localStorage.score == null) ? 0 : localStorage.score
   level.value = (localStorage.level > 1) ? localStorage.level : 1

   // поменять в будущем 
   if(localStorage.action){
      startGame(hard.value)
   }
})

function startGame(hard){
   // переписать
   localStorage.score = 0
   localStorage.level = 1
   genExams(hard)
}

function genExams(hard){
   if(hard == "Easy"){
      for(let i = 0;i < 6; i++){
         let exam = genOneSignExam()
         exams.value.push([exam.question, exam.answer])
      }
   }
   if(hard == "Medium"){
      for(let i = 0;i < 6; i++){
         let exam = genOneSignExam()
         exams.value.push([exam.question, exam.answer])
      }
   }
   if(hard == "Hard"){
      for(let i = 0;i < 6; i++){
         let exam = genOneSignExam()
         exams.value.push([exam.question, exam.answer])
      }
   }
   // хз насчет этой хуйни
   quest.value = exams.value[level.value-1][0]
}


// перенести это в отдельный файл
function genOneSignExam(){
   const chars = `+-/*%`
   let exam = {}

   const a = Math.floor(Math.random() * 1000)
   const sign = chars[Math.floor(Math.random() * chars.length)]
   const b = Math.floor(Math.random() * 1000)

   exam.question = `${a} ${sign} ${b}`
   exam.answer = Number(eval(exam.question).toFixed(2))

   return exam
}

// сделать review
function checkAnswer(){
   if(userAnswer.value == exams.value[level.value-1][1]){
      console.log(true)

      score.value++
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
         <!-- в input добавть @key-up.enter ивент -->
         <input type="text" v-model="userAnswer" placeholder="Enter ur answer">
         <button @click="checkAnswer"> Submit </button>
      </div>
   </div>
</main>
</template>

<style lang='scss' scoped>
// написать стили
</style>
