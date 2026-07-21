'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const ROLE_OPTIONS = [
  'Frontend Engineer',
  'Full-Stack Developer',
  'UI Designer',
  'UX Designer',
  'Indie Hacker',
  'Student',
  'Other',
]

interface SettingsFormProps {
  initialData: {
    display_name: string
    bio: string
    website_url: string
    github_url: string
    twitter_url: string
    role_tag: string
  }
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const router = useRouter()
  const [form, setForm] = useState(initialData)
  const [saving, setSaving] = useState(false)

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setSaving(true)
      try {
        const res = await fetch('/api/users/me', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          toast.success('Profile updated!')
          router.refresh()
        } else {
          const json = await res.json()
          toast.error(json.error ?? 'Failed to save.')
        }
      } catch {
        toast.error('Network error.')
      } finally {
        setSaving(false)
      }
    },
    [form, router]
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Display Name */}
      <div>
        <label className="mb-1.5 block text-label text-text-primary" htmlFor="display_name">
          Display Name
        </label>
        <input
          id="display_name"
          type="text"
          value={form.display_name}
          onChange={(e) => update('display_name', e.target.value)}
          required
          maxLength={80}
          className="w-full rounded-md border border-border-default bg-bg-surface px-3 py-2 text-body text-text-primary outline-none transition-colors focus:border-accent-violet focus:ring-1 focus:ring-accent-violet"
        />
      </div>

      {/* Bio */}
      <div>
        <label className="mb-1.5 block text-label text-text-primary" htmlFor="bio">
          Bio
        </label>
        <textarea
          id="bio"
          value={form.bio}
          onChange={(e) => update('bio', e.target.value)}
          maxLength={300}
          rows={3}
          className="w-full rounded-md border border-border-default bg-bg-surface px-3 py-2 text-body text-text-primary outline-none transition-colors focus:border-accent-violet focus:ring-1 focus:ring-accent-violet resize-none"
        />
        <p className="mt-1 text-xs text-text-muted">{form.bio.length}/300</p>
      </div>

      {/* Role */}
      <div>
        <label className="mb-1.5 block text-label text-text-primary" htmlFor="role_tag">
          Role
        </label>
        <select
          id="role_tag"
          value={form.role_tag}
          onChange={(e) => update('role_tag', e.target.value)}
          className="w-full rounded-md border border-border-default bg-bg-surface px-3 py-2 text-body text-text-primary outline-none transition-colors focus:border-accent-violet focus:ring-1 focus:ring-accent-violet"
        >
          <option value="">Select a role</option>
          {ROLE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Social links */}
      <div>
        <label className="mb-1.5 block text-label text-text-primary" htmlFor="website_url">
          Website URL
        </label>
        <input
          id="website_url"
          type="url"
          value={form.website_url}
          onChange={(e) => update('website_url', e.target.value)}
          placeholder="https://example.com"
          className="w-full rounded-md border border-border-default bg-bg-surface px-3 py-2 text-body text-text-primary outline-none transition-colors focus:border-accent-violet focus:ring-1 focus:ring-accent-violet"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-label text-text-primary" htmlFor="github_url">
          GitHub URL
        </label>
        <input
          id="github_url"
          type="url"
          value={form.github_url}
          onChange={(e) => update('github_url', e.target.value)}
          placeholder="https://github.com/username"
          className="w-full rounded-md border border-border-default bg-bg-surface px-3 py-2 text-body text-text-primary outline-none transition-colors focus:border-accent-violet focus:ring-1 focus:ring-accent-violet"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-label text-text-primary" htmlFor="twitter_url">
          Twitter / X URL
        </label>
        <input
          id="twitter_url"
          type="url"
          value={form.twitter_url}
          onChange={(e) => update('twitter_url', e.target.value)}
          placeholder="https://x.com/username"
          className="w-full rounded-md border border-border-default bg-bg-surface px-3 py-2 text-body text-text-primary outline-none transition-colors focus:border-accent-violet focus:ring-1 focus:ring-accent-violet"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="self-start rounded-md bg-accent-violet px-6 py-2 text-label font-semibold text-white transition-colors hover:bg-accent-violet-hover disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
