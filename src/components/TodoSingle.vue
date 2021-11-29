<template>
  <div class="single-todo-wrapper">
    <div class="tasks-view mb-4">
      <img :src="singleTodoData.url || 'https://www.kenyons.com/wp-content/uploads/2017/04/default-image-620x600.jpg'" alt="">
      <div class="main-content">

        <template v-if="isEdited">
          <VInput
              :label="taskData.header.name"
              :value.sync="taskData.header"
              :type-input="taskData.header.type"
          />
          <VInput
              :label="taskData.urlImage.name"
              :value.sync="taskData.url"
              :type-input="taskData.urlImage.type"
          />
          <VTextArea
              :label="taskData.description.name"
              :value.sync="taskData.description"
          />

        </template>

        <template v-else>
          <p>{{ singleTodoData.header }}</p>
          <p>{{ singleTodoData.description }}</p>
          <p class="time-created">{{ singleTodoData.timeCreated }}</p>
          <VButton
              :name="btnShowControls.name"
              :custom-type="btnShowControls.type"
              :custom-class-btn="btnShowControls.class"
              @click.native="isShowControls = !isShowControls"
          />
        </template>

        <transition name="fade">
          <div v-if="isShowControls" class="controls-container">
            <VButton
                v-if="!isEdited"
                :name="controls.btnEdit.name"
                :custom-type="controls.btnEdit.type"
                :custom-class-btn="controls.btnEdit.class"
                @click.native="editTask(index)"
            />
            <VButton
                :name="controls.btnRemove.name"
                :custom-type="controls.btnRemove.type"
                :custom-class-btn="controls.btnRemove.class"
                @click.native="removeTask"
            />
            <VButton
                v-if="isEdited"
                :name="controls.btnSave.name"
                :custom-type="controls.btnSave.type"
                :custom-class-btn="controls.btnSave.class"
                @click.native="saveChanges(index)"
            />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import VButton from "@/components/molecules/VButton";
import VInput from "@/components/molecules/VInput";
import VTextArea from "@/components/molecules/VTextArea";

export default {
  name: "TodoSingle",
  props:{
    singleTodoData:{
      type: Object,
      required: true
    },
    taskData: {
      type: Object,
      required: true
    },
    index:{
      type: Number,
      required: true
    }
  },
  data(){
    return{
      isShowControls: false,
      isEdited: false,
      btnShowControls:{
        name: 'Действия',
        type: 'button',
        class: 'btn-info'
      },
      controls: {
        btnEdit:{
          name: 'Редактировать',
          type: 'button',
          class: 'btn-warning'
        },
        btnRemove:{
          name: 'Удалить',
          type: 'button',
          class: 'btn-danger'
        },
        btnSave:{
          name: 'Сохранить',
          type: 'button',
          class: 'btn-success'
        }
      },
      task: {
        header: '',
        description: '',
        url: '',
      }
    }
  },
  components:{
    VButton,
    VInput,
    VTextArea
  },
  methods:{
    removeTask(index){
      this.$store.commit('todoByUser/REMOVE_TODO', index)

      let users = JSON.parse(localStorage.getItem('users'));
      for(let i = 0; i < users.length; i++){
        let parseItem = JSON.parse(users[i]);
        if(parseItem.login === this.$store.state.todoByUser.currentUser.login){
          parseItem.todos = this.$store.state.todoByUser.todos;
          users.splice(i, 1, JSON.stringify(parseItem));
          localStorage.setItem('users', JSON.stringify(users));
        }
      }
    },
    editTask(){
      this.isEdited = !this.isEdited
    },
    saveChanges(index){

      this.$store.commit('todoByUser/EDIT_TODO', [index, this.task])

      // let index = this.tasks.findIndex(item => item === task);
      // let tasksFromStorage = this.getTaskByUser();
      // tasksFromStorage[index] = task;
      // localStorage.setItem(this.currentUser, JSON.stringify(tasksFromStorage));
      //
      // let users = JSON.parse(localStorage.getItem('users'));
      // for(let i = 0; i < users.length; i++){
      //   let parseItem = JSON.parse(users[i]);
      //   if(parseItem.login === this.$store.state.todoByUser.currentUser.login){
      //     parseItem.todos = this.$store.state.todoByUser.todos;
      //     users.splice(i, 1, JSON.stringify(parseItem));
      //     localStorage.setItem('users', JSON.stringify(users));
      //   }
      // }
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
      position: relative;
      img{
        max-width: 200px;
        object-fit: cover;
      }
      .main-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
        padding: 16px 0;
        .time-created{
          position: absolute;
          right: 16px;
          top: 16px;
        }
        .controls-container{
          display: flex;
          grid-gap: 16px;
          margin-top: 24px;
        }
      }
    }
  }
  .slide-enter-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: ease-in;
    -webkit-transition-timing-function: ease-in;
    -o-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
  }

  .slide-leave-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }

  .slide-enter-to, .slide-leave {
    max-height: 100%;
    overflow: hidden;
  }

  .slide-enter, .slide-leave-to {
    overflow: hidden;
    max-height: 0;
  }
</style>