import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href="/tr"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Return Home
      </Link>
    </div>
  )
} 