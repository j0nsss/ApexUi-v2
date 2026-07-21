'use client'

import { Github } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useAuthStore } from '@/store/authStore'
import { useAuth } from '@/hooks/useAuth'

export function AuthModal() {
  const { authModalOpen, closeAuthModal } = useAuthStore()
  const { signInWithGitHub, signInWithGoogle } = useAuth()

  return (
    <Dialog.Root open={authModalOpen} onOpenChange={(open) => !open && closeAuthModal()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-fade-in" />
        <Dialog.Content className="glass-surface fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-[380px] -translate-x-1/2 -translate-y-1/2 p-6 outline-none data-[state=open]:animate-scale-in">
          <div className="text-center">
            <Dialog.Title className="text-h2 text-text-primary">
              Sign In
            </Dialog.Title>
            <Dialog.Description className="mt-1 text-small text-text-muted">
              Sign in to like, bookmark, and submit components.
            </Dialog.Description>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={signInWithGitHub}
              className="flex w-full items-center justify-center gap-2.5 rounded-md border border-border-default bg-bg-surface px-4 py-2.5 text-label font-medium text-text-primary transition-colors hover:bg-bg-elevated"
            >
              <Github className="h-4 w-4" />
              Continue with GitHub
            </button>

            <button
              type="button"
              onClick={signInWithGoogle}
              className="flex w-full items-center justify-center gap-2.5 rounded-md border border-border-default bg-bg-surface px-4 py-2.5 text-label font-medium text-text-primary transition-colors hover:bg-bg-elevated"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-text-disabled">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
