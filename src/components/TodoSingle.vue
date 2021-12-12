<template>
  <transition
      enter-active-class="animate__animated"
      leave-active-class="animate__animated animate__backOutRight"
      v-show="!task[index].done">
    <div class="single-todo-wrapper" v-show="!task[index].done">
    <div class="tasks-view mb-4">
      <img :src="singleTodoData.url || 'https://www.kenyons.com/wp-content/uploads/2017/04/default-image-620x600.jpg'" alt="">
      <div class="main-content">
        <template v-if="isEdited">

          <div class="input-container mb-4" :class="{ 'form-group--error': $v.task.$each[index].header.$error }">
            <VInput
                :label="taskData.header.name"
                :value.sync="task[index].header"
                :type-input="taskData.header.type"
            />
            <p class="error-text">Поле обязательно к заполнению</p>
          </div>

          <div class="input-container mb-4" :class="{ 'form-group--error': $v.task.$each[index].url.$error }">
            <VInput
                :label="taskData.urlImage.name"
                :value.sync="task[index].url"
                :type-input="taskData.urlImage.type"
            />
            <p class="error-text">Допустимые форматы изображений - .png, .jpg</p>
          </div>

          <div class="input-container mb-4">
            <VTextArea
                :label="taskData.description.name"
                :value.sync="task[index].description"
            />
          </div>

        </template>

        <template v-else>
          <p>{{ singleTodoData.header }}</p>
          <p>{{ singleTodoData.description }}</p>
          <p class="time-created">Добавлено: {{ singleTodoData.timeCreated }}</p>
          <p v-if="task[index].edited" class="edited-mark">Изменено</p>
          <VButton
              :name="btnShowControls.name"
              :custom-type="btnShowControls.type"
              :custom-class-btn="btnShowControls.class"
              @click.native="showEdit"
          />
        </template>

        <transition name="fade">
          <div v-if="isShowControls" class="controls-container">
            <VSelect
              :defaultProp.sync="selectPriorityDefault"
              :by-default="selectPriorityDefault"
              :options="controls.priority.options"
              @getSelectedOption="setChangedTask(index, 'selectPriority')"
            />
            <div class="is-done">
              <VCheckbox
                  :checked.sync="task[index].done"
                  :label="controls.markDone.label"
                  :id="controls.markDone.label"
                  @click.native="setChangedTask(index, 'isDone')"
              />
            </div>
            <div class="btns-container">
              <VButton
                  v-if="!isEdited"
                  :name="controls.btnEdit.name"
                  :custom-type="controls.btnEdit.type"
                  :custom-class-btn="controls.btnEdit.class"
                  @click.native="editTask"
              />
              <VButton
                  :name="controls.btnRemove.name"
                  :custom-type="controls.btnRemove.type"
                  :custom-class-btn="controls.btnRemove.class"
                  @click.native="removeTask(index)"
              />
              <VButton
                  v-if="isEdited"
                  :name="controls.btnSave.name"
                  :custom-type="controls.btnSave.type"
                  :custom-class-btn="controls.btnSave.class"
                  @click.native="setChangedTask(index)"
              />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import VButton from "@/components/molecules/VButton";
import VInput from "@/components/molecules/VInput";
import VTextArea from "@/components/molecules/VTextArea";
import VCheckbox from "@/components/molecules/VCheckbox";
import VSelect from "@/components/molecules/VSelect";
import { mapState } from "vuex";
import { required } from "vuelidate/lib/validators";

