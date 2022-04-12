import * as THREE from '../assets/js/build/three.module.js';

import { GLTFLoader } from '../assets/js/lib/gltf/loader/GLTFLoader.js';
import { OrbitControls } from '../assets/js/lib/orbit/controls/OrbitControls.js';
import Stats from '../assets/js/stats.module.js';

const CHARACTER_DIRECTIONS = {
    forward: 'forward',
    backward: 'backward',
    left: 'left',
    right: 'right'
}

export class Main {
    constructor() {
        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;

        this.mixer = null;
        this.actions = null;
        this.activeAction = null;
        this.previousAction = null;

        this.walkSpeed = 1.5;
        this.rotationSpeed = 1.5;

        this.clock = new THREE.Clock();

        this.api = { state: 'Idle' };
    }

    setCamera() {
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 150, -400);
    }

    setScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x050505);
        this.scene.fog = new THREE.Fog(0x050505, 400, 1000);
    }

    setLights() {
        const ambienteLight = new THREE.AmbientLight(0x404040); // soft white light
        this.scene.add(ambienteLight);

        this.scene.add(new THREE.AmbientLight(0x222222));

        const centralLight = new THREE.SpotLight(0xffffff, 5, 1000);
        this.centralLight = centralLight;
        centralLight.position.set(0, 500, 250);
        centralLight.angle = 0.5;
        centralLight.penumbra = 0.5;

        centralLight.castShadow = true;
        centralLight.shadow.mapSize.width = 1024;
        centralLight.shadow.mapSize.height = 1024;

        // this.scene.add( new THREE.CameraHelper( centralLight.shadow.camera ) );
        this.scene.add(centralLight);
    }

    setGround() {
        var gt = new THREE.TextureLoader().load('assets/hexagon-pavers/hexagon-pavers1_albedo.png');
        var gg = new THREE.PlaneBufferGeometry(2000, 2000);
        var gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: gt });

        var ground = new THREE.Mesh(gg, gm);
        ground.rotation.x = - Math.PI / 2;
        ground.material.map.repeat.set(5, 5);
        ground.material.map.wrapS = ground.material.map.wrapT = THREE.RepeatWrapping;
        ground.receiveShadow = true;

        this.scene.add(ground);
    }

    setRender() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        this.container.appendChild(this.renderer.domElement);

        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.shadowMap.enabled = true;
    }

    setRenderizationStats() {
        const enableStats = false;

        if (!enableStats) return;

        this.stats = new Stats();
        this.container.appendChild(this.stats.dom);
    }

    setOrbitControl() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 50, 0);
        this.controls.update();
    }

    loadCharacter() {
        const loader = new GLTFLoader();

        loader.load('./assets/roboto/RobotExpressive.glb', gltf => {
            this.character = gltf.scene;
            this.scene.add(this.character);
            this.character.scale.set(10, 10, 10);
            this.loadAnimations(this.character, gltf.animations);
            this.characterState.rotation.y = this.character.rotation.y;
            this.characterState.rotation.x = this.character.rotation.x;
            this.centralLight.target = this.character;
        }, undefined, e => {
            console.error(e);
        });
    }

    updateCharacterState() {
        this.characterState.rotation.y = this.character.rotation.y;
        this.characterState.rotation.x = this.character.rotation.x;
        this.characterState.direction = this.characterState.animateRotating.goal;
    }

    setEvents() {
        window.addEventListener('resize', e => this.onWindowResize(e), false);
        window.addEventListener('keydown', e => this.onDocumentKeyDown(e), false);
        window.addEventListener('keyup', e => this.onDocumentKeyUp(e), false);
    }

    resetAlpha() {
        this.alpha = 0;
    }

    increaseAlpha() {
        this.alpha += 0.1;
    }

    getAlpha() {
        return this.alpha;
    }

    calculateLerp() {
        return Math.sin(this.getAlpha());
    }

    init() {
        this.container = document.createElement('div');
        document.body.appendChild(this.container);

        this.setCamera();
        this.setScene();
        this.setLights();
        this.setGround();
        this.setRender();
        this.setRenderizationStats();
        this.setOrbitControl();
        this.loadCharacter();

        this.setEvents();

        this.resetAlpha();

        this.characterState = {
            direction: CHARACTER_DIRECTIONS.forward,
            rotation: {
                y: 0,
                x: 0
            },
            rotating: false,
            animateRotating: {
                direction: null,
                times: 0,
                goal: null,
                fix: 0
            }
        }

        this.animate();
    }

    characterWalk(direction, value) {
        this.character.position[direction] += value;
    }

    onWindowResize() {
        this.SCREEN_WIDTH = window.innerWidth;
        this.SCREEN_HEIGHT = window.innerHeight;

        this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

        this.camera.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
        this.camera.updateProjectionMatrix();
    }

    rotateLeft() {
        if (this.characterState.direction == CHARACTER_DIRECTIONS.forward) {
            this.characterState.animateRotating = {
                direction: CHARACTER_DIRECTIONS.left,
                times: 1
            }
        } else if (this.characterState.direction == CHARACTER_DIRECTIONS.right) {
            this.characterState.animateRotating = {
                direction: CHARACTER_DIRECTIONS.left,
                times: 2
            }
        } else if (this.characterState.direction == CHARACTER_DIRECTIONS.backward) {
            this.characterState.animateRotating = {
                direction: CHARACTER_DIRECTIONS.right,
                times: 1
            }
        }

        if (this.characterState.direction != CHARACTER_DIRECTIONS.left) {
            this.characterState.animateRotating.goal = CHARACTER_DIRECTIONS.left;
            this.characterState.animateRotating.fix = 1.5;
            this.characterState.rotating = true;
            this.resetAlpha();
        }

        this.characterWalk('x', this.walkSpeed);

        return {
            state: 'Walking'
        }
    }

    rotateRight() {
        if (this.characterState.direction == CHARACTER_DIRECTIONS.forward) {
            this.characterState.animateRotating = {
                direction: CHARACTER_DIRECTIONS.right,
                times: 1
            }
        } else if (this.characterState.direction == CHARACTER_DIRECTIONS.left) {
            this.characterState.animateRotating = {
                direction: CHARACTER_DIRECTIONS.right,
                times: 2
            }
        } else if (this.characterState.direction == CHARACTER_DIRECTIONS.backward) {
            this.characterState.animateRotating = {
                direction: CHARACTER_DIRECTIONS.left,
                times: 1
            }
        }

        if (this.characterState.direction != CHARACTER_DIRECTIONS.right) {
            this.characterState.animateRotating.goal = CHARACTER_DIRECTIONS.right;
            this.characterState.animateRotating.fix = -1.5;
            this.characterState.rotating = true;
            this.resetAlpha();
        }

        this.characterWalk('x', -this.walkSpeed);

        return {
            state: 'Walking'
        }
    }

    rotateFront() {
        if (this.characterState.direction == CHARACTER_DIRECTIONS.left) {
            this.characterState.animateRotating = {
                direction: CHARACTER_DIRECTIONS.right,
                times: 1
            }
        } else if (this.characterState.direction == CHARACTER_DIRECTIONS.right) {
            this.characterState.animateRotating = {
                direction: CHARACTER_DIRECTIONS.left,
                times: 1
            }
        } else if (this.characterState.direction == CHARACTER_DIRECTIONS.backward) {
            this.characterState.animateRotating = {
                direction: CHARACTER_DIRECTIONS.right,
                times: 2
            }
        }

        if (this.characterState.direction != CHARACTER_DIRECTIONS.forward) {
            this.characterState.animateRotating.goal = CHARACTER_DIRECTIONS.forward;
            this.characterState.animateRotating.fix = 0;
            this.characterState.rotating = true;
            this.resetAlpha();
        }

        this.characterWalk('z', this.walkSpeed);

        return {
            state: 'Walking'
        }
    }

    rotateBack() {
        if (this.characterState.direction == CHARACTER_DIRECTIONS.left) {
            this.characterState.animateRotating = {
                direction: CHARACTER_DIRECTIONS.left,
                times: 1
            }
        } else if (this.characterState.direction == CHARACTER_DIRECTIONS.right) {
            this.characterState.animateRotating = {
                direction: CHARACTER_DIRECTIONS.right,
                times: 1
            }
        } else if (this.characterState.direction == CHARACTER_DIRECTIONS.forward) {
            this.characterState.animateRotating = {
                direction: CHARACTER_DIRECTIONS.right,
                times: 2
            }
        }

        if (this.characterState.direction != CHARACTER_DIRECTIONS.backward) {
            this.characterState.animateRotating.goal = CHARACTER_DIRECTIONS.backward;
            this.characterState.animateRotating.fix = 3;
            this.characterState.rotating = true;
            this.resetAlpha();
        }

        this.characterWalk('z', -this.walkSpeed);

        return {
            state: 'Walking'
        }
    }

    jumpCharacter() {

        return {
            state: 'Jump'
        }
    }

    onDocumentKeyDown(e) {
        let newAnimation = { state: 'Idle' };
        
        switch (e.key) {
            case 'a':
                newAnimation = this.rotateLeft();
                break;
            case 'd':
                newAnimation = this.rotateRight();
                break;
            case 'w':
                newAnimation = this.rotateFront();
                break;
            case 's':
                newAnimation = this.rotateBack();
                break;
            case ' ':
                newAnimation = this.jumpCharacter();
                break;
        }

        if (newAnimation.state != this.api.state) {
            this.api.state = newAnimation.state;
            this.fadeToAction(this.api.state, 0.5);
        }
    }

    onDocumentKeyUp(e) {
        var newAnimation = { state: 'Idle' };

        if (newAnimation.state != this.api.state) {
            this.api.state = newAnimation.state;
            this.fadeToAction(this.api.state, 0.5);
        }
    }

    loadAnimations(character, animations) {
        var states = ['Idle', 'Walking'];

        this.mixer = new THREE.AnimationMixer(character);

        this.actions = {};

        for (var i = 0; i < animations.length; i++) {
            var clip = animations[i];
            var action = this.mixer.clipAction(clip);
            this.actions[clip.name] = action;
            if (states.indexOf(clip.name) >= 3) {
                action.clampWhenFinished = true;
                action.loop = THREE.LoopOnce;
            }
        }

        this.activeAction = this.actions['Idle'];
        this.activeAction.play();
    }

    fadeToAction(name, duration) {
        this.previousAction = this.activeAction;
        this.activeAction = this.actions[name];

        if (this.previousAction !== this.activeAction) {
            this.previousAction.fadeOut(duration);
        }

        this.activeAction
            .reset()
            .setEffectiveTimeScale(1)
            .setEffectiveWeight(1)
            .fadeIn(duration)
            .play();
    }

    characterRotationAnimate() {
        if (!this.characterState.rotating)
            return;

        const rotationDirection = this.characterState.animateRotating.direction == CHARACTER_DIRECTIONS.right ? -1 : 1;
        const currentRotation = this.characterState.rotation.y;
        const rotationValue = 1.5 * this.characterState.animateRotating.times;
        const rotationEase = (rotationValue * this.calculateLerp() + .01) * rotationDirection;

        this.character.rotation.y = currentRotation + rotationEase;
        const animationIsDone = (rotationDirection > 0) ? rotationEase >= rotationValue : rotationEase <= (-rotationValue)

        if (animationIsDone) {
            this.characterState.rotating = false;
            this.character.rotation.y = currentRotation + rotationValue * rotationDirection;
            this.character.rotation.y = this.characterState.animateRotating.fix;

            this.updateCharacterState();
        }
    }

    animate() {
        var delta = this.clock.getDelta();
        if (this.mixer) this.mixer.update(delta);

        requestAnimationFrame(() => this.animate());

        this.increaseAlpha();
        this.characterRotationAnimate();

        this.renderer.render(this.scene, this.camera);

        if (this.stats) this.stats.update();
        this.controls.update();
    }

}