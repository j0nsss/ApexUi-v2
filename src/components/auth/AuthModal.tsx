'use client'

import { Github } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useAuthStore } from '@/store/authStore'
import { useAuth } from '@/hooks/useAuth'

export function AuthModal() {
  const { authModalOpen, closeAuthModal } = useAuthStore()
  const { signInWithGitHub } = useAuth()

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
          </div>

          <p className="mt-4 text-center text-xs text-text-disabled">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
