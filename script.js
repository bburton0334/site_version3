// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
            e.preventDefault();
            
                const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.work-item, .timeline-item, .skill-category, .contact-method');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}

// Navigation
class Navigation {
    constructor() {
        this.nav = document.querySelector('.header');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.nav.style.background = 'rgba(0, 0, 0, 0.98)';
                this.nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                this.nav.style.background = 'rgba(0, 0, 0, 0.95)';
                this.nav.style.boxShadow = 'none';
            }
        });

        // Active navigation highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        });
    }
}

// Form Handling
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
            e.preventDefault();
                this.handleSubmit();
            });

            // Floating labels
            const inputs = this.form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        input.parentElement.classList.remove('focused');
                    }
                });
            });
        }
    }

    handleSubmit() {
        const formData = new FormData(this.form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
            this.showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
            this.showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
        // Simulate form submission
        this.showNotification('Thank you! Your message has been sent.', 'success');
        this.form.reset();
        
        // Reset floating labels
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.parentElement.classList.remove('focused');
        });
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Work Item Interactions
class WorkInteractions {
    constructor() {
        this.init();
    }

    init() {
        const workItems = document.querySelectorAll('.work-item');
        
        workItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateWorkItem(item, 'enter');
            });
            
            item.addEventListener('mouseleave', () => {
                this.animateWorkItem(item, 'leave');
            });
        });
    }

    animateWorkItem(item, action) {
        const overlay = item.querySelector('.work-overlay');
        const details = item.querySelector('.work-details');
        
        if (action === 'enter') {
            overlay.style.opacity = '1';
            details.style.transform = 'translateY(0)';
            details.style.opacity = '1';
        } else {
            overlay.style.opacity = '0';
            details.style.transform = 'translateY(20px)';
            details.style.opacity = '0';
        }
    }
}

// Glow Shape Animation
class GlowShapeAnimation {
    constructor() {
        this.init();
    }

    init() {
        const glowShape = document.querySelector('.glow-shape');
        if (!glowShape) return;

        // Mouse move effect
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const x = (clientX / innerWidth - 0.5) * 20;
            const y = (clientY / innerHeight - 0.5) * 20;
            
            glowShape.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });

        // Scroll effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            glowShape.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
        });
    }
}

// Typing Effect
class TypingEffect {
    constructor() {
        this.init();
    }

    init() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
        }
    }
}

// Sidebar Interactions
class SidebarInteractions {
    constructor() {
        this.init();
    }

    init() {
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        
        sidebarLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateX(10px)';
                link.style.color = '#ff6b35';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateX(0)';
                link.style.color = '#ffffff';
            });
        });
    }
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.work-item, .skill-category');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.02);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// YouTube Videos
class YouTubeVideos {
    constructor() {
        // Use configuration if available, otherwise use defaults
        this.config = typeof YOUTUBE_CONFIG !== 'undefined' ? YOUTUBE_CONFIG : {
            channelHandle: '@Sayintt',
            channelId: 'UC123456789',
            apiKey: null,
            maxResults: 12,
            enableRSS: true,
            enableAPI: false,
            enableScraping: true
        };
        
        this.channelHandle = this.config.channelHandle;
        this.channelId = this.config.channelId;
        this.apiKey = this.config.apiKey;
        this.maxResults = this.config.maxResults;
        this.init();
    }

    init() {
        this.loadVideos();
    }

    async loadVideos() {
        const videosGrid = document.getElementById('videosGrid');
        
        if (!videosGrid) return;

        // Try RSS method first (if enabled)
        if (this.config.enableRSS) {
            try {
                const videos = await this.getRSSVideos();
                if (videos && videos.length > 0) {
                    this.displayVideos(videos);
                    return;
                }
            } catch (error) {
                console.error('RSS fetch failed:', error);
            }
        }

        // Try YouTube API method (if enabled and API key is available)
        if (this.config.enableAPI && this.apiKey) {
            try {
                const apiVideos = await this.getYouTubeVideos();
                if (apiVideos && apiVideos.length > 0) {
                    this.displayVideos(apiVideos);
                    return;
                }
            } catch (apiError) {
                console.error('YouTube API failed:', apiError);
            }
        }

        // Try scraping method as fallback (if enabled)
        if (this.config.enableScraping) {
            try {
                const scrapedVideos = await this.getVideosFromScraping();
                if (scrapedVideos && scrapedVideos.length > 0) {
                    this.displayVideos(scrapedVideos);
                    return;
                }
            } catch (scrapingError) {
                console.error('Scraping failed:', scrapingError);
            }
        }

        // If all methods fail, show error
        this.showError();
    }

