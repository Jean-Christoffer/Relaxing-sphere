import { Html } from "@react-three/drei";
//TODO Figure out how html works in three :P
export default function Nav() {
  return (
    <Html
    as='header' // Wrapping element (default: 'div')

     // Project content behind the canvas (default: false)
    center={false} // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
    fullscreen={true} // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
    distanceFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
    zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
    transform // If true, applies matrix3d transformations (default=false)
    sprite // Renders as sprite, but only in transform mode (default=false)

  >
    <h1>Nav</h1>

  </Html>
  );
}
