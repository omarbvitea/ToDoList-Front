export const getApi = () => {
  const config = useRuntimeConfig()
  return config.public.API_DEV
}
