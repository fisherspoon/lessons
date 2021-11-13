<template>
  <div class="wrapper-select">
    <div
        @click="isShow = !isShow"
        class="selected-value"
    >
      {{ byDefault }}

      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="25px" height="15px" viewBox="0 0 960 560" enable-background="new 0 0 960 560" xml:space="preserve">
        <g id="Rounded_Rectangle_33_copy_4_1_">
          <path d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937   c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937   c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"/>
        </g>
      </svg>
    </div>
    <ul :class="{'shown': isShow}">
      <li
          v-for="(item, index) in options"
          :key="item + index"
          :data-value="item.value"
          @click="changeValue(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'VSelect',
    props:{
      byDefault:{
        type: Object,
        default: 'Выберите значение'
      },
      options:{
        type: Array,
        required: true
      }
    },
    data(){
      return{
        isShow: false
      }
    },
    methods:{
      changeValue(item){
        this.$emit('update:defaultProp', item.name)
        this.isShow = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper-select{
    width: 320px;
    height: 48px;
    border: 1px solid #ccc;
    .selected-value{
      display: flex;
      height: inherit;
      align-items: center;
      padding-left: 12px;
      justify-content: space-between;
      &:hover{
        cursor: pointer;
      }
      svg{
        margin-right: 6px;
      }
    }
    ul{
      display: none;
      padding: 0;
      border: 1px solid #ccc;
      margin: 3px 0 0 0;
      &.shown{
        display: flex;
        flex-direction: column;
      }
      li{
        text-align: left;
        padding: 6px 12px;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
</style>