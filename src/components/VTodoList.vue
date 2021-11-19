<template>
  <div>
    <transition name="fade" appear>
      <VModal
          v-if="isShowModal"
          :is-show-modal="isShowModal"
      >
      <template v-slot:form>
        <form @submit.prevent>
          <div class="col-12">
            <div class="mb-3">
              <VInput
                  :label="form.labelLogin"
                  :value.sync="form.loginValue"
              />
            </div>
            <div class="mb-3">
              <VInput
                  :label="form.labelPassword"
                  :value.sync="form.passwordValue"
                  :type-input="form.typePasswordInput"
              />
            </div>
          </div>
          <div class="mb-3">
            <div class="errors" v-if="errors.length">
              <ul>
                <li v-for="error in errors">{{ error.text }}</li>
              </ul>
            </div>
          </div>
          <VButton
              :custom-type="btnLogin.type"
              :name="btnLogin.name"
              :custom-class-btn="btnLogin.classBtn"
              @click.native="userLogin"
          />
        </form>
      </template>
    </VModal>
    </transition>
    <div v-if="!isShowModal" class="todo-wrapper">
    <div class="row">
        <VButton
            :custom-type="btnChangeUser.type"
            :name="btnChangeUser.name"
            :custom-class-btn="btnChangeUser.classBtn"
            @click.native="changeUser"
        />
      <div class="col-3">
        <div class="mb-3">
          <VInput
              :label="taskName.labelName"
              :value.sync="taskName.value"
          />
        </div>
        <div class="mb-3">
          <VInput
              :label="taskImage.labelName"
              :value.sync="taskImage.value"
          />
          <p class="error" ref="error">Допустимые форматы изображений - .png, .jpg</p>
        </div>
        <div class="mb-3">
          <VTextArea
              :label="taskDescription.labelName"
              :value.sync="taskDescription.value"
          />
        </div>
        <VButton
            :custom-type="btnAddTask.type"
            :name="btnAddTask.name"
            :custom-class-btn="btnAddTask.classBtn"
            @click.native="validateImgExtension(taskImage.value); addTask()"
        />
      </div>
    </div>
    <div class="line"></div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-4 btns-container">
          <VButton
              :custom-type="rowBtn.type"
              :name="rowBtn.name"
              :custom-class-btn="rowBtn.classBtn"
              @click.native="rows = true; cols = false"
          />
          <VButton
              :custom-type="colBtn.type"
              :name="colBtn.name"
              :custom-class-btn="colBtn.classBtn"
              @click.native="cols = true; rows = false"
          />
          </div>
        </div>
        <transition-group name="fade" tag="div" class="flexibleBlocks" :class="{'rows': rows, 'cols': cols}">
          <VTask
           v-for="(item, index) in tasks"
           :key="item.url + index"
           :task="item"
           @done="doneTask"
           @edit="editTask"
           @remove="removeTask"
          />
        </transition-group>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import format from 'date-fns/format';

