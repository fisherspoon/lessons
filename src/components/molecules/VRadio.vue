<template>
  <div class="wrapper-radio">
    <label class="wrapper flex items-center">
      <input class="checkbox" type="radio" :checked="isChecked" :value="value" @change="$emit('change', $event.target.value)" />
      <span class="checkmark"></span>
      {{label}}
    </label>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      default: "",
      required:true
    },
    modelValue: {
      default: ""
    },
    value: {
      type: String,
      default: undefined
    }
  },
  computed: {
    isChecked() {
      return this.modelValue === this.value
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-radio{
  text-align: left;
  .form-label{
    padding-left: 6px;
  }
}
</style>
