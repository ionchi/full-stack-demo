<template>
  <div class="d-flex flex-column align-center">
    <div class="font-size-10 mb-5">
      Signup
    </div>
    <div class="font-size-3 mb-10 mb-md-15">
      <span>Already have an account?</span>
      <span class="clickable dark-blue--text" @click="toLogin">Login</span>
    </div>
    <div class="form">
      <v-form
        ref="formLogin"
        v-model="validSignUpData"
        class="login-form"
        @submit.prevent="signup"
      >
        <v-text-field
          v-model="userData.username"
          :readonly="loading"
          :rules="[rules.required]"
          class="brand-input-field mb-8"
          type="email"
          dark
          label="Email"
          tabindex="1"
          @keyup.enter="signup"
        />
        <v-text-field
          v-model="userData.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :readonly="loading"
          :rules="[rules.required, rules.lengthRequired]"
          class="brand-input-field password-field mb-8"
          name="password"
          label="Password"
          dark
          tabindex="2"
          @change="checkConfirmPassword"
          @click:append="showPassword = !showPassword"
          @keyup.enter="signup"
        />
        <v-text-field
          ref="confirmPassword"
          v-model="userData.confirmPassword"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showConfirmPassword ? 'text' : 'password'"
          :readonly="loading"
          :rules="[rules.required, rules.matching, rules.lengthRequired]"
          class="brand-input-field password-field mb-12 mb-md-16"
          name="password"
          label="Confirm password"
          dark
          tabindex="3"
          @click:append="showConfirmPassword = !showConfirmPassword"
          @keyup.enter="signup"
        />
        <div class="d-flex flex-column align-center">
          <v-btn
            :disabled="!validSignUpData"
            :loading="loading"
            class="px-10 light-grey-btn"
            height="50"
            dark
            outlined
            tile
            tabindex="4"
            @click="signup"
          >
            Signup
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupForm',
  props: {
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      validSignUpData: false,
      userData: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        required: value => !!value || 'You must enter a value',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Not a valid e-mail';
        },
        matching: value => value === this.userData.password || 'Not matching',
        lengthRequired: value => value.length >= 6 || 'The password must be at least 6 characters long'
      }
    };
  },
  methods: {
    checkConfirmPassword() {
      this.$refs.confirmPassword.validate();
    },
    toLogin() {
      this.$emit('toLogin');
    },
    signup() {
      if (this.validSignUpData) {
        this.$emit('signup', {
          email: this.userData.email.trim(),
          password: this.userData.password
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  width: 400px;
  .brand-input-field.password-field ::v-deep .v-input__icon--append {
    transition: opacity 250ms;
    opacity: 0.5 !important;
  }
  .brand-input-field.password-field ::v-deep .v-input__icon--append:hover {
    opacity: 0.8 !important;
  }
  @media screen and (max-width: 992px) {
    min-width: 90%;
  }
}
</style>
