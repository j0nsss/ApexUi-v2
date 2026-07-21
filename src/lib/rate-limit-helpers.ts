import { NextRequest, NextResponse } from 'next/server'
import { submissionRateLimit, searchRateLimit, engagementRateLimit } from './rate-limit'

function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-real-ip')
    ?? '127.0.0.1'
}

export async function checkSubmissionRateLimit(request: NextRequest): Promise<NextResponse | null> {
  const ip = getClientIp(request)
  const result = await submissionRateLimit.limit(ip)
  if (!result.success) {
    return NextResponse.json(
      { data: null, error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(result.reset) } },
    )
  }
  return null
}

export async function checkSearchRateLimit(request: NextRequest): Promise<NextResponse | null> {
  const ip = getClientIp(request)
  const result = await searchRateLimit.limit(ip)
  if (!result.success) {
    return NextResponse.json(
      { data: null, error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(result.reset) } },
    )
  }
  return null
}

export async function checkEngagementRateLimit(request: NextRequest): Promise<NextResponse | null> {
  const ip = getClientIp(request)
  const result = await engagementRateLimit.limit(ip)
  if (!result.success) {
    return NextResponse.json(
      { data: null, error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(result.reset) } },
    )
  }
  return null
}
