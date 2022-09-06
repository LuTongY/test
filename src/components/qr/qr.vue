<template>
  <div style="padding: 5px;" v-if="QrShow">
    <QRCodeVue3 :value="value" :width="width" :height="width" margin=3
      :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
      :cornersDotOptions="{ type: 'dot', color: '#238B41' }" :cornersSquareOptions="{ type: 'dot', color: '#238B41' }"
      :dotsOptions="{
        type: 'extra-rounded',
        color: '#238B41',
      }" class="cls-qrcode" />
  </div>
</template>

<script>
import QRCodeVue3 from "qrcode-vue3";

export default {
  name: 'QRCodeVue3Example',
  props: {
    value: {
      default: '0',
      type: String,
    },
    width: {
      default: '100',
      type: String,
    }
  },
  data() {
    return {
      QrShow: true
    }
  },
  watch: {
    value(val, oldVal) {
      this.QrShow = true
    }
  },
  components: {
    QRCodeVue3
  },

}
</script>
<style lang="less" scoped>
/deep/.cls-qrcode img{
  display: block;
  margin: 0 auto;
}
</style>