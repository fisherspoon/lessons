<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <p v-custom-class="'red'">Lorem</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'classBuilder',
  directives:{
    customClass(el, binding){
      el.classList.add(binding.value + '-font-color')
    }
  }
}
</script>

<style lang="scss" scoped>
.black-font-color {
  color: black;
}
.red-font-color {
  color: red;
}
</style>