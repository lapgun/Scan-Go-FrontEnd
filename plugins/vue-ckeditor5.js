import Vue from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VueCkeditor from "vue-ckeditor5";

const options = {
  editors: {
    classic: ClassicEditor
  },
  name: "ckeditor"
};

Vue.component("vue-ckeditor", VueCkeditor.component)
Vue.use(VueCkeditor.plugin, options);
