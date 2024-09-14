'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RadioGroup } from '@headlessui/react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'

type TransactionType = 'income' | 'expense'
type Frequency = 'once' | 'weekly' | 'monthly' | 'yearly'
type Currency = 'TRY' | 'USD'

interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description: string
  frequency: Frequency
  currency: Currency
  date: string
}

export default function AddTransaction() {
  // Bugünün tarihini YYYY-MM-DD formatında al
  const today = new Date().toISOString().split('T')[0];

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [transactionType, setTransactionType] = useState<TransactionType>('income')
  const [amount, setAmount] = useState<string>('')
  const [description, setDescription] = useState('')
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>('once')
  const [currency, setCurrency] = useState<Currency>('TRY')
  const [date, setDate] = useState(today)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions')
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting with frequency:', selectedFrequency) // Debugging için
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: transactionType,
      amount: parseFloat(amount),
      description,
      frequency: selectedFrequency,
      currency,
      date
    }
    
    console.log('Saving transaction:', newTransaction) // Debugging için

    const updatedTransactions = [...transactions, newTransaction]
    setTransactions(updatedTransactions)
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions))
    
    // Form alanlarını temizle
    setAmount('')
    setDescription('')
    setSelectedFrequency('once') // Eğer formu sıfırlamak istiyorsanız
    setDate(today)

    // Bildirim göster
    toast.success(`${transactionType === 'income' ? 'Gelir' : 'Gider'} başarıyla eklendi!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      {/* Menü */}
      <nav className="bg-black bg-opacity-50 backdrop-blur-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            {/* Logo ve Uygulama Adı */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image src="/logo.webp" alt="Logo" width={32} height={32} className="mr-2" />
                <span className="text-white font-bold text-lg">BütçemApp</span>
              </Link>
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

            {/* Mobile menu button */}
            <div className="flex sm:hidden">
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

      {/* Ana içerik */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6 sm:mb-8">Yeni İşlem</h2>
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 bg-gray-900 shadow-2xl rounded-3xl p-6 sm:p-8">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setTransactionType('income')}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-colors duration-200 flex items-center justify-center ${
                  transactionType === 'income' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Gelir
              </button>
              <button
                type="button"
                onClick={() => setTransactionType('expense')}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-colors duration-200 flex items-center justify-center ${
                  transactionType === 'expense' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <MinusIcon className="h-5 w-5 mr-2" />
                Gider
              </button>
            </div>
            
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full pl-4 pr-20 py-3 bg-gray-800 border-0 rounded-lg text-2xl font-bold text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="h-full py-0 pl-2 pr-7 border-0 bg-gray-700 text-gray-400 sm:text-sm rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TRY">₺</option>
                  <option value="USD">$</option>
                </select>
              </div>
            </div>
            
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-3 px-4 bg-gray-800 border-0 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 font-medium"
              placeholder="Açıklama"
              required
            />
            
            <div className="w-full relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full py-3 px-4 bg-gray-800 border-0 rounded-lg text-white focus:ring-2 focus:ring-blue-500 appearance-none text-center"
                required
              />
            </div>
            
            <RadioGroup value={selectedFrequency} onChange={setSelectedFrequency}>
              <RadioGroup.Label className="text-sm font-medium text-gray-400 mb-2 block">Sıklık Türü</RadioGroup.Label>
              <div className="bg-gray-800 rounded-lg p-3 grid grid-cols-2 gap-3">
                {['once', 'weekly', 'monthly', 'yearly'].map((freq) => (
                  <RadioGroup.Option
                    key={freq}
                    value={freq}
                    className={({ active, checked }) =>
                      `${active ? 'ring-2 ring-blue-500' : ''}
                      ${checked ? 'bg-blue-600 text-white' : 'bg-gray-700'}
                        relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex items-center justify-center h-16 focus:outline-none`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? 'text-white' : 'text-gray-300'
                              }`}
                            >
                              {freq === 'once' ? 'Tek Seferlik' :
                               freq === 'weekly' ? 'Haftalık' :
                               freq === 'monthly' ? 'Aylık' : 'Yıllık'}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <div className="flex-shrink-0 text-white">
                            <CheckIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                İşlemi Kaydet
              </button>
            </div>
          </form>
        </div>
      </main>

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  )
}

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {}

function CheckIcon(props: CheckIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}