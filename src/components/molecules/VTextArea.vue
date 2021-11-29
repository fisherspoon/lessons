<template>
  <div class="wrapper-textarea">
    <label
        for="custom-textarea"
        class="form-label">
      {{ label }}
      <textarea
          id="custom-textarea"
          class="form-control"
          :value="value"
          @input="$emit('update:value', $event.target.value)"
      >
      </textarea>
    </label>
  </div>
</template>

<script>
export default {
  name: 'VTextArea',
  props:{
    label:{
      type: String,
      default: 'Textarea name'
    },
    value:{
      type: String,
      default: ''
    },
  }
}

</script>

<style lang="scss" scoped>
.wrapper-textarea{
  text-align: left;
  .form-label{
    width: 100%;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
    color: rgba(0, 0, 0, 0.72);
  }
}
</style>