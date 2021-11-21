<template>
  <div class="wrapper-btn">
    <button
        :style="{ backgroundColor: theme.buttonBg }"
        :type="customType"
        class="btn"
        :class="customClassBtn"
        @click=""
    >{{ name }}
    </button>
  </div>
</template>

<script>
 export default {
   name: 'VButton',
   inject: {
     getTheme: { default: '' }
   },
   computed:{
     theme(){
       if(this.getTheme){
         return this.getTheme();
       }
       return ''
     }
   },
   props:{
     customType:{
       type: String,
       default: 'button'
     },
     name:{
       type: String,
       default: 'Button name'
     },
     customClassBtn:{
       type: String,
       default: 'btn-default'
     }
   }
 }
</script>

<style lang="scss" scoped>

</style>