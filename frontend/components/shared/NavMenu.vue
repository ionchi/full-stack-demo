<template>
  <nav>
    <ul class="middle-menu d-flex">
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{
          'active': activeMenu === item.value,
          'enabled': item.enabled,
          'disabled': !item.enabled,
          'last-item': index === menuItems.length - 1
        }"
        tabindex="0"
        class="middle-menu-item-li unselectable d-flex align-center"
        @click.prevent="setActive(item)"
        @keydown.enter.prevent="setActive(item)"
      >
        <div :class="{ 'uppercase-active': uppercaseActive }" class="middle-menu-item">
          {{ item.text }}
        </div>
        <div
          v-if="item.counter"
          :class="{'outlined-counter': activeMenu !== item.value}"
          class="counter-box d-flex align-center justify-center"
        >
          <div
            :class="{
              'font-size-2': item.counter !== '+99',
              'font-size-1': item.counter === '+99'
            }"
          >
            {{ item.counter }}
          </div>
        </div>
        <div v-else class="counter-placeholder"></div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    menuItems: {
      type: Array,
      default: () => []
    },
    activeMenu: {
      type: String,
      default: null
    },
    uppercaseActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setActive(itemMenu) {
      if (itemMenu.enabled) {
        this.$emit('updateMenu', itemMenu);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.middle-menu {
  list-style: none;
  padding-left: 0;
  color: #FFFFFF !important;
}
.middle-menu-item-li {
  display: inline-block;
  vertical-align: middle;
  &:not(.last-item) {
    margin-right: 32px;
  }
  &.enabled:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
}
.middle-menu-item {
  opacity: 0.6;
  font-size: 12px;
  font-weight: 400 !important;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  line-height: 16px;
  position: relative;
  display: block;
  padding: 10px 0;
  margin-right: 12px;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, padding 0.2s ease-in-out, font-weight .2s ease-in-out;

  &::before {
    content: '';
    display: block;
    position: absolute;
    bottom: 3px;
    height: 2px;
    width: 30px;
    background-color: #FFFFFF !important;
    transform-origin: right top;
    transform: scale(0, 1);
    transition: color 0.1s ease-in-out, transform 0.2s ease-in-out;
  }
  @media screen and (max-width: 960px) {
    margin-right: 4px;
  }
}
.active > .uppercase-active {
  text-transform: uppercase !important;
}
.active > .middle-menu-item {
  font-size: 12px;
  line-height: 16px;
  color: #FFFFFF;
  transition: opacity 250ms, color 0.2s ease-in-out, font-weight .2s ease-in-out;
}
.enabled > .middle-menu-item:hover::before,
.active > .middle-menu-item::before {
  transform-origin: left top;
  transform: scale(1, 1);
  transition: all 250ms ease;
}
.disabled > .middle-menu-item  {
  opacity: 0.6;
}
.active > .middle-menu-item {
  opacity: 1;
}
.middle-menu-item-li.enabled:hover {
  .middle-menu-item {
    opacity: 1 !important;
    transition: opacity 250ms;
  }
  .counter-box.outlined-counter {
    opacity: 1 !important;
    transition: opacity 250ms;
  }
}
.counter-box {
  width: 24px;
  height: 24px;
  margin-right: 26px;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  color: #000000;
  transition: opacity 250ms;
}
.counter-box.outlined-counter {
  background: transparent;
  color: #FFFFFF;
  opacity: 0.6;
}
.counter-box.outlined-counter:hover {
  opacity: 1 !important;
  transition: opacity 250ms;
}
.counter-placeholder {
  width: 10px;
  height: 10px;
}
</style>
