<template>
  <div>
    <v-slide-x-transition>
      <div v-show="showSidebar" :class="{'collapsed': collapsed}" class="sidebar-menu">
        <div v-if="isMobile" class="user-info-box">
          <div class="text-center">
            <v-avatar size="44" color="var(--color-brand-dark-4)">
              <v-icon dark color="var(--color-brand-dark-1)">
                mdi-account-outline
              </v-icon>
            </v-avatar>
            <div
              class="unselectable mt-2 text-white font-size-2 font-weight-medium"
            >
              DEV USER
            </div>
          </div>
          <div class="mt-2">
            <!--            <v-btn-->
            <!--              disabled-->
            <!--              dark-->
            <!--              text-->
            <!--              small-->
            <!--              block-->
            <!--              class="text-none"-->
            <!--            >-->
            <!--              Help-->
            <!--            </v-btn>-->
            <v-btn
              dark
              text
              block
              class="text-none"
              @click="logout"
            >
              Logout
            </v-btn>
          </div>
        </div>
        <div v-for="link in menuLinksList" :key="link.value">
          <sidebar-link
            :collapsed="collapsed"
            :active="mainMenuActive === link.value"
            :link="link"
            class="mb-7"
            @changePage="changeActivePage"
          />
        </div>
      </div>
    </v-slide-x-transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import SidebarLink from '~/components/shared/layout/SidebarLink';

export default {
  name: 'Sidebar',
  components: {
    SidebarLink
  },
  props: {
    showSidebar: {
      type: Boolean,
      default: false
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loadingSidebarLink: false,
      menuLinksList: [
        {
          icon: 'mdi-home',
          name: 'Dashboard',
          value: 'dashboard',
          link: '/dashboard',
          enabled: true,
          open: false,
          subLinks: []
        },
        {
          icon: 'mdi-text-box-multiple',
          name: 'Library',
          value: 'dashboard-library',
          link: '/dashboard/library',
          enabled: true,
          open: false,
          subLinks: []
        },
        {
          icon: 'mdi-account',
          name: 'Settings',
          value: 'dashboard-settings',
          link: '/dashboard/settings',
          open: false,
          enabled: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      loggedUser: 'user/LOGGED_USER'
    }),
    isMobile() {
      return this.$vuetify.breakpoint.width < 992;
    },
    mainMenuActive() {
      const route = this.$nuxt.$route;
      return route?.name;
    }
  },
  methods: {
    changeActivePage(link) {
      this.openSidebar();
      this.$nuxt.$router.push({ path: link.link });
    },
    openSidebar() {
      this.$emit('openSidebar', false);
    },
    logout() {
      this.$emit('logout');
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar-menu {
  padding: 60px 0 0 60px;
  color: #ffffff;
  width: 300px;
  -moz-transition: width .3s;
  -o-transition: width .3s;
  -webkit-transition: width .3s;
  &.collapsed {
    width: 100px;
    -moz-transition: width .3s;
    -o-transition: width .3s;
    -webkit-transition: width .3s;
  }
  @media screen and (max-width: 992px) {
    min-width: 350px;
    position: absolute;
    top: 0;
    left: 0;
    padding: 60px 20px;
    background-color: #1f1f1f;
    min-height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    height: calc(100%);
    z-index: 200;
  }
}

.user-info-box {
  border-bottom: 1px solid rgba(121, 121, 121, 0.5);
  padding-bottom: 10px;
}
</style>
