import { AuthProvider } from '@/lib/auth-context'
import '@/styles/globals.css'

export const metadata = {
  title: 'AKEvent - Event Management',
  description: 'Professional event management platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
