'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Ozellikler() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const features = [
    { icon: "👍", title: "Kullanışlı & Basit", description: "Kolay kullanım" },
    { icon: "👤✅", title: "Üyelik Gerektirmez", description: "Hemen kullanın" },
    { icon: "🔒", title: "%100 Güvenli", description: "Şifreli veriler" },
    { icon: "🔔", title: "Bildirimler", description: "Önemli hatırlatmalar" },
    { icon: "💾", title: "Local Depolama", description: "Cihazınızda saklı" },
    { icon: "🚫", title: "Reklam Yok", description: "Rahatsız etmez" },
    { icon: "🍪", title: "Çerez Yok", description: "Gizlilik korunur" },
    { icon: "🕵️", title: "Veri Toplamaz", description: "Bilgiler güvende" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-black bg-opacity-50 backdrop-blur-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Image src="/logo.webp" alt="ButcemApp Logo" width={28} height={28} className="mr-2" />
                <Link href="/" className="text-white font-bold text-lg">ButcemApp</Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link href="/" className="text-gray-100 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Ana Sayfa</Link>
                  <Link href="/ozellikler" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Özellikler</Link>
                  <Link href="/sss" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">SSS</Link>
                  <Link href="/iletisim" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">İletişim</Link>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Ana Sayfa</Link>
              <Link href="/ozellikler" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Özellikler</Link>
              <Link href="/sss" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">SSS</Link>
              <Link href="/iletisim" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">İletişim</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex flex-col items-center justify-center min-h-screen px-2 py-16 sm:px-4 lg:px-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Özellikler</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl w-full">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-2 flex flex-col items-center text-center">
              <span className="text-2xl mb-1">{feature.icon}</span>
              <h2 className="text-sm font-semibold mb-1">{feature.title}</h2>
              <p className="text-xs text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}