import React from 'react'
import Header from './Header'
import LeftRail from './LeftRail'
import BottomNav from './BottomNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 lg:grid lg:grid-cols-[240px_1fr_320px] gap-6">
        <aside className="hidden lg:block">
          <LeftRail />
        </aside>

        <main className="min-h-[70vh]">
          {children}
        </main>

        <aside className="hidden lg:block">
          <div className="sticky top-6 bg-transparent">{/* Right rail placeholder */}
            <div className="bg-white rounded p-4 shadow-sm">Suggestions / trending</div>
          </div>
        </aside>
      </div>

      <BottomNav />
    </>
  )
}
