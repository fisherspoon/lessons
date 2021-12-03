<template>
  <div class="users-activity-wrapper">
    <div v-for="(item, index) in activity">
      <p :key="index" class="mb-3" v-html="item">{{ item }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "UserActivity",
  computed:{
    ...mapState({
      activity: state => state.usersActivity
    })
  },
  beforeCreate() {
    this.$store.dispatch('GET_USERS_ACTIVITY_FROM_LOCALSTORAGE')
  }
}
</script>

<style lang="scss" scoped>
  .users-activity-wrapper{
    display: flex;
    flex-direction: column;
    background: #e0e0e0;
    position: fixed;
    left: 0;
    top: 0;
    max-width: 500px;
    width: 100%;
    height: 100%;
    z-index: 9999;
    overflow-y: scroll;
    text-align: left;
    padding: 24px;
  }
</style>