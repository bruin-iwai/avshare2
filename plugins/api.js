export default function api({ $config, $axios }, inject) {
  const inst = $axios.create({
    headers: {
      common: {
        'x-api-key': $config.apiKey,
      },
    },
  });
  inject('api', inst);
}
