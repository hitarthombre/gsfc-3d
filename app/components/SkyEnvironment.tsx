"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function SkyEnvironment() {
  const { scene } = useThree();

  const env = useTexture("/env/sky.jpg"); // MUST be placed in /public/env/sky.jpg
  env.mapping = THREE.EquirectangularReflectionMapping;

  useEffect(() => {
    scene.environment = env;
    scene.background = env;
  }, [env]);

  return null;
}
