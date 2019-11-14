<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2"><input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/></div>
      <div class="col-md-4"> <button class="btn btn-success" v-on:click="submitFiles()">Upload</button></div>
    </div>

    <div class="large-12 medium-12 small-12 cell">
      <div v-for="(file, key) in files" class="file-listing">{{ file.name }} <span class="remove-file" v-on:click="removeFile( key )">Cancel</span></div>
    </div>
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
                let formData = new FormData();
                for (let i = 0; i < this.files.length; i++) {
                    let file = this.files[i];
                    console.log(file);
                    formData.append('files', file);
                }
                let self = this;
                console.log(formData);
                this.$axios.post('/gallery/upload', formData,  {
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
            removeFile( key ){
                this.files.splice( key, 1 );
            }
        }

    }
</script>
<style scoped>
  div.file-listing{
    width: 200px;
  }

  span.remove-file{
    color: red;
    cursor: pointer;
    float: right;
  }
  div button {
    margin-left: 14px;
  }
  div input{
    margin-left: -15px;
  }
</style>
