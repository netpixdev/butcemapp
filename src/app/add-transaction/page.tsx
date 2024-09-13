'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [transactionType, setTransactionType] = useState<TransactionType>('income')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [frequency, setFrequency] = useState<Frequency>('once')
  const [currency, setCurrency] = useState<Currency>('TRY')
  const [date, setDate] = useState('')
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions')
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: transactionType,
      amount: parseFloat(amount),
      description,
      frequency,
      currency,
      date
    }
    const updatedTransactions = [...transactions, newTransaction]
    setTransactions(updatedTransactions)
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions))
    
    // Form alanlarını temizle
    setAmount('')
    setDescription('')
    setFrequency('once')
    setDate('')

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
    <div className="min-h-screen bg-black text-white pb-16"> {/* pb-16 ekledik */}
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
                <Link href="/add-transaction" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Gelir/Gider Ekle</Link>
                {/* Diğer menü öğeleri */}
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
              <Link href="/add-transaction" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Gelir/Gider Ekle</Link>
              {/* Diğer mobil menü öğeleri */}
            </div>
          </div>
        )}
      </nav>

      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-24 pt-20">
        <div className="max-w-md w-full space-y-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Gelir/Gider Ekle</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setTransactionType('income')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
                  transactionType === 'income' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Gelir
              </button>
              <button
                type="button"
                onClick={() => setTransactionType('expense')}
                className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
                  transactionType === 'expense' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Gider
              </button>
            </div>
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-300 mb-1">
                Para Birimi
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="TRY">Türk Lirası (TRY)</option>
                <option value="USD">Amerikan Doları (USD)</option>
              </select>
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
                Miktar
              </label>
              <CurrencyInput
                value={amount}
                onChange={setAmount}
                currency={currency}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Açıklama
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-300 mb-1">
                Sıklık
              </label>
              <select
                id="frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as Frequency)}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="once">Tek Seferlik</option>
                <option value="weekly">Haftalık</option>
                <option value="monthly">Aylık</option>
                <option value="yearly">Yıllık</option>
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                Tarih
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Kaydet
            </button>
          </form>
        </div>
      </main>

      {/* Toast container'ı ekleyin */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  currency: Currency;
}

function CurrencyInput({ value, onChange, currency }: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/[^0-9.,]/g, '');
    
    if (currency === 'TRY') {
      // TRY için virgül kullan, en fazla 2 ondalık basamak
      inputValue = inputValue.replace(',', '.');
      const parts = inputValue.split('.');
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
        inputValue = parts.join('.');
      }
    } else if (currency === 'USD') {
      // USD için nokta kullan, en fazla 2 ondalık basamak
      const parts = inputValue.split('.');
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
        inputValue = parts.join('.');
      }
    }

    onChange(inputValue);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8"
        placeholder={currency === 'TRY' ? '0,00' : '0.00'}
      />
      <span className="absolute left-3 top-2 text-gray-400">
        {currency === 'TRY' ? '₺' : '$'}
      </span>
    </div>
  );
}