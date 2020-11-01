<template>
  <div
    :class="{'active': active, 'disabled': !link.enabled}"
    class="sidebar-link d-flex"
  >
    <div
      :class="{
        'active': active,
        'collapsed': collapsed
      }"
      class="icon-box unselectable clickable d-flex align-center justify-center"
      @click="sidebarMainClick"
    >
      <v-icon class="icon-element">
        {{ link.icon }}
      </v-icon>
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="!collapsed" class="ml-5">
        <div class="item-text clickable unselectable d-flex">
          <div @click="sidebarMainClick">
            {{ link.name }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLink',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      required: true
    },
    activeSubLink: {
      type: String,
      default: '/'
    },
    link: {
      type: Object,
      required: true
    }
  },
  methods: {
    sidebarMainClick() {
      if (!this.link.enabled) { return; }
      this.$emit('changePage', this.link);
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar-link {
  .icon-box {
    color: white;
    width: 35px;
    height: 35px;
    display: inline-block;
    transition: 250ms linear;
    text-align: center;
    margin-top: 19px;
    border-radius: 50%;
  }
  .item-text {
    color: var(--color-brand-dark-3);
    transition: color 250ms ease;
    margin-top: 25px;
    font-size: 14px;
    line-height: 30px;
  }

  ::v-deep .icon-element {
    color: var(--color-brand-dark-3);
    transition: color 250ms ease;
    &.v-icon {
      font-size: 24px !important;
    }
  }
}

.sidebar-link.active {
  .item-text {
    color: var(--color-brand-dark-4);
    transition: color 250ms ease;
  }
  ::v-deep .icon-element {
    color: var(--color-brand-dark-4);
    transition: color 250ms ease;

    &.v-icon {
      font-size: 24px !important;
      transition: color 250ms ease;
    }
  }
}

.sidebar-link.disabled .icon-box:hover, .sidebar-link.disabled .item-text:hover {
  cursor: inherit !important;
}
</style>
