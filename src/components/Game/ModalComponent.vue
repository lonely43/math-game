<script setup>
import { onMounted } from 'vue';

const emit = defineEmits(['close'])

onMounted(()=>{
  document.title = 'Choose difficult'
})

function handle(hard){
   localStorage.difficult = hard
   emit('close')
}
</script>
<template>
<div class="mod">
   <h1> What difficulty? </h1>

   <div class="difficulties">
      <div class="difficult" @click="handle(`Easy`)">
         <h1> easy </h1>
      </div>
      <div class="difficult" @click="handle(`Medium`)">
         <h1> medium </h1>
      </div>
      <div class="difficult" @click="handle(`Hard`)">
         <h1> hard </h1>
      </div>
   </div>
</div>
</template>
<style lang="scss" scoped>
.mod{
   --easy-btn: #4CAF50;
   --medium-btn: #dd9e3a;
   --hard-btn: #FF7043;

   z-index: 3;

   position: absolute;

   display: flex;
   flex-direction: column;
   gap: 4rem;

   h1{
      color: var(--vt-c-white-soft);
   }
   .difficulties{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;

      .difficult{
         h1{
            padding: 0.4rem 2rem;
            border-radius: 0.4rem;

            font-size: 1.68em;
            font-weight: 400;
            letter-spacing: 2px;

            transition: 0.4s;
            cursor: pointer;
         }
         &:nth-child(1){
            h1{
               color: var(--easy-btn);
               border: 0.1rem solid  var(--easy-btn);

               &:hover{
                  background-color:  var(--easy-btn);
                  color: var(--color-background); 
               }
            }
         }
         &:nth-child(2){
            h1{
               color: var(--medium-btn);
               border: 0.1rem solid  var(--medium-btn);

               &:hover{
                  background-color:  var(--medium-btn);
                  color: var(--color-background); 
               }
            }
         }
         &:nth-child(3){
            h1{
               color: var(--hard-btn);
               border: 0.1rem solid  var(--hard-btn);

               &:hover{
                  background-color:  var(--hard-btn);
                  color: var(--color-background); 
               }
            }
         }
      }
   }
}
</style>
