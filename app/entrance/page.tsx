// // "use client";

// // import { Canvas } from "@react-three/fiber";
// // import FirstPersonController from "../components/FirstPersonController";
// // import SkyEnvironment from "../components/SkyEnvironment";
// // import { useGLTF } from "@react-three/drei";
// // import * as THREE from "three";

// // function AnvikshaModel() {
// //   const { scene } = useGLTF("/models/Anviksha.glb");

// //   // Debug print
// //   console.log("Anviksha model loaded:", scene);

// //   // Ensure model is visible
// //   scene.traverse((obj: any) => {
// //     if (obj.isMesh) {
// //       obj.castShadow = true;
// //       obj.receiveShadow = true;
// //       obj.material.side = THREE.DoubleSide;
// //     }
// //   });

// //   // Fix model scaling/position if needed
// //   scene.scale.set(1, 1, 1); // Increase if model is tiny
// //   scene.position.set(0, 0, 0); // Center it
// //   scene.rotation.set(0, 0, 0); // Reset rotation

// //   return <primitive object={scene} />;
// // }

// // export default function Page() {
// //   return (
// //     <div style={{ width: "100vw", height: "100vh" }}>
// //       <Canvas shadows camera={{ fov: 70, position: [0, 1.7, 5] }}>
// //         {/* Background Sky + Environment Lighting */}
// //         <SkyEnvironment />

// //         {/* Soft light to help baked textures */}
// //         <ambientLight intensity={0.5} />
// //         <directionalLight position={[20, 40, 20]} intensity={1} castShadow />

// //         <FirstPersonController />
// //         <AnvikshaModel />
// //       </Canvas>
// //     </div>
// //   );
// // }

// "use client";

// import { Canvas, useThree } from "@react-three/fiber";
// import { useGLTF, useTexture } from "@react-three/drei";
// import * as THREE from "three";
// import FirstPersonController from "../components/FirstPersonController";

// function SkyBackground() {
//   const tex = useTexture("/env/sky.jpg");
//   const { scene } = useThree();
//   scene.background = tex;
//   return null;
// }

// function EntranceModel() {
//   const { scene } = useGLTF("/models/Anviksha.glb");

//   scene.traverse((obj) => {
//     if (obj.isMesh) {
//       obj.castShadow = true;
//       obj.receiveShadow = true;
//     }

//     // ⭐ HIDE all colliders in Three.js
//     if (obj.name === "Collider") {
//       obj.visible = false; // hide only stair collider
//       obj.userData.isWall = true;
//     }

//     if (obj.name === "GroundCollider") {
//       obj.visible = true; // floor stays visible
//       obj.userData.isWall = true; // but works as a collider
//     }

//     if (obj.name === "StairCollider1") {
//       obj.visible = false; // floor stays visible
//       obj.userData.isWall = true; // but works as a collider
//     }
//   });

//   return <primitive object={scene} />;
// }

// export default function Page() {
//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <Canvas shadows camera={{ fov: 75, position: [2, 1.7, 15] }}>
//         <SkyBackground />

//         {/* FPS Controller */}
//         <FirstPersonController />

//         {/* Sun Light */}
//         <directionalLight
//           position={[10, 20, 10]}
//           intensity={1.5}
//           castShadow
//           shadow-mapSize-width={2048}
//           shadow-mapSize-height={2048}
//         />

//         {/* Ambient Light */}
//         <ambientLight intensity={0.4} />

//         {/* The GLB model */}
//         <EntranceModel />
//       </Canvas>
//     </div>
//   );
// }

"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import FirstPersonController from "../components/FirstPersonController";

// ---------------------------
// SKY BACKGROUND
// ---------------------------
function SkyBackground() {
  const tex = useTexture("/env/sky.jpg");
  const { scene } = useThree();
  scene.background = tex;
  return null;
}

// ---------------------------
// MODEL + COLLIDER HANDLING
// ---------------------------
function EntranceModel() {
  const { scene } = useGLTF("/models/Anviksha.glb");

  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;

    if (mesh.isMesh) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (mesh.material) {
        (mesh.material as THREE.Material).side = THREE.DoubleSide;
      }
    }

    // Hide stair colliders
    if (
      mesh.name === "Collider" ||
      mesh.name === "StairCollider1" ||
      mesh.name === "StairCollider2"
    ) {
      mesh.visible = false;
      mesh.userData.isCollider = true;
    }

    // Visible colliders
    if (
      mesh.name === "AnvikshaBaseCollider" ||
      mesh.name === "AnvikshaBaseCollider1"
    ) {
      mesh.visible = true;
      mesh.userData.isCollider = true;
    }

    if (mesh.name.includes("GroundCollider")) {
      mesh.visible = true;
      mesh.userData.isCollider = true;
    }
  });

  return <primitive object={scene} />;
}

// ---------------------------
// MAIN PAGE CANVAS
// ---------------------------
export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ fov: 75, position: [0, 3, 10] }}>
        <SkyBackground />

        {/* FIXED hemisphereLight */}
        <hemisphereLight args={["#ffffff", "#ffffff", 1.5]} />

        <ambientLight intensity={0.4} />

        <directionalLight
          position={[10, 20, 10]}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <FirstPersonController />
        <EntranceModel />
      </Canvas>
    </div>
  );
}
