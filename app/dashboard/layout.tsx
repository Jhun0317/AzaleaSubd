"use client"

import React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <div className="max-w-full p-4 sm:p-6">
        {children}
      </div>
    </div>
  )
}
