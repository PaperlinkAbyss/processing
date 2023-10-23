export default function generateTriangleGrid() {
  let svg = "<svg className='w-screen mx-auto' width='100vw' height='100vh'>"
  let counter = 0
  const cols = 50,
    rows = 600,
    h = 50
  const border = `<path d='M 0,0 L ${h} ${h / 2}'></path>`
  svg += border
  for (let i = 0; i < cols; i++) {
    //Creates a triangle of points ABC in the shape of: >, The point A being the top corner, B being the right corner, C being the bottom corner
    //Generates a grid-shape in the form of:
    /*
        >
         >
        >
         >
        >
        */
    let [a, b, c] = [
      //A = starts from 0 + i times the height since the point A of triangle ABC overlaps with DEF triangle since C=D
      //Meanwhile A on the Y coordinate is either h/2 or 0 so it starts on the middle alternatingly > then the following starts from B point of ABC >
      [Number((0 + i * h).toFixed(2)), -h + ((i + 1) % 2 == 0 ? Number((h / 2).toFixed(2)) : 0)],
      //B starts from height + h times the number of triangles
      // Same thing on the Y axes as A. Either h/2 or 0
      [
        Number((h + h * i).toFixed(2)),
        -h + Number((h / 2).toFixed(2)) + ((i + 1) % 2 == 0 ? Number((h / 2).toFixed(2)) : 0),
      ],
      //The point c has the same coordinates as A but Y coordinate is h away from A
      [
        0 + Number((i * h).toFixed(2)),
        -h + Number(h.toFixed(2)) + ((i + 1) % 2 == 0 ? Number((h / 2).toFixed(2)) : 0),
      ],
    ]
    for (let j = 0; j < rows; j++) {
      //Generates a grid in the shape of:
      /*
            <
             <
            <
             <
            <
             <
            <
             <
            <
             <
            <
            */
      svg += `<polygon points="${a[0]}, ${a[1]}, ${b[0]}, ${b[1]}, ${c[0]}, ${c[1]}" fill="black" id="${counter}"/>`
      counter++
      //Makes it so next triangle is fliped: if we flip the triangle ABC in the shape of > it will become a < shaped triangle,
      //the edges DEF of the < triangle would actually share 2 corners with ABC: B and C, so we only need to calculate the F corner which would be based the
      //b corner coordinates + height
      ;[a, b, c] = [b, c, [b[0], b[1] + Number(h.toFixed(2))]]
    }
    //In total generates a grid of triangles like:
    /*
        ><><><
        <><><>
        ><><><
        <><><>
        ><><><
        <><><>
        */
  }
  svg += '</svg>'
  return svg
}
