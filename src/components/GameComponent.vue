<script setup>
import { onMounted, ref } from 'vue';
import ModalComponent from './Game/ModalComponent.vue'
import MathGameComponent from './Game/MathGameComponent.vue'

const gameActive = ref()
const modal = ref()
const game = ref()

onMounted(()=>{
   gameActive.value = localStorage.action ? true : false
})

function closeModal(){
   setTimeout(()=>{
      localStorage.action = true
      gameActive.value = localStorage.action
   }, 600)

      // transitoin 
   modal.value.style.opacity = 0
}
</script>


<template>
   <template v-if="gameActive">
      <main class="main">
         <div ref="game" class="modal">
            <MathGameComponent />
         </div>
      </main>
   </template>

   <template v-else>
      <main class="main">
         <div ref="modal" class="modal">
            <ModalComponent @close="closeModal" ref="modal" />
         </div>
      </main>
   </template>
</template>


<style lang="scss" scoped>

.main{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}
.modal{
   opacity: 1;

   width: 100%;
   height: 100%;

   display: flex;
   align-items: center;
   justify-content: center;

   transition: 0.6s;

   animation: fade 0.6s ease-in;
}
@keyframes fade {
   0%{
      opacity: 0;
   }
   100%{
      opacity: 1;
   }
}

</style>
