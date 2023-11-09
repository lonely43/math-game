<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const endModal = ref()

function closeGame(){
   endModal.value.style.opacity = 0
   setTimeout(()=>{
      localStorage.clear()
      router.push('/') 
   }, 1000)
}
</script>
<template>
   <div class="ENDmain">
      <div ref="endModal" class="END">
         <div class="headerEND">
            <h1> Game is over! </h1>
         </div>

         <div class="bodyEND">
            <p> your score: <strong>  <slot/> </strong> </p>
            <div @click="closeGame" class="btn"> <h1>go to main</h1> </div>
         </div>
      </div>
   </div>
</template>
<style lang="scss" scoped>
.ENDmain{
   position: absolute;
   z-index: 3;

   min-width: 100vw;
   min-height: 100dvh;

   display: flex;
   justify-content: center;
   align-items: center;

   background-color: var(--color-background);
}
.END{
   transition: 1s;

   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
   gap: 2rem;

   .headerEND{
      h1{
         font-size: 3em;
         letter-spacing: 2px;
         color: var(--color-green);
      }
   }
   .bodyEND{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p{
         position: relative;

         display: flex;
         align-items: center;
         justify-content: center;

         font-size: 2em;
         letter-spacing: 2px;
         line-height: 1.25;

         strong{
            position: relative;

            color: var(--color-green);
            padding-left: 0.68rem;

            &::after{
               position: absolute;
               bottom: -0.2rem;
               right: -2.4rem;
               width: 2.1rem;
               font-size: 1.4rem;
               content: "/ 6";
            }
         }
      }
      .btn{
         margin-top: 2rem;
         padding: 0.4rem 2rem;
         border-radius: 0.4rem;

         font-size: 0.6em;
         font-weight: 400;
         letter-spacing: 2px;

         color: var(--color-green);
         border: 0.1rem solid var(--color-green);

         transition: 0.4s;
         cursor: pointer;

         &:hover{
            background-color:  var(--color-green);
            color: var(--color-background); 
         }
      }
   }
}
</style>