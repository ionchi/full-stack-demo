<template>
  <div class="d-flex flex-column align-center">
    <div class="font-size-10 mb-5">
      Login
    </div>
    <div class="font-size-3 mb-10 mb-md-15">
      <span>Don't have an account?</span>
      <span class="clickable dark-blue--text" @click="toSignup">Signup</span>
    </div>
    <div class="form">
      <v-form
        ref="formLogin"
        class="login-form"
        @submit.prevent="login"
      >
        <v-text-field
          v-model="email"
          :readonly="loading"
          class="brand-input-field mb-8"
          type="email"
          dark
          label="Email"
          @keyup.enter="login"
        />
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :readonly="loading"
          class="brand-input-field password-field mb-12 mb-md-16"
          name="password"
          label="Password"
          dark
          @click:append="showPassword = !showPassword"
          @keyup.enter="login"
        />
        <div class="d-flex flex-column align-center">
          <v-btn
            :disabled="!validLoginData"
            :loading="loading"
            class="px-10 light-grey-btn"
            height="50"
            dark
            outlined
            tile
            @click="login"
          >
            Login
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      showPassword: false,
      email: 'dev@readify.com',
      password: 'firstman',
      rules: {
        required: value => !!value || 'You must enter a value'
      }
    };
  },
  computed: {
    validLoginData() {
      return this.email && this.password;
    }
  },
  methods: {
    toSignup() {
      this.$emit('toSignup');
    },
    login() {
      if (this.validLoginData) {
        this.$emit('login', {
          email: this.email.trim(),
          password: this.password
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
