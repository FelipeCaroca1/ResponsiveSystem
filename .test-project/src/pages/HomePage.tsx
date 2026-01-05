import { useResponsiveLayout } from 'responsive-system'
import { useResponsive } from '../hooks'

function HomePage() {
  const { breakpoint, isMobile, layout } = useResponsiveLayout()
  const responsive = useResponsive()

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenido a tu Aplicación
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Esta es una página de ejemplo que demuestra el sistema responsive con auto-scaling.
            Todo el contenido se ajusta automáticamente según el tamaño de pantalla.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Breakpoint</h3>
            <p className="text-2xl font-bold text-blue-700">{breakpoint.toUpperCase()}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-sm font-semibold text-green-900 mb-2">Dispositivo</h3>
            <p className="text-2xl font-bold text-green-700">{isMobile ? 'Móvil' : 'Desktop'}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h3 className="text-sm font-semibold text-purple-900 mb-2">Ancho</h3>
            <p className="text-2xl font-bold text-purple-700">{responsive.width}px</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <h3 className="text-sm font-semibold text-orange-900 mb-2">Alto</h3>
            <p className="text-2xl font-bold text-orange-700">{responsive.height}px</p>
          </div>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-xl">{i}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Card {i}</h3>
              <p className="text-gray-600">
                Este es un ejemplo de card. El texto, espaciado y sombras se ajustan automáticamente
                según el tamaño de pantalla gracias al sistema de auto-scaling.
              </p>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sistema Responsive</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong className="text-gray-900">Auto-scaling activo:</strong> Todo el contenido escala
              automáticamente según el breakpoint actual (texto, espaciado, sombras).
            </p>
            <p>
              <strong className="text-gray-900">Hook useResponsive:</strong> Disponible en{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/hooks/useResponsive.ts</code>{' '}
              para configuración manual cuando lo necesites.
            </p>
            <p>
              <strong className="text-gray-900">Layout actual:</strong> <span className="capitalize">{layout.current}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
