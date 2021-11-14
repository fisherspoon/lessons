<template>
  <div class="wrapper-task">
    <div class="row">
      <div class="col-12">
        <div class="container-task" :class="{'done-task': task.isDone}">
          <img :src="task.url" alt="">
          <div style="width: 100%; padding-right: 24px">
            <div v-if="task.edit" class="edit-task">
              <div class="mb-3">
                <VInput
                    :label="defaultLabel"
                    :value.sync="task.url"
                />
              </div>
              <div class="mb-3">
                <VInput
                    :label="defaultLabel"
                    :value.sync="task.title"
                />
              </div>
              <div class="mb-3">
                <VTextArea
                    :label="defaultLabel"
                    :value.sync="task.description"
                />
              </div>
            </div>
            <div v-else class="tasks-view">
              <p>{{ task.title }}</p>
              <p>{{ task.description }}</p>
            </div>
            <div class="controls-container">
              <div class="btn-group">
                <VButton
                    class="btn-edit"
                    :custom-type="btnDone.type"
                    :name="btnDone.name"
                    :custom-class-btn="btnDone.classBtn"
                    @click.native="doneTask"
                />
                <VButton
                  v-if="!task.isDone"
                  class="btn-edit"
                  :custom-type="btnEdit.type"
                  :name="btnEdit.name"
                  :custom-class-btn="btnEdit.classBtn"
                  @click.native="editTask"
                />
                <VButton
                    class="btn-edit"
                    :custom-type="btnRemove.type"
                    :name="btnRemove.name"
                    :custom-class-btn="btnRemove.classBtn"
                    @click.native="removeTask"
                />
              </div>
              <div class="time-edited">
                <p>{{ task.timeCreated }} <span v-if="task.isEdit">(Отредактированно)</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VInput from "@/components/molecules/VInput";
import VTextArea from "@/components/molecules/VTextArea";
import VButton from "@/components/molecules/VButton";

export default {
  name: 'Task',
  props:{
    task:{
      type: Object,
      required: true
    }
  },
  data(){
    return{
      defaultLabel: '',
      editTime: null,
      btnEdit:{
        type: 'button',
        name: 'Изменить',
        classBtn: 'btn-secondary'
      },
      btnDone:{
        type: 'button',
        name: 'Выполнено',
        classBtn: 'btn-info'
      },
      btnRemove:{
        type: 'button',
        name: 'Удалить',
        classBtn: 'btn-danger'
      }
    }
  },
  components:{
    VInput,
    VTextArea,
    VButton
  },
  methods:{
    doneTask(){
      this.$emit('done', this.task)
    },
    editTask(){
      this.$emit('edit', this.task)
    },
    removeTask(){
      this.$emit('remove', this.task)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-task{
  border: 1px solid #2c3e50;
  border-radius: 4px;
  margin-bottom: 24px;
  .container-task{
    display: flex;
    grid-gap: 24px;
    &.done-task{
      background: url("../assets/done-task.png") no-repeat 99% 9%;
      background-size: 4%;
    }
    img{
      max-width: 200px;
      object-fit: cover;
    }
    .edit-task{
      width: 100%;
      padding-top: 24px;
    }
    .tasks-view{
      width: 100%;
      padding-top: 24px;
      text-align: left;
    }
    .controls-container{
      display: flex;
      justify-content: space-between;
      .btn-group{
        display: flex;
        margin-bottom: 24px;
        grid-gap: 12px;
        .time-edited{
          p{
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

</style>