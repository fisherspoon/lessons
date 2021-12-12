<template>
  <div class="todos-completed-wrap">
    <router-link :to="`/todos/${this.$route.params.id}`">Просмотреть невыполненные</router-link>
    <div class="todos">
          <template v-for="(item, index) in todosCompleted">
            <transition
                enter-active-class="animate__animated"
                leave-active-class="animate__animated animate__backOutRight">
                <div :key="index" class="card" style="width: 18rem;">
                  <img :src="item.url || 'https://www.kenyons.com/wp-content/uploads/2017/04/default-image-620x600.jpg'" class="card-img-top" alt="">
                  <div class="card-body">
                    <h5 class="card-title">{{ item.header }}</h5>
                    <p class="card-text">{{ item.description }}</p>
                    <VCheckbox
                        :value="markDone.value"
                        :label="markDone.label"
                        :id="markDone.label"
                        @click.native.prevent="setChangedTask(index, true)"
                    />
                  </div>
                </div>
            </transition>
          </template>

    </div>
  </div>
</template>

<script>
import VCheckbox from "@/components/molecules/VCheckbox";
import { mapState, mapGetters } from 'vuex'

export default {
  name: "TodosCompleted",
  data(){
    return{
      markDone:{
        label: 'Выполнено',
        value: true,
      },
    }
  },
  components:{
    VCheckbox
  },
  computed:{
    ...mapState({
      todosFromState: state => state.activeUser.todos
    }),
    ...mapGetters({
      todosCompleted: 'GET_COMPLETED_TASKS'
    })
  },
  methods:{
    setChangedTask(indexTask){
      let indexCurrentTaskInTodosInState = this.todosFromState.findIndex(obj => obj.timeCreated === this.todosCompleted[indexTask].timeCreated);
      this.todosFromState[indexCurrentTaskInTodosInState].done = false
      let changedTask = this.todosFromState[indexCurrentTaskInTodosInState];

        let idActiveUser = this.$route.params.id,
            users = JSON.parse(localStorage.getItem('users')),
            activeUser = users[idActiveUser];

        activeUser.todos.splice(indexCurrentTaskInTodosInState, 1, changedTask);
        users.splice(idActiveUser, 1, activeUser);

        this.$store.commit('SET_USERS_TO_LOCALSTORAGE', users)

        this.$store.commit('SET_USERS_ACTIVITY_TO_LOCALSTORAGE_AND_STATE', ` <b>${this.$store.state.activeUser.login}</b> вернул статус задачи <b>${changedTask.header}</b> как невыполненный`)
    },
  },
  beforeCreate() {
    this.$store.dispatch('GET_USERS_FROM_LOCALSTORAGE', this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
  .todos-completed-wrap{
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
    .todos{
      display: flex;
      grid-gap: 16px;
      .card-body{
        display: flex;
        flex-direction: column;
        .card-title, .card-text{
          text-align: left;
        }
        .wrapper-checkbox{
          margin-top: auto;
        }
      }
    }
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
  }

  .animate__animated {
    animation-duration: 1s;
    animation-fill-mode: both
  }
</style>