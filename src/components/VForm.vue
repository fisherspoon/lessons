<template>
  <div class="form-wrapper">
    <div class="row">
      <div class="col-6">
        <pre>{{form}}</pre>
        <form @submit.prevent>
          <div class="mb-3">
            <VInput
               :id="name.id"
               :label="name.labelName"
               :value.sync="form.name"
               @input.native="validateInput('name', form.name)"
            />
          </div>
          <div class="mb-3">
            <VInput
                :id="surName.id"
                :label="surName.labelName"
                :value.sync="form.surName"
                @input.native="validateInput('surName', form.surName)"
            />
          </div>
          <div class="mb-3 form-check">
            <VCheckbox
                :id="agreement.id"
                :label="agreement.labelName"
                :checked.sync="form.isChecked"
                @input.native="validateInput('checkbox', form.isChecked)"
            />
          </div>

          <div class="mb-3">
            <div class="errors" v-if="errors.length">
              <p><b>Пожалуйста исправьте указанные ошибки:</b></p>
              <ul>
                <li v-for="error in errors">{{ error.text }}</li>
              </ul>
            </div>
          </div>

          <VButton
             :custom-type="customButton.type"
             :name="customButton.name"
             :custom-class-btn="customButton.classBtn"
             @click.native="registration"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VInput from "@/components/molecules/VInput";
import VCheckbox from "@/components/molecules/VCheckbox";
import VButton from "@/components/molecules/VButton";

export default {
  name: 'VForm',
  props: {

  },
  data(){
    return{
      form:{
        name: '',
        surName: '',
        isChecked: false
      },
      name:{
          id: 1,
          labelName: 'Введите имя',
      },
      surName:{
        id: 2,
        labelName: 'Введите фамилию',
      },
      agreement:{
        id: 3,
        labelName: 'Подтвердите согласие',
      },
      customButton:{
        type: 'submit',
        name: 'Отправить',
        classBtn: 'btn-primary'
      },
      errors: []
    }
  },
  components:{
    VInput,
    VCheckbox,
    VButton,
  },
  methods:{
    registration(){
      this.checkForm();
      if(!this.errors.length){
        console.log(this.form)
      }
    },
    checkForm(){
      this.errors = [];
      if(!this.form.name){
        this.errors.push({
          type: 'name',
          text: 'Укажите имя.'
        });
      }
      if(!this.form.surName){
        this.errors.push({
          type: 'surName',
          text: 'Укажите фамилию.'
        });
      }
      if(!this.form.isChecked){
        this.errors.push({
          type: 'checkbox',
          text: 'Подтвердите выбор.'
        });
      }
    },
    validateInput(type, currentValue){
      switch (type){
        case 'name':

          currentValue ? this.errors.splice(this.findIndexError('name'), 1) : this.errors.push({
            type: 'name',
            text: 'Укажите имя.'
          });
          break;
        case 'surName':
          currentValue ? this.errors.splice(this.findIndexError('surName'), 1) : this.errors.push({
            type: 'surName',
            text: 'Укажите фамилию.'
          });
          break;
        case 'checkbox':
          currentValue ? this.errors.splice(this.findIndexError('checkbox'), 1) : this.errors.push({
            type: 'checkbox',
            text: 'Подтвердите выбор.'
          });
          break;
      }
    },
    findIndexError(name){
      return this.errors.findIndex(item => item.type === name)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
</style>
