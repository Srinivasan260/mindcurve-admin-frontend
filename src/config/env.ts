export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  apiPrefix: import.meta.env.VITE_API_PREFIX,
  appName: import.meta.env.VITE_APP_NAME,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
