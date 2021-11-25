<template>
  <div class="menu-wrapper">
    <div class="container">
    <div class="row">
      <div class="col">
        <div class="nav">

          <template v-for="item in route">
            <span :key="item.name" v-if="item.name !== 'SinglePost' && item.name !== 'Author'" class="item-menu">
              <router-link :to="item.path" active-class="router-link-active">{{ item.name }}</router-link>
            </span>
          </template>
        </div>
        <router-view name="SubNav"/>
        <div class="content">
          <transition name="fade">
            <router-view/>
          </transition>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import routes from '../router/index'

export default {
  name: "Menu",
  data(){
    return{
      route: routes.options.routes
    }
  },
}
</script>

<style lang="scss" scoped>
.nav{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  grid-gap: 16px;
  .item-menu{
    border-right: 2px solid #2c3e50;
    padding-right: 16px;
    a{
      font-size: 24px;
      text-decoration: none;
      color: rgba(0, 0, 0, .72);
      &.router-link-active{
        color: blueviolet;
        font-weight: 700;
      }
    }
    &:last-child{
      border-right: none;
      padding-right: 0;
    }
  }
}
.content{
  margin-top: 50px;
}
.fade-enter-active, .fade-live-active{
  opacity: 1;
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to{
  transition: opacity .3s;
  opacity: 0;
  height: 0;
}
</style>