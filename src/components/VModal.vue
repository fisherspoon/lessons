<template>
  <transition name="fade" appear>
    <div class="modal-overlay" v-if="isShowModal" @click.self="closeModal">
    <div class="modal">
      <div class="layer">
        <div class="content">
          <slot name="form"></slot>
          <div class="btn-group">
            <div class="row">
              <div class="col-12">
                <button class="btn btn-primary" @click="closeModal">Закрыть окно</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
 export default {
   name: 'VModal',
   props:{
     isShowModal:{
       type: Boolean,
       required: true
     }
   },
   methods:{
     closeModal(){
       this.$emit('close-modal')
     }
   }
 }
</script>

<style lang="scss" scoped>
.modal-overlay {
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  .modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    text-align: center;
    max-width: 600px;
    width: 100%;
    z-index: 999;
    transform: none;
    overflow: scroll;
    height: unset;
    display: flex;
    align-items: center;
    .layer{
      border-radius: 4px;
      background: #fff;
      padding: 32px;
      position: relative;
      width: 100%;
      display: block;
      max-height: 100%;
      overflow-y: scroll;
    }
    .content p{
      text-align: left;
      margin-bottom: 12px;
    }
    .btn-group{
      display: flex;
      grid-gap: 12px;
      justify-content: left;
      padding: 24px 0;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>