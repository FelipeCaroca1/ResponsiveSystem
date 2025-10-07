import { useResponsive } from '../hooks/useResponsive'
import { Container, Heading, Text, Grid, Card, Button } from '../components/responsive'

// Componente de demo básico - FORMA PRINCIPAL DE USO (COMPONENTES WRAPPER)
const ResponsiveDemo = () => {
  // ✅ FORMA PRINCIPAL: Solo usar componentes wrapper (mucho más simple)
  const {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    width,
    height,
    orientation,
    debug
  } = useResponsive()

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full max-w-7xl mx-auto">
        <Container>
          {/* Header */}
          <header className="mb-8">
            <Heading level="h1" className="text-center text-blue-600 font-bold mb-4">
              Sistema Responsive Demo
            </Heading>
            <Text className="text-center text-gray-600">
              ✅ Forma principal: Solo usar componentes wrapper (sin concatenación)
            </Text>
          </header>

          {/* Info Cards */}
          <Grid type="medium" gap="4" className="mb-8">
            <Card className="bg-white rounded-lg shadow-md">
              <Heading level="h3" className="text-gray-800 mb-2">
                Breakpoint Actual
              </Heading>
              <Text className="text-blue-600 font-semibold">{breakpoint}</Text>
            </Card>
            
            <Card className="bg-white rounded-lg shadow-md">
              <Heading level="h3" className="text-gray-800 mb-2">
                Dimensiones
              </Heading>
              <Text className="text-green-600">{width} x {height}</Text>
            </Card>
            
            <Card className="bg-white rounded-lg shadow-md">
              <Heading level="h3" className="text-gray-800 mb-2">
                Orientación
              </Heading>
              <Text className="text-purple-600">{orientation}</Text>
            </Card>
          </Grid>

          {/* Device Type Indicators */}
          <Grid type="medium" gap="4" className="mb-8">
            <Card className={`rounded-lg text-center ${isMobile ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
              <Heading level="h4" className="font-semibold">Móvil</Heading>
              <Text size="caption">{isMobile ? 'Activo' : 'Inactivo'}</Text>
            </Card>
            
            <Card className={`rounded-lg text-center ${isTablet ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
              <Heading level="h4" className="font-semibold">Tablet</Heading>
              <Text size="caption">{isTablet ? 'Activo' : 'Inactivo'}</Text>
            </Card>
            
            <Card className={`rounded-lg text-center ${isDesktop ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
              <Heading level="h4" className="font-semibold">Desktop</Heading>
              <Text size="caption">{isDesktop ? 'Activo' : 'Inactivo'}</Text>
            </Card>
          </Grid>

          {/* Spacing Demo */}
          <Card className="bg-white rounded-lg shadow-md mb-8">
            <Heading level="h3" className="text-gray-800 mb-4">
              Demo de Spacing
            </Heading>
            <Container className="bg-blue-100 rounded-lg">
              <Text className="text-blue-800">
                Este contenedor usa spacing responsive automático
              </Text>
            </Container>
          </Card>

          {/* Responsive Button Demo */}
          <Card className="bg-white rounded-lg shadow-md mb-8">
            <Heading level="h3" className="text-gray-800 mb-4">
              Demo de Botón Responsive
            </Heading>
            <Button className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Botón Responsive
            </Button>
          </Card>

          {/* Debug Info */}
          {debug && (
            <Card className="bg-gray-800 text-white rounded-lg">
              <Heading level="h3" className="mb-4">Debug Info</Heading>
              <pre className="overflow-x-auto">
                <Text size="caption">{JSON.stringify(debug, null, 2)}</Text>
              </pre>
            </Card>
          )}
        </Container>
      </div>
    </div>
  )
}

export default ResponsiveDemo
