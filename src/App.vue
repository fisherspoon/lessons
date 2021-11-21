<template>
  <div id="app">
    <div class="container">
      <div class="tabs-container">
        <div class="buttons-container">
          <button
              @click="currentTab = index"
              v-for="(item, index) in tabsBtn" :key="item + index" :class="{'active' : index === currentTab}"
          >
            {{item}}
          </button>
        </div>
        <div class="content-container">
          <div class="tab" :class="[ {'active' : index === currentTab}, changedBgColor ]" v-for="(item, index) in tabsContent" :key="item + index">
            <div v-if="item === 'hop-form'">
              <div class="row">
                <div class="col-3">
                  <VForm>
                    <template v-slot:form-content>
                      <VInput
                          :type-input="form.simpleInputName.typeInput"
                          :value.sync="form.simpleInputName.value"
                          :label="form.simpleInputName.label"
                      />
                      <VInput
                          :type-input="form.simpleInputSurname.typeInput"
                          :value.sync="form.simpleInputSurname.value"
                          :label="form.simpleInputSurname.label"
                      />
                      <VBtnData
                          :input-name="form.simpleInputName.value"
                          :input-surname="form.simpleInputSurname.value"
                          :name="form.btnSubmit.name"
                          :custom-type="form.btnSubmit.type"
                          :custom-class-btn="form.btnSubmit.customClass"
                      />
                    </template>
                  </VForm>
                </div>
              </div>
            </div>
            <div v-else-if="item === 'watch-form-provide-inject'">
              <ThemeForm/>
            </div>
            <div v-else>
              <VAnimeWrapper/>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import VForm from "@/components/VForm";
import VFormWatch from "@/components/VFormWatch";
import ThemeForm from "@/components/HOC/ThemeForm.vue";
import VInput from "@/components/molecules/VInput";
import { withDataProcessingBtn } from "@/components/HOC/BtnDataProcessing";
import VButton from "@/components/molecules/VButton";
import VAnimeWrapper from "@/components/VAnimeWrapper";


export default {
  name: 'App',
  data(){
    return{
      currentTab: 2,
      changedBgColor: '',
      tabsBtn: [
        'HOP Form',
        'Form with Watch and Provide/Inject',
        'Observable'
      ],
      tabsContent: [
        'hop-form',
        'watch-form-provide-inject',
        'Observable'
      ],
      form:{
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
        btnSubmit:{
          type: 'submit',
          name: 'Получить и записать данные',
          customClass: 'btn-primary'
        }
      },
    }
  },
  components: {
    VButton,
    VForm,
    VFormWatch,
    ThemeForm,
    VInput,
    VBtnData: withDataProcessingBtn(VButton),
    VAnimeWrapper,
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
  max-height: 100%;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
  max-height: 0;
}
.buttons-container{
  display: flex;
  grid-gap: 16px;
}
button{
  padding: 8px 16px;
  font-size: 15px;
  border: none;
  cursor: pointer;
  color: #fff;
}
.buttons-container button{
  background: none;
  border: none;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: .5px;
  color: rgba(0, 0, 0, .72);
  border-right: 1px solid #0a0a0a;
  cursor: pointer;
}
.buttons-container button.active{
  background: #0b93d5;
}
.buttons-container button:last-child{
  border-right: 0;
}
ul li{
  background: none;
  border: none;
  font-size: 17px;
  line-height: 21px;
  letter-spacing: .5px;
  color: rgba(0, 0, 0, .72);
  list-style-type: none;
}
.tab{
  display: none;
  padding: 50px 0;
}
.tab.active{
  display: block;
}
</style>
