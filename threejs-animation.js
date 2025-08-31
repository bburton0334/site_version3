// Three.js Animation for Hero Background
class ThreeJSAnimation {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.planets = [];
        this.sun = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.frameCount = 0;
        
        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        const canvas = document.getElementById('threejs-canvas');
        const container = canvas.parentElement;
        
        // Scene setup
        this.scene = new THREE.Scene();
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        
        // Renderer setup with optimizations
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: false, // Disable antialiasing for better performance
            powerPreference: "high-performance"
        });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limit pixel ratio
        this.renderer.setClearColor(0x000000, 0);
        
        // Create central sun
        this.createSun();
        
        // Create planets with rings
        this.createPlanets();
        
        // Create floating particles
        this.createParticles();
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        // Add point light
        const pointLight = new THREE.PointLight(0xff6b35, 1, 100);
        pointLight.position.set(0, 0, 10);
        this.scene.add(pointLight);
    }

    createSun() {
        const sunGroup = new THREE.Group();
        
        // Create main sun sphere
        const sunGeometry = new THREE.SphereGeometry(0.8, 16, 16);
        const sunMaterial = new THREE.MeshPhongMaterial({
            color: 0xff8c42,
            emissive: 0xff6b35,
            emissiveIntensity: 0.6, // Increased from 0.3
            transparent: true,
            opacity: 0.9
        });
        
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        sunGroup.add(sun);
        
        // Create outer glow ring
        const glowGeometry = new THREE.RingGeometry(1.2, 1.5, 32);
        const glowMaterial = new THREE.MeshPhongMaterial({
            color: 0xff4500,
            emissive: 0xff4500,
            emissiveIntensity: 0.6, // Increased from 0.4
            transparent: true,
            opacity: 0.8, // Increased from 0.6
            side: THREE.DoubleSide
        });
        
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.rotation.x = Math.PI / 2;
        sunGroup.add(glow);
        
        // Create inner corona
        const coronaGeometry = new THREE.RingGeometry(0.9, 1.1, 24);
        const coronaMaterial = new THREE.MeshPhongMaterial({
            color: 0xff6347,
            emissive: 0xff6347,
            emissiveIntensity: 0.7, // Increased from 0.5
            transparent: true,
            opacity: 0.9, // Increased from 0.7
            side: THREE.DoubleSide
        });
        
        const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
        corona.rotation.x = Math.PI / 2;
        sunGroup.add(corona);
        
        // Create additional outer glow layer
        const outerGlowGeometry = new THREE.RingGeometry(1.6, 2.0, 32);
        const outerGlowMaterial = new THREE.MeshPhongMaterial({
            color: 0xff4500,
            emissive: 0xff4500,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        
        const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
        outerGlow.rotation.x = Math.PI / 2;
        sunGroup.add(outerGlow);
        
        // Create sun flare effect
        const flareGeometry = new THREE.RingGeometry(0.7, 0.85, 16);
        const flareMaterial = new THREE.MeshPhongMaterial({
            color: 0xff7f50,
            emissive: 0xff7f50,
            emissiveIntensity: 0.8,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
        });
        
        const flare = new THREE.Mesh(flareGeometry, flareMaterial);
        flare.rotation.x = Math.PI / 2;
        sunGroup.add(flare);
        
        // Position at center
        sunGroup.position.set(0, 0, 0);
        
        // Store animation data
        sunGroup.userData = {
            sun: sun,
            glow: glow,
            corona: corona,
            outerGlow: outerGlow,
            flare: flare
        };
        
        this.sun = sunGroup;
        this.scene.add(sunGroup);
    }

    createPlanets() {
        const planetCount = 3;
        
        for (let i = 0; i < planetCount; i++) {
            const planetGroup = new THREE.Group();
            
            // Create planet with wireframe style
            const planetRadius = 0.3 + Math.random() * 0.2;
            const planetGeometry = new THREE.SphereGeometry(planetRadius, 12, 12);
            const planetMaterial = new THREE.MeshBasicMaterial({
                color: 0xff6b35,
                wireframe: true,
                transparent: true,
                opacity: 0.8
            });
            
            const planet = new THREE.Mesh(planetGeometry, planetMaterial);
            planetGroup.add(planet);
            
            // Create additional wireframe layers for more geometric effect
            const innerGeometry = new THREE.SphereGeometry(planetRadius * 0.8, 8, 8);
            const innerMaterial = new THREE.MeshBasicMaterial({
                color: 0xff4500,
                wireframe: true,
                transparent: true,
                opacity: 0.6
            });
            
            const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
            planetGroup.add(innerSphere);
            
            // Create geometric rings (for some planets)
            if (Math.random() > 0.3) { // 70% chance of rings
                const ringCount = 2 + Math.floor(Math.random() * 2); // 2-3 rings
                
                for (let j = 0; j < ringCount; j++) {
                    const ringRadius = planetRadius * 1.5 + j * 0.1;
                    const ringThickness = 0.02;
                    const ringGeometry = new THREE.RingGeometry(ringRadius - ringThickness, ringRadius + ringThickness, 16);
                    const ringMaterial = new THREE.MeshBasicMaterial({
                        color: 0xff4500,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.6,
                        side: THREE.DoubleSide
                    });
                    
                    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                    ring.rotation.x = Math.PI / 2; // Rotate to be horizontal
                    ring.position.y = (j - ringCount / 2) * 0.05; // Stack rings slightly
                    planetGroup.add(ring);
                }
            }
            
            // Create geometric connection lines
            const lineCount = 6;
            for (let k = 0; k < lineCount; k++) {
                const angle = (k / lineCount) * Math.PI * 2;
                const startPoint = new THREE.Vector3(
                    Math.cos(angle) * planetRadius,
                    Math.sin(angle) * planetRadius,
                    0
                );
                const endPoint = new THREE.Vector3(
                    Math.cos(angle) * planetRadius,
                    Math.sin(angle) * planetRadius,
                    planetRadius * 0.5
                );
                
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);
                const lineMaterial = new THREE.LineBasicMaterial({
                    color: 0xff6347,
                    transparent: true,
                    opacity: 0.7
                });
                
                const line = new THREE.Line(lineGeometry, lineMaterial);
                planetGroup.add(line);
            }
            
            // Create geometric grid pattern
            const gridGeometry = new THREE.SphereGeometry(planetRadius * 1.1, 6, 6);
            const gridMaterial = new THREE.MeshBasicMaterial({
                color: 0xff8c42,
                wireframe: true,
                transparent: true,
                opacity: 0.4
            });
            
            const gridSphere = new THREE.Mesh(gridGeometry, gridMaterial);
            planetGroup.add(gridSphere);
            
            // Position planet in orbit around the sun
            const angle = (i / planetCount) * Math.PI * 2;
            const orbitRadius = 3 + Math.random() * 1;
            const height = (Math.random() - 0.5) * 2;
            
            planetGroup.position.set(
                Math.cos(angle) * orbitRadius,
                height,
                Math.sin(angle) * orbitRadius
            );
            
            // Store animation data
            planetGroup.userData = {
                originalPosition: { x: planetGroup.position.x, y: planetGroup.position.y, z: planetGroup.position.z },
                orbitRadius: orbitRadius,
                orbitSpeed: 0.1 + Math.random() * 0.2,
                rotationSpeed: 0.02 + Math.random() * 0.03,
                orbitAngle: angle,
                innerSphere: innerSphere,
                gridSphere: gridSphere
            };
            
            this.planets.push(planetGroup);
            this.scene.add(planetGroup);
        }
    }

    createParticles() {
        const particleCount = 150; // Increased from 80
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        const speeds = new Float32Array(particleCount); // Add speed for optimization
        const depths = new Float32Array(particleCount); // Add depth for 3D positioning
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Create 3D depth layers relative to sun position (0,0,0)
            let radius, height;
            
            // Distribute stars in different orbital layers around the sun
            if (i < particleCount * 0.3) {
                // Close stars (near sun, inside planet orbits)
                radius = 1.5 + Math.random() * 1.5;
                height = (Math.random() - 0.5) * 1;
            } else if (i < particleCount * 0.6) {
                // Medium distance stars (around planet orbits)
                radius = 3 + Math.random() * 2;
                height = (Math.random() - 0.5) * 1.5;
            } else {
                // Far stars (beyond planets, background)
                radius = 5 + Math.random() * 3;
                height = (Math.random() - 0.5) * 2;
            }
            
            const angle = Math.random() * Math.PI * 2;
            
            // Position stars in 3D space relative to sun at (0,0,0)
            positions[i3] = Math.cos(angle) * radius;
            positions[i3 + 1] = height;
            positions[i3 + 2] = Math.sin(angle) * radius;
            
            // Orange/red theme colors with more variety
            const colorChoices = [0xff6b35, 0xff4500, 0xff8c42, 0xff6347, 0xff7f50, 0xffa500, 0xff8c00];
            const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
            colors[i3] = (color >> 16) / 255;
            colors[i3 + 1] = ((color >> 8) & 255) / 255;
            colors[i3 + 2] = (color & 255) / 255;
            
            // Size based on distance from sun (closer = larger)
            const distanceFactor = Math.max(0.1, 1 - (radius / 8));
            sizes[i] = (Math.random() * 0.04 + 0.01) * distanceFactor;
            speeds[i] = Math.random() * 0.3 + 0.2; // Slower individual speeds
            depths[i] = radius; // Store depth for animation
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
        geometry.setAttribute('depth', new THREE.BufferAttribute(depths, 1));
        
        const material = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.frameCount++;
        const time = Date.now() * 0.001;
        
        // Optimize: Only update every other frame for some animations
        const shouldUpdate = this.frameCount % 2 === 0;
        
        // Animate sun
        if (this.sun && shouldUpdate) {
            const { sun, glow, corona, outerGlow, flare } = this.sun.userData;
            
            // Rotate sun slowly
            this.sun.rotation.y += 0.005;
            
            // Pulsing glow effect
            const pulse = 0.3 + Math.sin(time * 2) * 0.2;
            sun.material.emissiveIntensity = pulse;
            
            // Rotate glow ring
            glow.rotation.z += 0.01;
            glow.material.opacity = 0.6 + Math.sin(time * 1.5) * 0.2;
            
            // Rotate corona
            corona.rotation.z -= 0.015;
            corona.material.opacity = 0.7 + Math.sin(time * 2.5) * 0.2;

            // Rotate outer glow
            outerGlow.rotation.z += 0.008;
            outerGlow.material.opacity = 0.4 + Math.sin(time * 1.8) * 0.2;

            // Rotate flare
            flare.rotation.z += 0.01;
            flare.material.opacity = 0.6 + Math.sin(time * 2.2) * 0.2;
        }
        
        // Animate planets
        this.planets.forEach((planet, index) => {
            const userData = planet.userData;
            
            // Orbit around center (sun)
            const newAngle = userData.orbitAngle + time * userData.orbitSpeed;
            planet.position.x = Math.cos(newAngle) * userData.orbitRadius;
            planet.position.z = Math.sin(newAngle) * userData.orbitRadius;
            
            // Rotate planet on its axis (slower)
            planet.rotation.y += userData.rotationSpeed * 0.3;
            
            // Rotate inner sphere at different speed (slower)
            if (userData.innerSphere) {
                userData.innerSphere.rotation.y -= userData.rotationSpeed * 0.2;
                userData.innerSphere.rotation.x += userData.rotationSpeed * 0.15;
            }
            
            // Rotate grid sphere at different speed (slower)
            if (userData.gridSphere) {
                userData.gridSphere.rotation.y += userData.rotationSpeed * 0.4;
                userData.gridSphere.rotation.z -= userData.rotationSpeed * 0.1;
            }
            
            // Subtle floating motion
            planet.position.y = userData.originalPosition.y + Math.sin(time * 1.2 + index) * 0.1;
            
            // Animate rings if they exist (optimized)
            if (shouldUpdate) {
                planet.children.forEach(child => {
                    if (child.geometry instanceof THREE.RingGeometry) {
                        child.rotation.z += 0.003; // Slower ring rotation
                        child.material.opacity = 0.6 + Math.sin(time * 2 + index) * 0.2;
                    }
                });
            }
        });
        
        // Animate particles (optimized)
        if (this.particles && shouldUpdate) {
            this.particles.rotation.y = time * 0.005; // Much slower overall rotation
            this.particles.rotation.x = time * 0.002;
            
            // Update particle positions for 3D orbital motion
            const positions = this.particles.geometry.attributes.position.array;
            const speeds = this.particles.geometry.attributes.speed.array;
            const depths = this.particles.geometry.attributes.depth.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                const speed = speeds[i / 3];
                const depth = depths[i / 3];
                
                // Calculate orbital motion based on depth (very slow)
                const orbitalSpeed = 0.002 + (speed * 0.001); // Much slower orbital motion
                const currentAngle = Math.atan2(positions[i + 2], positions[i]) + orbitalSpeed;
                
                // Update position based on orbital motion
                positions[i] = Math.cos(currentAngle) * depth;
                positions[i + 2] = Math.sin(currentAngle) * depth;
                
                // Add very subtle floating motion
                positions[i + 1] += Math.sin(time * 0.2 * speed + i) * 0.0002;
                
                // Keep stars within bounds
                if (Math.abs(positions[i + 1]) > 3) {
                    positions[i + 1] = -positions[i + 1] * 0.8;
                }
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }
        
        // Smooth mouse movement (optimized)
        if (shouldUpdate) {
            this.targetX += (this.mouseX - this.targetX) * 0.05;
            this.targetY += (this.mouseY - this.targetY) * 0.05;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Touch movement for mobile
        document.addEventListener('touchmove', (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            this.mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            const container = document.getElementById('threejs-canvas').parentElement;
            
            this.camera.aspect = container.clientWidth / container.clientHeight;
            this.camera.updateProjectionMatrix();
            
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        });
    }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThreeJSAnimation();
}); 