const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="px-4 py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tu Aplicación. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
