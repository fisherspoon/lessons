<template>
  <div class="wrapper-checkbox">
    <label
        :for="'custom-checkbox' + id"
        class="form-check-label">
      {{ label }}
    </label>
    <input
        :id="'custom-input' + id"
        class="form-check-input"
        type="checkbox"
        :checked="value"
        @input="$emit('update:checked', $event.target.checked)"
    >
  </div>
</template>

<script>
export default {
  name: 'CRadio',
  inheritAttrs: false,
  props:{
    id:{
      type: Number,
      required: true
    },
    label:{
      type: String,
      default: 'Checkbox name'
    },
    value: Boolean,
  },
}
</script>

<style scoped>
.wrapper-checkbox{
  text-align: left;
}
</style>