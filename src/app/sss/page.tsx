import Link from 'next/link'
import Image from 'next/image'

export default function SSS() {
  const faqs = [
    {
      question: "ButcemApp nedir?",
      answer: "ButcemApp, gelir ve giderlerinizi güvenle takip etmenizi sağlayan bir finansal yönetim uygulamasıdır."
    },
    {
      question: "Verilerim güvende mi?",
      answer: "Evet, tüm verileriniz sadece kendi cihazınızda saklanır ve şifrelenir. Hiçbir veri sunucularımızda tutulmaz."
    },
    {
      question: "Uygulama ücretli mi?",
      answer: "ButcemApp, bir kere satın alındıktan sonra ömür boyu kullanılabilen bir uygulamadır. Ek ücret veya abonelik gerektirmez."
    },
    {
      question: "İnternet bağlantısı gerekli mi?",
      answer: "Hayır, ButcemApp çevrimdışı olarak da çalışır. İnternet bağlantısı sadece uygulama güncellemeleri için gerekebilir."
    },
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
                  <Link href="/ozellikler" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Özellikler</Link>
                  <Link href="/sss" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">SSS</Link>
                  <Link href="/iletisim" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">İletişim</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-24 pt-20">
        <h1 className="text-4xl font-bold mb-8">Sıkça Sorulan Sorular</h1>
        <div className="w-full max-w-3xl">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
              <p className="text-gray-400">{faq.answer}</p>
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