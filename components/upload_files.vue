<template>
    <div class="container">
        <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
        <div class="large-12 medium-12 small-12 cell">
            <div v-for="(file, key) in files" class="file-listing">{{ file.name }} <span class="remove-file"
                                                                                         v-on:click="removeFile( key )">Remove</span>
            </div>
        </div>
        <br>
        <div class="large-12 medium-12 small-12 cell">
            <button v-on:click="addFiles()">Add Files</button>
        </div>
        <br>
        <div class="large-12 medium-12 small-12 cell">
            <button v-on:click="submitFiles()">Submit</button>
        </div>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                files: []
            }
        },
        methods: {
            addFiles() {
                this.$refs.files.click();
            },
            submitFiles() {
                let formData = new FormData();
                for (let i = 0; i < this.files.length; i++) {
                    let file = this.files[i];
                    console.log(file);
                    formData.append('files', file);
                }
                let self = this;
                console.log(formData);
                this.$axios.post('/gallery_products/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function (res) {
                    console.log(res);
                    self.files = '';
                })

            },
            handleFilesUpload() {
                let uploadedFiles = this.$refs.files.files;
                for (let i = 0; i < uploadedFiles.length; i++) {
                    this.files.push(uploadedFiles[i]);
                }
            },
            removeFile(key) {
                this.files.splice(key, 1);
            }
        }

    }
</script>
<style scoped>
    input[type="file"] {
        position: absolute;
        top: -500px;
    }

    div.file-listing {
        width: 200px;
    }

    span.remove-file {
        color: red;
        cursor: pointer;
        float: right;
    }
</style>
