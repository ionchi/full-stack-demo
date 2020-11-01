<template>
  <div class="login-page d-flex align-center justify-center">
    <transition name="fade" mode="out-in">
      <login-form
        v-if="isLogin"
        :loading="loading"
        @toSignup="changeMode('signup')"
        @login="login"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <signup-form
        v-if="isSignup"
        :loading="loading"
        @toLogin="changeMode('login')"
      />
    </transition>
    <div class="footer-disclaimer font-size-2">
      DEMO WEB APPLICATION
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoginForm from '@/components/authentication/LoginForm';
import SignupForm from '@/components/authentication/SignupForm';

export default {
  name: 'Login',
  components: { SignupForm, LoginForm },
  middleware: 'anonymous',
  data() {
    return {
      mode: 'login',
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      auth: 'user/IS_AUTHENTICATED'
    }),
    isLogin() {
      return this.mode === 'login';
    },
    isSignup() {
      return this.mode === 'signup';
    }
  },
  mounted() {
    document.getElementsByTagName('html')[0].classList.add('overflow-auto');
  },
  methods: {
    ...mapActions({
      userLogin: 'user/login'
    }),
    changeMode(mode) {
      this.loading = true;
      this.mode = null;
      setTimeout(() => {
        this.mode = mode;
        this.loading = false;
      }, 200);
    },
    async login(userCredentials) {
      try {
        this.loading = true;
        await this.userLogin(userCredentials);
        if (this.auth) {
          await this.$nuxt.$router.push({ path: '/dashboard' });
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    signup() {
    //  TODO
    }
  },
  head() {
    return {
      title: 'Login'
    };
  }
};
</script>

<style scoped lang="scss">
.login-page {
  background-color: var(--color-brand-dark-1);
  height: 100vh;
  .footer-disclaimer {
    position: absolute;
    bottom: 60px;
    left: 60px;
    @media screen and (max-width: 992px) {
      bottom: 15px;
      left: 15px;
    }
    @media screen and (max-height: 560px) {
      top: 10px;
      left: 10px;
    }
  }
}
</style>
