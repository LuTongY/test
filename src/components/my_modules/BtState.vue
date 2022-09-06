<template>
    <div :style="{backgrounds:color}" class="BtState">
        {{text}}
    </div>
</template>
<script>
export default {
     props:{
             color:{
                 type:String,
                 default:'-webkit-gradient(linear, left top, left bottom, from(#7db72f), to(#4e7d0e))',
             },
             text:{
                 type:String,
                 default:'测试',
             }
         },
     setup(){
        
     }
}
</script>
<style scoped>
 .BtState{
     width: calc(100% - 20px);
     height: 30px;
     position: absolute;
     line-height: 30px;
     color: #fff;
     left: 50%;
     top: 50%;
     transform: translate(-50%,-50%);
     cursor: pointer;
     border-radius: 8px;
    
     background-image: -webkit-gradient(linear, left top, left bottom, from(#7db72f), to(#4e7d0e));
 };
 .BtState:hover{
     /* background: linear-gradient(linear, left top, left bottom, from(#6b9d28), to(#436b0c)); */
     background-image: linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%);
     font-size:'20px'
 }
</style>
