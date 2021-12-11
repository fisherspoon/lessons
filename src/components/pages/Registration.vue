<template>
  <VModal
      v-if="showModal"
      :is-show-modal="showModal"
  >
    <template v-slot:form>
      <form @submit.prevent>
        <div class="row">
          <div class="col">
            <div class="mb-3" :class="{ 'form-group--error': $v.formRegistration.name.value.$error }">
              <VInput
                  :label="formRegistration.name.label"
                  :value.sync="formRegistration.name.value"
              />
              <p class="error-text mt-1">Поле не может быть пустым</p>
            </div>
            <div class="mb-3" :class="{ 'form-group--error': $v.formRegistration.login.value.$error }">
              <VInput
                  :label="formRegistration.login.label"
                  :value.sync="formRegistration.login.value"
              />
              <p class="error-text mt-1">Поле не может быть пустым</p>
              <p class="sameLogin mt-1" ref="sameLogin">Пользователь с таким логином уже существует</p>
            </div>
            <div class="mb-3">
              <VInput
                  :label="formRegistration.email.label"
                  :value.sync="formRegistration.email.value"
                  :type-input="formRegistration.email.type"
              />
            </div>
            <div class="mb-3" :class="{ 'form-group--error': $v.formRegistration.password.value.$error }">
              <VInput
                  :label="formRegistration.password.label"
                  :value.sync="formRegistration.password.value"
                  :type-input="formRegistration.password.type"
              />
              <p class="error-text mt-1">Поле не может быть пустым</p>
            </div>
            <div class="mb-3" :class="{ 'form-group--error': $v.formRegistration.repeatPassword.value.$error && !$v.formRegistration.repeatPassword.sameAsPassword }">
              <VInput
                  :label="formRegistration.repeatPassword.label"
                  :value.sync="formRegistration.repeatPassword.value"
                  :type-input="formRegistration.repeatPassword.type"
              />
              <p class="error-text mt-1">Поле не может быть пустым и пароли должны совпадать</p>
            </div>
          </div>
          <VButton
            :name="formRegistration.button.name"
            :custom-type="formRegistration.button.type"
            :custom-class-btn="formRegistration.button.class"
            @click.native="userRegistration"
          />
          <p class="mt-4 text-center">Уже зарегистрированны? <router-link :to="'authorization'">Вход</router-link></p>
        </div>
      </form>
    </template>
  </VModal>
</template>

<script>
import VModal from "@/components/VModal";
import VInput from "@/components/molecules/VInput";
import VButton from "@/components/molecules/VButton";
import { required, sameAs } from 'vuelidate/lib/validators';

export default {
  name: "Registration",
  data(){
    return{
      showModal: this.$store.state.isShowModal,
      formRegistration: {
        name: {
          label: 'Введите ваше имя',
          value: '',
        },
        login: {
          label: 'Введите логин',
          value: ''
        },
        email: {
          label: 'Введите ваш email',
          value: '',
          type: 'email'
        },
        password: {
          label: 'Введите пароль',
          value: '',
          type: 'password'
        },
        repeatPassword: {
          label: 'Повторите пароль',
          value: '',
          type: 'password'
        },
        button:{
          name: 'Зарегистрироваться',
          type: 'button',
          class: 'btn-primary'
        }
      }
    }
  },
  validations: {
    formRegistration:{
      name: {
        value: { required }
      },
      login: {
        value: { required }
      },
      password: {
        value: { required }
      },
      repeatPassword: {
        value: { required, sameAsPassword: sameAs(function() { return this.formRegistration.password.value }) }
      }
    }
  },
  components:{
    VModal,
    VInput,
    VButton
  },
  methods:{
    userRegistration(){
      this.$v.$touch();
      if (!this.$v.$invalid) {

        let result = this.checkSameLoginAndReturnIdUser();

        if(result === false){
          this.$refs.sameLogin.classList.add('show')
          return
        }

        this.$refs.sameLogin.classList.remove('show')

        let userData = {
          id: result,
          login: this.formRegistration.login.value,
          password: this.formRegistration.password.value,
          isAuthorized: true,
          todos: [],
          tasksDirection: 'row'
        }

        let users = JSON.parse(localStorage.getItem('users'));
        !users ? users = [userData] : users.push(userData)

        this.$store.commit('SET_USERS_TO_LOCALSTORAGE', users)
        this.$router.push({ name: 'todos', params: { id: userData.id } });
      }
    },
    checkSameLoginAndReturnIdUser(){
      let users = JSON.parse(localStorage.getItem('users')),
          usersLength = 0;

      if(!users) return usersLength
      for(let i = 0; i < users.length; i++){
        if(users[i].login === this.formRegistration.login.value){
          return false;
        }
        usersLength++;
      }
      return usersLength
    }
  },
}
</script>

<style lang="scss" scoped>
 .error-text, .sameLogin{
   display: none;
   font-size: .7rem;
   color: crimson;
 }
 .form-group--error{
   .error-text{
     display: block;
   }
 }
 .sameLogin.show{
   display: block;
 }
</style>