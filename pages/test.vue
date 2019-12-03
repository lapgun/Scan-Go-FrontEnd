<template>
   <div>
     <ul>
       <ol v-for="(text,index) in newText" :key="index">{{text}}</ol>
     </ul>
     <input v-model="text" @change="handleChange">
   </div>
</template>
<script>
export default {
  mounted(){
    let self = this
    socket.on('push-new-text',function(text){
      self.newText.push(text)
    })
  },
  data (){
    return {
      newText : [],
        text : ''
    }
  },
  methods : {
    handleChange : function(){
      this.newText.push(this.text)
      socket.emit('text-added',this.text)
      this.text=""
    }
  }
}
</script>