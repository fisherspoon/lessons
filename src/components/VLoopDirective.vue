<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <ul>
          <li v-callback="{index, listLength: list.length, fnCallback}" v-for="(item, index) in list" :key="item.name">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'afterLoop',
  data(){
    return{
      list:[
        {name: 'q'},
        {name: 'w'},
        {name: 'e'},
        {name: 'r'},
        {name: 't'},
        {name: 'y'},
        {name: 'u'},
        {name: 'i'},
        {name: 'o'},
        {name: 'p'},
        {name: 'a'},
        {name: 's'},
        {name: 'd'},
        {name: 'f'},
        {name: 'g'}
      ]
    }
  },
  methods:{
    fnCallback(){
      console.log('Message after loop end')
    }
  },
  directives:{
    callback(el, binding){


      let currentIndex = binding.value.index + 1;
      const totalItems = binding.value.listLength;
      if(currentIndex === totalItems) {
        binding.value.fnCallback();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  ul{
    li{
      text-align: left;
      list-style-type: disc;
    }
  }
</style>