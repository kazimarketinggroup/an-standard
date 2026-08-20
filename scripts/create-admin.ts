/**
 * Creates the single admin user.
 *
 *   npm run create-admin -- admin@example.com 'a-strong-password'
 *
 * There is deliberately no sign-up page: this script (or the Supabase
 * dashboard) is the only way an admin account comes into existence. The user is
 * created pre-confirmed so there is no verification email to chase.
 */

import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const [email, password] = process.argv.slice(2)

if (!email || !password) {
  console.error("Usage: npm run create-admin -- admin@example.com 'a-strong-password'")
  process.exit(1)
}

if (password.length < 8) {
  console.error('Password must be at least 8 characters.')
  process.exit(1)
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

async function main() {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) {
    // Re-running with an existing address is a normal way to reset the
    // password, so handle it rather than failing.
    if (error.message.toLowerCase().includes('already been registered')) {
      const { data: list } = await supabase.auth.admin.listUsers()
      const existing = list?.users.find((u) => u.email === email)

      if (existing) {
        const { error: updateError } = await supabase.auth.admin.updateUserById(existing.id, {
          password,
        })
        if (updateError) {
          console.error(`Could not update password: ${updateError.message}`)
          process.exit(1)
        }
        console.log(`\nPassword updated for ${email}\nSign in at /admin/login\n`)
        return
      }
    }

    console.error(`Could not create user: ${error.message}`)
    process.exit(1)
  }

  console.log(`\nAdmin created: ${data.user?.email}\nSign in at /admin/login\n`)
}

main().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
