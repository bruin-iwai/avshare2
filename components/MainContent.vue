<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col align-self="center">
        <v-select v-model="prefix" :items="['', 'my-favorites', 'old-programs']" label="prefix" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col align-self="center">
        <v-card v-if="prefix">
          <v-card-text>
            <v-list>
              <v-list-item v-for="(item, i) in urls" :key="i">
                <v-list-item-title>
                  <a :href="item.url" target="_blank">{{ item.title }}</a>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// declare interfaces
interface UrlAndTitle {
  url: string;
  title: string;
}

// get config
const {
  public: { baseURL, apiKey },
} = useRuntimeConfig();

// states
const prefix = ref('');
const urls = ref<UrlAndTitle[]>([]);

// watch effects
watchEffect(async () => {
  // guard condition
  if (!prefix.value) {
    return;
  }

  const result = await $fetch<UrlAndTitle[]>(`/dev/contents/${prefix.value}`, {
    baseURL,
    headers: {
      'x-api-key': apiKey,
    },
  });
  urls.value = result;
});
</script>
