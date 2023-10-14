<script async setup>
import { onMounted, ref } from 'vue';
import mathGen from './gameFunctions';

const score = ref(0)
const level = ref(1)

const exams = ref([])
const quest = ref(0)

const userAnswer = ref()


const resultofAnswerModal = ref()
const FAQ = ref()

onMounted(()=>{
   document.title = localStorage.difficult

   if(localStorage.already == null || localStorage.already == false){
      startGame(localStorage.difficult)
   }
   else{
      // мб в функцию
      score.value = JSON.parse(localStorage.score)
      level.value = JSON.parse(localStorage.level)
      exams.value = JSON.parse(localStorage.exams)
      quest.value = exams.value[level.value-1][0]
   }
})

function startGame(hard){
   localStorage.already = true
   localStorage.score = JSON.stringify(score.value)
   localStorage.level = JSON.stringify(level.value)
   
   genExams(hard)
   quest.value = exams.value[level.value-1][0]
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
         let exam
         if(Math.floor(Math.random()*2) == 0){
            exam = mathGen.genOneSignExam()
         }
         else{
            exam = mathGen.genQuadraticEquations(20)
         }
         exams.value.push([exam.question, exam.answer])
      }
   }
   if(hard == "Hard"){
      for(let i = 0;i < 6; i++){
         let exam = mathGen.genOneSignExam(50)
         exams.value.push([exam.question, exam.answer])
      }
   }

   localStorage.exams = JSON.stringify(exams.value)
}

function submitAnswer(){
   function showAnswerModal(mode){
      function setStyles(color, text){
         resultofAnswerModal.value.style.backgroundColor = color
         resultofAnswerModal.value.childNodes[0].innerText = text
      }

      if(mode == `yes`){
         setStyles(`var(--color-green)`, `You right`)
      }
      else{
         setStyles(`var(--color-red)`, `You failed`)
      }
      resultofAnswerModal.value.style.transform = `translateY(0rem)`
      setTimeout(()=>{
         resultofAnswerModal.value.style.transform = `translateY(-6rem)`
      },1500)
   }

   if(userAnswer.value == exams.value[level.value-1][1]){
      showAnswerModal(`yes`)

      localStorage.score = JSON.stringify(++score.value)
   }
   else{
      showAnswerModal()
   }

   if(level.value + 1 > 6){
      //временно 

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
   <div class="resultOfAnswer" ref="resultofAnswerModal">
      <h1> You right </h1>
   </div>

   <div class="level">
      <h1> {{ level }} / 6</h1>
   </div>
   <div class="game">
      <div class="exam">
         <h1> {{ quest }} </h1>
      </div>
      <div class="answer">
         <input type="text" v-model="userAnswer" placeholder="Enter your answer">
         <button @click="submitAnswer"> Submit </button>
      </div>
   </div>
</main>
</template>

<style lang='scss' scoped>
main{
   position: relative;

   height: 100vh;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}
.resultOfAnswer{
   position: absolute;
   top: 0;

   padding: 0.2rem 0;

   min-width: 100vw;

   background-color: var(--color-green);
   color: var(--color-background);
   font-size: 1em;
   letter-spacing: 4px;

   transform: translateY(-10rem);
   transition: 0.4s transform;
}
.level{
   position: relative;

   display: flex;
   justify-content: center;
   align-items: center;
   h1{
      min-width: 6rem;
      position: absolute;
      top: -10rem;

      font-size: 2.4em;
      letter-spacing: 1px;
      color: var(--vt-c-white-soft);
   }
}
.game{
   width: 20rem;
   display: flex;
   flex-direction: column;
   gap: 2rem;
   .exam{
      padding: 0 0.6rem;
      border-left: 0.1rem solid var(--vt-c-white-soft);
      border-right: 0.1rem solid var(--vt-c-white-soft);
      h1{ 
         font-size: 2;
         letter-spacing: 1px;
         color: var(--vt-c-white-soft);
      }
   }
   .answer{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      input{
         padding: 0.2rem 0.6rem;
         
         color: var(--vt-c-white-mute);
         background-color: var(--color-background);

         font-size: 1.25em;

         border: none;
         border-bottom: 0.1rem solid var(--color-green);

         transition: 0.4s;

         &:focus{
            outline: none;
         }
         &::placeholder{
            color: var(--vt-c-white-mute);
            opacity: 0.6;
         }
      }
      button{
         padding: 0.4rem 2rem;

         border: 0.1rem solid var(--color-green);
         border-radius: 0.4rem;

         font-size: 1.2em;
         font-weight: 400;
         letter-spacing: 2px;

         color: var(--color-background);
         background-color: var(--color-green);

         transition: 0.4s;

         cursor: pointer;

         &:hover{
         background-color: var(--color-background);
         color: var(--color-green); 
         }
      }
   }
}
</style>
