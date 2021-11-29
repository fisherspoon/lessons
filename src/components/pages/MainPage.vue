<template>
  <div class="wrapper-main-page">
    <div class="container">
      <div class="row">
        <div class="col-8 offset-2">
          <h2>Это приложение для добавления списка задач.</h2>
          <p class="mt-5 mb-0">Для начала перейдите в авторизацию или регистрацию пользователя.</p>
          <p class="">Или можете просмотреть список задач всех пользователей.</p>

          <router-link
              :to="'authorization'"
              tag="button"
              class="btn btn-info"
          >
            Авторизация/Регистрация
          </router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage"
}
</script>

<style scoped>

</style>