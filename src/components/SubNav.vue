<template>
  <div>
    <button class="btn btn-info" @click="goByHistoryPrev">prev</button>
    <button class="btn btn-info" @click="goByHistoryNext">next</button>
  </div>
</template>

<script>
export default {
  name: 'SubNav',
  methods: {
    goByHistoryNext() {
      this.$router.go(1)
    },
    goByHistoryPrev() {
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
  button{
    margin: 20px 12px;
  }
</style>
