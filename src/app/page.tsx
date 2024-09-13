'use client'

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const featuresFirstRow = [
    { icon: "👍", title: "Kullanışlı & Basit", description: "Kolay kullanım ve anlaşılır arayüz." },
    { icon: "👤✅", title: "Üyelik Gerektirmez", description: "Hemen kullanmaya başlayın, kayıt gerekmez." },
    { icon: "🔒", title: "%100 Güvenli", description: "Verileriniz güvenle şifrelenir ve saklanır." },
    { icon: "🔔", title: "Bildirim Uyarıları", description: "Önemli finansal olaylar için hatırlatmalar alın." },
  ]

  const featuresSecondRow = [
    { icon: "💾", title: "Local Depolama", description: "Verileriniz sadece cihazınızda saklanır." },
    { icon: "🚫", title: "Reklam Yok", description: "Rahatsız edici reklamlar olmadan kullanın." },
    { icon: "🍪", title: "Çerez Yok", description: "Çerezler kullanılmaz, gizliliğiniz korunur." },
    { icon: "🕵️", title: "Veri Toplamaz", description: "Kişisel verileriniz toplanmaz veya paylaşlmaz." },
  ]

  // Uygulamayı Başlat Butonu için stil
  const startAppButtonStyle = `
    flex items-center justify-center 
    bg-gradient-to-r from-green-600 to-green-400 
    rounded-md shadow-md 
    transition duration-300 ease-in-out transform 
    hover:scale-105 hover:from-green-500 hover:to-green-300 
    text-sm sm:text-base  // Mobilde daha küçük yazı
    whitespace-nowrap  // Metnin satır atlamasını engeller
    p-3 sm:p-2  // Mobilde daha fazla padding
    h-14 sm:h-auto  // Mobilde sabit yükseklik, masaüstünde otomatik
  `;

  const startAppIconStyle = `
    bg-green-700 rounded-full p-1 sm:p-2 mr-1 sm:mr-2
    animate-pulse-horizontal
  `;

  const startAppSvgStyle = `
    w-3 h-3 sm:w-4 sm:h-4 text-green-100
  `;

  // Bağış Yap Butonu için stil
  const donateButtonStyle = `
    flex items-center justify-center 
    bg-gradient-to-r from-blue-600 to-blue-900 
    rounded-md p-2 shadow-md 
    transition duration-300 ease-in-out transform 
    hover:scale-105 hover:from-blue-500 hover:to-blue-800 
    text-xs sm:text-sm  // Mobilde daha küçük yazı
  `;

  const donateIconStyle = `
    bg-navy-700 rounded-full p-2 mr-3
  `;

  const donateSvgStyle = `
    w-4 h-4 text-purple-100
  `;

  // Sayfanın en üstüne (import ifadelerinin altına) şu stil tanımını ekleyin:
  <style jsx global>{`
    @keyframes pulseHorizontal {
      0%, 100% {
        transform: translateX(0);
      }
      50% {
        transform: translateX(4px);
      }
    }
    .animate-pulse-horizontal {
      animation: pulseHorizontal 1.5s ease-in-out infinite;
    }
  `}</style>

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Menü */}
      <nav className="bg-black bg-opacity-50 backdrop-blur-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Logo ve Uygulama Adı */}
            <div className="flex-shrink-0 flex items-center">
              <Image src="/logo.webp" alt="Logo" width={32} height={32} className="block h-8 w-auto" />
              <span className="text-white font-bold text-xl ml-2">BütçemApp</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Ana Sayfa</Link>
                <Link href="/ozellikler" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Özellikler</Link>
                <Link href="/sss" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">SSS</Link>
                <Link href="/iletisim" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">İletişim</Link>
              </div>
            </div>

            {/* Uygulamayı Başlat Butonu - Sadece desktop'ta göster */}
            <div className="hidden sm:block">
              <Link href="/add-transaction" className={startAppButtonStyle}>
                <div className={startAppIconStyle}>
                  <svg className={startAppSvgStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-medium text-white">Uygulamayı Başlat</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
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

        {/* Mobile menu, show/hide based on menu state */}
        {isMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Ana Sayfa</Link>
              <Link href="/ozellikler" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Özellikler</Link>
              <Link href="/sss" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">SSS</Link>
              <Link href="/iletisim" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">İletişim</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-24 pt-20">
        <div className="max-w-4xl w-full space-y-8 sm:space-y-12">
          {/* Uygulama Tanıtım Kartı */}
          <div className="rounded-lg shadow-2xl p-6 sm:p-10 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="sm:w-1/3 mb-6 sm:mb-0">
                <Image src="/logo.webp" alt="Bütçem Logo" width={300} height={300} className="mx-auto" />
              </div>
              <div className="sm:w-2/3 sm:pl-8">
                <h1 className="font-bold mb-4">
                  <span className="block text-4xl sm:text-5xl lg:text-6xl">ButcemApp</span>
                  <span className="block text-lg sm:text-xl mt-2 font-normal text-gray-300">
                    Gelir & giderlerinizi güvenle takip edin!
                  </span>
                </h1>
                <p className="text-sm sm:text-base mb-6 text-gray-400">
                🍪 Reklam, çerez, üyelik derdi olmadan tüm gelir & gider verilerinizi kendi cihazınızda 🔒 güvenle yönetmenin keyfini yaşayın! ✅ Üstelik bir kere satın alıp, {' '}
                  <span className="inline-block border border-gray-400 px-1 font-bold">
                    ömür boyu
                  </span>
                  {' '}kullanabilirsiniz!
                </p>
                <div className="flex flex-col items-center justify-center sm:justify-start space-y-4">
                  {/* Mobil görünümde yan yana, masaüstünde de yan yana */}
                  <div className="flex flex-row w-full space-x-4">
                    {/* Geliştirici Widget'ı */}
                    <div className="flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 bg-opacity-50 rounded-md p-2 shadow-sm transition duration-300 ease-in-out transform hover:scale-105 flex-1">
                      <div className="flex items-center justify-center">
                        <div className="bg-gray-800 rounded-full p-2 mr-3">
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-gray-500">Geliştirici:</span>
                          <span className="text-xs font-medium text-gray-400">@netpixdev</span>
                        </div>
                      </div>
                    </div>

                    {/* Bağış Yap Butonu */}
                    <a href="#" className={`${donateButtonStyle} flex-1`}>
                      <div className={donateIconStyle}>
                        <svg className={donateSvgStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-white">Bağış Yap</span>
                    </a>
                  </div>
                  
                  {/* Uygulamayı Başlat Butonu - Sadece mobil cihazlarda göster */}
                  <div className="sm:hidden w-full">
                    <Link href="/add-transaction" className={`${startAppButtonStyle} w-full`}>
                      <div className={startAppIconStyle}>
                        <svg className={startAppSvgStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="font-medium text-white">Uygulamayı Başlat</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Uygulama Özellikleri */}
          <div className="w-full mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">Özellikler</h2>
            <div className="space-y-4 max-w-sm mx-auto sm:max-w-none">
              {/* İlk satır - sağdan sola kayan */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-black via-black/80 to-transparent z-10 backdrop-blur-sm"></div>
                <div className="absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-black via-black/80 to-transparent z-10 backdrop-blur-sm"></div>
                <div className="flex space-x-4 py-4 animate-scroll-left">
                  {[...featuresFirstRow, ...featuresFirstRow].map((feature, index) => (
                    <div key={index} className="flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64">
                      <div className="bg-black rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center text-center h-full border border-gray-800 transition-transform duration-300 transform hover:scale-105 shadow-md">
                        <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{feature.icon}</span>
                        <h3 className="text-xs sm:text-sm font-medium mb-1">{feature.title}</h3>
                        <p className="text-xs text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* İkinci satır - soldan sağa kayan */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-black via-black/80 to-transparent z-10 backdrop-blur-sm"></div>
                <div className="absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-black via-black/80 to-transparent z-10 backdrop-blur-sm"></div>
                <div className="flex space-x-4 py-4 animate-scroll-right">
                  {[...featuresSecondRow, ...featuresSecondRow].map((feature, index) => (
                    <div key={index} className="flex-shrink-0 w-48 h-48 sm:w-64 sm:h-64">
                      <div className="bg-black rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center text-center h-full border border-gray-800 transition-transform duration-300 transform hover:scale-105 shadow-md">
                        <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{feature.icon}</span>
                        <h3 className="text-xs sm:text-sm font-medium mb-1">{feature.title}</h3>
                        <p className="text-xs text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  )
}