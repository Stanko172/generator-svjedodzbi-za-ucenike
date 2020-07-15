<template>
  <v-app>
    <v-content>
      <DocsGenerator />
    </v-content>
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
