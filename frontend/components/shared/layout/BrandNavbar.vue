<template>
  <nav class="brand-navbar d-flex align-center d-sm-and-down-inline">
    <div class="logo-box d-flex align-center unselectable">
      <div v-if="isMobile" class="d-inline mr-5">
        <button
          type="button"
          class="navbar-toggle"
          aria-label="Navbar toggle button"
          @click.prevent="toggleSidebar"
        >
          <span :class="{'active': showSidebar}" class="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
      <div class="font-size-7 white--text">
        Readify
      </div>
    </div>
    <div v-if="!isMobile" class="menus-box d-flex justify-space-between align-center">
      <div>
        <nav-menu
          :menu-items="mainMenu"
          :active-menu="mainMenuActive"
          @updateMenu="setActiveMenu"
        />
      </div>
      <div class="d-flex align-center">
        <v-menu
          :nudge-bottom="5"
          :close-on-content-click="false"
          :nudge-right="20"
          content-class="user-header-menu"
          transition="slide-y-transition"
          bottom
          left
          offset-y
        >
          <template v-slot:activator="{ on, value }">
            <span class="unselectable clickable" v-on="on">
              <v-avatar size="44" color="var(--color-brand-dark-4)">
                <v-icon dark color="var(--color-brand-dark-1)">
                  mdi-account-outline
                </v-icon>
              </v-avatar>
              <span
                class="unselectable ml-3 text-white font-size-2 font-weight-medium"
              >
                DEV USER
              </span>
              <span :class="{'menu-open': value}" class="menu-down-icon">
                <v-icon dark>
                  mdi-chevron-down
                </v-icon>
              </span>
            </span>
          </template>
          <v-card class="menu-content" dark>
            <v-icon color="#ffffff" class="menu-top-arrow">
              mdi-menu-up
            </v-icon>
            <v-list class="user-menu py-5 font-size-3" dark tile dense>
              <v-list-item
                :ripple="false"
                class="user-menu-item pl-11"
                exact-active-class="active-user-menu"
                to="/dashboard/settings"
                @click="menu = false"
              >
                Settings
              </v-list-item>
              <v-list-item :ripple="false" class="pl-11" @click="logout">
                Log out
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import NavMenu from '~/components/shared/NavMenu';

export default {
  name: 'BrandNavbar',
  components: {
    NavMenu
  },
  props: {
    showSidebar: {
      type: Boolean,
      default: false
    },
    showNotifications: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showMenu: false,
      userMenu: false,
      mainMenu: [
        {
          value: 'dashboard',
          text: 'Dashboard',
          link: '/dashboard',
          enabled: true
        },
        {
          value: 'dashboard-library',
          text: 'My Library',
          link: '/dashboard/library',
          enabled: true
        }
        // {
        //   value: 'help',
        //   text: 'Help',
        //   link: null,
        //   enabled: false
        // }
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
    logout() {
      this.$emit('logout');
    },
    toggleSidebar() {
      this.$emit('toggleSidebar', true);
    },
    setActiveMenu(menuItem) {
      if (menuItem.link) {
        this.$nuxt.$router.push({
          path: menuItem.link
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.brand-navbar {
  height: var(--navbar-h);
  width: 100%;
  padding: 0 60px;

  @media screen and (max-width: 992px) {
    padding: 0 20px;
  }
}

.navbar-toggle:focus {
  outline: none;
}

.hamburger-menu {
  display: inline-block;
  span {
    background: linear-gradient(138deg, #0CCA91, #00A4E6);
    border-radius: 3px;
    display: block;
    height: 3px;
    margin-top: 5px;
    padding: 0;
    position: relative;
    transition: all 0.2s ease;
    width: 25px;
  }
  &.active span:nth-of-type(1) {
    -webkit-transform: rotate3d(0, 0, 1, 45deg);
    transform: rotate3d(0, 0, 1, 45deg);
    top: 7px;
  }
  &.active span:nth-of-type(2) {
    opacity: 0;
  }
  &.active span:nth-of-type(3) {
    -webkit-transform: rotate3d(0,0,1,-45deg);
    transform: rotate3d(0,0,1,-45deg);
    top: -9px;
  }
}

.logo-box {
  min-width: 240px;
  @media screen and (max-width: 992px) {
    min-width: 250px;
  }
}
.menus-box {
  width: 100%;
}
.user-menu {
  background: transparent;
}
.user-menu-item:hover {
  text-decoration: none;
}
.user-profile-btn ::v-deep .v-icon {
  color: var(--color-dark-grey);
}

.user-header-menu {
  padding-top: 5px;

  @media screen and (max-width: 992px) {
    min-width: 100% !important;
    left: 0 !important;
  }

  .menu-top-arrow {
    position: absolute;
    top: -16px;
    z-index: 100;
    right: 20px;
  }

  .menu-content {
    background: var(--color-brand-dark-2);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    box-shadow: 0 24px 54px rgba(0, 0, 0, 0.55);
    position: relative;
    width: 180px;
    min-height: 100px;
    font-size: 14px;
    border-radius: 0;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
}

.user-header-menu, .user-header-menu ::v-deep .v-card {
  border-radius: 0 !important;
}
</style>
