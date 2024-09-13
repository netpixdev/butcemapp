'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SSS() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const faqItems = [
    { question: "ButcemApp nedir?", answer: "ButcemApp, kişisel bütçe yönetimi için tasarlanmış basit ve kullanışlı bir mobil uygulamadır." },
    { question: "Uygulamayı nasıl kullanabilirim?", answer: "Uygulamayı App Store veya Google Play'den indirip hemen kullanmaya başlayabilirsiniz. Üyelik gerekmez." },
    { question: "Verilerim güvende mi?", answer: "Evet, tüm verileriniz sadece cihazınızda saklanır ve şifrelenir. Hiçbir veri sunucularımıza gönderilmez." },
    { question: "Uygulama ücretli mi?", answer: "ButcemApp tamamen ücretsizdir ve hiçbir gizli ücret içermez." },
    { question: "İnternet bağlantısı gerekli mi?", answer: "Hayır, ButcemApp çevrimdışı çalışır. İnternet bağlantısı gerekmez." },
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
                  <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Ana Sayfa</Link>
                  <Link href="/ozellikler" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Özellikler</Link>
                  <Link href="/sss" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">SSS</Link>
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
              <Link href="/ozellikler" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Özellikler</Link>
              <Link href="/sss" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">SSS</Link>
              <Link href="/iletisim" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">İletişim</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Sıkça Sorulan Sorular</h1>
        <div className="w-full max-w-3xl space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">{item.question}</h2>
              <p className="text-gray-300">{item.answer}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}