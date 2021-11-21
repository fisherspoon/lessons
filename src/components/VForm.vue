<template>
  <div class="form-wrapper">
    <form @submit.prevent :style="{ backgroundColor: theme.formBg }">
      <slot name="form-content"></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: 'VForm',
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  form{
    padding: 16px;
  }
  .errors{
    border: 1px solid crimson;
    border-radius: 4px;
    padding: 12px;
    p{
      color: crimson;
    }
    ul{
      padding: 0;
      text-align: left;
      li{
        text-decoration: navajowhite;
        color: crimson;
        list-style-type: none;
        margin-bottom: 12px;
      }
    }
  }
</style>
