<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="layer"  >
        <div class="content">
          <slot name="form"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VModal',
  props:{
    isShowModal:{
      type: Boolean,
      required: true
    },
    modeBg:{
      type: String
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
</style>