// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

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
import FirstPersonController from "./components/FirstPersonController";

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
