import { useResponsive } from '../hooks/useResponsive'
import { Container, Heading, Text, Button } from './responsive'

interface NavigationProps {
  currentPage: 'demo' | 'test'
  setCurrentPage: (page: 'demo' | 'test') => void
}

const Navigation = ({ currentPage, setCurrentPage }: NavigationProps) => {
  const { isMobile, breakpoint } = useResponsive()

  const pages = [
    { id: 'demo', name: 'Demo Básico', component: 'ResponsiveDemo' },
    { id: 'test', name: 'Página de Test', component: 'ResponsiveTestPage' }
  ]

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="w-full">
        <Container as="div">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Heading level="h3" className="font-bold text-gray-800">
                Responsive System
              </Heading>
              <Container className="text-gray-500 font-mono bg-gray-100 rounded">
                <Text size="caption">{breakpoint}</Text>
              </Container>
            </div>
            
            <div className="flex items-center space-x-3">
              {pages.map(page => (
                <Button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id as 'demo' | 'test')}
                  className={`rounded-lg transition-colors font-semibold ${
                    currentPage === page.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  {isMobile ? page.name.split(' ')[0] : page.name}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </nav>
  )
}

export default Navigation
