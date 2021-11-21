<template>

</template>

<script>
import VForm from "@/components/VForm";
import VInput from "@/components/molecules/VInput";
import VButton from "@/components/molecules/VButton";
export default {
  name: 'VFormWatch',
  data(){
    return{

    }
  },
  components:{
    VForm,
    VInput,
    VButton
  },
  methods:{
    markChange(elem){
      if(!elem.changed){
        this.formWatch.numberOfFieldsChange += 1;
        if(elem.value){
          elem.changed = true;
        }
      }
    },
    clearForm(iterObj){
      for(let key in iterObj){
        iterObj[key].value = '';
        delete iterObj[key].changed;
      }
      this.$nextTick(() => {
        this.formWatch.numberOfFieldsChange = 0;
      });
    }
  },
  watch:{
    'formWatch.inputs.simpleInputName.value': function (){
      this.markChange(this.formWatch.inputs.simpleInputName);
    },
    'formWatch.inputs.simpleInputSurname.value': function (){
      this.markChange(this.formWatch.inputs.simpleInputSurname);
    },
    'formWatch.inputs.simpleInputAge.value': function (){
      this.markChange(this.formWatch.inputs.simpleInputAge);
    },
    'formWatch.inputs.simpleInputCity.value': function (){
      this.markChange(this.formWatch.inputs.simpleInputCity);
    },
    'formWatch.inputs.simpleInputProfession.value': function (){
      this.markChange(this.formWatch.inputs.simpleInputProfession);
    }
  }
}
</script>