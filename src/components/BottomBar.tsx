import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, PlusCircleIcon, ChartBarIcon } from '@heroicons/react/24/solid'

export default function BottomBar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', icon: HomeIcon, label: 'Ana Sayfa' },
    { href: '/add-transaction', icon: PlusCircleIcon, color: 'bg-green-500' },
    { href: '/status', icon: ChartBarIcon },
  ]

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <div className="bg-gray-800 rounded-full shadow-lg px-4 py-2">
        <nav className="flex items-center justify-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const isAddButton = item.href === '/add-transaction'
            const shouldBeGreen = isAddButton && pathname !== '/status'
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`
                  relative flex items-center justify-center
                  w-12 h-12 rounded-full mx-2
                  transition-all duration-300 ease-in-out
                  ${isActive 
                    ? (item.color || 'bg-indigo-500') + ' text-white' 
                    : shouldBeGreen
                      ? 'bg-green-500 text-white'
                      : 'text-gray-400 hover:bg-gray-700'}
                `}
              >
                <item.icon className="h-6 w-6" />
                {isActive && item.label && (
                  <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${item.color || 'bg-indigo-500'} text-white text-xs py-1 px-2 rounded-full whitespace-nowrap`}>
                    {item.label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}