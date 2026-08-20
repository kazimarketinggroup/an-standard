import { redirect } from 'next/navigation'

/** Global settings is a singleton; keep the friendlier URL working. */
export default function GlobalSettingsPage() {
  redirect('/admin/singleton/global_settings')
}
