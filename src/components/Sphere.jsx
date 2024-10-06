"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { hsvToRgb } from "../utils";

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
      u_lightDirection: { value: new Vector3(1.0, 1.0, 0.75).normalize() },
      u_lightColor: { value: new Vector3(1.0, 1.0, 1.0) },
      u_lightIntensity: { value: 1.0 },
    }),
    []
  );

  useFrame((state, delta) => {
    const { clock, pointer } = state;
    const elapsedTime = clock.getElapsedTime();

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

    const hue = (elapsedTime * 0.1) % 1.0;
    const saturation = 0.8;
    const value = 1.0;

    const rgbColor = hsvToRgb(hue, saturation, value);
    uniforms.u_lightColor.value.set(
      MathUtils.damp(uniforms.u_lightColor.value.x, rgbColor.x, 5.0, delta),
      MathUtils.damp(uniforms.u_lightColor.value.y, rgbColor.y, 5.0, delta),
      MathUtils.damp(uniforms.u_lightColor.value.z, rgbColor.z, 5.0, delta)
    );
    uniforms.u_time.value = 0.4 * elapsedTime;
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
