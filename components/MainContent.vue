<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline"> My favorite videos </v-card-title>
        <v-card-text>
          <v-list>
            <v-subheader>
              <v-select
                v-model="vmPrefix"
                :items="possiblePrefixes"
                label="prefix"
                outlined
                dense
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

<script setup lang="ts">
interface UrlAndTitle {
  url: string;
  title: string;
}

interface UrlAndTitleMap {
  [key: string]: UrlAndTitle[];
}

// states
const possiblePrefixes = ref(['', 'my-favorites', 'old-programs']);
const prefix = ref('');
const urlAndTitleMap = ref<UrlAndTitleMap>({});

// getters
const urls = computed<UrlAndTitle[]>(() => urlAndTitleMap.value[prefix.value]);
const vmPrefix = computed<string>({
  get() {
    return prefix.value;
  },
  set(newValue) {
    if (newValue === prefix.value) {
      return;
    }
    prefix.value = newValue;

    if (newValue !== '') {
      changePrefix(newValue);
    }
  },
});

// actions
const changePrefix = async (newPrefix: string): Promise<void> => {
  const config = useRuntimeConfig();
  const { baseURL, apiKey } = config.public;
  const result = await $fetch<UrlAndTitle[]>(`/dev/contents/${newPrefix}`, {
    baseURL,
    headers: {
      'x-api-key': apiKey,
    },
  });

  prefix.value = newPrefix;
  urlAndTitleMap.value[newPrefix] = result;
};
</script>
