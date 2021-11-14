<template>
  <div v-if="errorSubmit" class="success-submit">
    <div class="mb-3">
      <h2>Ошибка отправки формы!</h2>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    errorSubmit:{
      type: Boolean,
      required: true
    }
  }
}
</script>