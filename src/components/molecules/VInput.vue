<template>
  <div class="wrapper-input">
    <label
        for="custom-input"
        class="form-label">
      {{ label }}
    <input
        id="custom-input"
        class="form-control"
        type="text"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
    >
    </label>
  </div>
</template>

<script>
  export default {
    name: 'VInput',
    props:{
      label:{
        type: String,
        default: 'Input name'
      },
      value:{
        type: String,
        default: ''
      },
    }
  }

</script>

<style lang="scss" scoped>
.wrapper-input{
  text-align: left;
  .form-label{
    width: 100%;
  }
}
</style>