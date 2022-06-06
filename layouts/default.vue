<template>
  <v-app dark>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
      <div>
        <BlockUI v-if="loading" message="loading...">
          <i class="fa-solid fa-spinner"></i>
        </BlockUI>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['loading']),
  },
};
</script>
