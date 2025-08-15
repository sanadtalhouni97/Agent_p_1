import * as THREE from 'three';
import { gsap } from 'gsap';
import Router from './router.js';

// Global variables
let currentScene = null;
let currentRenderer = null;
let currentCamera = null;
let currentControls = null;
let animationId = null;

// Initialize the application
class GamingUniverse {
    constructor() {
        this.router = new Router();
        this.currentPage = 'home';
        this.scenes = {};
        this.renderers = {};
        this.cameras = {};
        this.controls = {};
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.hideLoadingScreen();
        this.initializeScenes();
        
        // Listen for page changes from router
        window.addEventListener('pageChange', (e) => {
            this.handlePageChange(e.detail.page);
        });
    }

    setupEventListeners() {
        // Navigation - use router
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const path = link.getAttribute('href');
                this.router.navigate(path);
            });
        });

        // Mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.onWindowResize();
        });

        // Button interactions
        const exploreBtn = document.querySelector('.btn-primary');
        const highlightsBtn = document.querySelector('.btn-secondary');
        const communityBtn = document.querySelector('.btn-tertiary');
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                this.router.navigate('/dota2');
            });
        }
        
        if (highlightsBtn) {
            highlightsBtn.addEventListener('click', () => {
                this.router.navigate('/csgo2');
            });
        }

        if (communityBtn) {
            communityBtn.addEventListener('click', () => {
                this.router.navigate('/valorant');
            });
        }

        // Add hover effects to cards
        this.setupCardInteractions();
    }

    handlePageChange(pageName) {
        // Stop current animation
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        
        // Start new scene animation
        if (this.scenes[pageName]) {
            this.scenes[pageName].animate();
        }
        
        this.currentPage = pageName;
    }

    setupCardInteractions() {
        const cards = document.querySelectorAll('.hero-card, .weapon-card, .agent-card, .champion-card, .fortnite-card, .overwatch-card, .pubg-card, .news-card, .tournament-card, .stream-card, .merch-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                }
            });
        }, 2000);
    }

    initializeScenes() {
        this.createHomeScene();
        this.createDota2Scene();
        this.createCSGO2Scene();
        this.createValorantScene();
        this.createLeagueScene();
        this.createFortniteScene();
        this.createOverwatchScene();
        this.createPUBGScene();
        this.createNewsScene();
        this.createTournamentsScene();
        this.createStreamsScene();
        this.createMerchandiseScene();
        this.createAboutScene();
        this.createContactsScene();
    }

    createHomeScene() {
        const canvas = document.getElementById('home-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        
        // Create floating gaming icons with different shapes
        const geometries = [
            new THREE.SphereGeometry(1, 32, 32),
            new THREE.BoxGeometry(1.5, 1.5, 1.5),
            new THREE.TorusGeometry(0.8, 0.3, 16, 32),
            new THREE.OctahedronGeometry(1)
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0x4a90e2, transparent: true, opacity: 0.8 }),
            new THREE.MeshPhongMaterial({ color: 0x7b68ee, transparent: true, opacity: 0.8 }),
            new THREE.MeshPhongMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.8 }),
            new THREE.MeshPhongMaterial({ color: 0x50c878, transparent: true, opacity: 0.8 })
        ];
        
        const meshes = [];
        for (let i = 0; i < 25; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
            );
            mesh.scale.setScalar(Math.random() * 0.5 + 0.5);
            scene.add(mesh);
            meshes.push(mesh);
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x4a90e2, 1);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        camera.position.z = 20;
        
        // Animation
        const animate = () => {
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02;
                mesh.position.x += Math.cos(Date.now() * 0.001 + index) * 0.01;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.home = { scene, camera, renderer, animate, meshes };
    }

    createDota2Scene() {
        const canvas = document.getElementById('dota2-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x1a1a2e);
        
        // Create Dota 2 themed scene with magical effects
        const particles = new THREE.BufferGeometry();
        const particleCount = 1500;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 60;
            positions[i + 1] = (Math.random() - 0.5) * 60;
            positions[i + 2] = (Math.random() - 0.5) * 60;
            
            colors[i] = Math.random() * 0.5 + 0.5; // Red
            colors[i + 1] = Math.random() * 0.3; // Green
            colors[i + 2] = Math.random() * 0.3; // Blue
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
        
        // Add magical orbs
        const orbGeometry = new THREE.SphereGeometry(2, 16, 16);
        const orbMaterial = new THREE.MeshPhongMaterial({
            color: 0xff6b6b,
            transparent: true,
            opacity: 0.6
        });
        
        const orbs = [];
        for (let i = 0; i < 5; i++) {
            const orb = new THREE.Mesh(orbGeometry, orbMaterial);
            orb.position.set(
                Math.cos(i * Math.PI * 2 / 5) * 15,
                Math.sin(i * Math.PI * 2 / 5) * 15,
                0
            );
            scene.add(orb);
            orbs.push(orb);
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xff6b6b, 1, 100);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);
        
        camera.position.z = 25;
        
        // Animation
        const animate = () => {
            particleSystem.rotation.y += 0.005;
            particleSystem.rotation.x += 0.002;
            
            orbs.forEach((orb, index) => {
                orb.rotation.x += 0.02;
                orb.rotation.y += 0.02;
                orb.position.y += Math.sin(Date.now() * 0.001 + index) * 0.05;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.dota2 = { scene, camera, renderer, animate, particleSystem, orbs };
    }

    createCSGO2Scene() {
        const canvas = document.getElementById('csgo2-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x2d2d2d);
        
        // Create CS:GO themed scene with tactical elements
        const geometries = [
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.SphereGeometry(1, 16, 16),
            new THREE.ConeGeometry(1, 2, 8),
            new THREE.TorusGeometry(1, 0.3, 8, 16),
            new THREE.CylinderGeometry(0.5, 0.5, 3, 8)
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0x8b4513 }), // Brown
            new THREE.MeshPhongMaterial({ color: 0x696969 }), // Gray
            new THREE.MeshPhongMaterial({ color: 0x2f4f4f }), // Dark slate
            new THREE.MeshPhongMaterial({ color: 0x556b2f }), // Dark olive
            new THREE.MeshPhongMaterial({ color: 0x654321 })  // Dark brown
        ];
        
        const meshes = [];
        for (let i = 0; i < 20; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40
            );
            
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        camera.position.z = 30;
        
        // Animation
        const animate = () => {
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.03;
                mesh.position.x += Math.cos(Date.now() * 0.001 + index) * 0.01;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.csgo2 = { scene, camera, renderer, animate, meshes };
    }

    createValorantScene() {
        const canvas = document.getElementById('valorant-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x1a1a1a);
        
        // Create Valorant themed scene with neon effects
        const geometry = new THREE.PlaneGeometry(25, 25, 25, 25);
        const material = new THREE.MeshPhongMaterial({
            color: 0xff4655,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
        
        // Add neon particles
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 800;
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 50;
            positions[i + 1] = (Math.random() - 0.5) * 50;
            positions[i + 2] = (Math.random() - 0.5) * 50;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.08,
            color: 0x0f1419,
            transparent: true,
            opacity: 0.9
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xff4655, 1, 60);
        pointLight.position.set(0, 15, 15);
        scene.add(pointLight);
        
        camera.position.z = 35;
        
        // Animation
        const animate = () => {
            plane.rotation.x += 0.008;
            plane.rotation.y += 0.008;
            particles.rotation.y += 0.015;
            particles.rotation.x += 0.005;
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.valorant = { scene, camera, renderer, animate, plane, particles };
    }

    createLeagueScene() {
        const canvas = document.getElementById('league-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x0a1428);
        
        // Create League themed scene with magical effects
        const torusGeometry = new THREE.TorusGeometry(6, 1.5, 16, 100);
        const torusMaterial = new THREE.MeshPhongMaterial({
            color: 0xc89b3c,
            transparent: true,
            opacity: 0.8
        });
        
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        scene.add(torus);
        
        // Add floating orbs
        const orbGeometry = new THREE.SphereGeometry(0.8, 16, 16);
        const orbMaterial = new THREE.MeshPhongMaterial({
            color: 0xc89b3c,
            transparent: true,
            opacity: 0.9
        });
        
        const orbs = [];
        for (let i = 0; i < 12; i++) {
            const orb = new THREE.Mesh(orbGeometry, orbMaterial);
            const angle = (i / 12) * Math.PI * 2;
            const radius = 10;
            
            orb.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                0
            );
            
            scene.add(orb);
            orbs.push({ mesh: orb, angle, radius });
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xc89b3c, 1, 60);
        pointLight.position.set(0, 0, 15);
        scene.add(pointLight);
        
        camera.position.z = 25;
        
        // Animation
        const animate = () => {
            torus.rotation.x += 0.015;
            torus.rotation.y += 0.015;
            
            orbs.forEach((orb, index) => {
                orb.angle += 0.025;
                orb.mesh.position.x = Math.cos(orb.angle) * orb.radius;
                orb.mesh.position.y = Math.sin(orb.angle) * orb.radius;
                orb.mesh.rotation.x += 0.02;
                orb.mesh.rotation.y += 0.02;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.league = { scene, camera, renderer, animate, torus, orbs };
    }

    createFortniteScene() {
        const canvas = document.getElementById('fortnite-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x87ceeb);
        
        // Create Fortnite themed scene with colorful elements
        const geometries = [
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.SphereGeometry(2, 16, 16),
            new THREE.ConeGeometry(2, 4, 8),
            new THREE.CylinderGeometry(1, 1, 4, 8)
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0xff6b9d }), // Pink
            new THREE.MeshPhongMaterial({ color: 0x4ecdc4 }), // Turquoise
            new THREE.MeshPhongMaterial({ color: 0x45b7d1 }), // Blue
            new THREE.MeshPhongMaterial({ color: 0x96ceb4 }), // Green
            new THREE.MeshPhongMaterial({ color: 0xfeca57 })  // Yellow
        ];
        
        const meshes = [];
        for (let i = 0; i < 18; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 35,
                (Math.random() - 0.5) * 35,
                (Math.random() - 0.5) * 35
            );
            
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.7);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        camera.position.z = 30;
        
        // Animation
        const animate = () => {
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.015;
                mesh.rotation.y += 0.015;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.04;
                mesh.position.x += Math.cos(Date.now() * 0.001 + index) * 0.02;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.fortnite = { scene, camera, renderer, animate, meshes };
    }

    createOverwatchScene() {
        const canvas = document.getElementById('overwatch-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x2c3e50);
        
        // Create Overwatch themed scene with futuristic elements
        const geometries = [
            new THREE.OctahedronGeometry(2),
            new THREE.TetrahedronGeometry(2),
            new THREE.IcosahedronGeometry(1.5),
            new THREE.DodecahedronGeometry(1.5)
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0xe74c3c }), // Red
            new THREE.MeshPhongMaterial({ color: 0x3498db }), // Blue
            new THREE.MeshPhongMaterial({ color: 0x2ecc71 }), // Green
            new THREE.MeshPhongMaterial({ color: 0xf39c12 }), // Orange
            new THREE.MeshPhongMaterial({ color: 0x9b59b6 })  // Purple
        ];
        
        const meshes = [];
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
            );
            
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        camera.position.z = 25;
        
        // Animation
        const animate = () => {
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.02;
                mesh.rotation.y += 0.02;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.03;
                mesh.position.x += Math.cos(Date.now() * 0.001 + index) * 0.015;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.overwatch = { scene, camera, renderer, animate, meshes };
    }

    createPUBGScene() {
        const canvas = document.getElementById('pubg-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x2d5016);
        
        // Create PUBG themed scene with military elements
        const geometries = [
            new THREE.BoxGeometry(2.5, 2.5, 2.5),
            new THREE.SphereGeometry(1.5, 16, 16),
            new THREE.ConeGeometry(1.5, 3, 8),
            new THREE.CylinderGeometry(1, 1, 3, 8)
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0x8b4513 }), // Brown
            new THREE.MeshPhongMaterial({ color: 0x556b2f }), // Dark olive
            new THREE.MeshPhongMaterial({ color: 0x654321 }), // Dark brown
            new THREE.MeshPhongMaterial({ color: 0x696969 }), // Gray
            new THREE.MeshPhongMaterial({ color: 0x2f4f4f })  // Dark slate
        ];
        
        const meshes = [];
        for (let i = 0; i < 22; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40
            );
            
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        camera.position.z = 35;
        
        // Animation
        const animate = () => {
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.012;
                mesh.rotation.y += 0.012;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.025;
                mesh.position.x += Math.cos(Date.now() * 0.001 + index) * 0.012;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.pubg = { scene, camera, renderer, animate, meshes };
    }

    createAboutScene() {
        const canvas = document.getElementById('about-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x0a0a0a);
        
        // Create tech-themed scene
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshPhongMaterial({
            color: 0x4a90e2,
            transparent: true,
            opacity: 0.8
        });
        
        const cubes = [];
        for (let i = 0; i < 60; i++) {
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.set(
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50
            );
            cube.scale.setScalar(Math.random() * 0.5 + 0.5);
            scene.add(cube);
            cubes.push(cube);
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x4a90e2, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        camera.position.z = 30;
        
        // Animation
        const animate = () => {
            cubes.forEach((cube, index) => {
                cube.rotation.x += 0.015;
                cube.rotation.y += 0.015;
                cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.015;
                cube.position.x += Math.cos(Date.now() * 0.001 + index) * 0.008;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.about = { scene, camera, renderer, animate, cubes };
    }

    createNewsScene() {
        const canvas = document.getElementById('news-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x1a1a2e);
        
        // Create news-themed scene with floating newspapers
        const geometries = [
            new THREE.PlaneGeometry(3, 2),
            new THREE.BoxGeometry(2, 2, 0.1)
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0x4a90e2, transparent: true, opacity: 0.8 }),
            new THREE.MeshPhongMaterial({ color: 0x7b68ee, transparent: true, opacity: 0.8 })
        ];
        
        const meshes = [];
        for (let i = 0; i < 12; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
            );
            
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x4a90e2, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        camera.position.z = 25;
        
        // Animation
        const animate = () => {
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.news = { scene, camera, renderer, animate, meshes };
    }

    createTournamentsScene() {
        const canvas = document.getElementById('tournaments-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x2d5016);
        
        // Create tournament-themed scene with trophy-like objects
        const geometries = [
            new THREE.ConeGeometry(1, 3, 8),
            new THREE.CylinderGeometry(0.5, 0.5, 2, 8),
            new THREE.SphereGeometry(1, 16, 16)
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0xffd700 }), // Gold
            new THREE.MeshPhongMaterial({ color: 0xc0c0c0 }), // Silver
            new THREE.MeshPhongMaterial({ color: 0xcd7f32 })  // Bronze
        ];
        
        const meshes = [];
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffd700, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        camera.position.z = 20;
        
        // Animation
        const animate = () => {
            meshes.forEach((mesh, index) => {
                mesh.rotation.y += 0.02;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.03;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.tournaments = { scene, camera, renderer, animate, meshes };
    }

    createStreamsScene() {
        const canvas = document.getElementById('streams-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x1a1a1a);
        
        // Create streams-themed scene with video-like elements
        const geometries = [
            new THREE.PlaneGeometry(4, 2.5),
            new THREE.BoxGeometry(3, 2, 0.2)
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0xff4655, transparent: true, opacity: 0.7 }),
            new THREE.MeshPhongMaterial({ color: 0x4a90e2, transparent: true, opacity: 0.7 })
        ];
        
        const meshes = [];
        for (let i = 0; i < 10; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xff4655, 1, 50);
        pointLight.position.set(0, 10, 10);
        scene.add(pointLight);
        
        camera.position.z = 25;
        
        // Animation
        const animate = () => {
            meshes.forEach((mesh, index) => {
                mesh.rotation.y += 0.015;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.streams = { scene, camera, renderer, animate, meshes };
    }

    createMerchandiseScene() {
        const canvas = document.getElementById('merchandise-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x2c3e50);
        
        // Create merchandise-themed scene with product-like objects
        const geometries = [
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.CylinderGeometry(1, 1, 1, 8),
            new THREE.SphereGeometry(1, 16, 16)
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0xe74c3c }),
            new THREE.MeshPhongMaterial({ color: 0x3498db }),
            new THREE.MeshPhongMaterial({ color: 0x2ecc71 }),
            new THREE.MeshPhongMaterial({ color: 0xf39c12 })
        ];
        
        const meshes = [];
        for (let i = 0; i < 18; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        camera.position.z = 30;
        
        // Animation
        const animate = () => {
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.025;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.merchandise = { scene, camera, renderer, animate, meshes };
    }

    createContactsScene() {
        const canvas = document.getElementById('contacts-canvas');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x0a0a0a);
        
        // Create contact-themed scene with communication elements
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.8, 16, 16),
            new THREE.TorusGeometry(0.5, 0.2, 8, 16)
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ color: 0x4a90e2, transparent: true, opacity: 0.8 }),
            new THREE.MeshPhongMaterial({ color: 0x7b68ee, transparent: true, opacity: 0.8 }),
            new THREE.MeshPhongMaterial({ color: 0x50c878, transparent: true, opacity: 0.8 })
        ];
        
        const meshes = [];
        for (let i = 0; i < 40; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40
            );
            
            scene.add(mesh);
            meshes.push(mesh);
        }
        
        // Add lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x4a90e2, 0.7);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        camera.position.z = 25;
        
        // Animation
        const animate = () => {
            meshes.forEach((mesh, index) => {
                mesh.rotation.x += 0.012;
                mesh.rotation.y += 0.012;
                mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.015;
            });
            
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        
        this.scenes.contacts = { scene, camera, renderer, animate, meshes };
    }

    onWindowResize() {
        Object.values(this.scenes).forEach(sceneData => {
            if (sceneData.camera && sceneData.renderer) {
                sceneData.camera.aspect = window.innerWidth / window.innerHeight;
                sceneData.camera.updateProjectionMatrix();
                sceneData.renderer.setSize(window.innerWidth, window.innerHeight);
            }
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GamingUniverse();
});
