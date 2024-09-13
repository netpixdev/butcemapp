'use client'

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import Link from 'next/link'

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

// EditForm bileşenini buraya taşıdık
function EditForm({ transaction, onSave, onCancel }: { 
  transaction: Transaction, 
  onSave: (t: Transaction) => void, 
  onCancel: () => void 
}) {
  const [editedTransaction, setEditedTransaction] = useState(transaction)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditedTransaction(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedTransaction)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="number"
        name="amount"
        value={editedTransaction.amount}
        onChange={handleChange}
        className="w-full bg-gray-700 p-2 rounded"
      />
      <input
        type="text"
        name="description"
        value={editedTransaction.description}
        onChange={handleChange}
        className="w-full bg-gray-700 p-2 rounded"
      />
      <select
        name="frequency"
        value={editedTransaction.frequency}
        onChange={handleChange}
        className="w-full bg-gray-700 p-2 rounded"
      >
        <option value="once">Tek Seferlik</option>
        <option value="weekly">Haftalık</option>
        <option value="monthly">Aylık</option>
        <option value="yearly">Yıllık</option>
      </select>
      <input
        type="date"
        name="date"
        value={editedTransaction.date}
        onChange={handleChange}
        className="w-full bg-gray-700 p-2 rounded"
      />
      <div>
        <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded mr-2">Kaydet</button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-2 py-1 rounded">İptal</button>
      </div>
    </form>
  )
}

export default function Status() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('TRY')

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions')
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    }
  }, [])

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
  }

  const handleDelete = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id)
    setTransactions(updatedTransactions)
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions))
    toast.success('İşlem başarıyla silindi!')
  }

  const handleSave = (updatedTransaction: Transaction) => {
    const updatedTransactions = transactions.map(t => 
      t.id === updatedTransaction.id ? updatedTransaction : t
    )
    setTransactions(updatedTransactions)
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions))
    setEditingTransaction(null)
    toast.success('İşlem başarıyla güncellendi!')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const formatFrequency = (frequency: Frequency) => {
    const frequencyMap: { [key in Frequency]: string } = {
      once: 'Tek Seferlik',
      weekly: 'Haftalık',
      monthly: 'Aylık',
      yearly: 'Yıllık'
    }
    return frequencyMap[frequency]
  }

  const formatCurrency = (amount: number, currency: Currency): string => {
    return amount.toLocaleString(currency === 'TRY' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  const calculateTotal = (transactions: Transaction[], type: TransactionType, currency: Currency) => {
    return transactions
      .filter(t => t.type === type && t.currency === currency)
      .reduce((total, t) => {
        let amount = t.amount
        if (t.frequency === 'weekly') amount *= 4
        if (t.frequency === 'yearly' && selectedPeriod === 'monthly') amount /= 12
        if (t.frequency === 'monthly' && selectedPeriod === 'yearly') amount *= 12
        return total + amount
      }, 0)
  }

  const totalIncome = calculateTotal(transactions, 'income', selectedCurrency)
  const totalExpense = calculateTotal(transactions, 'expense', selectedCurrency)
  const balance = totalIncome - totalExpense

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      <nav className="bg-black bg-opacity-50 backdrop-blur-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
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
            <div className="-mr-2 flex sm:hidden">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-semibold mb-6">Durum</h2>

        {/* Dönem ve para birimi seçimi */}
        <div className="mb-4 flex space-x-4">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value as 'monthly' | 'yearly')}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="monthly">Aylık</option>
            <option value="yearly">Yıllık</option>
          </select>
          <select 
            value={selectedCurrency} 
            onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="TRY">TRY</option>
            <option value="USD">USD</option>
          </select>
        </div>

        {/* Özet bilgiler */}
        <div className="bg-gray-800 p-4 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-2">{selectedPeriod === 'monthly' ? 'Aylık' : 'Yıllık'} Özet ({selectedCurrency})</h3>
          <p className="text-green-500">Toplam Gelir: {formatCurrency(totalIncome, selectedCurrency)}</p>
          <p className="text-red-500">Toplam Gider: {formatCurrency(totalExpense, selectedCurrency)}</p>
          <p className={balance >= 0 ? "text-green-500" : "text-red-500"}>
            Bakiye: {formatCurrency(balance, selectedCurrency)}
          </p>
        </div>

        {/* Gelirler */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-green-500">Gelirler ({selectedCurrency})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transactions
              .filter(t => t.type === 'income' && t.currency === selectedCurrency)
              .map(transaction => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  formatDate={formatDate}
                  formatFrequency={formatFrequency}
                  formatCurrency={formatCurrency}
                />
              ))}
          </div>
        </div>

        {/* Giderler */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-red-500">Giderler ({selectedCurrency})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transactions
              .filter(t => t.type === 'expense' && t.currency === selectedCurrency)
              .map(transaction => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  formatDate={formatDate}
                  formatFrequency={formatFrequency}
                  formatCurrency={formatCurrency}
                />
              ))}
          </div>
        </div>
      </div>

      {editingTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg">
            <EditForm
              transaction={editingTransaction}
              onSave={handleSave}
              onCancel={() => setEditingTransaction(null)}
            />
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}

interface TransactionCardProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
  formatFrequency: (frequency: Frequency) => string;
  formatCurrency: (amount: number, currency: Currency) => string;
}

function TransactionCard({ transaction, onEdit, onDelete, formatDate, formatFrequency, formatCurrency }: TransactionCardProps) {
  return (
    <div className="bg-gray-800 shadow-md rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-lg">{transaction.description}</h4>
          <p className={`text-xl font-bold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount, transaction.currency)}
          </p>
          <p className="text-sm text-gray-400">{formatFrequency(transaction.frequency)}</p>
          <p className="text-sm text-gray-400">{formatDate(transaction.date)}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => onEdit(transaction)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            Düzenle
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  )
}