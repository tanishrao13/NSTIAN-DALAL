import { Inter } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/context/AppContext"
import Navigation from "@/components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PropertyFinder - Compare Properties",
  description: "Find and compare properties easily",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navigation />
          <main className="min-h-screen bg-gray-50">{children}</main>
        </AppProvider>
      </body>
    </html>
  )
}
