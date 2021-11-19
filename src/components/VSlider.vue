<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="slider-wrapper">
          <div class="nav-slider">
            <span class="arrow-prev" @click="prevSlide" ref="prevButton" :class="{'disabled': currentSlide === 0}">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve"> <g> <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   "/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
            </span>
            <span class="arrow-next" @click="nextSlide" ref="nexButton" :class="{'disabled': currentSlide === bgSlides.length-1}">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve"> <g> <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   "/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>
            </span>
          </div>
          <div class="image-container">
            <transition-group mode="out-in" name="fade" tag="div" class="support-container">
             <img v-for="(item, index) in bgSlides" :key="index" :src="item.url" alt="" v-show="index === currentSlide">
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vSlider',
  data(){
    return{
      bgSlides:[
        {
          url: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
        },
        {
          url: 'https://st4.depositphotos.com/15803258/20235/i/600/depositphotos_202355626-stock-photo-old-world-swallowtail-butterfly-papilio.jpg',
        },
        {
          url: 'https://st.depositphotos.com/1000955/1261/i/600/depositphotos_12610594-stock-photo-butterfly-yellow-spotted.jpg',
        },
        {
          url: 'https://thumbs.dreamstime.com/b/e-r-146352997.jpg',
        }
      ],
      currentSlide: 0
    }
  },
  methods:{
    prevSlide(){
      this.currentSlide--
    },
    nextSlide(){
      this.currentSlide++
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
  .slider-wrapper{
    display: flex;
    align-items: center;
    max-width: 600px;
    height: 200px;
    overflow: hidden;
    background: #ccc;
    position: relative;
    .disabled{
      pointer-events: none;
      opacity: .3;
    }
    .image-container{
      display: flex;
      width: 100%;
      height: inherit;
      justify-content: center;
      align-items: center;
      .support-container{
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        position: relative;
        img{
          display: flex;
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: absolute;
          margin: auto;
        }
      }
    }
    .nav-slider{
      .arrow-prev, .arrow-next{
        position: absolute;
        z-index: 1;
        display: block;
        width: 50px;
        height: 50px;
        margin-top: -25px;
        cursor: pointer;
      }
      .arrow-prev{
        left: 0;
        transform: rotate(-180deg);
      }
      .arrow-next{
        right: 0;
      }
    }
  }
</style>