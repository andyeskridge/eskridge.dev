import { ReactNode } from 'react'
import Alert from './alert'
import Footer from './footer'
import Meta from './meta'

export default function Layout({ preview, children }: {preview?: boolean , children: ReactNode}) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
