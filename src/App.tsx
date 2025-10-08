import { ResponsiveLayoutProvider } from './providers'
import { MainLayout } from './layouts'
import { NavigationProvider, useNavigation } from './context'
import ResponsiveTestPage from './pages/ResponsiveTestPage'
import ResponsiveDemo from './components/ResponsiveDemo'

// Componente interno que usa el contexto
function AppContent() {
  const { currentPage } = useNavigation()
  
  return (
    <MainLayout>
      {currentPage === 'demo' ? <ResponsiveDemo /> : <ResponsiveTestPage />}
    </MainLayout>
  )
}

// App principal con providers
function App() {
  return (
    <NavigationProvider defaultPage="test">
      <ResponsiveLayoutProvider defaultLayout="default">
        <AppContent />
      </ResponsiveLayoutProvider>
    </NavigationProvider>
  )
}

export default App