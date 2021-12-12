<template>
  <div class="row">
    <div class="col-3">
      <VForm>
        <template v-slot:form-content>
          <VInput
              :type-input="formWatch.inputs.simpleInputName.typeInput"
              :value.sync="formWatch.inputs.simpleInputName.value"
              :label="formWatch.inputs.simpleInputName.label"
          />
          <VInput
              :type-input="formWatch.inputs.simpleInputSurname.typeInput"
              :value.sync="formWatch.inputs.simpleInputSurname.value"
              :label="formWatch.inputs.simpleInputSurname.label"
          />
          <transition name="fade" tag="div">
            <VInput
                v-if="formWatch.showAll"
                :type-input="formWatch.inputs.simpleInputAge.typeInput"
                :value.sync="formWatch.inputs.simpleInputAge.value"
                :label="formWatch.inputs.simpleInputAge.label"
            />
          </transition>
          <transition name="fade" tag="div">
            <VInput
                v-if="formWatch.showAll"
                :type-input="formWatch.inputs.simpleInputCity.typeInput"
                :value.sync="formWatch.inputs.simpleInputCity.value"
                :label="formWatch.inputs.simpleInputCity.label"
            />
          </transition>
          <transition name="fade" tag="div">
            <VInput
                v-if="formWatch.showAll"
                :type-input="formWatch.inputs.simpleInputProfession.typeInput"
                :value.sync="formWatch.inputs.simpleInputProfession.value"
                :label="formWatch.inputs.simpleInputProfession.label"
            />
          </transition>
          <VButton
              v-if="formWatch.numberOfFieldsChange"
              :custom-class-btn="formWatch.btnReset.customClass"
              :custom-type="formWatch.btnReset.type"
              :name="formWatch.btnReset.name"
              @click.native="clearForm(formWatch.inputs)"
          />
          <VButton
              class="mt-3"
              :custom-class-btn="formWatch.btnShowAll.customClass"
              :custom-type="formWatch.btnShowAll.type"
              :name="formWatch.btnShowAll.name"
              @click.native="formWatch.showAll = !formWatch.showAll"
          />
          <VButton
              class="mt-3"
              :custom-class-btn="formWatch.btnChangeThemeDark.customClass"
              :custom-type="formWatch.btnChangeThemeDark.type"
              :name="formWatch.btnChangeThemeDark.name"
              @click.native="setDarkTheme"
          />
          <VButton
              class="mt-3"
              :custom-class-btn="formWatch.btnChangeThemeLight.customClass"
              :custom-type="formWatch.btnChangeThemeLight.type"
              :name="formWatch.btnChangeThemeLight.name"
              @click.native="setLightTheme"
          />
        </template>
      </VForm>
    </div>
    <div class="col-3">
      <p v-show="formWatch.numberOfFieldsChange">Количество полей в которых произошли изменения: {{formWatch.numberOfFieldsChange}}</p>
    </div>
  </div>
</template>

<script>
import VButton from "@/components/molecules/VButton";
import VForm from "@/components/VForm";
import VInput from "@/components/molecules/VInput";

let defaultInputs = {
  simpleInputName:{
    typeInput: 'text',
    value: '',
    label: 'Имя'
  },
  simpleInputSurname:{
    typeInput: 'text',
    value: '',
    label: 'Фамилия'
  },
  simpleInputAge:{
    typeInput: 'text',
    value: '18',
    label: 'Возраст'
  },
  simpleInputCity:{
    typeInput: 'text',
    value: 'Днепр',
    label: 'Город'
  },
  simpleInputProfession:{
    typeInput: 'text',
    value: '',
    label: 'Профессия'
  },
}

export default {
  name: "ThemeForm",
  provide() {
    return{
      getTheme: this.getTheme
    }
  },
  data() {
    return {
      themeMode: '',
      themeLight: {
        formBg: '#fff9da',
        labelColor: '#110f08',
        inputBorder: '#110f08',
        buttonBg: '#5ca73f'
      },
      themeDark: {
        formBg: '#211f16',
        labelColor: '#fff',
        inputBorder: '#fff',
        buttonBg: '#2b59b7'
      },
      defaultFormData: JSON.parse(JSON.stringify(defaultInputs)),
      formWatch:{
        showAll: false,
        numberOfFieldsChange: 0,
        inputs: defaultInputs,
        btnReset:{
          type: 'button',
          name: 'Очистить',
          customClass: 'btn-success'
        },
        btnShowAll:{
          type: 'button',
          name: 'Еще фильтры',
          customClass: 'btn-primary'
        },
        btnChangeThemeDark:{
          type: 'button',
          name: 'Изменить цвет темы на темный',
          customClass: 'btn-info'
        },
        btnChangeThemeLight:{
          type: 'button',
          name: 'Изменить цвет темы на светлый',
          customClass: 'btn-info'
        }
      }
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
        if(iterObj[key].value !== this.defaultFormData[key].value){
          iterObj[key].value = this.defaultFormData[key].value
          delete iterObj[key].changed;
        }
      }
      this.$nextTick(() => {
        this.formWatch.numberOfFieldsChange = 0;
      });
    },
    getTheme(){
      return this.themeMode
    },
    setLightTheme(){
      this.themeMode = this.themeLight;
    },
    setDarkTheme(){
      this.themeMode = this.themeDark;
    }
  },
  watch:{
    'formWatch.inputs':{
      handler(){
        return Object.keys( this.formWatch.inputs ).reduce((formData, field) => {
          if (this.formWatch.inputs[ field ].value !== this.defaultFormData[field].value) {
            this.markChange(this.formWatch.inputs[field]);
          }
          return formData;
        }, {} );
      },
      deep: true
    }
  }
}
</script>