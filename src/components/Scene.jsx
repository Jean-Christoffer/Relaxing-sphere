"use client";
import { EffectComposer, Noise } from "@react-three/postprocessing";

import { Canvas } from "@react-three/fiber";
import axios from "axios";
import { useState, useEffect } from "react";
import Particles from "./Particles";

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
      camera={{ position: [0, 0, 5] }}
      gl={{
        powerPreference: "high-performance",
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false,
      }}
    >
      <color attach="background" args={["#141414"]} />


      <Particles fragmentShader={fragment} vertexShader={vertex} count={4500} />
      <EffectComposer multisampling={0} disableNormalPass={true}>
        <Noise opacity={0.03} />
      </EffectComposer>
    </Canvas>
  );
}
