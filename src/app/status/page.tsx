'use client'

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import Link from 'next/link'
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'

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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

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

  const handleDeleteAllData = () => {
    setShowDeleteConfirmation(true)
  }

  const confirmDelete = () => {
    localStorage.removeItem('transactions')
    setTransactions([])
    setShowDeleteConfirmation(false)
    toast.success('Tüm veriler başarıyla silindi!')
  }

  const cancelDelete = () => {
    setShowDeleteConfirmation(false)
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <nav className="bg-black fixed w-full z-10 border-b border-gray-800">
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

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-400 mb-8">Finansal Durum</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <SummaryCard title="Toplam Gelir" amount={totalIncome} currency={selectedCurrency} type="income" formatCurrency={formatCurrency} />
            <SummaryCard title="Toplam Gider" amount={totalExpense} currency={selectedCurrency} type="expense" formatCurrency={formatCurrency} />
            <SummaryCard title="Bakiye" amount={balance} currency={selectedCurrency} type="balance" formatCurrency={formatCurrency} />
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value as 'monthly' | 'yearly')}
                className="bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="monthly">Aylık</option>
                <option value="yearly">Yıllık</option>
              </select>
              <select 
                value={selectedCurrency} 
                onChange={(e) => setSelectedCurrency(e.target.value as Currency)}
                className="bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="TRY">TRY</option>
                <option value="USD">USD</option>
              </select>
              {transactions.length > 0 && (
                <button
                  onClick={handleDeleteAllData}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-md text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Tüm Verileri Sil
                </button>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <TransactionSection
              title="Gelirler"
              transactions={transactions.filter(t => t.type === 'income' && t.currency === selectedCurrency)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              formatDate={formatDate}
              formatFrequency={formatFrequency}
              formatCurrency={formatCurrency}
            />
            <TransactionSection
              title="Giderler"
              transactions={transactions.filter(t => t.type === 'expense' && t.currency === selectedCurrency)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              formatDate={formatDate}
              formatFrequency={formatFrequency}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
      </main>

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

      {/* Silme Onayı Popup'ı */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-red-600 text-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Dikkat!</h3>
            <p className="mb-6">Tüm verileriniz silinecek. Bu işlem geri alınamaz. Onaylıyor musunuz?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-white text-red-600 rounded hover:bg-red-100 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  )
}

function SummaryCard({ title, amount, currency, type, formatCurrency }: { 
  title: string; 
  amount: number; 
  currency: Currency; 
  type: 'income' | 'expense' | 'balance';
  formatCurrency: (amount: number, currency: Currency) => string;
}) {
  const bgColor = type === 'income' ? 'bg-green-600' : type === 'expense' ? 'bg-red-600' : 'bg-blue-600'
  return (
    <div className={`${bgColor} rounded-lg p-6 shadow-lg`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{formatCurrency(amount, currency)}</p>
    </div>
  )
}

function TransactionSection({ title, transactions, onEdit, onDelete, formatDate, formatFrequency, formatCurrency }: {
  title: string;
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  formatDate: (dateString: string) => string;
  formatFrequency: (frequency: Frequency) => string;
  formatCurrency: (amount: number, currency: Currency) => string;
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-blue-400">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {transactions.map(transaction => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onEdit={onEdit}
            onDelete={onDelete}
            formatDate={formatDate}
            formatFrequency={formatFrequency}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>
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
    <div className="bg-gray-800 rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-semibold text-lg text-blue-300">{transaction.description}</h4>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(transaction)}
            className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="text-gray-400 hover:text-red-500 transition-colors duration-300"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <p className={`text-2xl font-bold mb-2 ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
        {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount, transaction.currency)}
      </p>
      <p className="text-sm text-gray-400">{formatFrequency(transaction.frequency)}</p>
      <p className="text-sm text-gray-400">{formatDate(transaction.date)}</p>
    </div>
  )
}