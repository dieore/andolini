import React from 'react';
export function AboutSection() {
  return <section id="about" className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-4">
              Nuestra Historia
            </h2>
            <p className="text-amber-900 mb-4">
              Andolini nació en 2010 con una clara inspiración en la rica tradición panadera italiana.
              Lo que comenzó como un pequeño rincón de sabores auténticos se ha convertido en un
              referente de la panadería artesanal en nuestra comunidad.
            </p>
            <p className="text-amber-900 mb-4">
              Cada mañana, nuestros maestros panaderos inician su jornada antes del amanecer,
              siguiendo recetas tradicionales italianas y utilizando ingredientes selectos
              para ofrecer productos de la más alta calidad.
            </p>
            <p className="text-amber-900">
              En Andolini, mantenemos viva la pasión por la auténtica panadería italiana,
              creando experiencias que van más allá del simple placer de comer,
              convirtiendo cada bocado en un viaje a los sabores más puros de Italia.
            </p>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 mb-6 md:mb-0">
            <img src="https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Bakery interior" className="rounded-lg shadow-lg w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>;
}