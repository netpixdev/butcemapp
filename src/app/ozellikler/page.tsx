import Image from 'next/image'
import Link from 'next/link'

export default function Ozellikler() {
  const features = [
    { icon: "👍", title: "Kullanışlı & Basit", description: "Kolay kullanım ve anlaşılır arayüz." },
    { icon: "👤✅", title: "Üyelik Gerektirmez", description: "Hemen kullanmaya başlayın, kayıt gerekmez." },
    { icon: "🔒", title: "%100 Güvenli", description: "Verileriniz güvenle şifrelenir ve saklanır." },
    { icon: "🔔", title: "Bildirim Uyarıları", description: "Önemli finansal olaylar için hatırlatmalar alın." },
    { icon: "💾", title: "Local Depolama", description: "Verileriniz sadece cihazınızda saklanır." },
    { icon: "🚫", title: "Reklam Yok", description: "Rahatsız edici reklamlar olmadan kullanın." },
    { icon: "🍪", title: "Çerez Yok", description: "Çerezler kullanılmaz, gizliliğiniz korunur." },
    { icon: "🕵️", title: "Veri Toplamaz", description: "Kişisel verileriniz toplanmaz veya paylaşlmaz." },
  ]

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
                  <Link href="/ozellikler" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Özellikler</Link>
                  <Link href="/sss" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">SSS</Link>
                  <Link href="/iletisim" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">İletişim</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-24 pt-20">
        <h1 className="text-4xl font-bold mb-8">Özellikler</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
              <span className="text-4xl mb-4">{feature.icon}</span>
              <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        <Link href="/" className="mt-12 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ana Sayfaya Dön
        </Link>
      </main>
    </div>
  )
}