<template>
  <VModal
      v-if="showModal"
      :is-show-modal="showModal"
  >
    <template v-slot:form>
      <form @submit.prevent>
        <div class="row">
          <div class="col">
            <div class="mb-3" :class="{ 'form-group--error': $v.formAuthorization.login.value.$error }">
              <VInput
                  :label="formAuthorization.login.label"
                  :value.sync="formAuthorization.login.value"
              />
              <p class="error-text mt-1">Поле не может быть пустым</p>
            </div>
            <div class="mb-3" :class="{ 'form-group--error': $v.formAuthorization.password.value.$error }">
              <VInput
                  :label="formAuthorization.password.label"
                  :value.sync="formAuthorization.password.value"
                  :type-input="formAuthorization.password.type"
              />
              <p class="error-text mt-1">Поле не может быть пустым</p>
            </div>
            <p class="error-text" ref="notFoundUser">Пользователь с данным логином не существует</p>
          </div>
          <VButton
              :name="formAuthorization.button.name"
              :custom-type="formAuthorization.button.type"
              :custom-class-btn="formAuthorization.button.class"
              @click.native="userAuthorization"
          />
          <p class="mt-4 text-center">Еще не зарегистрированны? <router-link :to="'registration'">Регистрация</router-link></p>
        </div>
      </form>
    </template>
  </VModal>
</template>

<script>
import VModal from "@/components/VModal";
import VInput from "@/components/molecules/VInput";
import VButton from "@/components/molecules/VButton";
import { required } from 'vuelidate/lib/validators'

export default {
  name: "Registration",
  data(){
    return{
      showModal: this.$store.state.isShowModal,
      name: '',
      formAuthorization: {
        login: {
          label: 'Введите логин',
          value: ''
        },
        password: {
          label: 'Введите пароль',
          value: '',
          type: 'password'
        },
        button:{
          name: 'Войти',
          type: 'button',
          class: 'btn-primary'
        }
      }
    }
  },
  validations: {
    formAuthorization:{
      login: {
        value: { required }
      },
      password: {
        value: { required }
      },
    }
  },
  components:{
    VModal,
    VInput,
    VButton
  },
  methods:{
    userAuthorization(){
      this.$v.$touch();

      if(!this.$v.$invalid) {
        let users = JSON.parse(localStorage.getItem('users'));
        for(let i = 0; i < users.length; i++){
          let parseItem = JSON.parse(users[i]);
          if(parseItem.login === this.formAuthorization.login.value && parseItem.password === this.formAuthorization.password.value){
            this.$store.commit('todoByUser/SET_CURRENT_USER', { login: parseItem.login, isAuthorized: true})
            this.$router.push({ name: 'todos', params: { id: parseItem.id } });
          }
          else if(parseItem.login !== this.formAuthorization.login.value){
            this.$refs.notFoundUser.classList.add('show')
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.error-text{
  display: none;
  font-size: .7rem;
  color: crimson;
}
.form-group--error{
  .error-text{
    display: block;
  }
}
.error-text.show{
  display: block;
}
</style>