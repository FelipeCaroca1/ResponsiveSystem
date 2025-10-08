import { useLayout } from '../hooks'
import { LAYOUT_CONFIG } from '../config/layout'

interface LayoutSwitcherProps {
  compact?: boolean
}

const LayoutSwitcher = ({ compact = false }: LayoutSwitcherProps) => {
  const { current, setLayout, config } = useLayout()
  
  if (compact) {
    return (
      <div className="bg-black/50 rounded-lg p-3 border border-gray-700">
        <div className="text-xs text-gray-500 mb-2">Layout:</div>
        <select
          value={current}
          onChange={(e) => setLayout(e.target.value)}
          className="w-full bg-gray-800 text-white text-sm p-2 rounded border border-gray-600 focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
        >
          {Object.entries(LAYOUT_CONFIG).map(([key, layoutConfig]) => (
            <option key={key} value={key}>
              {layoutConfig.name}
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
      <h3 className="text-white font-semibold mb-3">Cambiar Layout</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {Object.entries(LAYOUT_CONFIG).map(([key, layoutConfig]) => (
          <button
            key={key}
            onClick={() => setLayout(key)}
            className={`
              p-4 rounded-lg border transition-all text-left
              ${current === key 
                ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' 
                : 'border-gray-700 bg-black/30 text-gray-300 hover:border-gray-600'
              }
            `}
          >
            <div className="font-semibold mb-1">{layoutConfig.name}</div>
            <div className="text-xs opacity-75">{layoutConfig.description}</div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
        <div className="text-xs text-gray-500 mb-1">Layout Actual:</div>
        <div className="text-sm text-cyan-400 font-medium">{config.name}</div>
        <div className="text-xs text-gray-400">{config.description}</div>
      </div>
    </div>
  )
}

export default LayoutSwitcher
