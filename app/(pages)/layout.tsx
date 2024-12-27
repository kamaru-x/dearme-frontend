'use client'

import React from 'react'
import Header from '@/app/components/Header'

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen mb-10">
      <Header />
      {children}
    </div>
  )
}
