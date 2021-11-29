<template>
  <div class="single-todo-wrapper">
    <div class="tasks-view mb-4">
      <img :src="singleTodoData.url || 'https://www.kenyons.com/wp-content/uploads/2017/04/default-image-620x600.jpg'" alt="">
      <div class="text-content">
        <p>{{ singleTodoData.header }}</p>
        <p>{{ singleTodoData.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoSingle",
  props:{
    singleTodoData:{
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .single-todo-wrapper{
    .tasks-view{
      border: 1px solid #949494;
      border-radius: 4px;
      display: flex;
      grid-gap: 24px;
      img{
        max-width: 150px;
      }
      .text-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
      }
    }
  }
</style>