import { useResponsiveLayout } from '../hooks'
import LayoutSwitcher from '../components/LayoutSwitcher'

const ExamplePage = () => {
  const { breakpoint, isMobile, width, height, layout } = useResponsiveLayout()

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="border rounded p-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to Your App</h1>
          <p className="text-lg opacity-75">
            This is an example page showing the responsive system with layout switching.
          </p>
        </header>

        {/* Layout Switcher */}
        <section aria-label="Layout selection">
          <LayoutSwitcher />
        </section>

        {/* Info Cards */}
        <section aria-label="Responsive information" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <article className="border rounded p-4">
            <h3 className="text-sm font-semibold mb-2">Breakpoint</h3>
            <p className="text-2xl font-bold" aria-live="polite">{breakpoint.toUpperCase()}</p>
          </article>
          <article className="border rounded p-4">
            <h3 className="text-sm font-semibold mb-2">Device</h3>
            <p className="text-2xl font-bold" aria-live="polite">{isMobile ? 'Mobile' : 'Desktop'}</p>
          </article>
          <article className="border rounded p-4">
            <h3 className="text-sm font-semibold mb-2">Width</h3>
            <p className="text-2xl font-bold" aria-live="polite">{width}px</p>
          </article>
          <article className="border rounded p-4">
            <h3 className="text-sm font-semibold mb-2">Height</h3>
            <p className="text-2xl font-bold" aria-live="polite">{height}px</p>
          </article>
        </section>

        {/* Content Cards */}
        <section aria-label="Example content cards" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <article key={i} className="border rounded p-6">
              <div className="w-12 h-12 border rounded flex items-center justify-center mb-4 flex-shrink-0" aria-hidden="true">
                <span className="font-bold">{i}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Card {i}</h3>
              <p className="opacity-75">
                This is an example card. All content scales automatically based on screen size
                thanks to the auto-scaling system.
              </p>
            </article>
          ))}
        </section>

        {/* Info Section */}
        <section className="border rounded p-6">
          <h2 className="text-2xl font-bold mb-4">Responsive System</h2>
          <div className="space-y-3">
            <p>
              <strong>Auto-scaling active:</strong> All content scales automatically based on
              the current breakpoint (text, spacing, shadows).
            </p>
            <p>
              <strong>Hook useResponsive:</strong> Available in{' '}
              <code className="bg-opacity-10 px-2 py-1 rounded text-sm font-mono">src/hooks/useResponsive.ts</code>{' '}
              for manual configuration when needed.
            </p>
            <p>
              <strong>Current layout:</strong> <span className="capitalize">{layout.current}</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ExamplePage
