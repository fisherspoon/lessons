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
        :data-value="dataAttr"
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
    dataAttr:{
      type: String
    },
    id:{
      type: String
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper-checkbox{
  text-align: left;
}
</style>