import VInput from "@/components/molecules/VInput";
import VTextArea from "@/components/molecules/VTextArea";
import VButton from "@/components/molecules/VButton";
import VTask from "@/components/VTask";
import VModal from "@/components/VModal";
import validateImgExtension from "@/components/mixins/validateImgExtension";

 export default {
   name: 'TodoList',
   props:{
     isShowModal:{
       type: Boolean,
       required: true
     }
   },
   data(){
    return{
      isValid: null,
      cols: true,
      rows: false,
      form:{
        labelLogin: 'Введите логин',
        loginValue: '',
        labelPassword: 'Введите пароль',
        passwordValue: '',
        typePasswordInput: 'password'
      },
      errors: [],
      users: [
        {
          login: 'Alex',
          password: 'qwerty'
        },
        {
          login: 'Nick',
          password: 'asd'
        }
      ],
      currentUser: '',
      tasks:[],
      taskName: {
        value: '',
        labelName: 'Введите название задачи',
      },
      taskImage: {
        value: '',
        labelName: 'Вставьте url изображения',
      },
      taskDescription: {
        value: '',
        labelName: 'Вставьте Описание задачи',
      },
      btnAddTask:{
        type: 'button',
        name: 'Добавить',
        classBtn: 'btn-primary'
      },
      btnLogin:{
        type: 'button',
        name: 'Войти',
        classBtn: 'btn-primary'
      },
      btnChangeUser:{
        type: 'button',
        name: 'Сменить пользователя',
        classBtn: 'btn-warning'
      },
      rowBtn:{
        type: 'button',
        name: 'В строку по 3',
        classBtn: 'btn-primary'
      },
      colBtn:{
        type: 'button',
        name: 'В колонку',
        classBtn: 'btn-primary'
      }
    }
   },
   mixins: [validateImgExtension],
   components:{
     VInput,
     VTextArea,
     VButton,
     VTask,
     VModal
   },
   methods:{
     addTask(){
       if(this.isValid){
         console.log('valid')
         //добавление задачи
         let task = {
           title: this.taskName.value,
           url: this.taskImage.value,
           description: this.taskDescription.value,
           done: false,
           isDone: false,
           edit: false,
           isEdit: false,
           remove: false,
           timeCreated: (format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
         };
         this.appendToStorage(this.currentUser, task);
         this.tasks = this.getTaskByUser()

         this.taskName.value = '';
         this.taskImage.value = '';
         this.taskDescription.value = '';
       }
     },
     doneTask(task){
       //статус для выполненной задачи
       task.isDone = true;
       this.setChangedTask(task);
     },
     editTask(task){
       //статус для измененной задачи
       task.isEdit = true;
       if(!task.edit){
         task.timeCreated = (format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
         task.edit = true;
       }else {
         task.edit = false;
       }
       this.setChangedTask(task)
     },
     removeTask(task){
       //удаление задачи из массива в data  и localstorage
       let index = this.tasks.findIndex(item => item === task);
       this.tasks.splice(index, 1);
       let tasksFromStorage = this.getTaskByUser();
       tasksFromStorage.splice(index, 1);
       localStorage.setItem(this.currentUser, JSON.stringify(tasksFromStorage));
     },
     userLogin(){
       //логика для формы входа
      this.checkForm(this.form.loginValue, this.form.passwordValue);

      if(!this.errors.length){
          this.$emit('login', this.isShowModal)
          this.currentUser = this.form.loginValue;
          let tasksByUser = JSON.parse(localStorage.getItem(this.currentUser));
          !tasksByUser ? this.tasks = [] : this.tasks = tasksByUser;
      }
     },
     checkForm(login, pass){
       //проверка на ошибки в форме
       let compareLoginWithPass = this.users.filter((item) => {
         return item.login === login && item.password === pass
       });
       this.errors = [];
       if(!login){
         this.errors.push({
           type: 'login',
           text: 'Введите логин.'
         });
       }
       if(!pass){
         this.errors.push({
           type: 'password',
           text: 'Введите пароль.'
         });
       }
       if(compareLoginWithPass.length === 0 && (login.length > 0 && pass.length > 0)){
         this.errors.push({
           type: 'not-found',
           text: 'Пользователь не найден.'
         });
       }
     },
     changeUser(){
       //смена юзера
       this.form.loginValue = '';
       this.form.passwordValue = '';
       this.currentUser = '';
       this.$emit('change-user', this.isShowModal)
     },
     appendToStorage(name, data){
       //добавить новую задачу в нужный объект в storage
       let old = JSON.parse(localStorage.getItem(name));
       if(old === null) old = [];
       old.push(data);
       localStorage.setItem(name, JSON.stringify(old));
     },
     setChangedTask(task){
       //перезаписать объект при изменении статуса выполнено и изменении задачи
       let index = this.tasks.findIndex(item => item === task);
       let tasksFromStorage = this.getTaskByUser();
       tasksFromStorage[index] = task;
       localStorage.setItem(this.currentUser, JSON.stringify(tasksFromStorage));
     },
     getTaskByUser(){
       //получить массив объектов по юзеру
       return JSON.parse(localStorage.getItem(this.currentUser));
     },
   },
 }
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

  .line{
    border: 1px solid #ccc;
    margin: 50px 0;
  }
  .errors{
    border: 1px solid crimson;
    border-radius: 4px;
    padding: 12px;
    p{
      color: crimson;
    }
    ul{
      padding: 0;
      text-align: left;
      li{
        text-decoration: navajowhite;
        color: crimson;
        list-style-type: none;
        margin-bottom: 12px;
      }
    }
  }
  .btns-container{
    display: flex;
    grid-gap: 16px;
    margin-bottom: 36px;
  }
  .error{
    display: none;
    color: crimson;
  }
  .rows{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
    .controls-container{
      flex-direction: column;
      .btn-group{
        flex-direction: column;
      }
    }
  }
  .cols{
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
  }
</style>