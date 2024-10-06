"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

const Sphere = ({ vertex, fragment }) => {
  const mesh = useRef();
  const hover = useRef(false);

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock, pointer } = state;
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
      mesh.current.material.uniforms.u_intensity.value,
      hover.current ? 0.85 : 0.15,
      0.02
    );

    mesh.current.rotation.x = MathUtils.lerp(
      mesh.current.rotation.x,
      pointer.y * Math.PI,
      0.001
    );
    mesh.current.rotation.y = MathUtils.lerp(
      mesh.current.rotation.y,
      pointer.x * Math.PI,
      0.003
    );
  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={1.5}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};
export default Sphere;
