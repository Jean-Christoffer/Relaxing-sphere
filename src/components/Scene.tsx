"use client";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import axios from "axios";
import { useState, useEffect, Suspense } from "react";
import Particles from "./Particles";
import { Html, useProgress } from "@react-three/drei";

export default function Scene() {
  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");

  function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  }
  useEffect(() => {
    axios.get("/vertexShader.glsl").then((res) => setVertex(res.data));
    axios.get("/fragmentShader.glsl").then((res) => setFragment(res.data));
  }, []);

  if (vertex == "" || fragment == "") return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ position: "relative" }}
      gl={{
        powerPreference: "high-performance",
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false,
      }}
    >
      <color attach="background" args={["#141414"]} />
      <Suspense fallback={<Loader />}>
        <Particles
          fragmentShader={fragment}
          vertexShader={vertex}
          count={4500}
        />
      </Suspense>

      <EffectComposer multisampling={0}>
        <Noise opacity={0.03} />
      </EffectComposer>
    </Canvas>
  );
}
