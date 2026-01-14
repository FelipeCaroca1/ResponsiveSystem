import { useLayout } from '../hooks'
import { LAYOUT_CONFIG } from '../config/layout'

interface LayoutSwitcherProps {
  compact?: boolean
}

const LayoutSwitcher = ({ compact = false }: LayoutSwitcherProps) => {
  const { current, setLayout, config } = useLayout()
  
  if (compact) {
    return (
      <div className="p-3 border rounded">
        <label htmlFor="layout-select" className="text-xs mb-2 block">
          Layout:
        </label>
        <select
          id="layout-select"
          value={current}
          onChange={(e) => setLayout(e.target.value)}
          className="w-full text-sm p-2 rounded border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
          aria-label="Select layout"
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
    <div className="p-4 border rounded" role="region" aria-label="Layout switcher">
      <h3 className="font-semibold mb-3">Change Layout</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" role="group" aria-label="Layout options">
        {Object.entries(LAYOUT_CONFIG).map(([key, layoutConfig]) => (
          <button
            key={key}
            type="button"
            onClick={() => setLayout(key)}
            aria-pressed={current === key}
            aria-label={`Switch to ${layoutConfig.name} layout`}
            className={`
              p-4 rounded border transition-all text-left
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${current === key 
                ? 'border-2' 
                : 'border hover:border-opacity-50'
              }
            `}
          >
            <div className="font-semibold mb-1">{layoutConfig.name}</div>
            <div className="text-xs opacity-75">{layoutConfig.description}</div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 border rounded" role="status" aria-live="polite">
        <div className="text-xs mb-1">Current Layout:</div>
        <div className="text-sm font-medium">{config.name}</div>
        <div className="text-xs opacity-75">{config.description}</div>
      </div>
    </div>
  )
}

export default LayoutSwitcher
