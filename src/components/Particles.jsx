"use client";
import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { PositionalAudio, Html } from "@react-three/drei";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import * as THREE from "three";

export default function Particles({ vertexShader, fragmentShader, count }) {
  const points = useRef();
  const [play, setPlay] = useState(false);

  const analyzer = useRef();
  const sound = useRef(null);

  const playMusic = () => {
    if (play) {
      sound?.current?.pause();
    } else {
      sound?.current?.play();
    }
    setPlay(!play);
  };

  useEffect(() => {
    if (sound.current) {
      analyzer.current = new THREE.AudioAnalyser(sound.current, 128);
    }
  }, [sound]);

  const radius = 1;

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random()) * radius;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      let x = distance * Math.sin(theta) * Math.cos(phi);
      let y = distance * Math.sin(theta) * Math.sin(phi);
      let z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uRadius: {
        value: radius,
      },
      uColor: {
        value: new THREE.Vector3(Math.random(), Math.random()).normalize(),
      },
      uIntensity: {
        value: 0.5,
      },
      uIntensityY: {
        value: 0.5,
      },
    }),
    []
  );
  useEffect(() => {
    // Update the target color every 10 seconds
    const interval = setInterval(() => {
      targetColor.set(Math.random(), Math.random(), 1.0).normalize();
    }, 20000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const targetColor = useMemo(
    () => new THREE.Vector3(Math.random(), Math.random(), 1.0),
    []
  );
  useFrame((state, delta) => {
    const { clock, pointer } = state;

    // Update time uniform
    uniforms.uTime.value = clock.elapsedTime;

    // Smoothly damp towards the target color
    uniforms.uColor.value.x = THREE.MathUtils.damp(
      uniforms.uColor.value.x,
      targetColor.x,
      1.0,
      delta
    );
    uniforms.uColor.value.y = THREE.MathUtils.damp(
      uniforms.uColor.value.y,
      targetColor.y,
      1.0,
      delta
    );
    uniforms.uColor.value.z = THREE.MathUtils.damp(
      uniforms.uColor.value.z,
      targetColor.z,
      1,
      delta
    );
    if (analyzer.current && analyzer.current.data) {
      let freq = analyzer.current.getAverageFrequency() / 5;
      let mouseX = pointer.x * 4;
      let mouseY = pointer.y * 4;

      let resX = play ? freq / 2 : mouseX;
      let resY = play ? freq / 2.5 : mouseY;

      uniforms.uIntensity.value = THREE.MathUtils.damp(
        uniforms.uIntensity.value,
        resX,
        1.0,
        delta
      );

      uniforms.uIntensityY.value = THREE.MathUtils.damp(
        uniforms.uIntensityY.value,
        resY,
        1.0,
        delta
      );
    }

    points.current.material.uniforms.uTime.value = uniforms.uTime.value;
    points.current.material.uniforms.uColor.value = uniforms.uColor.value;
    points.current.material.uniforms.uIntensity.value =
      uniforms.uIntensity.value;
    points.current.material.uniforms.uIntensityY.value =
      uniforms.uIntensityY.value;
  });

  return (
    <>
      <Html as="div" wrapperClass="button-div">
        <button onClick={playMusic}>
          {play ? <PauseIcon /> : <PlayIcon />}
        </button>
      </Html>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <PositionalAudio
        url="/MANTRA.mp3"
        distance={10}
        loop
        ref={sound}
        autoplay={false}
      />
    </>
  );
}
