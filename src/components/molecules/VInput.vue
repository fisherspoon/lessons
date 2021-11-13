<template>
  <div class="wrapper-input">
    <label
        :for="'custom-input' + id"
        class="form-label">
      {{ label }}
    </label>
    <input
        :id="'custom-input' + id"
        class="form-control"
        type="text"
        @input="$emit('update:value', $event.target.value)"
    >
  </div>
</template>

<script>
  export default {
    name: 'VInput',
    props:{
      id:{
        type: Number,
        required: true
      },
      label:{
        type: String,
        default: 'Input name'
      },
    }
  }

</script>

<style lang="scss" scoped>
.wrapper-input{
  text-align: left;
}
</style>