// 3D Game Box Art Renderer
class GameBox3D {
    constructor(containerId, imageUrl) {
        this.containerId = containerId;
        this.imageUrl = imageUrl;
        // Make box larger to fill the container better
        this.width = 10;
        this.height = 200;
        this.thickness = 1;
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.box = null;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);
        
        // Camera setup - adjusted for larger box
        this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
        this.camera.position.set(0, 0, 250);
        
        // Renderer setup - use container dimensions and ensure it stays within bounds
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Ensure the renderer canvas doesn't overflow
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.renderer.domElement.style.maxWidth = '100%';
        this.renderer.domElement.style.maxHeight = '100%';
        
        // Clear container and add renderer
        container.innerHTML = '';
        container.appendChild(this.renderer.domElement);
        
        // Lighting
        this.setupLighting();
        
        // Create 3D box
        this.createBox();
        
        // Start animation
        this.animate();
        
        // Add hover effects
        this.addHoverEffects();
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        
        // Directional light (main light)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(100, 100, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Point light for highlights
        const pointLight = new THREE.PointLight(0xffffff, 0.6);
        pointLight.position.set(-50, 50, 100);
        this.scene.add(pointLight);
    }
    
    createBox() {
        const geometry = new THREE.BoxGeometry(this.width, this.height, this.thickness);
        
        // Create materials for each face in the correct order
        const materials = [];
        
        // Right face (positive X)
        const rightMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x050505,
            transparent: true,
            opacity: 0.7
        });
        materials.push(rightMaterial);
        
        // Left face (negative X)
        const leftMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x050505,
            transparent: true,
            opacity: 0.7
        });
        materials.push(leftMaterial);
        
        // Top face (positive Y)
        const topMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x1a1a1a,
            transparent: true,
            opacity: 0.8
        });
        materials.push(topMaterial);
        
        // Bottom face (negative Y)
        materials.push(topMaterial);
        
        // Front face (positive Z) - THIS IS WHERE THE IMAGE GOES
        const frontTexture = new THREE.TextureLoader().load(this.imageUrl);
        const frontMaterial = new THREE.MeshLambertMaterial({ 
            map: frontTexture,
            transparent: true
        });
        materials.push(frontMaterial);
        
        // Back face (negative Z) - Same image as front
        const backTexture = new THREE.TextureLoader().load(this.imageUrl);
        const backMaterial = new THREE.MeshLambertMaterial({ 
            map: backTexture,
            transparent: true,
            opacity: 0.9
        });
        materials.push(backMaterial);
        
        // Create mesh
        this.box = new THREE.Mesh(geometry, materials);
        this.box.castShadow = true;
        this.box.receiveShadow = true;
        
        // Position and rotate - centered with no initial rotation to show front face
        this.box.position.set(0, 0, 0);
        this.box.rotation.y = 0;
        this.box.rotation.x = 0;
        
        this.scene.add(this.box);
        
        // Add shadow plane - positioned below the box
        const shadowGeometry = new THREE.PlaneGeometry(300, 300);
        const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.2 });
        const shadowPlane = new THREE.Mesh(shadowGeometry, shadowMaterial);
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.position.y = -this.height / 2 - 5;
        shadowPlane.receiveShadow = true;
        this.scene.add(shadowPlane);
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Gentle rotation
        if (this.box) {
            this.box.rotation.y += 0.005;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    addHoverEffects() {
        const container = document.getElementById(this.containerId);
        
        container.addEventListener('mouseenter', () => {
            if (this.box) {
                // Subtle hover animation - gentle tilt with constrained movement
                gsap.to(this.box.rotation, {
                    x: 0.03,
                    y: -0.1,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                gsap.to(this.box.position, {
                    z: 5,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        });
        
        container.addEventListener('mouseleave', () => {
            if (this.box) {
                // Return to original position - no rotation
                gsap.to(this.box.rotation, {
                    x: 0,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                gsap.to(this.box.position, {
                    z: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        });
    }
    
    updateImage(newImageUrl) {
        if (this.box && this.box.material[0]) {
            const newTexture = new THREE.TextureLoader().load(newImageUrl);
            this.box.material[0].map = newTexture;
            this.box.material[0].needsUpdate = true;
        }
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Initialize 3D game boxes when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D boxes for each game card
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach((card, index) => {
        const boxArtContainer = card.querySelector('.game-box-art');
        if (boxArtContainer) {
            // Create unique ID for each container
            const containerId = `game-box-3d-${index}`;
            boxArtContainer.id = containerId;
            
            // Get the image URL from the existing img element
            const imgElement = boxArtContainer.querySelector('.box-art-img');
            if (imgElement && imgElement.src) {
                // Create 3D box
                const gameBox = new GameBox3D(containerId, imgElement.src);
                
                // Store reference for later use
                card.gameBox3D = gameBox;
            }
        }
    });
}); 