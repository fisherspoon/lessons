<template>
  <div class="wrapper-checkbox">
    <label
        :for="'custom-checkbox' + id"
        class="form-check-label">
      {{ label }}
    <input
        :id="'custom-checkbox' + id"
        class="form-check-input"
        type="checkbox"
        :checked="value"
        @input="$emit('update:checked', $event.target.checked)"
    >
    </label>
  </div>
</template>

<script>
export default {
  name: 'CRadio',
  inheritAttrs: false,
  props:{
    label:{
      type: String,
      default: 'Checkbox name'
    },
    value:{
      type: Boolean
    },
    id:{
      type: Number
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper-checkbox{
  text-align: left;
}
</style>