import { useResponsiveLayout } from '../hooks'
import LayoutSwitcher from '../components/LayoutSwitcher'

// Componente de indicador de breakpoint
const BreakpointIndicator = () => {
  const { breakpoint, width, height, orientation, debug } = useResponsiveLayout()
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/90 backdrop-blur-sm text-white rounded-full shadow-xl border border-white/20 px-6 py-3 flex items-center space-x-4 min-w-max">
        <span className="font-bold text-blue-300 text-sm">Breakpoint: {breakpoint}</span>
        <span className="text-green-300 text-sm">{width}×{height}</span>
        <span className="text-purple-300 text-sm">{orientation}</span>
        {debug && <span className="text-yellow-300 font-semibold text-sm">Debug</span>}
      </div>
    </div>
  )
}

// Componente de test de helpers booleanos
const BooleanHelpersTest = () => {
  const {
    isXs, isSm, isMd, isLg, isXl, is2Xl, is3Xl, is4Xl, is5Xl,
    isMobile, isTablet, isDesktop, isSmall, isLarge, isUltraWide, is4K, is5K
  } = useResponsiveLayout()

  const helpers = [
    { name: 'isXs', value: isXs },
    { name: 'isSm', value: isSm },
    { name: 'isMd', value: isMd },
    { name: 'isLg', value: isLg },
    { name: 'isXl', value: isXl },
    { name: 'is2Xl', value: is2Xl },
    { name: 'is3Xl', value: is3Xl },
    { name: 'is4Xl', value: is4Xl },
    { name: 'is5Xl', value: is5Xl },
  ]

  const groupedHelpers = [
    { name: 'isMobile', value: isMobile },
    { name: 'isTablet', value: isTablet },
    { name: 'isDesktop', value: isDesktop },
    { name: 'isSmall', value: isSmall },
    { name: 'isLarge', value: isLarge },
    { name: 'isUltraWide', value: isUltraWide },
    { name: 'is4K', value: is4K },
    { name: 'is5K', value: is5K },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Boolean Helpers</h2>
      <div className="w-8 h-0.5 bg-cyan-400 mb-4"></div>
      
      <div>
        <h4 className="text-sm font-bold mb-3 text-gray-500 tracking-widest uppercase">Specific Breakpoints</h4>
        <div className="grid grid-cols-3 gap-2">
          {helpers.map(helper => (
            <div
              key={helper.name}
              className={`p-4 rounded-lg text-center min-h-[60px] flex flex-col justify-center border transition-all ${
                helper.value 
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' 
                  : 'bg-black/30 text-gray-600 border-gray-800'
              }`}
            >
              <div className="font-bold break-words text-sm">{helper.name}</div>
              <div className="text-lg font-black mt-1">{helper.value ? '●' : '○'}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold mb-3 text-gray-500 tracking-widest uppercase">Grouped Helpers</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {groupedHelpers.map(helper => (
            <div
              key={helper.name}
              className={`p-4 rounded-lg text-center min-h-[60px] flex flex-col justify-center border transition-all ${
                helper.value 
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' 
                  : 'bg-black/30 text-gray-600 border-gray-800'
              }`}
            >
              <div className="font-bold break-words text-sm">{helper.name}</div>
              <div className="text-lg font-black mt-1">{helper.value ? '●' : '○'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Componente de test de comparaciones
const ComparisonTest = () => {
  const {
    isBreakpointUp,
    isBreakpointDown,
    isBreakpointBetween,
    isWidthUp,
    isWidthDown,
    isWidthBetween
  } = useResponsiveLayout()

  const tests = [
    { name: 'isBreakpointUp("md")', value: isBreakpointUp('md') },
    { name: 'isBreakpointDown("lg")', value: isBreakpointDown('lg') },
    { name: 'isBreakpointBetween("sm", "xl")', value: isBreakpointBetween('sm', 'xl') },
    { name: 'isWidthUp(1024)', value: isWidthUp(1024) },
    { name: 'isWidthDown(768)', value: isWidthDown(768) },
    { name: 'isWidthBetween(500, 1200)', value: isWidthBetween(500, 1200) },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Comparison Functions</h2>
      <div className="w-8 h-0.5 bg-gray-700 mb-4"></div>
      <div className="grid grid-cols-auto-md gap-3">
        {tests.map(test => (
          <div
            key={test.name}
            className={`p-4 rounded-lg border min-h-[80px] flex flex-col justify-center transition-all ${
              test.value 
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' 
                : 'bg-black/30 text-gray-600 border-gray-800'
            }`}
          >
            <p className="font-mono text-xs mb-2 break-words">
              {test.name}
            </p>
            <p className="text-lg font-black">{test.value ? 'TRUE' : 'FALSE'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente de test de utilidades de Tailwind
const TailwindUtilsTest = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Auto-Scale Properties</h2>
      <div className="w-8 h-0.5 bg-cyan-400 mb-6"></div>

      {/* Fila 1: Grid Auto-responsive y Line Height */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Grid Auto-responsive */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-cyan-400">Grid Auto-responsive</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="p-4 bg-black/30 rounded-lg text-center text-sm border border-gray-700 hover:border-cyan-500/30 transition-all">
                <p className="text-gray-300 font-medium">Card {i}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Line Height */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-cyan-400">Line Height (Auto-scale)</h4>
          <div className="space-y-4">
            <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
              <p className="text-base leading-relaxed text-gray-300">
                Este párrafo usa <code className="bg-cyan-500/20 text-cyan-400 px-1 rounded">leading-relaxed</code>. 
                El line-height escala automáticamente para mejor legibilidad.
              </p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
              <p className="text-base leading-loose text-gray-300">
                Este párrafo usa <code className="bg-cyan-500/20 text-cyan-400 px-1 rounded">leading-loose</code>. 
                Con espaciado mayor que se adapta a cada pantalla.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fila 2: Letter Spacing y Shadows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Letter Spacing */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-cyan-400">Letter Spacing (Auto-scale)</h4>
          <div className="space-y-3">
            <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
              <p className="text-base tracking-tight text-gray-300">
                <code className="bg-cyan-500/20 text-cyan-400 px-1 rounded">tracking-tight</code> - Texto compacto
              </p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
              <p className="text-base tracking-normal text-gray-300">
                <code className="bg-cyan-500/20 text-cyan-400 px-1 rounded">tracking-normal</code> - Espaciado normal
              </p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
              <p className="text-base tracking-wide text-gray-300">
                <code className="bg-cyan-500/20 text-cyan-400 px-1 rounded">tracking-wide</code> - Espaciado amplio
              </p>
            </div>
          </div>
        </div>

        {/* Shadows */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-cyan-400">Shadows (Auto-scale)</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-black/30 shadow-sm rounded-lg text-center border border-gray-700">
              <p className="text-sm font-medium text-gray-300">shadow-sm</p>
            </div>
            <div className="p-4 bg-black/30 shadow-md rounded-lg text-center border border-gray-700">
              <p className="text-sm font-medium text-gray-300">shadow-md</p>
            </div>
            <div className="p-4 bg-black/30 shadow-lg rounded-lg text-center border border-gray-700">
              <p className="text-sm font-medium text-gray-300">shadow-lg</p>
            </div>
            <div className="p-4 bg-black/30 shadow-xl rounded-lg text-center border border-gray-700">
              <p className="text-sm font-medium text-gray-300">shadow-xl</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fila 3: Buttons */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-cyan-400">Buttons (Auto-scale)</h4>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-semibold">
            Button Normal
          </button>
          <button className="px-8 py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold">
            Button Grande
          </button>
          <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm">
            Button Pequeño
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente de test de orientación
const OrientationTest = () => {
  const { orientation, isPortrait, isLandscape } = useResponsiveLayout()

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Orientation</h2>
      <div className="w-8 h-0.5 bg-cyan-400 mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 bg-black/30 rounded-lg border border-gray-700 text-center">
          <p className="font-semibold text-cyan-400 text-lg mb-2">Current</p>
          <p className="text-gray-300 text-base">{orientation}</p>
        </div>
        <div className="p-6 bg-black/30 rounded-lg border border-gray-700 text-center">
          <p className="font-semibold text-cyan-400 text-lg mb-2">Portrait</p>
          <p className="text-gray-300 text-base">{isPortrait ? '●' : '○'}</p>
        </div>
        <div className="p-6 bg-black/30 rounded-lg border border-gray-700 text-center">
          <p className="font-semibold text-cyan-400 text-lg mb-2">Landscape</p>
          <p className="text-gray-300 text-base">{isLandscape ? '●' : '○'}</p>
        </div>
      </div>
    </div>
  )
}

// Componente de test de grid
const GridTest = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Grid System</h2>
      <div className="w-8 h-0.5 bg-cyan-400 mb-4"></div>
      
      <div>
        <h4 className="text-lg font-semibold mb-2 text-gray-700">Auto-responsive Grid</h4>
        <div className="grid grid-cols-auto-sm gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="p-6 bg-indigo-100 rounded-lg text-center border border-indigo-200">
              <p className="font-bold text-indigo-800 text-base">Item {i}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Página principal
const ResponsiveTestPage = () => {
  const { debug } = useResponsiveLayout()

  return (
    <div>
      <BreakpointIndicator />
      
      {/* Contenedor principal */}
      <div className="w-full">
          {/* Header elegante */}
          <header className="text-center mb-6 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
            <div className="inline-block bg-black/50 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 rounded-lg px-4 py-2 mb-4">
              <p className="text-xs font-bold tracking-widest uppercase">Suite de Pruebas</p>
            </div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tighter leading-none">
              Test del Sistema
            </h1>
            <p className="text-base text-gray-400 mb-3 leading-relaxed tracking-wide">
              Validación completa de propiedades auto-escalables
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm">
              <span className="text-gray-500">Tipografía</span>
              <span className="text-gray-700">•</span>
              <span className="text-gray-500">Espaciado</span>
              <span className="text-gray-700">•</span>
              <span className="text-gray-500">Alto de Línea</span>
              <span className="text-gray-700">•</span>
              <span className="text-gray-500">Espaciado de Letras</span>
              <span className="text-gray-700">•</span>
              <span className="text-gray-500">Sombras</span>
            </div>
            {debug && (
              <div className="inline-block bg-yellow-900/30 border border-yellow-600/30 text-yellow-400 rounded-lg font-bold px-4 py-2 mt-4">
                <p className="text-sm tracking-widest uppercase">Modo Debug Activo</p>
              </div>
            )}
          </header>

          {/* Layout profesional - jerarquía lógica */}
          <div className="mb-6 space-y-6">
            
            {/* Fila 1: Boolean Helpers - Ancho completo */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <BooleanHelpersTest />
            </div>

            {/* Fila 2: Auto-scale Properties - Ancho completo */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all">
              <TailwindUtilsTest />
            </div>

            {/* Fila 3: Orientation - Horizontal */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <OrientationTest />
            </div>

            {/* Fila 3: Comparaciones y tests principales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all">
                <ComparisonTest />
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <GridTest />
              </div>
            </div>

          </div>

          {/* Layout Switcher */}
          <div className="mb-6">
            <LayoutSwitcher />
          </div>

          {/* Footer*/}
          <footer className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl text-center p-6 border border-cyan-500/20">
            <div className="space-y-4">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
              <p className="text-2xl font-black text-white leading-none tracking-tighter">
                Sistema en Vivo
              </p>
              <p className="text-base text-gray-400 leading-relaxed tracking-wide max-w-2xl mx-auto">
                Redimensiona tu ventana para observar el comportamiento de escalado automático en tiempo real
              </p>
              <div className="flex justify-center gap-3 flex-wrap mt-4">
                <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 px-4 py-2 rounded-lg">
                  <p className="text-sm font-bold tracking-widest text-cyan-400 uppercase">5 Propiedades</p>
                </div>
                <div className="bg-black/50 backdrop-blur-sm border border-gray-700 px-4 py-2 rounded-lg">
                  <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">9 Breakpoints</p>
                </div>
                <div className="bg-black/50 backdrop-blur-sm border border-gray-700 px-4 py-2 rounded-lg">
                  <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">Auto-Escalado</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4 leading-relaxed tracking-wide">
                Indicador de breakpoint ubicado en la parte inferior central
              </p>
            </div>
          </footer>
        </div>
      </div>
  )
}

export default ResponsiveTestPage
