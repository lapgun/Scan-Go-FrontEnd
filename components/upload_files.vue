<template>
  <div class="container">
    <input type="file" id="files" ref="files" multiple v-on:change="submitFiles()"/>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                files : []
            }
        },
        methods: {
            submitFiles() {
                this.handleFilesUpload();
                let formData = new FormData();
                for (let i = 0; i < this.files.length; i++) {
                    let file = this.files[i];
                    console.log(file);
                    formData.append('files', file);
                }
                let self = this;
                console.log(formData);
                this.$axios.post('/gallery_products/upload', formData,  {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function(res){
                    console.log(res);
                   self.files ='';
                })

            },
            handleFilesUpload() {
                let uploadedFiles = this.$refs.files.files;
                for( let i = 0; i < uploadedFiles.length; i++ ){
                    this.files.push( uploadedFiles[i] );
                }
            },
        }

    }
</script>
<style scoped>
</style>
