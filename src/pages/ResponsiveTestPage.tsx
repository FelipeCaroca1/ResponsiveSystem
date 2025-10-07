import { useResponsive } from '../hooks/useResponsive'
import { Container, Heading, Text, Grid, Card, Button } from '../components/responsive'

// Componente de indicador de breakpoint
const BreakpointIndicator = () => {
  const { breakpoint, width, height, orientation, debug } = useResponsive()
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <Container className="bg-black/80 backdrop-blur-sm text-white rounded-full shadow-xl border border-white/20 flex items-center min-w-max transition-all duration-300">
        <span className="font-bold text-blue-300 mr-3 sm:mr-4">Breakpoint: {breakpoint}</span>
        <span className="text-green-300 mr-3 sm:mr-4">{width}×{height}</span>
        <span className="text-purple-300 mr-3 sm:mr-4">{orientation}</span>
        {debug && <span className="text-yellow-300 font-semibold">Debug</span>}
      </Container>
    </div>
  )
}

// Componente de test de helpers booleanos
const BooleanHelpersTest = () => {
  const {
    isXs, isSm, isMd, isLg, isXl, is2Xl, is3Xl, is4Xl, is5Xl,
    isMobile, isTablet, isDesktop, isSmall, isLarge, isUltraWide, is4K, is5K
  } = useResponsive()

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
    <div className="space-y-4">
      <Heading level="h2" className="text-gray-800 mb-4">Boolean Helpers Test</Heading>
      
      <div>
        <Heading level="h4" className="mb-3 text-gray-700">Specific Breakpoints</Heading>
        <Grid type="small" gap="2">
          {helpers.map(helper => (
            <Card
              key={helper.name}
              className={`rounded text-center min-h-[60px] flex flex-col justify-center ${
                helper.value ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              <div className="font-medium break-words">{helper.name}</div>
              <Heading level="h4" className="mt-1">{helper.value ? '✓' : '✗'}</Heading>
            </Card>
          ))}
        </Grid>
      </div>

      <div>
        <Heading level="h4" className="mb-3 text-gray-700">Grouped Helpers</Heading>
        <Grid type="small" gap="2">
          {groupedHelpers.map(helper => (
            <Card
              key={helper.name}
              className={`rounded text-center min-h-[60px] flex flex-col justify-center ${
                helper.value ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              <div className="font-medium break-words">{helper.name}</div>
              <Heading level="h4" className="mt-1">{helper.value ? '✓' : '✗'}</Heading>
            </Card>
          ))}
        </Grid>
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
  } = useResponsive()

  const tests = [
    { name: 'isBreakpointUp("md")', value: isBreakpointUp('md') },
    { name: 'isBreakpointDown("lg")', value: isBreakpointDown('lg') },
    { name: 'isBreakpointBetween("sm", "xl")', value: isBreakpointBetween('sm', 'xl') },
    { name: 'isWidthUp(1024)', value: isWidthUp(1024) },
    { name: 'isWidthDown(768)', value: isWidthDown(768) },
    { name: 'isWidthBetween(500, 1200)', value: isWidthBetween(500, 1200) },
  ]

  return (
    <div className="space-y-4">
      <Heading level="h2" className="text-gray-800 mb-4">Comparison Functions Test</Heading>
      <Grid type="medium" gap="3">
        {tests.map(test => (
          <Card
            key={test.name}
            className={`rounded-lg border min-h-[80px] ${
              test.value ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
            }`}
          >
            <Text size="caption" className="font-mono mb-2 break-words overflow-wrap-anywhere">
              {test.name}
            </Text>
            <Heading level="h4">{test.value ? 'TRUE' : 'FALSE'}</Heading>
          </Card>
        ))}
      </Grid>
    </div>
  )
}

// Componente de test de utilidades de Tailwind
const TailwindUtilsTest = () => {
  return (
    <div className="space-y-4">
      <Heading level="h2" className="text-gray-800 mb-4">Tailwind Utilities Test</Heading>
      
      {/* Test de Spacing */}
      <div>
        <Heading level="h4" className="mb-2 text-gray-700">Spacing Test</Heading>
        <Container className="bg-blue-100 rounded-lg border border-blue-200">
          <Text className="text-blue-800">Spacing responsive automático</Text>
        </Container>
      </div>

      {/* Test de Typography */}
      <div>
        <Heading level="h4" className="mb-2 text-gray-700">Typography Test</Heading>
        <div className="space-y-1">
          <Heading level="h1" className="text-gray-800">H1</Heading>
          <Heading level="h2" className="text-gray-700">H2</Heading>
          <Heading level="h3" className="text-gray-600">H3</Heading>
          <Text className="text-gray-600">Body text</Text>
          <Text size="caption" className="text-gray-500">Caption</Text>
        </div>
      </div>

      {/* Test de Grid */}
      <div>
        <Heading level="h4" className="mb-2 text-gray-700">Grid Test</Heading>
        <Grid gap="2">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="bg-gray-100 rounded text-center">
              Card {i}
            </Card>
          ))}
        </Grid>
      </div>

      {/* Test de Responsive Classes */}
      <div>
        <Heading level="h4" className="mb-2 text-gray-700">Responsive Classes</Heading>
        <div className="space-y-2">
          <Button className="bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Button
          </Button>
          <Container className="bg-gray-100 rounded">
            Container
          </Container>
        </div>
      </div>
    </div>
  )
}

