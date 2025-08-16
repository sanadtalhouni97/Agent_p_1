// Use global variables from CDN imports
// THREE, gsap, and Router are now available globally

class GamingUniverse {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationId = null;
        this.currentPage = 'home';
        
        // Initialize router
        this.router = new Router();
        
        this.init();
        this.setupEventListeners();
        this.setupMobileNavigation();
    }

    init() {
        // Initialize Three.js scene
        this.setupThreeJS();
        
        // Show loading screen
        this.showLoadingScreen();
        
        // Handle page changes
        this.handlePageChange();
        
        // Fallback: if loading takes too long, force start
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen && loadingScreen.style.display !== 'none') {
                console.log('Loading timeout - forcing start');
                loadingScreen.style.display = 'none';
                this.startHomeAnimation();
            }
        }, 5000); // 5 second timeout
    }

    setupThreeJS() {
        try {
            // Create scene
            this.scene = new THREE.Scene();
            
            // Create camera
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.camera.position.z = 5;
            
            // Create renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setClearColor(0x000000, 0);
            
            // Add renderer to DOM
            const container = document.querySelector('.three-container');
            if (container) {
                container.appendChild(this.renderer.domElement);
            } else {
                console.error('Three.js container not found');
            }
            
            // Handle window resize
            window.addEventListener('resize', () => this.onWindowResize());
            
            // Add ambient light
            const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
            this.scene.add(ambientLight);
            
        } catch (error) {
            console.error('Error setting up Three.js:', error);
        }
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const loadingProgress = document.querySelector('.loading-progress');
        
        // Add error handling
        if (!loadingScreen || !loadingProgress) {
            console.error('Loading screen elements not found');
            this.startHomeAnimation();
            return;
        }
        
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            if (loadingProgress) {
                loadingProgress.style.width = progress + '%';
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // Hide loading screen with animation
                if (loadingScreen) {
                    gsap.to(loadingScreen, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            loadingScreen.style.display = 'none';
                            this.startHomeAnimation();
                        }
                    });
                } else {
                    this.startHomeAnimation();
                }
            }
        }, 100);
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    this.router.navigate(href);
                }
            });
        });

        // Hero buttons
        document.querySelectorAll('.btn-primary, .btn-secondary, .btn-tertiary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const href = btn.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    this.router.navigate(href);
                }
            });
        });

        // Card interactions
        this.setupCardInteractions();

        // Handle page change events
        window.addEventListener('pageChange', (e) => {
            this.handlePageChange(e.detail.page);
        });
    }

    setupMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.classList.add('menu-open');
                } else {
                    document.body.classList.remove('menu-open');
                }
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (navMenu.classList.contains('active') && 
                    !hamburger.contains(e.target) && 
                    !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });

            // Prevent menu from closing when clicking inside it
            navMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    setupCardInteractions() {
        // Add hover effects to all cards
        const cardSelectors = [
            '.hero-card', '.weapon-card', '.agent-card', '.champion-card',
            '.fortnite-card', '.overwatch-card', '.pubg-card',
            '.news-card', '.tournament-card', '.stream-card', '.merch-card'
        ];

        cardSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(card => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        scale: 1.02,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        });
    }

    handlePageChange(page = 'home') {
        // Stop current animation
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        // Clear scene
        while(this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }

        // Create new scene based on page
        switch(page) {
            case 'home':
                this.createHomeScene();
                break;
            case 'dota2':
                this.createDota2Scene();
                break;
            case 'csgo2':
                this.createCSGO2Scene();
                break;
            case 'valorant':
                this.createValorantScene();
                break;
            case 'league':
                this.createLeagueScene();
                break;
            case 'fortnite':
                this.createFortniteScene();
                break;
            case 'overwatch':
                this.createOverwatchScene();
                break;
            case 'pubg':
                this.createPUBGScene();
                break;
            case 'news':
                this.createNewsScene();
                break;
            case 'tournaments':
                this.createTournamentsScene();
                break;
            case 'streams':
                this.createStreamsScene();
                break;
            case 'merchandise':
                this.createMerchandiseScene();
                break;
            case 'contacts':
                this.createContactsScene();
                break;
            case 'about':
                this.createAboutScene();
                break;
            default:
                this.createHomeScene();
        }

        this.currentPage = page;
        this.animate();
    }

    createHomeScene() {
        // Create multiple floating spheres with different colors
        const colors = [0x4a90e2, 0x7b68ee, 0xff6b6b, 0x50c878, 0xffd700];
        
        for (let i = 0; i < 15; i++) {
            const geometry = new THREE.SphereGeometry(Math.random() * 0.5 + 0.2, 32, 32);
            const material = new THREE.MeshBasicMaterial({ 
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.7
            });
            const sphere = new THREE.Mesh(geometry, material);
            
            sphere.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10
            );
            
            sphere.userData = {
                speed: Math.random() * 0.02 + 0.01,
                rotationSpeed: Math.random() * 0.02 + 0.01
            };
            
            this.scene.add(sphere);
        }

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
    }

    createDota2Scene() {
        // Create red-themed particle system
        const particleCount = 200;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;
            
            colors[i] = Math.random() * 0.5 + 0.5; // Red
            colors[i + 1] = Math.random() * 0.3; // Green
            colors[i + 2] = Math.random() * 0.3; // Blue
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        this.scene.add(particleSystem);

        // Add magical orbs
        for (let i = 0; i < 8; i++) {
            const geometry = new THREE.SphereGeometry(0.3, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: 0xff4444,
                transparent: true,
                opacity: 0.6
            });
            const orb = new THREE.Mesh(geometry, material);
            
            orb.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10
            );
            
            orb.userData = {
                speed: Math.random() * 0.01 + 0.005,
                rotationSpeed: Math.random() * 0.02 + 0.01
            };
            
            this.scene.add(orb);
        }
    }

    createCSGO2Scene() {
        // Create geometric shapes representing tactical gameplay
        const shapes = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.ConeGeometry(0.5, 1, 8),
            new THREE.CylinderGeometry(0.3, 0.3, 1, 8),
            new THREE.OctahedronGeometry(0.5)
        ];
        
        const colors = [0x4a90e2, 0x2c3e50, 0x34495e, 0x7f8c8d];
        
        for (let i = 0; i < 12; i++) {
            const geometry = shapes[Math.floor(Math.random() * shapes.length)];
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                wireframe: true,
                transparent: true,
                opacity: 0.7
            });
            const shape = new THREE.Mesh(geometry, material);
            
            shape.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10
            );
            
            shape.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            shape.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                }
            };
            
            this.scene.add(shape);
        }
    }

    createValorantScene() {
        // Create neon wireframe effects
        const wireframeGeometry = new THREE.SphereGeometry(3, 32, 32);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const wireframeSphere = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        this.scene.add(wireframeSphere);

        // Add particle system
        const particleCount = 150;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 15;
            positions[i + 1] = (Math.random() - 0.5) * 15;
            positions[i + 2] = (Math.random() - 0.5) * 15;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x00ff88,
            transparent: true,
            opacity: 0.8
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        this.scene.add(particleSystem);

        // Add floating cubes
        for (let i = 0; i < 6; i++) {
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ff88,
                wireframe: true,
                transparent: true,
                opacity: 0.6
            });
            const cube = new THREE.Mesh(geometry, material);
            
            cube.position.set(
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 8
            );
            
            cube.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.03,
                    y: (Math.random() - 0.5) * 0.03,
                    z: (Math.random() - 0.5) * 0.03
                }
            };
            
            this.scene.add(cube);
        }
    }

    createLeagueScene() {
        // Create magical torus
        const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({
            color: 0xffd700,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        this.scene.add(torus);

        // Add floating orbs
        for (let i = 0; i < 10; i++) {
            const geometry = new THREE.SphereGeometry(0.2, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: 0xffd700,
                transparent: true,
                opacity: 0.7
            });
            const orb = new THREE.Mesh(geometry, material);
            
            orb.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
            );
            
            orb.userData = {
                speed: Math.random() * 0.01 + 0.005,
                rotationSpeed: Math.random() * 0.02 + 0.01
            };
            
            this.scene.add(orb);
        }
    }

    createFortniteScene() {
        // Create colorful battle royale scene
        const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4, 0xfeca57];
        
        for (let i = 0; i < 20; i++) {
            const geometry = new THREE.SphereGeometry(Math.random() * 0.8 + 0.2, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.6
            });
            const sphere = new THREE.Mesh(geometry, material);
            
            sphere.position.set(
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 15
            );
            
            sphere.userData = {
                speed: Math.random() * 0.015 + 0.005,
                rotationSpeed: Math.random() * 0.02 + 0.01
            };
            
            this.scene.add(sphere);
        }
    }

    createOverwatchScene() {
        // Create futuristic polygonal elements
        const shapes = [
            new THREE.OctahedronGeometry(0.5),
            new THREE.TetrahedronGeometry(0.4),
            new THREE.IcosahedronGeometry(0.3)
        ];
        
        const colors = [0x4a90e2, 0xff6b6b, 0x50c878, 0xffd700];
        
        for (let i = 0; i < 15; i++) {
            const geometry = shapes[Math.floor(Math.random() * shapes.length)];
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                wireframe: true,
                transparent: true,
                opacity: 0.7
            });
            const shape = new THREE.Mesh(geometry, material);
            
            shape.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10
            );
            
            shape.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.03,
                    y: (Math.random() - 0.5) * 0.03,
                    z: (Math.random() - 0.5) * 0.03
                }
            };
            
            this.scene.add(shape);
        }
    }

    createPUBGScene() {
        // Create military-themed battle royale
        const colors = [0x8b4513, 0x228b22, 0x2f4f4f, 0x696969];
        
        for (let i = 0; i < 18; i++) {
            const geometry = new THREE.BoxGeometry(
                Math.random() * 1 + 0.5,
                Math.random() * 1 + 0.5,
                Math.random() * 1 + 0.5
            );
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.6
            });
            const box = new THREE.Mesh(geometry, material);
            
            box.position.set(
                (Math.random() - 0.5) * 22,
                (Math.random() - 0.5) * 22,
                (Math.random() - 0.5) * 12
            );
            
            box.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            box.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                }
            };
            
            this.scene.add(box);
        }
    }

    createNewsScene() {
        // Create news-themed scene with floating elements
        const colors = [0x4a90e2, 0x7b68ee, 0xff6b6b, 0x50c878];
        
        for (let i = 0; i < 12; i++) {
            const geometry = new THREE.SphereGeometry(Math.random() * 0.6 + 0.3, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.5
            });
            const sphere = new THREE.Mesh(geometry, material);
            
            sphere.position.set(
                (Math.random() - 0.5) * 18,
                (Math.random() - 0.5) * 18,
                (Math.random() - 0.5) * 8
            );
            
            sphere.userData = {
                speed: Math.random() * 0.01 + 0.005,
                rotationSpeed: Math.random() * 0.015 + 0.005
            };
            
            this.scene.add(sphere);
        }
    }

    createTournamentsScene() {
        // Create tournament-themed scene with golden elements
        for (let i = 0; i < 10; i++) {
            const geometry = new THREE.SphereGeometry(Math.random() * 0.8 + 0.4, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: 0xffd700,
                transparent: true,
                opacity: 0.6
            });
            const sphere = new THREE.Mesh(geometry, material);
            
            sphere.position.set(
                (Math.random() - 0.5) * 16,
                (Math.random() - 0.5) * 16,
                (Math.random() - 0.5) * 8
            );
            
            sphere.userData = {
                speed: Math.random() * 0.008 + 0.003,
                rotationSpeed: Math.random() * 0.01 + 0.005
            };
            
            this.scene.add(sphere);
        }
    }

    createStreamsScene() {
        // Create streaming-themed scene with red elements
        const colors = [0xff4655, 0xff6b6b, 0xff4757, 0xff3838];
        
        for (let i = 0; i < 14; i++) {
            const geometry = new THREE.SphereGeometry(Math.random() * 0.7 + 0.3, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.6
            });
            const sphere = new THREE.Mesh(geometry, material);
            
            sphere.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10
            );
            
            sphere.userData = {
                speed: Math.random() * 0.012 + 0.006,
                rotationSpeed: Math.random() * 0.018 + 0.008
            };
            
            this.scene.add(sphere);
        }
    }

    createMerchandiseScene() {
        // Create merchandise-themed scene with orange elements
        const colors = [0xe74c3c, 0xff6b6b, 0xff7f50, 0xff6347];
        
        for (let i = 0; i < 16; i++) {
            const geometry = new THREE.BoxGeometry(
                Math.random() * 0.8 + 0.4,
                Math.random() * 0.8 + 0.4,
                Math.random() * 0.8 + 0.4
            );
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.5
            });
            const box = new THREE.Mesh(geometry, material);
            
            box.position.set(
                (Math.random() - 0.5) * 24,
                (Math.random() - 0.5) * 24,
                (Math.random() - 0.5) * 12
            );
            
            box.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            box.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.025,
                    y: (Math.random() - 0.5) * 0.025,
                    z: (Math.random() - 0.5) * 0.025
                }
            };
            
            this.scene.add(box);
        }
    }

    createContactsScene() {
        // Create contact-themed scene with blue elements
        const colors = [0x4a90e2, 0x7b68ee, 0x5dade2, 0x3498db];
        
        for (let i = 0; i < 12; i++) {
            const geometry = new THREE.SphereGeometry(Math.random() * 0.6 + 0.3, 16, 16);
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.6
            });
            const sphere = new THREE.Mesh(geometry, material);
            
            sphere.position.set(
                (Math.random() - 0.5) * 18,
                (Math.random() - 0.5) * 18,
                (Math.random() - 0.5) * 8
            );
            
            sphere.userData = {
                speed: Math.random() * 0.01 + 0.005,
                rotationSpeed: Math.random() * 0.015 + 0.005
            };
            
            this.scene.add(sphere);
        }
    }

    createAboutScene() {
        // Create about-themed scene with tech elements
        const shapes = [
            new THREE.BoxGeometry(0.8, 0.8, 0.8),
            new THREE.SphereGeometry(0.4, 16, 16),
            new THREE.ConeGeometry(0.3, 0.8, 8)
        ];
        
        const colors = [0x4a90e2, 0x7b68ee, 0x50c878, 0xffd700];
        
        for (let i = 0; i < 15; i++) {
            const geometry = shapes[Math.floor(Math.random() * shapes.length)];
            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                wireframe: true,
                transparent: true,
                opacity: 0.6
            });
            const shape = new THREE.Mesh(geometry, material);
            
            shape.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10
            );
            
            shape.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                }
            };
            
            this.scene.add(shape);
        }
    }

    startHomeAnimation() {
        // Start the home page animation
        this.createHomeScene();
        this.animate();
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Animate all objects in the scene
        this.scene.children.forEach(child => {
            if (child.userData.speed) {
                child.position.y += child.userData.speed;
                if (child.position.y > 10) {
                    child.position.y = -10;
                }
            }
            
            if (child.userData.rotationSpeed) {
                if (typeof child.userData.rotationSpeed === 'object') {
                    child.rotation.x += child.userData.rotationSpeed.x;
                    child.rotation.y += child.userData.rotationSpeed.y;
                    child.rotation.z += child.userData.rotationSpeed.z;
                } else {
                    child.rotation.x += child.userData.rotationSpeed;
                    child.rotation.y += child.userData.rotationSpeed;
                }
            }
        });
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GamingUniverse();
});