const fileExtension = (imgData) =>  {
  const allowedExtensions = /(\.png|\.jpeg|\.jpg)$/i;
  if(!allowedExtensions.exec(imgData) && imgData !== ''){
    return false
  }
  return true
}

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
        markDone:{
          label: 'Выполнено',
          value: false,
        },
        btnSave:{
          name: 'Сохранить',
          type: 'button',
          class: 'btn-success'
        },
        priority:{
          options:[
            {
              value: 'low',
              name: 'Не горит'
            },
            {
              value: 'normal',
              name: 'Норм'
            },
            {
              value: 'high',
              name: 'Нужно было сделать еще вчера'
            },
          ]
        }
      },
    }
  },
  validations:{
      task: {
        $each: {
          header: {required},
          url: { fileExtension }
        }
    }
  },
  components:{
    VButton,
    VInput,
    VTextArea,
    VCheckbox,
    VSelect
  },
  computed:{
    ...mapState({
      task: state => state.activeUser.todos,
    }),
    selectPriorityDefault:{
      get: function (){
        if(!this.task[this.index].priority){
          return {
            value: '',
            name: 'Выберите значение'
          }
        }else {
          return this.task[this.index].priority
        }
      },
      set: function (val){
        this.task[this.index].priority = val
      }
    }
  },

  methods:{
    removeTask(indexTask){
      let idActiveUser = this.$route.params.id,
          users = JSON.parse(localStorage.getItem('users')),
          activeUser = users[idActiveUser],
          taskHeader = activeUser.todos[indexTask].header;

      activeUser.todos.splice(indexTask, 1);
      users.splice(idActiveUser, 1, activeUser);

      this.$store.commit('SET_ACTIVE_USER_TO_STATE', activeUser)
      this.$store.commit('SET_USERS_TO_LOCALSTORAGE', users)

      this.$store.commit('SET_USERS_ACTIVITY_TO_LOCALSTORAGE_AND_STATE', `<b>${this.$store.state.activeUser.login}</b> удалил задачу <b>${taskHeader}</b>`)
      this.isShowControls = false;
    },
    showEdit(){
      this.isShowControls = !this.isShowControls;
      this.isShowControls ? this.btnShowControls.name = 'Скрыть' : this.btnShowControls.name = 'Действия'
    },
    editTask(){
      this.isEdited = !this.isEdited
    },
    setChangedTask(indexTask, additionalChanges){
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let changedTask = this.task[indexTask];
        this.btnShowControls.name = 'Действия'

        if(additionalChanges === 'isDone'){
          changedTask.done = true;
          this.$store.commit('SET_USERS_ACTIVITY_TO_LOCALSTORAGE_AND_STATE', `<b>${this.$store.state.activeUser.login}</b> отметил задачу <b>${changedTask.header}</b> как выполненную`)
        }
        else if(additionalChanges === 'selectPriority'){
          changedTask.priority = this.selectPriorityDefault
          this.$store.commit('SET_USERS_ACTIVITY_TO_LOCALSTORAGE_AND_STATE', `<b>${this.$store.state.activeUser.login}</b> изменил приоритет задачи <b>${changedTask.header}</b> на `)
        }
        else{
          this.isEdited = false;
          this.isShowControls = false;
          changedTask.edited = true;
          this.$store.commit('SET_USERS_ACTIVITY_TO_LOCALSTORAGE_AND_STATE', `<b>${this.$store.state.activeUser.login}</b> внес изменения в задачу <b>${changedTask.header}</b>`)
        }

        let idActiveUser = this.$route.params.id,
            users = JSON.parse(localStorage.getItem('users')),
            activeUser = users[idActiveUser]
        activeUser.todos.splice(indexTask, 1, changedTask);
        users.splice(idActiveUser, 1, activeUser);

        this.$store.commit('SET_ACTIVE_USER_TO_STATE', activeUser)
        this.$store.commit('SET_USERS_TO_LOCALSTORAGE', users)
      }
    },
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
      margin: 0!important;
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
        .edited-mark{
          position: absolute;
          right: 16px;
          bottom: 0;
        }
        .controls-container{
          display: flex;
          flex-direction: column;
          grid-gap: 16px;
          margin: 24px 0;
          .btns-container{
            display: flex;
            grid-gap: 16px;
          }
        }
      }
    }
  }

  .rows{
    .single-todo-wrapper{
      .tasks-view{
        display: flex;
        flex-direction: column;
        height: 100%;
        img{
          max-width: 100%;
          height: 200px;
        }
        .main-content{
          padding: 16px;
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

  @-webkit-keyframes backOutRight {
    0% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1)
    }

    20% {
      opacity: .7;
      -webkit-transform: translateX(0) scale(.7);
      transform: translateX(0) scale(.7)
    }

    to {
      opacity: .7;
      -webkit-transform: translateX(2000px) scale(.7);
      transform: translateX(2000px) scale(.7)
    }
  }

  @keyframes backOutRight {
    0% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1)
    }

    20% {
      opacity: .7;
      -webkit-transform: translateX(0) scale(.7);
      transform: translateX(0) scale(.7)
    }

    to {
      opacity: .7;
      -webkit-transform: translateX(2000px) scale(.7);
      transform: translateX(2000px) scale(.7)
    }
  }

  .animate__backOutRight {
    -webkit-animation-name: backOutRight;
    animation-name: backOutRight;
    animation-duration: 1s;
  }

  .animate__animated {
    animation-duration: 1s;
    animation-fill-mode: both
  }


  .error-text{
    display: none;
    font-size: .7rem;
    color: crimson;
    text-align: left;
  }
  .form-group--error{
    .error-text{
      display: block;
    }
  }
</style>