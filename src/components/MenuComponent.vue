<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(()=>{
  document.title = 'Main menu'
})
const menu = ref()

function handle(){
  menu.value.style.opacity = 0
  setTimeout(() => {
    router.push('/game')
  }, 1000)
}
</script>

<template>
  <main ref="menu">

    <header>
      <h1>Math Time</h1>
      <p>Test your brain</p>
    </header>
    
    <div class="btn" @click="handle()"> Start </div>

  </main>
</template>

<style lang="scss" scoped>
main{
  min-height: 100dvh;

  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;

  transition: 1s;
}
header{
  display: flex;
  flex-direction: column;

  h1{
    font-size: 2.68em;
    letter-spacing: 1px;
    color: var(--vt-c-white-soft);
  }
  p{
    font-size: 1.28em;
    letter-spacing: 1px;
    color: var(--vt-c-white-mute);
  }
}
.btn{
  padding: 0.4rem 2rem;

  border: 0.1rem solid var(--color-green);
  border-radius: 0.4rem;

  font-size: 1.68em;
  font-weight: 400;
  letter-spacing: 2px;

  color: var(--color-green);

  transition: 0.4s;

  cursor: pointer;

  &:hover{
    background-color: var(--color-green);
    color: var(--color-background); 
  }
}
</style>
