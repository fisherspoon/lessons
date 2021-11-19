export default {
    data(){
      return{
          allowedExtensions: /(\.png|\.jpeg|\.jpg)$/i
      }
    },
    methods: {
        validateImgExtension(url){
            if(!this.allowedExtensions.exec(url) && url.length > 0){
                this.$refs.error.style.display = 'block';
                this.isValid = false;
            }else {
                this.$refs.error.style.display = 'none';
                this.isValid = true;
            }
        }
    }
}
