<template>
  <div class="todo-wrapper">
    <div class="row">
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
        </div>
        <div class="mb-3">
          <VTextArea
              :label="taskDescription.labelName"
              :value.sync="taskDescription.value"
          />
        </div>
        <VButton
            :custom-type="customButton.type"
            :name="customButton.name"
            :custom-class-btn="customButton.classBtn"
            @click.native="addTask"
        />
      </div>
    </div>
    <div class="line"></div>
    <div class="row">
      <div class="col-12">
        <VTask
         v-for="(item, index) in tasks"
         :key="item.url + index"
         :task="item"
         @done="doneTask"
         @edit="editTask"
         @remove="removeTask"
        />
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

 export default {
   name: 'TodoList',
   data(){
    return{
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
      customButton:{
        type: 'button',
        name: 'Добавить',
        classBtn: 'btn-primary'
      },
    }
   },
   components:{
     VInput,
     VTextArea,
     VButton,
     VTask,
   },
   methods:{
     addTask(){
       let task = {
         title: this.taskName.value,
         url: this.taskImage.value,
         description: this.taskDescription.value,
         done: false,
         isDone: false,
         edit: false,
         isEdit: false,
         remove: false,
         isRemoved: false,
         timeCreated: (format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
       };
       this.tasks.push(task)
       this.taskName.value = '';
       this.taskImage.value = '';
       this.taskDescription.value = '';
     },
     doneTask(task){
       task.isDone = true;
     },
     editTask(task){
       task.isEdit = true;
       if(!task.edit){
         task.timeCreated = (format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
         task.edit = true;
       }else {
         task.edit = false;
       }
     },
     removeTask(task){
       task.isRemoved = true;
       let index = this.tasks.findIndex(item => item.isRemoved === task.isRemoved);
       this.tasks.splice(index, 1);
     }
   },
 }
</script>

<style lang="scss" scoped>
  .line{
    border: 1px solid #ccc;
    margin: 50px 0;
  }
</style>