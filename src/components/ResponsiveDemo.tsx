import { useResponsiveLayout } from '../hooks'
import LayoutSwitcher from './LayoutSwitcher'

const ResponsiveDemo = () => {
  const { 
    breakpoint, 
    width, 
    height, 
    isMobile, 
    isTablet, 
    isDesktop 
  } = useResponsiveLayout()

  return (
    <div className="w-full space-y-8">
        
        {/* Header Principal */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
          <div className="border-l-2 border-cyan-400 pl-4 mb-6">
            <h1 className="text-4xl font-black text-white mb-3 tracking-tighter leading-none">
              Sistema Responsivo
            </h1>
            <p className="text-base text-gray-400 leading-relaxed tracking-wide">
              Sistema de auto-escalado para aplicaciones web modernas
            </p>
          </div>
          
          {/* Estado actual - 3 cards en fila horizontal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/30 hover:border-cyan-400/50 transition-all shadow-lg shadow-cyan-500/10">
              <p className="text-xs text-cyan-400 font-bold mb-2 tracking-widest uppercase">Breakpoint</p>
              <p className="text-2xl font-black text-white tracking-tight">{breakpoint.toUpperCase()}</p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all">
              <p className="text-xs text-gray-500 font-bold mb-2 tracking-widest uppercase">Resolución</p>
              <p className="text-xl font-bold text-gray-300 tracking-tight">{width} × {height}</p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all">
              <p className="text-xs text-gray-500 font-bold mb-2 tracking-widest uppercase">Dispositivo</p>
              <p className="text-xl font-bold text-gray-300 tracking-tight">
                {isMobile && 'Móvil'}
                {isTablet && 'Tablet'}
                {isDesktop && 'Desktop'}
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid - 2x3 layout */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
          <div className="border-l-2 border-cyan-400 pl-4 mb-6">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
              Propiedades Auto-Escalables
            </h2>
            <p className="text-base text-gray-400 leading-relaxed">
              Seis propiedades CSS que escalan automáticamente en todos los breakpoints
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="group bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white tracking-tight">Tipografía</h3>
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Font-size escala proporcionalmente para legibilidad óptima
              </p>
            </div>
            
            <div className="group bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white tracking-tight">Espaciado</h3>
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Padding, margin y gap se adaptan automáticamente
              </p>
            </div>
            
            <div className="group bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white tracking-tight">Alto de Línea</h3>
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Ritmo vertical se ajusta para mejor legibilidad
              </p>
            </div>
            
            <div className="group bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white tracking-tight">Espaciado de Letras</h3>
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Espaciado entre caracteres se optimiza horizontalmente
              </p>
            </div>
            
            <div className="group bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white tracking-tight">Sombras</h3>
                <div className="w-2 h-2 rounded-full bg-gray-600"></div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Intensidad aumenta en pantallas grandes
              </p>
            </div>
            
            <div className="group bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-white tracking-tight">Grids Automáticos</h3>
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Columnas se calculan automáticamente según tamaño de pantalla
              </p>
            </div>
          </div>
        </div>

        {/* Visual Demo - Layout horizontal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Typography Showcase */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
            <div className="border-l-2 border-cyan-400 pl-4 mb-6">
              <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
                Escala Tipográfica
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Vista previa del comportamiento de escalado automático
              </p>
            </div>
            
            <div className="bg-black/30 rounded-xl p-6 border border-gray-800">
              <p className="text-xs text-gray-500 mb-4 tracking-widest uppercase font-bold">Escala Tipográfica</p>
              <div className="space-y-3">
                <h1 className="text-4xl font-black text-white tracking-tighter leading-none">Título Principal</h1>
                <h2 className="text-3xl font-bold text-gray-300 tracking-tight">Título Primario</h2>
                <h3 className="text-2xl font-bold text-gray-400 tracking-tight">Título Secundario</h3>
                <p className="text-base text-gray-500 leading-relaxed tracking-wide">
                  El texto del cuerpo escala proporcionalmente en móvil, desktop, Full HD y pantallas 4K.
                </p>
              </div>
            </div>
          </div>
          
          {/* Cards Grid */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-gray-800">
            <div className="border-l-2 border-gray-600 pl-4 mb-6">
              <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
                Grid Automático
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Cards que se distribuyen automáticamente
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Rápido', accent: 'cyan' },
                { label: 'Limpio', accent: 'gray' },
                { label: 'Moderno', accent: 'gray' },
                { label: 'Preciso', accent: 'gray' },
                { label: 'Eficiente', accent: 'gray' },
                { label: 'Confiable', accent: 'gray' },
                { label: 'Escalable', accent: 'gray' },
                { label: 'Robusto', accent: 'cyan' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`
                    bg-black/50 backdrop-blur-sm rounded-xl p-4 text-center
                    border transition-all
                    ${item.accent === 'cyan' 
                      ? 'border-cyan-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20' 
                      : 'border-gray-700 hover:border-gray-600'
                    }
                  `}
                >
                  <p className={`text-base font-bold tracking-tight ${item.accent === 'cyan' ? 'text-cyan-400' : 'text-gray-300'}`}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Comparison - Layout horizontal */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
          <div className="border-l-2 border-cyan-400 pl-4 mb-6">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
              Comparación de Código
            </h2>
            <p className="text-base text-gray-400 leading-relaxed">
              Enfoque tradicional versus escalado automatizado
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Traditional */}
            <div className="bg-black/30 rounded-xl p-6 border border-red-900/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <h3 className="text-xl font-bold text-red-400 tracking-tight">Tradicional</h3>
              </div>
              <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed text-gray-400 border border-gray-800">
{`<div className="
  text-sm sm:text-base
  md:text-lg lg:text-xl
  xl:text-2xl 2xl:text-3xl
  p-2 sm:p-3 md:p-4
  lg:p-6">
  Contenido
</div>`}
              </pre>
              <ul className="text-sm text-gray-500 mt-4 space-y-2 leading-relaxed">
                <li>• Patrones repetitivos</li>
                <li>• Difícil de mantener</li>
                <li>• Propenso a errores</li>
              </ul>
            </div>
            
            {/* Automated */}
            <div className="bg-black/30 rounded-xl p-6 border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
                <h3 className="text-xl font-bold text-cyan-400 tracking-tight">Automatizado</h3>
              </div>
              <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed text-gray-400 border border-gray-800">
{`<div className="text-base p-4">
  Contenido
</div>

/* Escala automático */
/* Sin media queries */
/* Código limpio */`}
              </pre>
              <ul className="text-sm text-gray-400 mt-4 space-y-2 leading-relaxed">
                <li>• Código minimalista</li>
                <li>• Fácil de mantener</li>
                <li>• Listo para producción</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer CTA - Layout horizontal */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-8 border border-cyan-500/20">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black text-white mb-4 tracking-tighter leading-none">
              Listo para Producción
            </h2>
            <p className="text-base text-gray-400 leading-relaxed">
              Sistema completo de auto-escalado para aplicaciones React + Tailwind CSS
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-6 py-4 text-center">
              <p className="text-sm font-bold tracking-widest text-cyan-400 uppercase">6 Propiedades</p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm border border-gray-700 rounded-lg px-6 py-4 text-center">
              <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">9 Breakpoints</p>
            </div>
            <div className="bg-black/50 backdrop-blur-sm border border-gray-700 rounded-lg px-6 py-4 text-center">
              <p className="text-sm font-bold tracking-widest text-gray-400 uppercase">Auto-Grid</p>
            </div>
          </div>
        </div>

        {/* Layout Switcher */}
        <div className="mt-8">
          <LayoutSwitcher />
        </div>
      </div>
  )
}

export default ResponsiveDemo