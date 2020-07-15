<template>
  <v-app>
    <v-main>
      <DocsGenerator />
    </v-main>
  </v-app>
</template>

<script>
import DocsGenerator from '@/components/Docs_generator.vue'
export default {
  name: 'App',

  components: {
    DocsGenerator
  },

  data: () => ({
    //
  }),
};
</script>
