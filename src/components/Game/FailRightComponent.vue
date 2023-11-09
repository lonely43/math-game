<script setup>
import { onMounted } from 'vue';
const emit = defineEmits(['close'])
   onMounted(() => {
      setTimeout(()=>{
         emit('close')
      }, 1500)
})
</script>

<template>
   <div class="resultOfAnswer">
      <slot></slot>
   </div>
</template>

<style lang="scss" scoped>
.resultOfAnswer{
   position: absolute;
   z-index: 4;
   top: 0;

   padding: 0.2rem 0;
   min-width: 100vw;

   background-color: var(--FailRightComp);
   color: var(--color-background);
   font-size: 2em;
   letter-spacing: 4px;

   slot{
      font-size: 2em;
   }
}
</style>
