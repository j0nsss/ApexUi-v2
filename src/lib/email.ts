const RESEND_API_KEY = process.env.RESEND_API_KEY ?? ''
const FROM_ADDRESS = process.env.EMAIL_FROM ?? 'noreply@apexui.dev'

type EmailResult = { success: boolean; error?: string }

async function sendEmail(to: string, subject: string, html: string): Promise<EmailResult> {
  if (!RESEND_API_KEY) {
    console.warn('[email] RESEND_API_KEY not set — skipping send')
    return { success: false, error: 'Resend not configured' }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM_ADDRESS, to, subject, html }),
    })

    if (!res.ok) {
      const err = await res.text()
      return { success: false, error: err }
    }

    return { success: true }
  } catch (err) {
    return { success: false, error: String(err) }
  }
}

export async function sendSubmissionConfirmation(to: string, componentName: string) {
  return sendEmail(
    to,
    `Your "${componentName}" has been submitted for review`,
    `<p>Thank you for submitting <strong>${componentName}</strong>!</p>
<p>Our team will review it shortly. You'll receive a notification once it's approved.</p>`,
  )
}

export async function sendApprovalNotification(to: string, componentName: string, slug: string) {
  return sendEmail(
    to,
    `Your "${componentName}" has been approved!`,
    `<p>Great news — <strong>${componentName}</strong> is now live on ApexUI!</p>
<p>View it here: <a href="https://apexui.dev/components/${slug}">https://apexui.dev/components/${slug}</a></p>`,
  )
}

export async function sendRejectionNotification(to: string, componentName: string, reason?: string) {
  return sendEmail(
    to,
    `Your "${componentName}" submission update`,
    `<p>Thank you for submitting <strong>${componentName}</strong>.</p>
${reason ? `<p>Feedback: ${reason}</p>` : ''}
<p>Please make the necessary changes and resubmit.</p>`,
  )
}
