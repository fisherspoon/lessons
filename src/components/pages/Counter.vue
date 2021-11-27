<template>
  <div>
    <h3>Counter</h3>
    <p>{{ counter }}</p>
    <div class="row">
      <div class="col">
        <VButton
            class="mb-3"
            :name="btnSettings.nameAdd"
            :custom-type="btnSettings.type"
            :custom-class-btn="btnSettings.class"
            @click.native="incrementCounter"
        />
        <VButton
            :name="btnSettings.nameDec"
            :custom-type="btnSettings.type"
            :custom-class-btn="btnSettings.class"
            @click.native="decreaseCounter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VButton from "@/components/molecules/VButton";
import { mapState } from 'vuex'

export default {
  name: "Counter",
  components: { VButton },
  data(){
    return{
      btnSettings:{
        nameAdd: 'Увеличить',
        nameDec: 'Уменьшить',
        type: 'button',
        class: 'btn-primary'
      }
    }
  },
  computed:{
    ...mapState({
      counter: state => state.counter.counter
    })
  },
  methods:{
    incrementCounter(){
      this.$store.commit('counter/incrementCount')
    },
    decreaseCounter(){
      this.$store.commit('counter/decreaseCount')
    }
  }
}
</script>

<style scoped>

</style>