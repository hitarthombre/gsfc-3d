// "use client";

// import { useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import { useEffect, useRef } from "react";

// export default function FirstPersonController() {
//   const { camera, scene } = useThree();
//   const speed = 0.1;

//   const keys = useRef({
//     forward: false,
//     backward: false,
//     left: false,
//     right: false,
//   });

//   // Raycaster to detect floor height
//   const raycaster = new THREE.Raycaster();

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.code === "KeyW") keys.current.forward = true;
//       if (e.code === "KeyS") keys.current.backward = true;
//       if (e.code === "KeyA") keys.current.left = true;
//       if (e.code === "KeyD") keys.current.right = true;
//     };

//     const handleKeyUp = (e: KeyboardEvent) => {
//       if (e.code === "KeyW") keys.current.forward = false;
//       if (e.code === "KeyS") keys.current.backward = false;
//       if (e.code === "KeyA") keys.current.left = false;
//       if (e.code === "KeyD") keys.current.right = false;
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     document.body.onclick = () => document.body.requestPointerLock();

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, []);

//   // Prevent flipping
//   const pitchLimit = THREE.MathUtils.degToRad(85);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (document.pointerLockElement !== document.body) return;

//       camera.rotation.y -= e.movementX * 0.002;

//       const newPitch = camera.rotation.x - e.movementY * 0.002;
//       camera.rotation.x = THREE.MathUtils.clamp(
//         newPitch,
//         -pitchLimit,
//         pitchLimit
//       );
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, [camera]);

//   const playerHeight = 3;

//   useFrame(() => {
//     // Movement vector
//     let direction = new THREE.Vector3();
//     if (keys.current.forward) direction.z -= 1;
//     if (keys.current.backward) direction.z += 1;
//     if (keys.current.left) direction.x -= 1;
//     if (keys.current.right) direction.x += 1;

//     direction.normalize();
//     direction.applyEuler(new THREE.Euler(0, camera.rotation.y, 0));
//     direction.multiplyScalar(speed);

//     // Move horizontally
//     camera.position.add(direction);

//     // ⭐ AUTO FLOOR DETECTION (STAIR CLIMBING)
//     raycaster.set(
//       new THREE.Vector3(
//         camera.position.x,
//         camera.position.y + 0.5,
//         camera.position.z
//       ),
//       new THREE.Vector3(0, -1, 0)
//     );

//     const hits = raycaster.intersectObjects(scene.children, true);

//     if (hits.length > 0) {
//       const groundY = hits[0].point.y;

//       // Smooth step up/down
//       camera.position.y = THREE.MathUtils.lerp(
//         camera.position.y,
//         groundY + playerHeight,
//         0.3
//       );
//     }
//   });

//   return null;
// }

"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef } from "react";

export default function FirstPersonController() {
  const { camera, scene } = useThree();
  const speed = 0.1;

  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Three raycasters:
  const downRay = new THREE.Raycaster();
  const longRay = new THREE.Raycaster();
  const forwardDownRay = new THREE.Raycaster();

  const playerHeight = 3;

  // -------------------------
  // KEYBOARD
  // -------------------------
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === "KeyW") keys.current.forward = true;
      if (e.code === "KeyS") keys.current.backward = true;
      if (e.code === "KeyA") keys.current.left = true;
      if (e.code === "KeyD") keys.current.right = true;
    };

    const up = (e: KeyboardEvent) => {
      if (e.code === "KeyW") keys.current.forward = false;
      if (e.code === "KeyS") keys.current.backward = false;
      if (e.code === "KeyA") keys.current.left = false;
      if (e.code === "KeyD") keys.current.right = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    document.body.onclick = () => document.body.requestPointerLock();
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // -------------------------
  // MOUSE LOOK
  // -------------------------
  const pitchLimit = THREE.MathUtils.degToRad(85);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (document.pointerLockElement !== document.body) return;

      camera.rotation.y -= e.movementX * 0.002;

      const pitch = camera.rotation.x - e.movementY * 0.002;
      camera.rotation.x = THREE.MathUtils.clamp(pitch, -pitchLimit, pitchLimit);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [camera]);

  // -------------------------
  // MOVEMENT + FIXED STAIRS
  // -------------------------
  useFrame(() => {
    // Movement
    let dir = new THREE.Vector3();
    if (keys.current.forward) dir.z -= 1;
    if (keys.current.backward) dir.z += 1;
    if (keys.current.left) dir.x -= 1;
    if (keys.current.right) dir.x += 1;

    dir.normalize();
    dir.applyEuler(new THREE.Euler(0, camera.rotation.y, 0));
    dir.multiplyScalar(speed);

    camera.position.add(dir);

    // -------------------------
    // RAY 1: Downward ray (normal ground check)
    // -------------------------
    downRay.set(
      new THREE.Vector3(
        camera.position.x,
        camera.position.y - 0.2,
        camera.position.z
      ),
      new THREE.Vector3(0, -1, 0)
    );
    const hitDown = downRay.intersectObjects(scene.children, true);

    // -------------------------
    // RAY 2: Long fallback ray (safety)
    // -------------------------
    longRay.set(
      new THREE.Vector3(
        camera.position.x,
        camera.position.y + 5,
        camera.position.z
      ),
      new THREE.Vector3(0, -1, 0)
    );
    const hitLong = longRay.intersectObjects(scene.children, true);

    // -------------------------
    // ⭐ RAY 3: Forward-down ray (smooth stair going DOWN)
    // -------------------------
    const forward = new THREE.Vector3(0, 0, -1)
      .applyEuler(camera.rotation)
      .normalize();

    const forwardPos = camera.position.clone().add(forward.multiplyScalar(0.6)); // 0.6 meters ahead

    forwardDownRay.set(
      new THREE.Vector3(forwardPos.x, camera.position.y, forwardPos.z),
      new THREE.Vector3(0, -1, 0)
    );

    const hitForward = forwardDownRay.intersectObjects(scene.children, true);

    // figure out groundY
    let groundY = null;

    if (hitForward.length > 0) groundY = hitForward[0].point.y;
    else if (hitDown.length > 0) groundY = hitDown[0].point.y;
    else if (hitLong.length > 0) groundY = hitLong[0].point.y;

    if (groundY === null) return;

    const targetY = groundY + playerHeight;

    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.25);
  });

  return null;
}
