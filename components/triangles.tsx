import React, { ReactElement, useContext, useRef } from 'react'
import ProcessingLayout, { ColorContext } from './ProcessingLayout'
import generateTriangleGrid from './generateTriangleGrid'
export default function Triangles() {
  const colorActual = useContext(ColorContext)

  const triangleRef = useRef<HTMLDivElement>(null)
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = event.target as HTMLDivElement
    if (!target) return
    target.style.fill = colorActual.color
  }

  function draw() {
    if (triangleRef.current) {
      triangleRef.current.innerHTML = generateTriangleGrid()
    }
  }
  return (
    <>
      <button onClick={draw}>Draw</button>
      <div
        className='mx-auto mt-2 grid w-screen place-content-center'
        ref={triangleRef}
        id='triangle'
        onClick={(event) => handleClick(event)}
      ></div>
    </>
  )
}

Triangles.getLayout = function getLayout(page: ReactElement) {
  return <ProcessingLayout>{page}</ProcessingLayout>
}
