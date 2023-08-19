<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card title="My favorite videos">
        <template #text>
          <v-select v-model="vmPrefix" :items="possiblePrefixes" label="prefix" outlined dense />
          <v-list :items="urls" item-title="title" item-value="url">
            <template #item="{ props }">
              <a :href="props.value" target="_blank">{{ props.title }}</a>
            </template>
          </v-list>
        </template>
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
