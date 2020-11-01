<template>
  <v-layout />
</template>

<script>

export default {
  middleware: 'anonymous',
  fetch({ redirect }) {
    redirect('/dashboard');
  }
};
</script>
