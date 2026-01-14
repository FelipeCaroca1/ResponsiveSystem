const Footer = () => {
  return (
    <footer className="border-t flex-shrink-0" role="contentinfo">
      <div className="px-4 py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Your App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
