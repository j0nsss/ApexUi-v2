import Link from 'next/link'
import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-base text-text-muted">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-small">
          &copy; {new Date().getFullYear()} ApexUI. Open-source under MIT.
        </p>

        <div className="flex items-center gap-6">
          <Link href="/about" className="text-small transition-colors hover:text-text-secondary">
            About
          </Link>
          <Link href="/submit" className="text-small transition-colors hover:text-text-secondary">
            Submit
          </Link>
          <Link href="/docs/api" className="text-small transition-colors hover:text-text-secondary">
            API
          </Link>
          <a
            href="https://github.com/j0nsss/ApexUi-v2"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text-secondary"
            aria-label="GitHub repository"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
