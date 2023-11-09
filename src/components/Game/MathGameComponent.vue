<script async setup>
// vue's things
import { onMounted, ref, useAttrs } from 'vue';
import { useRouter } from 'vue-router';

// library
import mathGen from './gameFunctions';

// components
import EndGameModalComponent from './EndGameModalComponent.vue';
import FailRightComponent from './FailRightComponent.vue';

const router = useRouter()

const score = ref(0)

const level = ref(1)

const exams = ref([])
const quest = ref(0)

const userAnswer = ref()

const endGame = ref(false)

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
         let exam = mathGen.genOneSignExam(60)
         exams.value.push([exam.question, exam.answer])
      }
   }
   if(hard == "Medium"){
      for(let i = 0;i < 6; i++){
         let exam
         if(Math.floor(Math.random()*2) == 0){
            exam = mathGen.genOneSignExam(100)
         }
         else{
            exam = mathGen.genQuadraticEquations(20)
         }
         exams.value.push([exam.question, exam.answer])
      }
   }
   if(hard == "Hard"){
      for(let i = 0;i < 6; i++){
         let exam = mathGen.genOneSignExam(150)
         exams.value.push([exam.question, exam.answer])
      }
   }

   localStorage.exams = JSON.stringify(exams.value)
}

function submitAnswer(){
   if(userAnswer.value == exams.value[level.value-1][1]){

      localStorage.score = JSON.stringify(++score.value)
      FailRightModal(`You right!`, `rgb(88, 137, 70)`)
   }
   else{
      FailRightModal(`You failed`, `#FF7043`)
   }

   if(level.value + 1 > 6){
      endGame.value = true

      //reset()

      return 0
   }

   localStorage.level = JSON.stringify(++level.value)
   userAnswer.value = null
   quest.value = exams.value[level.value-1][0]
}

function reset(){
   localStorage.clear()
   router.push(`/`)
}

const resultofAnswer = ref(false)
const resultofAnswerText = ref()

function FailRightModal(text, backgroundColor){
   let root = document.documentElement;
   root.style.setProperty('--FailRightComp', backgroundColor)
   resultofAnswerText.value = text
   
   resultofAnswer.value = !resultofAnswer.value
}
</script>

<template>
<main>
   <Transition name="EndGameModal">
      <EndGameModalComponent v-if="endGame">
         {{ score }}
      </EndGameModalComponent>
   </Transition>

   <Transition name="FailRightLine">
      <FailRightComponent @close="()=>{resultofAnswer = !resultofAnswer}" v-if="resultofAnswer">
         {{ resultofAnswerText }}
      </FailRightComponent>
   </Transition>

   <div class="level">
      <h1> {{ level }} / 6</h1>
   </div>
   <div class="game">
      <div class="exam">
         <h1> {{ quest }} </h1>
      </div>
      <div class="answer">
         <input v-model="userAnswer" @keypress="isLegalChar" placeholder="Enter your answer">
         <button @click="submitAnswer"> Submit </button>
         <p style="cursor: pointer; font-size: 1.25em;" @click="reset"> reset </p>
      </div>
   </div>
</main>
</template>

<style lang='scss' scoped>
:root{
   --FailRightComp: var(--color-background)
}
main{
   position: relative;

   height: 100vh;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}
.EndGameModal-enter-active, .EndGameModal-leave-active{
   transition: 1s;
}
.EndGameModal-enter-from, .EndGameModal-leave-to{
   opacity: 0;
}

.FailRightLine-enter-active, .FailRightLine-leave-active{
   transition: 0.5s;
}
.FailRightLine-enter-from, .FailRightLine-leave-to{
   transform: translateY(-6rem);
}

.FAQbtn{
   position: absolute;
   bottom: 2rem;

   button{
      width: 44px;
      height: 44px;

      padding: 0rem;

      font-size: 1.64em;
      color: var(--color-background);

      border: none;
      border-radius: 100%;

      background-color: var(--color-green);

      cursor: pointer;
   }
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
   min-width: 20rem;
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
