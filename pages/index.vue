<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline"> My favorite videos </v-card-title>
        <v-card-text>
          <v-list>
            <v-subheader>
              <v-select
                :items="$store.state.possiblePrefixes"
                label="prefix"
                outlined
                dense
                @change="changePrefix"
              />
            </v-subheader>
            <v-list-item v-for="(item, i) in urls" :key="i">
              <v-list-item-content>
                <a :href="item.url" target="_blank">{{ item.title }}</a>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    urls() {
      return this.$store.state.urls[this.$store.state.prefix];
    },
  },
  methods: {
    changePrefix(newPrefix) {
      this.$store.dispatch('fetchUrls', newPrefix);
    },
  },
};
</script>
