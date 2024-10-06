"use client";
import {
  EffectComposer,
  Noise,
  Vignette,
  Bloom,
} from "@react-three/postprocessing";

import { Canvas } from "@react-three/fiber";
import axios from "axios";
import { useState, useEffect } from "react";
import Sphere from "./Sphere";

export default function Scene() {
  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");

  useEffect(() => {
    axios.get("/vertexShader.glsl").then((res) => setVertex(res.data));
    axios.get("/fragmentShader.glsl").then((res) => setFragment(res.data));
  }, []);

  if (vertex == "" || fragment == "") return null;

  return (
    <Canvas
      colorManagement
      camera={{ position: [0, 0, 7] }}
      gl={{
        powerPreference: "high-performance",
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false,
      }}
    >
      <color attach="background" args={["#141414"]} />
        <ambientLight  intensity={1.5}/>
      <Sphere vertex={vertex} fragment={fragment} />

      <EffectComposer multisampling={0} disableNormalPass={true}>
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={500}
          opacity={1}
        />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
}
