import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const matName = mesh.material && (mesh.material as any).name ? (mesh.material as any).name : "";
                
                // Material.027 is shoes. default is shared across the desk, face, and clothes.
                // We only want to turn the shirt (Cube.002), pants (Cube.004) and ankles/socks (Cylinder.005, Cylinder.008) black.
                const isBlackClothing = (matName === "Material.027") || 
                  (matName === "default" && ["Cube.002", "Cube.004", "Cylinder.005", "Cylinder.008"].includes(mesh.name));

                if (isBlackClothing && mesh.material) {
                  const blackColor = new THREE.Color("#111111");
                  if (Array.isArray(mesh.material)) {
                    mesh.material = mesh.material.map((m: any) => {
                      const newM = m.clone();
                      if (newM.color) newM.color.copy(blackColor);
                      return newM;
                    });
                  } else {
                    mesh.material = (mesh.material as THREE.Material).clone();
                    if ((mesh.material as any).color) {
                      (mesh.material as any).color.copy(blackColor);
                    }
                  }
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