    async getYouTubeVideos() {
        // This method requires a YouTube Data API key
        // You can get one from: https://console.cloud.google.com/apis/credentials
        if (!this.apiKey) {
            throw new Error('YouTube API key not configured');
        }

        // First, get the channel ID from the handle
        const channelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.channelHandle}&type=channel&key=${this.apiKey}`
        );
        
        if (!channelResponse.ok) {
            throw new Error('Failed to fetch channel info');
        }

        const channelData = await channelResponse.json();
        if (!channelData.items || channelData.items.length === 0) {
            throw new Error('Channel not found');
        }

        const channelId = channelData.items[0].snippet.channelId;

        // Get videos from the channel
        const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${this.maxResults}&order=date&type=video&key=${this.apiKey}`
        );

        if (!videosResponse.ok) {
            throw new Error('Failed to fetch videos');
        }

        const videosData = await videosResponse.json();
        
        // Get video details including duration
        const videoIds = videosData.items.map(item => item.id.videoId).join(',');
        const detailsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${this.apiKey}`
        );

        if (!detailsResponse.ok) {
            throw new Error('Failed to fetch video details');
        }

        const detailsData = await detailsResponse.json();
        
        // Combine the data
        return videosData.items.map((item, index) => {
            const details = detailsData.items[index];
            return {
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                duration: this.formatDuration(details.contentDetails.duration),
                publishedAt: item.snippet.publishedAt,
                viewCount: this.formatViewCount(details.statistics.viewCount),
                description: item.snippet.description
            };
        });
    }

    async getRSSVideos() {
        // Method using YouTube RSS feed (no API key required)
        // We'll try multiple approaches to get your videos
        
        const possibleUrls = [
            // Try different RSS feed formats
            `https://www.youtube.com/feeds/videos.xml?channel_id=${this.getChannelIdFromRSS()}`,
            `https://www.youtube.com/feeds/videos.xml?user=${this.channelHandle.replace('@', '')}`,
            // Alternative RSS endpoints
            `https://www.youtube.com/feeds/videos.xml?channel_id=${this.getAlternativeChannelId()}`
        ];

        for (const rssUrl of possibleUrls) {
            try {
                const videos = await this.fetchFromRSS(rssUrl);
                if (videos && videos.length > 0) {
                    return videos;
                }
            } catch (error) {
                console.log(`RSS attempt failed for ${rssUrl}:`, error);
                continue;
            }
        }

        // If all RSS attempts fail, try scraping approach
        return await this.getVideosFromScraping();
    }

    async fetchFromRSS(rssUrl) {
        try {
            // Use a CORS proxy to avoid CORS issues
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const response = await fetch(proxyUrl + encodeURIComponent(rssUrl), {
                timeout: 10000
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            // Check for parsing errors
            const parseError = xmlDoc.querySelector('parsererror');
            if (parseError) {
                throw new Error('XML parsing failed');
            }
            
            const entries = xmlDoc.querySelectorAll('entry');
            const videos = [];

            entries.forEach((entry, index) => {
                if (index >= this.maxResults) return;
                
                const title = entry.querySelector('title')?.textContent || '';
                const published = entry.querySelector('published')?.textContent || '';
                const videoId = entry.querySelector('yt\\:videoId')?.textContent || 
                               entry.querySelector('videoId')?.textContent || '';
                
                if (videoId && title) {
                    videos.push({
                        id: videoId,
                        title: this.cleanTitle(title),
                        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                        duration: 'N/A', // RSS doesn't include duration
                        publishedAt: published,
                        viewCount: 'N/A', // RSS doesn't include view count
                        description: entry.querySelector('media\\:description')?.textContent || ''
                    });
                }
            });

            return videos;
        } catch (error) {
            console.error('RSS fetch error:', error);
            throw error;
        }
    }

    async getVideosFromScraping() {
        // Alternative method: try to get videos by scraping the channel page
        // This is a fallback when RSS doesn't work
        try {
            const channelUrl = `https://www.youtube.com/${this.channelHandle}`;
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const response = await fetch(proxyUrl + encodeURIComponent(channelUrl));
            
            if (!response.ok) {
                throw new Error('Failed to fetch channel page');
            }

            const html = await response.text();
            
            // Look for video data in the page
            const videoPattern = /"videoId":"([^"]+)"/g;
            const titlePattern = /"title":"([^"]+)"/g;
            
            const videoIds = [...html.matchAll(videoPattern)].map(match => match[1]);
            const titles = [...html.matchAll(titlePattern)].map(match => match[1]);
            
            const videos = [];
            for (let i = 0; i < Math.min(videoIds.length, this.maxResults); i++) {
                if (videoIds[i] && titles[i]) {
                    videos.push({
                        id: videoIds[i],
                        title: this.cleanTitle(titles[i]),
                        thumbnail: `https://img.youtube.com/vi/${videoIds[i]}/hqdefault.jpg`,
                        duration: 'N/A',
                        publishedAt: new Date().toISOString(),
                        viewCount: 'N/A',
                        description: ''
                    });
                }
            }
            
            return videos;
        } catch (error) {
            console.error('Scraping failed:', error);
            throw error;
        }
    }

    getChannelIdFromRSS() {
        // Use the configured channel ID
        return this.channelId;
    }

    getAlternativeChannelId() {
        // Use the configured channel ID as alternative
        return this.channelId;
    }

    cleanTitle(title) {
        // Clean up video titles
        return title
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .trim();
    }

    formatDuration(duration) {
        // Convert ISO 8601 duration to readable format
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = (match[1] || '').replace('H', '');
        const minutes = (match[2] || '').replace('M', '');
        const seconds = (match[3] || '').replace('S', '');
        
        let result = '';
        if (hours) result += hours + ':';
        result += (minutes || '0').padStart(2, '0') + ':';
        result += (seconds || '0').padStart(2, '0');
        
        return result;
    }

    formatViewCount(count) {
        const num = parseInt(count);
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    displayVideos(videos) {
        const videosGrid = document.getElementById('videosGrid');
        
        if (!videosGrid) return;

        videosGrid.innerHTML = '';

        videos.forEach(video => {
            const videoCard = this.createVideoCard(video);
            videosGrid.appendChild(videoCard);
        });
    }

    createVideoCard(video) {
        const card = document.createElement('div');
        card.className = 'video-card fade-in-up';
        
        const publishedDate = new Date(video.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                <div class="video-play-button">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="video-meta">
                    <span>${publishedDate}</span>
                    <span class="video-duration">${video.duration}</span>
                </div>
            </div>
        `;

        // Add click event to open video
        card.addEventListener('click', () => {
            this.openVideo(video);
        });

        return card;
    }

    openVideo(video) {
        // Open the specific video on YouTube
        const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
        window.open(videoUrl, '_blank');
    }

    showError() {
        const videosGrid = document.getElementById('videosGrid');
        
        if (!videosGrid) return;

        videosGrid.innerHTML = `
            <div class="video-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Unable to load videos</h3>
                <p>Please check your internet connection and try again.</p>
                <a href="https://www.youtube.com/@Sayintt" class="btn btn-accent" target="_blank">
                    <i class="fab fa-youtube"></i>
                    <span>Visit Channel</span>
                </a>
            </div>
        `;
    }
}

// Initialize all classes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SmoothScroll();
    new ScrollAnimations();
    new Navigation();
    new ContactForm();
    new WorkInteractions();
    new GlowShapeAnimation();
    new TypingEffect();
    new SidebarInteractions();
    new ParallaxEffects();
    new YouTubeVideos();
});

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 10000;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background: rgba(16, 185, 129, 0.9);
        border-color: #10B981;
    }
    
    .notification-error {
        background: rgba(239, 68, 68, 0.9);
        border-color: #EF4444;
    }
    
    .work-details {
        transform: translateY(0);
        opacity: 1;
        transition: all 0.3s ease;
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-group.focused label {
        top: -0.5rem;
        left: 0.5rem;
        font-size: 0.8rem;
        color: #ff6b35;
        background: #000000;
        padding: 0 0.5rem;
    }
    
    .sidebar-link {
        transition: all 0.3s ease;
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet); 