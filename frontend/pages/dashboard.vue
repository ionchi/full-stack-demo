<template>
  <div>
    <nuxt-child :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  middleware: 'authenticated',
  layout: 'dashboard'
};
</script>

<style scoped>

</style>
