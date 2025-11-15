// Authentication System for WoolCraft
// Handles user registration, login, session management, and protected routes

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('woolcraft-users')) || [];
        this.sessions = JSON.parse(localStorage.getItem('woolcraft-sessions')) || {};
        
        this.init();
    }
    
    init() {
        this.checkCurrentSession();
        this.bindEvents();
        this.updateUI();
    }
    
    // Check if user has an active session
    checkCurrentSession() {
        const sessionToken = localStorage.getItem('woolcraft-session-token');
        if (sessionToken && this.sessions[sessionToken]) {
            const session = this.sessions[sessionToken];
            const user = this.users.find(u => u.email === session.email);
            
            if (user && !this.isSessionExpired(session)) {
                this.currentUser = user;
                return true;
            } else {
                // Clean up expired session
                delete this.sessions[sessionToken];
                localStorage.removeItem('woolcraft-session-token');
                this.saveSessions();
            }
        }
        return false;
    }
    
    // Check if session is expired
    isSessionExpired(session) {
        const now = Date.now();
        const sessionAge = now - session.createdAt;
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        return sessionAge > maxAge;
    }
    
    // Register a new user
    register(userData) {
        const { firstName, lastName, email, password } = userData;
        
        // Validation
        if (!this.validateRegistration(userData)) {
            return false;
        }
        
        // Check if user already exists
        if (this.users.find(u => u.email === email)) {
            this.showError('signup-email-error', 'Email already registered');
            return false;
        }
        
        // Create new user
        const newUser = {
            id: this.generateId(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim(),
            password: this.hashPassword(password),
            createdAt: Date.now(),
            preferences: {
                newsletter: false,
                notifications: true
            }
        };
        
        this.users.push(newUser);
        this.saveUsers();
        
        // Auto-login after registration
        this.login(email, password);
        
        return true;
    }
    
    // Validate registration data
    validateRegistration(userData) {
        const { firstName, lastName, email, password, confirmPassword } = userData;
        let isValid = true;
        
        // Clear previous errors
        this.clearErrors();
        
        // First name validation
        if (!firstName || firstName.trim().length < 2) {
            this.showError('signup-firstname-error', 'First name must be at least 2 characters');
            isValid = false;
        }
        
        // Last name validation
        if (!lastName || lastName.trim().length < 2) {
            this.showError('signup-lastname-error', 'Last name must be at least 2 characters');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            this.showError('signup-email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Password validation
        if (!password || password.length < 8) {
            this.showError('signup-password-error', 'Password must be at least 8 characters long');
            isValid = false;
        }
        
        // Confirm password validation
        if (password !== confirmPassword) {
            this.showError('signup-confirm-password-error', 'Passwords do not match');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Login user
    login(email, password) {
        // Clear previous errors
        this.clearErrors();
        
        const user = this.users.find(u => u.email === email.toLowerCase().trim());
        
        if (!user) {
            this.showError('signin-email-error', 'Email not found');
            return false;
        }
        
        if (user.password !== this.hashPassword(password)) {
            this.showError('signin-password-error', 'Incorrect password');
            return false;
        }
        
        // Create session
        const sessionToken = this.generateSessionToken();
        this.sessions[sessionToken] = {
            email: user.email,
            createdAt: Date.now()
        };
        
        this.currentUser = user;
        localStorage.setItem('woolcraft-session-token', sessionToken);
        this.saveSessions();
        this.updateUI();
        
        // Redirect to home page or previous page
        this.redirectAfterAuth();
        
        return true;
    }
    
    // Logout user
    logout() {
        const sessionToken = localStorage.getItem('woolcraft-session-token');
        if (sessionToken) {
            delete this.sessions[sessionToken];
            localStorage.removeItem('woolcraft-session-token');
            this.saveSessions();
        }
        
        this.currentUser = null;
        this.updateUI();
        
        // Redirect to auth page
        window.location.href = 'auth.html';
    }
    
    // Update UI based on authentication state
    updateUI() {
        const authBtn = document.getElementById('auth-btn');
        const userMenuBtn = document.getElementById('user-menu-btn');
        const usernameDisplay = document.getElementById('username-display');
        const userMenu = document.getElementById('user-menu');
        
        if (this.currentUser) {
            // User is logged in
            if (authBtn) authBtn.classList.add('hidden');
            if (userMenuBtn) {
                userMenuBtn.classList.remove('hidden');
                usernameDisplay.textContent = this.currentUser.firstName;
            }
        } else {
            // User is logged out
            if (authBtn) authBtn.classList.remove('hidden');
            if (userMenuBtn) userMenuBtn.classList.add('hidden');
            if (userMenu) userMenu.classList.add('hidden');
        }
    }
    
    // Show/hide user menu
    toggleUserMenu() {
        const userMenu = document.getElementById('user-menu');
        if (userMenu) {
            userMenu.classList.toggle('hidden');
        }
    }
    
    // Redirect after authentication
    redirectAfterAuth() {
        const returnUrl = localStorage.getItem('woolcraft-return-url');
        if (returnUrl) {
            localStorage.removeItem('woolcraft-return-url');
            window.location.href = returnUrl;
        } else {
            window.location.href = 'index.html';
        }
    }
    
    // Bind event listeners
    bindEvents() {
        // Tab switching
        document.getElementById('signin-tab')?.addEventListener('click', () => this.showSignIn());
        document.getElementById('signup-tab')?.addEventListener('click', () => this.showSignUp());
        document.getElementById('switch-to-signup')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSignUp();
        });
        document.getElementById('switch-to-signin')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSignIn();
        });
        
        // Form submissions
        document.getElementById('signin-submit')?.addEventListener('click', () => this.handleSignIn());
        document.getElementById('signup-submit')?.addEventListener('click', () => this.handleSignUp());
        
        // User menu
        document.getElementById('user-menu-btn')?.addEventListener('click', () => this.toggleUserMenu());
        document.getElementById('logout-btn')?.addEventListener('click', () => this.logout());
        
        // Password visibility toggles
        this.bindPasswordToggles();
        
        // Form validation on input
        this.bindFormValidation();
        
        // Close user menu when clicking outside
        document.addEventListener('click', (e) => {
            const userMenu = document.getElementById('user-menu');
            const userMenuBtn = document.getElementById('user-menu-btn');
            if (userMenu && !userMenu.contains(e.target) && !userMenuBtn?.contains(e.target)) {
                userMenu.classList.add('hidden');
            }
        });
    }
    
    // Show sign in form
    showSignIn() {
        document.getElementById('signin-tab').classList.add('tab-active');
        document.getElementById('signin-tab').classList.remove('tab-inactive');
        document.getElementById('signup-tab').classList.add('tab-inactive');
        document.getElementById('signup-tab').classList.remove('tab-active');
        
        document.getElementById('signin-form').classList.remove('hidden');
        document.getElementById('signup-form').classList.add('hidden');
        
        this.clearErrors();
    }
    
    // Show sign up form
    showSignUp() {
        document.getElementById('signup-tab').classList.add('tab-active');
        document.getElementById('signup-tab').classList.remove('tab-inactive');
        document.getElementById('signin-tab').classList.add('tab-inactive');
        document.getElementById('signin-tab').classList.remove('tab-active');
        
        document.getElementById('signup-form').classList.remove('hidden');
        document.getElementById('signin-form').classList.add('hidden');
        
        this.clearErrors();
    }
    
    // Handle sign in form submission
    handleSignIn() {
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        
        if (!email || !password) {
            if (!email) this.showError('signin-email-error', 'Email is required');
            if (!password) this.showError('signin-password-error', 'Password is required');
            return;
        }
        
        this.login(email, password);
    }
    
    // Handle sign up form submission
    handleSignUp() {
        const userData = {
            firstName: document.getElementById('signup-firstname').value,
            lastName: document.getElementById('signup-lastname').value,
            email: document.getElementById('signup-email').value,
            password: document.getElementById('signup-password').value,
            confirmPassword: document.getElementById('signup-confirm-password').value,
            termsAgreement: document.getElementById('terms-agreement').checked
        };
        
        if (!userData.termsAgreement) {
            alert('Please agree to the Terms of Service and Privacy Policy');
            return;
        }
        
        this.register(userData);
    }
    
    // Bind password visibility toggles
    bindPasswordToggles() {
        const toggles = document.querySelectorAll('.password-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const button = e.currentTarget;
                const input = button.previousElementSibling;
                const icon = button.querySelector('svg');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.innerHTML = `
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                    `;
                } else {
                    input.type = 'password';
                    icon.innerHTML = `
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    `;
                }
            });
        });
    }
    
    // Bind form validation
    bindFormValidation() {
        // Email validation
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('blur', () => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (input.value && !emailRegex.test(input.value)) {
                    this.showError(input.id + '-error', 'Please enter a valid email address');
                } else {
                    this.clearError(input.id + '-error');
                }
            });
        });
        
        // Password validation
        const passwordInputs = document.querySelectorAll('input[type="password"]');
        passwordInputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value && input.value.length < 8) {
                    this.showError(input.id + '-error', 'Password must be at least 8 characters long');
                } else {
                    this.clearError(input.id + '-error');
                }
            });
        });
        
        // Confirm password validation
        const confirmPasswordInput = document.getElementById('signup-confirm-password');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('blur', () => {
                const password = document.getElementById('signup-password').value;
                const confirmPassword = confirmPasswordInput.value;
                
                if (confirmPassword && password !== confirmPassword) {
                    this.showError('signup-confirm-password-error', 'Passwords do not match');
                } else {
                    this.clearError('signup-confirm-password-error');
                }
            });
        }
    }
    
    // Utility functions
    showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.classList.remove('hidden');
        }
    }
    
    clearError(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('hidden');
            element.textContent = '';
        }
    }
    
    clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.classList.add('hidden');
            el.textContent = '';
        });
    }
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    generateSessionToken() {
        return 'session_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    hashPassword(password) {
        // Simple hash function for demo purposes
        // In production, use bcrypt or similar
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }
    
    saveUsers() {
        localStorage.setItem('woolcraft-users', JSON.stringify(this.users));
    }
    
    saveSessions() {
        localStorage.setItem('woolcraft-sessions', JSON.stringify(this.sessions));
    }
    
    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }
    
    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }
    
    // Protect routes - call this on page load for protected pages
    requireAuth() {
        if (!this.isAuthenticated()) {
            // Store current URL for redirect after login
            localStorage.setItem('woolcraft-return-url', window.location.href);
            window.location.href = 'auth.html';
            return false;
        }
        return true;
    }
    
    // Update user preferences
    updateUserPreferences(preferences) {
        if (this.currentUser) {
            this.currentUser.preferences = { ...this.currentUser.preferences, ...preferences };
            
            // Update in users array
            const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                this.users[userIndex] = this.currentUser;
                this.saveUsers();
            }
            
            return true;
        }
        return false;
    }
    
    // Get user by email (for admin purposes)
    getUserByEmail(email) {
        return this.users.find(u => u.email === email);
    }
    
    // Get all users (for admin purposes)
    getAllUsers() {
        return this.users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt,
            preferences: user.preferences
        }));
    }
}

// Initialize authentication system
const auth = new AuthSystem();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystem;
}

// Global functions for inline event handlers
function toggleUserMenu() {
    auth.toggleUserMenu();
}

function logout() {
    auth.logout();
}

// Make auth globally available
window.auth = auth;