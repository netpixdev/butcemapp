'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Iletisim() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const developerInfo = {
    name: "Ahmet Yılmaz",
    role: "Full Stack Geliştirici",
    avatar: "/developer-avatar.jpg",
    github: "https://github.com/netpixdev",
    discord: "netpixdev#1234",
    website: "https://www.netpixdev.com",
    email: "ahmet@example.com"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-black bg-opacity-50 backdrop-blur-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Image src="/logo.webp" alt="ButcemApp Logo" width={32} height={32} className="mr-2" />
                <Link href="/" className="text-white font-bold text-xl">ButcemApp</Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Ana Sayfa</Link>
                  <Link href="/ozellikler" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Özellikler</Link>
                  <Link href="/sss" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">SSS</Link>
                  <Link href="/iletisim" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">İletişim</Link>
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
              <Link href="/ozellikler" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Özellikler</Link>
              <Link href="/sss" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">SSS</Link>
              <Link href="/iletisim" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">İletişim</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-24 pt-20">
        <h1 className="text-4xl font-bold mb-8">İletişim</h1>
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Geliştirici Bilgileri</h2>
            <p>Ad: {developerInfo.name}</p>
            <p>E-posta: {developerInfo.email}</p>
            <p>GitHub: <a href={developerInfo.github} className="text-blue-400 hover:underline">{developerInfo.github}</a></p>
            <p>Discord: {developerInfo.discord}</p>
            <p>Website: <a href={developerInfo.website} className="text-blue-400 hover:underline">{developerInfo.website}</a></p>
          </div>
        </div>
      </main>
    </div>
  )
}