<template>
  <v-app class="background-dark">
    <brand-navbar
      :key="$route.fullPath"
      :show-sidebar="showSidebar"
      :is-dashboard="true"
      @toggleSidebar="toggleSidebar"
      @logout="logout"
    />

    <div class="wrapper">
      <sidebar
        v-click-outside="hideSidebar"
        :show-sidebar="showSidebar"
        :collapsed="collapsedSidebar"
        @toggleCollapse="toggleCollapse"
        @openSidebar="openSidebar"
        @logout="logout"
      />

      <div class="page-content">
        <nuxt />
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Sidebar from '~/components/shared/layout/Sidebar';
import BrandNavbar from '~/components/shared/layout/BrandNavbar';

export default {
  name: 'DashboardLayout',
  components: {
    BrandNavbar,
    Sidebar
  },
  data() {
    return {
      showSidebar: true,
      collapsedSidebar: false,
      mobileWidth: 992
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.width < 992;
    }
  },
  mounted() {
    if (window) {
      window.addEventListener('resize', () => this.updateSidebarState());
    }
    this.updateSidebarState();
  },
  methods: {
    ...mapActions({
      userLogout: 'user/logout'
    }),
    hideSidebar() {
      if (this.showSidebar && this.isMobile) {
        setTimeout(() => {
          this.showSidebar = false;
        }, 0);
      }
    },
    toggleSidebar() {
      if (!this.showSidebar) {
        this.collapsedSidebar = false;
      }
      setTimeout(() => {
        this.showSidebar = !this.showSidebar;
      }, 0);
    },
    toggleCollapse() {
      this.collapsedSidebar = !this.collapsedSidebar;
    },
    openSidebar(sidebarState) {
      this.collapsedSidebar = false;
      if (!this.checkIsDesktop()) {
        this.showSidebar = sidebarState;
      }
    },
    checkIsDesktop() {
      return window.matchMedia(`(min-width: ${this.mobileWidth}px)`).matches;
    },
    updateSidebarState() {
      if (this.checkIsDesktop()) {
        this.showSidebar = true;
        this.collapsedSidebar = false;
      } else if (!this.checkIsDesktop()) {
        this.showSidebar = false;
        this.collapsedSidebar = false;
      }
    },
    logout() {
      this.userLogout();
      this.$nuxt.$router.push({
        path: '/login'
      });
    }
  }
};
</script>

<style scoped lang="scss">
.background-dark {
  background-color: var(--color-brand-dark-1);
}

.page-content {
  width: 100%;
  padding: 60px;
  min-height: 100vh;
  background-color: var(--color-brand-dark-2);
  color: #FFFFFF;
  border-radius: 0;
  @media screen and (max-width: 992px) {
    padding: 20px;
  }
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
  perspective: 1500px;
}
</style>
