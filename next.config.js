/** @type {import('next').NextConfig} */

// Admin uploads are served from Supabase Storage, so next/image has to be told
// that host is allowed. Derived from the project URL to avoid a second env var.
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: supabaseHost
      ? [
          {
            protocol: 'https',
            hostname: supabaseHost,
            pathname: '/storage/v1/object/public/**',
          },
        ]
      : [],
  },
}

module.exports = nextConfig
