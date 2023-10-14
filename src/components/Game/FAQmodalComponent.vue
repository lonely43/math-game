<script setup>

</script>
<template>
   <div class="FAQbtn">
      <button @click="openCloseFAQ"> ? </button>
   </div>
   <div class="FAQ">
      <div class="headerFAQ">
         <h1> FAQ </h1>
      </div>
      <div class="bodyFAQ">

      </div>
   </div>
</template>
<style lang="scss" scoped>
.FAQbtn{
   position: absolute;
   top: 2rem;

   button{
      width: 44px;
      height: 44px;

      padding: 0rem;

      font-size: 1.64em;

      border: none;
      border-radius: 100%;

      background-color: var(--color-yellow);

      cursor: pointer;
   }
}
.FAQ{
   z-index: 3;
   position: absolute;

   width: 100vw;
   height: auto;

   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
}
</style>