// Componente de test de grid responsive
const GridTest = () => {
  const gridTypes = ['small', 'medium', 'large'] as const

  return (
    <div className="space-y-4">
      <Heading level="h2" className="text-gray-800 mb-4">Grid System Test</Heading>
      
      {gridTypes.map(type => (
        <div key={type}>
          <Heading level="h4" className="mb-2 text-gray-700 capitalize">Grid {type}</Heading>
          <Grid type={type} gap="2">
            {Array.from({ length: 6 }, (_, i) => (
              <Card key={i} className="bg-gray-100 rounded text-center">
                {i + 1}
              </Card>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  )
}

// Componente de test de orientación
const OrientationTest = () => {
  const { orientation, isPortrait, isLandscape, width, height } = useResponsive()

  return (
    <div className="space-y-4">
      <Heading level="h2" className="text-gray-800 mb-4">Orientation Test</Heading>
      
      <Grid type="small" gap="3">
        <Card className={`rounded-lg border text-center ${isPortrait ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
          <Text size="caption" className="font-semibold">Portrait</Text>
          <Heading level="h4">{isPortrait ? '✓' : '✗'}</Heading>
        </Card>
        
        <Card className={`rounded-lg border text-center ${isLandscape ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
          <Text size="caption" className="font-semibold">Landscape</Text>
          <Heading level="h4">{isLandscape ? '✓' : '✗'}</Heading>
        </Card>
      </Grid>
      
      <Container className="bg-blue-100 rounded-lg border border-blue-200">
        <div className="text-blue-800 space-y-1">
          <Text><strong>Orientation:</strong> {orientation}</Text>
          <Text><strong>Dimensions:</strong> {width} x {height}</Text>
          <Text><strong>Ratio:</strong> {(width / height).toFixed(2)}</Text>
        </div>
      </Container>
    </div>
  )
}

// Componente principal de la página de test
const ResponsiveTestPage = () => {
  const { debug } = useResponsive()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <BreakpointIndicator />
      
      {/* Contenedor principal con padding responsivo */}
      <div className="w-full max-w-7xl mx-auto">
        <Container>
          {/* Header mejorado - usando componentes wrapper */}
          <header className="text-center mb-8 bg-white rounded-lg shadow-sm w-full">
            <Container>
              <Heading level="h1" className="text-gray-800 mb-4">
                Responsive System Test Page
              </Heading>
              <Text className="text-gray-600 mb-4">
                Testa todas las funcionalidades del sistema responsive
              </Text>
              {debug && (
                <div className="inline-block bg-yellow-100 text-yellow-800 rounded-lg font-semibold">
                  <Container>
                    <Text size="caption">Debug Mode: ON</Text>
                  </Container>
                </div>
              )}
            </Container>
          </header>

          {/* Grid principal responsivo - usando componentes wrapper */}
          <Grid type="large" gap="6" className="mb-8 w-full">
            {/* Columna izquierda */}
            <div className="space-y-6">
              <Card className="bg-white rounded-lg shadow-sm w-full">
                <BooleanHelpersTest />
              </Card>
              
              <Card className="bg-white rounded-lg shadow-sm w-full">
                <ComparisonTest />
              </Card>
              
              <Card className="bg-white rounded-lg shadow-sm w-full">
                <OrientationTest />
              </Card>
            </div>

            {/* Columna derecha */}
            <div className="space-y-6">
              <Card className="bg-white rounded-lg shadow-sm w-full">
                <TailwindUtilsTest />
              </Card>
              
              <Card className="bg-white rounded-lg shadow-sm w-full">
                <GridTest />
              </Card>
            </div>
          </Grid>

          {/* Footer mejorado - usando componentes wrapper */}
          <footer className="bg-white rounded-lg shadow-sm text-center w-full">
            <Container>
              <div className="space-y-2">
                <Text className="text-gray-600 font-medium">
                  Redimensiona la ventana para ver los cambios en tiempo real
                </Text>
                <div className="flex justify-center">
                  <Text size="caption" className="text-gray-500">
                    Breakpoint actual visible en la parte inferior
                  </Text>
                </div>
              </div>
            </Container>
          </footer>
        </Container>
      </div>
    </div>
  )
}

export default ResponsiveTestPage
