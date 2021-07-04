export default function ({ $config, $axios }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        'x-api-key': $config.apiKey,
      },
    },
  });
  inject('api', api);
}
