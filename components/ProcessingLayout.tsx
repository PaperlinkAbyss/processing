import Link from 'next/link'
import React, { createContext, PropsWithChildren, useState } from 'react'
export const colores = [
  { nombre: 'Blanco', color: 'rgb(255,255,255)' },
  { nombre: 'amarillo', color: 'rgb(255, 200, 0)' },
  { nombre: 'amarillo verdoso', color: 'rgb(205, 200, 0)' },
  { nombre: 'verde claro', color: 'rgb(155, 200, 0)' },
  { nombre: 'naranja', color: 'rgb(255, 100, 0)' },
  { nombre: 'naranja claro', color: 'rgb(255, 150, 0)' },
  { nombre: 'naranja tierra (ocre)', color: 'rgb(225, 170, 0)' },
  { nombre: 'azul', color: 'rgb(80, 100, 200)' },
  { nombre: 'azul turquesa', color: 'rgb(90, 190, 200)' },
  { nombre: 'azul turquesa oscuro', color: 'rgb(20, 130, 150)' },
  { nombre: 'rojo', color: 'rgb(205, 30, 0)' },
  { nombre: 'gris oscuro', color: 'rgb(60, 60, 60)' },
  { nombre: 'gris', color: 'rgb(150, 150, 150)' },
  { nombre: 'gris claro', color: 'rgb(180, 180, 180)' },
]
export const ColorContext = createContext({
  nombre: 'black',
  color: 'rgb(255,255,255)',
})
export default function ProcessingLayout({ children }: PropsWithChildren) {
  const [colorActual, seleccionarColorActual] = useState({
    nombre: 'Blanco',
    color: 'rgb(255,255,255)',
  })
  function swapSelectedColor(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = event.currentTarget
    seleccionarColorActual({
      nombre: target.innerHTML,
      color: target.style.backgroundColor,
    })
  }
  return (
    <main>
      <nav className='pointer-events-none mx-auto mb-4 grid grid-cols-[repeat(14,1fr)] flex-wrap gap-1 text-center'>
        {colores.map(({ nombre, color }, indice) => {
          console.log('Mapping', { nombre, color })
          return (
            <div
              key={nombre + color}
              color={color}
              data-name={nombre}
              className={`${
                colorActual.nombre === colores[indice].nombre
                  ? 'hover:border-red w-auto border-b-[12px] text-black hover:border hover:border-b-[12px]'
                  : ''
              } pointer-events-auto inline-block flex h-28 flex-wrap content-center justify-center text-center align-middle hover:border hover:border-black`}
              onClick={(event) => swapSelectedColor(event)}
              style={{ backgroundColor: `${color}` }}
            >
              {nombre}
            </div>
          )
        })}
      </nav>
      <div className='align-center mx-auto content-center text-center'>
        <Link
          className='ml-2 mr-2 mt-2 rounded-full border border-black bg-white p-2 hover:bg-gray-100'
          href='/'
        >
          Normal view
        </Link>
        <Link
          className='rounded-full border border-black bg-white p-2 hover:bg-gray-100'
          href='/triangles'
        >
          Triangles
        </Link>
      </div>
      <ColorContext.Provider value={colorActual}>{children}</ColorContext.Provider>
    </main>
  )
}
