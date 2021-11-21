<template>
  <div class="wrapper-input mb-2">
    <label
        :style="{ color: theme.labelColor }"
        :for="'custom-input' + label"
        class="form-label">
      {{ label }}
    <input
        :style="{ borderColor: theme.inputBorder }"
        :id="'custom-input' + label"
        class="form-control"
        :type="typeInput"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
    >
    </label>
  </div>
</template>

<script>
  export default {
    name: 'VInput',
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
      label:{
        type: String,
        default: 'Input name'
      },
      value:{
        type: String,
        default: ''
      },
      typeInput:{
        type: String,
        default: 'text'
      }
    }
  }

</script>

<style lang="scss" scoped>
.wrapper-input{
  text-align: left;
  .form-label{
    width: 100%;
    font-size: .8rem;
    letter-spacing: .5px;
    color: rgba(0, 0, 0, .72);
  }
}
</style>