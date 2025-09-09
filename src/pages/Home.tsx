import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Primera sección con imagen de fondo */}
      <div
        className="h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
        style={{
          backgroundImage: "url('/HomeImage.png')",
        }}

      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Contenido de la primera sección */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Manur's Empire</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto text-pretty">
            Welcome to the end of modern software
          </p>
        </div>
      </div>

      {/* Botón flotante en el medio */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <Link
          to="/resistance"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
        >
          Wacth what the pesky networ-adds are plotting
        </Link>
      </div>

      {/* Segunda sección con color sólido */}
      <div className="h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-balance">Meet Andrei</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 text-pretty">
            In a dark corner of the digital world, the warlock Andrei Mes Manur is waging chaos against automation, 
            infrastructure-as-code, and modern software practices.
          </p>
          
        </div>
      </div>
    </div>
  )
}

export default Home
