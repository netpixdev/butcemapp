'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Iletisim() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada form gönderme işlemini gerçekleştirebilirsiniz
    console.log('Form gönderildi:', { name, email, message })
    // Form gönderildikten sonra alanları temizleyelim
    setName('')
    setEmail('')
    setMessage('')
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
          </div>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-24 pt-20">
        <h1 className="text-4xl font-bold mb-8">İletişim</h1>
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Geliştirici Bilgileri</h2>
            <p>Ad: Ahmet Yılmaz</p>
            <p>E-posta: ahmet@example.com</p>
            <p>GitHub: @netpixdev</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Adınız</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">E-posta Adresiniz</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">Mesajınız</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded"
                rows={5}
                required
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Gönder
            </button>
          </form>
        </div>
        <Link href="/" className="mt-12 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ana Sayfaya Dön
        </Link>
      </main>
    </div>
  )
}