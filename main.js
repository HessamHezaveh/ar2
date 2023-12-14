import {loadGLTF} from "./src/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () =>{
    const start = async() => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: './assets/targets.mind',
        });
        const {renderer, scene, camera} = mindarThree;
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const istanbul = await loadGLTF("./assets/GLTF/scene.gltf");
        istanbul.scene.scale.set(0.1, 0.1, 0.1);
        istanbul.scene.position.set(0, -0.4, 0);

        const istanbulAnchor = mindarThree.addAnchor(0);
        istanbulAnchor.group.add(istanbul.scene);


        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
            renderer.render(scene, camera);
        });
    }
    start();
})