import { $fetch } from 'ofetch'

export function allowSelfSignedHttpsInDev() {
  if (process.dev) {
    // For local dev against https://localhost:* with a self-signed certificate.
    // This is server-side only.
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }
}

export async function fetchUpstream<T>(url: string) {
  allowSelfSignedHttpsInDev()
  return await $fetch<T>(url, {
    retry: 0
  })
}
