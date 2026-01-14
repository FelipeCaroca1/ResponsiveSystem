import { ResponsiveLayoutProvider } from './providers'
import { MainLayout } from './layouts'
import ExamplePage from './pages/ExamplePage'

function App() {
  return (
    <ResponsiveLayoutProvider defaultLayout="default">
      <MainLayout>
        <ExamplePage />
      </MainLayout>
    </ResponsiveLayoutProvider>
  )
}

export default App