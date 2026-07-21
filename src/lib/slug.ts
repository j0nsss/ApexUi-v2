import slugifyLib from 'slugify'

export function generateSlug(name: string): string {
  return slugifyLib(name, { lower: true, strict: true })
}
