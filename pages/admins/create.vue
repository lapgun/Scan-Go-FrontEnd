<template>
  <div>
    <div>
      <b-form @submit.prevent="handleCreate">
        <b-form-group label="Your Name:" :class="{ 'form-group--error': $v.form.name.$error }">
          <b-form-input v-model.trim="$v.form.name.$model" placeholder="Enter name"></b-form-input>
          <div class="error" v-if="!$v.form.name.required">Name is required</div>
          <div
            class="error"
            v-if="!$v.form.name.minLength"
          >Name must have at least {{$v.form.name.$params.minLength.min}} letters.</div>
        </b-form-group>

        <b-form-group label="Your email:" :class="{ 'form-group--error': $v.form.email.$error }">
          <b-form-input v-model.trim="$v.form.email.$model" placeholder="Enter your email"></b-form-input>
          <div class="error" v-if="!$v.form.email.required">Email is required</div>
          <div
            class="error"
            v-if="!$v.form.email.minLength"
          >Name must have at least {{$v.form.email.$params.minLength.min}} letters.</div>
        </b-form-group>

        <b-form-group
          label="Your Password:"
          :class="{ 'form-group--error': $v.form.password.$error }"
        >
          <b-form-input
            type="password"
            v-model.trim="$v.form.password.$model"
            placeholder="Enter your password"
          ></b-form-input>
          <div class="error" v-if="!$v.form.password.required">password is required</div>
          <div
            class="error"
            v-if="!$v.form.password.minLength"
          >password must have at least {{$v.form.password.$params.minLength.min}} letters.</div>
        </b-form-group>

        <b-form-group label="Retype your password again:">
          <b-form-input
            type="password"
            v-model="repassword"
            placeholder="Retype your password again"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data: function() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      repassword: ""
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        minLength: minLength(4)
      },
      password: {
        required,
        minLength: minLength(4)
      }
    }
  },

  methods: {
    handleCreate: function() {
      let self = this;
      if (this.$v.$invalid) {
        alert("failled");
      } else {
        if (this.repassword == this.form.password) {
          this.$axios.post("/admins", this.form).then(function(res) {
            console.log(res);
            self.$router.push("/admins");
          });
        } else {
          alert("Repassword is not correct");
        }
      }
    }
  }
};
</script>