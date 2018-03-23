<template>
  <div class="info">{{ localContent }}</div>
</template>

<script>
export default {
  name: 'info',
  props: {
    content: {
      type: String
    }
  },
  computed: {
    localContent() {
      return this.content;
    }
  }
};
</script>

<style scoped>
.info {
  margin: 6px;
  padding: 6px;
  background: lightgray;
}
</style>
