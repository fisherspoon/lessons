<template>
  <div class="form-wrapper">
    <div class="row">
      <div class="col-6">
        <div v-if="successSubmit" class="success-submit">
          <div class="mb-3">
            <h2>Форма успешно отправлена!</h2>
          </div>
        </div>
        <div v-if="errorSubmit" class="success-submit">
          <div class="mb-3">
            <h2>Ошибка отправки формы!</h2>
          </div>
        </div>
        <form v-if="!successSubmit && !errorSubmit" @submit.prevent>
          <slot name="header"/>
          <div class="mb-3">
            <VInput
               :label="name.labelName"
               :value.sync="form.name"
            />
          </div>
          <div class="mb-3">
            <VInput
                :label="surName.labelName"
                :value.sync="form.surName"
            />
          </div>
          <div class="mb-3">
            <VInput
                :label="email.labelName"
                :value.sync="form.email"
            />
          </div>
          <div class="mb-3">
            <VRadio
                v-for="item in radio"
                :value="item.value"
                :label="item.name"
                v-model="radioStatus"
                @click.native="form.gender = item.value"
            />
          </div>
          <div class="mb-3">
            <VSelect
                :defaultProp.sync="customSelect.byDefault"
                :by-default="customSelect.byDefault"
                :options="customSelect.options"
            />
          </div>
          <div class="mb-3 form-check">
            <VCheckbox
                :id="agreement.id"
                :label="agreement.labelName"
                :checked.sync="form.isChecked"
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
import VSelect from "@/components/molecules/VSelect";
import VCheckbox from "@/components/molecules/VCheckbox";
import VRadio from "@/components/molecules/VRadio";
import VButton from "@/components/molecules/VButton";

export default {
  name: 'VForm',
  props: {

  },
  data(){
    return{
      successSubmit: false,
      errorSubmit: false,
      form:{
        name: '',
        surName: '',
        email: '',
        lang: '',
        gender: '',
        isChecked: false
      },
      name:{
          labelName: 'Введите имя',
      },
      surName:{
        labelName: 'Введите фамилию',
      },
      email:{
        labelName: 'Введите email',
      },
      customSelect:{
        byDefault: 'Выберите язык',
        options:[
          {
            value: 'uk',
            name: 'Украинский'
          },
          {
            value: 'ru',
            name: 'Руский'
          },
          {
            value: 'en',
            name: 'Английский'
          },
        ]
      },
      radioStatus: '',
      radio:[
        {
          value: 'male',
          name: 'Мужчина'
        },
        {
          value: 'female',
          name: 'Женщина'
        }
      ],
      agreement:{
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
    VSelect,
    VCheckbox,
    VRadio,
    VButton,
  },
  methods:{
    asd(lang){
      this.form.lang = lang
    },
    registration(){
      this.checkForm();
      if(!this.errors.length){
      this.customButton.name = 'Идет отправка'
        setTimeout(()=>{
          this.successSubmit = true;
          // this.errorSubmit = true;
          console.log(this.form.name)
          console.log(this.form.surName)
          console.log(this.form.email)
          console.log(this.form.lang)
          console.log(this.form.gender)
          console.log(this.form.isChecked)
        }, 2000)
      }
    },
    checkForm(){
      this.errors = [];
      if(!this.form.email){
        this.errors.push({
          type: 'email',
          text: 'Укажите email.'
        });
      }
      if(!this.form.isChecked){
        this.errors.push({
          type: 'checkbox',
          text: 'Подтвердите выбор.'
        });
      }
    },
  },
  watch: {
    'customSelect.byDefault': function (newVal) {
      this.form.lang = newVal
    },
  }
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
