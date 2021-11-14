<template>
  <div v-if="successSubmit" class="success-submit">
    <div class="mb-3">
      <h2>Форма успешно отправлена!</h2>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    successSubmit:{
      type: Boolean,
      required: true
    }
  }
}
</script>