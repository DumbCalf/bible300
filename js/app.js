// Bible 300 - Main Application
class Bible300App {
    constructor() {
        this.APP_VERSION = '2.3.1'; // Central version definition
        this.currentDay = 1; // The actual current/active day for progression
        this.viewingDay = 1; // The day currently being viewed in the UI
        this.completedDays = new Set();
        this.dayCompletionTimestamps = {}; // Track when each day was completed
        this.categoryCompletions = {}; // Track individual category completions
        this.currentTab = 'reading-plan';
        this.currentTestament = 'old';
        this.startDate = new Date(); // Default to today
        this.startDateSetOn = new Date(); // When the start date was set
        this._cachedExpectedFinish = null; // Cache for expected finish date
        this.settingsEventListenersSetup = false; // Flag to prevent duplicate event listeners
        this._cacheInvalidated = true; // Flag to invalidate cache
        this.settings = {
            wordsOfChristRed: false,
            wordsOfChristScope: 'earthly', // 'all' or 'earthly' (Gospels + Acts 1 only)
            fontSize: 'medium',
            fontFamily: 'inter', // inter, noto-sans, noto-serif
            darkMode: true, // Default to dark theme
            tabLayout: 'dropdown', // horizontal, dropdown
            showFloatingArrows: true, // Show floating navigation arrows
            enableSwipeNavigation: true, // Enable swipe gestures for chapter navigation
            recentActivityView: 'current-week', // 'last-7-days' or 'current-week'
            showActivityGraph: true, // Show visual activity graph
        };
        
        // Store current activity data for graph rendering
        this.currentActivityData = [];
        
        // Store document-level listeners for cleanup
        this.documentListeners = [];
        
        // Cache frequently accessed DOM elements
        this.domCache = {};
        
        // Cache frequently calculated dates
        this.dateCache = {
            today: null,
            todayStart: null,
            lastUpdate: 0
        };
        
        // Cache JSON operations results
        this.jsonCache = {
            completionEntries: null,
            completionKeys: null,
            lastCompletionUpdate: 0
        };
        
        // Cache date validations
        this.dateValidationCache = new Map();
        
        // Constants
        this.CONSTANTS = {
            TOTAL_DAYS: 300,
            MS_PER_DAY: 24 * 60 * 60 * 1000,
            DATE_CACHE_DURATION: 60000, // 1 minute
            TOAST_DURATION: 5000, // 5 seconds
            ANIMATION_DELAY: 300, // 0.3 seconds
            QUEUE_DELAY: 500, // 0.5 seconds
            MILESTONES: [75, 100, 150, 200, 225, 300]
        };
        
        // Load saved data
        this.loadProgress();
        this.loadSettings();
        
        // Initialize the app
        this.init();
    }
    
    init() {
        this.viewingDay = this.getCurrentDay(); // Initialize viewing day to actual current day
        this.initDomCache(); // Cache frequently used DOM elements
        this.setupEventListeners();
        this.applySettings(); // Apply saved settings
        this.updateUI();
        this.loadBibleBooks();
        this.updateProgressTab();
        this.switchTab('reading-plan'); // Ensure Today tab is selected on load
        this.setupUniversalScrollPrevention();
        this.updateVersionDisplay(); // Update version display in Settings
    }
    
    // Cache frequently accessed DOM elements for performance
    initDomCache() {
        this.domCache = {
            // Main containers
            todayReading: document.getElementById('today-reading'),
            activityFeed: document.getElementById('activity-feed'),
            activityGraph: document.getElementById('activity-graph'),
            daysContainer: document.getElementById('days-container'),
            calendarGrid: document.getElementById('calendar-grid'),
            readerContent: document.getElementById('reader-content'),
            
            // Progress elements
            currentDay: document.getElementById('current-day'),
            daysCompleted: document.getElementById('days-completed'),
            daysRemaining: document.getElementById('days-remaining'),
            daysMissed: document.getElementById('days-missed'),
            streakDays: document.getElementById('streak-days'),
            
            // Date displays
            readingDate: document.getElementById('reading-date'),
            startDate: document.getElementById('start-date'),
            expectedFinish: document.getElementById('expected-finish'),
            
            // Navigation
            navDropdown: document.getElementById('nav-dropdown'),
            chapterMenu: document.getElementById('chapter-menu'),
            calendarMonthMenu: document.getElementById('calendar-month-menu'),
            
            // Frequently queried elements
            navButtons: document.querySelectorAll('.nav-btn'),
            navDropdownItems: document.querySelectorAll('.nav-dropdown-item'),
            testamentButtons: document.querySelectorAll('.testament-btn'),
            tabContents: document.querySelectorAll('.tab-content'),
            progressFill: document.querySelector('.progress-fill'),
            dayCounter: document.querySelector('.day-counter'),
            logo: document.querySelector('.logo')
        };
    }
    
    // Helper method to get cached DOM element or query if not cached
    getElement(id) {
        if (!this.domCache[id]) {
            this.domCache[id] = document.getElementById(id);
        }
        return this.domCache[id];
    }
    
    // Date caching methods for performance
    getTodayDate() {
        const now = Date.now();
        if (!this.dateCache.today || now - this.dateCache.lastUpdate > this.CONSTANTS.DATE_CACHE_DURATION) {
            this.dateCache.today = new Date();
            this.dateCache.todayStart = new Date(this.dateCache.today.getFullYear(), this.dateCache.today.getMonth(), this.dateCache.today.getDate());
            this.dateCache.lastUpdate = now;
        }
        return this.dateCache.today;
    }
    
    getTodayStartDate() {
        this.getTodayDate(); // Ensure cache is updated
        return this.dateCache.todayStart;
    }
    
    // Optimized date calculation methods
    getDateDaysAgo(days) {
        const todayStart = this.getTodayStartDate();
        return new Date(todayStart.getTime() - (days * this.CONSTANTS.MS_PER_DAY));
    }
    
    getDateDaysFromNow(days) {
        const todayStart = this.getTodayStartDate();
        return new Date(todayStart.getTime() + (days * this.CONSTANTS.MS_PER_DAY));
    }
    
    // Optimized method to get min and max in single pass
    getMinMax(array) {
        if (array.length === 0) return { min: null, max: null };
        let min = array[0];
        let max = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] < min) min = array[i];
            if (array[i] > max) max = array[i];
        }
        return { min, max };
    }
    
    // JSON operations caching methods
    getCachedCompletionEntries() {
        const currentTimestamp = JSON.stringify(this.dayCompletionTimestamps);
        const currentHash = this.simpleHash(currentTimestamp);
        
        if (!this.jsonCache.completionEntries || currentHash !== this.jsonCache.lastCompletionUpdate) {
            this.jsonCache.completionEntries = Object.entries(this.dayCompletionTimestamps);
            this.jsonCache.completionKeys = Object.keys(this.dayCompletionTimestamps);
            this.jsonCache.lastCompletionUpdate = currentHash;
        }
        
        return this.jsonCache.completionEntries;
    }
    
    getCachedCompletionKeys() {
        this.getCachedCompletionEntries(); // Ensure cache is updated
        return this.jsonCache.completionKeys;
    }
    
    // Simple hash function for cache invalidation
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash;
    }
    
    // Optimized date comparison methods
    isSameDate(date1, date2) {
        return date1.getTime() === date2.getTime();
    }
    
    isSameDateString(date1, date2) {
        return date1.toDateString() === date2.toDateString();
    }
    
    // Cached date range validation
    isDateInReadingPlanRangeCached(date) {
        const dateKey = date.getTime();
        
        if (this.dateValidationCache.has(dateKey)) {
            return this.dateValidationCache.get(dateKey);
        }
        
        const result = this.isDateInReadingPlanRange(date);
        this.dateValidationCache.set(dateKey, result);
        
        // Clear cache if it gets too large (prevent memory leaks)
        if (this.dateValidationCache.size > 1000) {
            this.dateValidationCache.clear();
        }
        
        return result;
    }
    
    setupEventListeners() {
        // Tab navigation
        this.domCache.navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });
        
        // Dropdown navigation
        document.getElementById('nav-dropdown-toggle').addEventListener('click', () => {
            this.toggleNavDropdown();
        });
        
        this.domCache.navDropdownItems.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
                this.closeNavDropdown();
            });
        });
        
        // Close dropdown when clicking outside
        const dropdownClickHandler = (e) => {
            const dropdown = document.getElementById('nav-dropdown');
            if (!dropdown.contains(e.target)) {
                this.closeNavDropdown();
            }
        };
        document.addEventListener('click', dropdownClickHandler);
        this.documentListeners.push({ event: 'click', handler: dropdownClickHandler });
        
        // Logo click to go to Today tab
        this.domCache.logo.addEventListener('click', () => {
            this.switchTab('reading-plan');
        });
        
        // Testament tabs
        this.domCache.testamentButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const testament = e.currentTarget.dataset.testament;
                this.switchTestament(testament);
            });
        });
        
        // Complete reading button
        document.getElementById('mark-complete').addEventListener('click', () => {
            this.markDayComplete();
        });
        
        
        // Modal controls
        document.getElementById('close-reader').addEventListener('click', () => {
            this.closeBibleReader();
        });
        
        
        // Chapter selector header
        document.getElementById('chapter-selector-header').addEventListener('click', () => {
            this.toggleChapterMenu();
        });
        
        // Floating arrow navigation
        document.getElementById('floating-prev').addEventListener('click', () => {
            this.navigateChapter(-1);
        });
        
        document.getElementById('floating-next').addEventListener('click', () => {
            this.navigateChapter(1);
        });
        
        // Close chapter menu when clicking outside
        const chapterMenuClickHandler = (e) => {
            const chapterHeader = document.getElementById('chapter-selector-header');
            const chapterMenu = document.getElementById('chapter-menu');
            if (!chapterHeader.contains(e.target) && !chapterMenu.contains(e.target) && chapterMenu.classList.contains('active')) {
                this.hideChapterMenu();
            }
        };
        document.addEventListener('click', chapterMenuClickHandler);
        this.documentListeners.push({ event: 'click', handler: chapterMenuClickHandler });
        
        // Close modal on background click
        document.getElementById('bible-reader').addEventListener('click', (e) => {
            if (e.target.id === 'bible-reader') {
                this.closeBibleReader();
            }
        });
        
        // Day navigation events
        document.getElementById('prev-day').addEventListener('click', () => {
            this.navigateDay(-1);
        });
        
        document.getElementById('next-day').addEventListener('click', () => {
            this.navigateDay(1);
        });
        
        document.getElementById('jump-day').addEventListener('click', () => {
            this.showDayJumpModal();
        });
        
        // Day jump modal
        document.getElementById('close-day-jump').addEventListener('click', () => {
            this.closeDayJumpModal();
        });
        
        document.getElementById('cancel-day-jump-btn').addEventListener('click', () => {
            this.closeDayJumpModal();
        });
        
        document.getElementById('confirm-jump-btn').addEventListener('click', () => {
            this.jumpToDay();
        });
        
        document.getElementById('day-jump-modal').addEventListener('click', (e) => {
            if (e.target.id === 'day-jump-modal') {
                this.closeDayJumpModal();
            }
        });
        
        // Enter key in day input
        document.getElementById('day-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.jumpToDay();
            }
        });
        
        // Start date modal events
        document.getElementById('change-start-date-settings-btn').addEventListener('click', () => {
            this.showStartDateModal();
        });
        
        document.getElementById('close-start-date').addEventListener('click', () => {
            this.closeStartDateModal();
        });
        
        document.getElementById('cancel-start-date-btn').addEventListener('click', () => {
            this.closeStartDateModal();
        });
        
        document.getElementById('update-start-date-btn').addEventListener('click', () => {
            this.updateStartDate();
        });
        
        document.getElementById('start-date-modal').addEventListener('click', (e) => {
            if (e.target.id === 'start-date-modal') {
                this.closeStartDateModal();
            }
        });
        
        // Reset data modal events (button removed from progress section, only in settings)
        
        document.getElementById('close-reset-data').addEventListener('click', () => {
            this.closeResetDataModal();
        });
        
        document.getElementById('cancel-reset-data-btn').addEventListener('click', () => {
            this.closeResetDataModal();
        });
        
        // Completion modal events
        document.getElementById('close-completion').addEventListener('click', () => {
            this.closeCompletionModal();
        });
        
        document.getElementById('close-completion-btn').addEventListener('click', () => {
            this.closeCompletionModal();
        });
        
        // Reading info modal events
        document.getElementById('reading-info-btn').addEventListener('click', () => {
            this.showReadingInfoModal();
        });
        
        document.getElementById('close-reading-info').addEventListener('click', () => {
            this.closeReadingInfoModal();
        });
        
        document.getElementById('close-reading-info-btn').addEventListener('click', () => {
            this.closeReadingInfoModal();
        });
        
        document.getElementById('confirm-reset-data-btn').addEventListener('click', () => {
            this.resetAllData();
        });
        
        // Calendar modal events
        document.getElementById('calendar-view-btn').addEventListener('click', () => {
            this.openCalendarModal();
        });
        
        document.getElementById('close-calendar').addEventListener('click', () => {
            this.closeCalendarModal();
        });
        
        document.getElementById('calendar-month-selector').addEventListener('click', () => {
            this.toggleCalendarMonthMenu();
        });
        
        document.getElementById('calendar-prev').addEventListener('click', () => {
            this.navigateCalendarMonth(-1);
        });
        
        document.getElementById('calendar-next').addEventListener('click', () => {
            this.navigateCalendarMonth(1);
        });
        
        // Close calendar modal on background click
        document.getElementById('calendar-modal').addEventListener('click', (e) => {
            if (e.target.id === 'calendar-modal') {
                this.closeCalendarModal();
            }
        });
        
        // Close calendar month menu when clicking outside
        const calendarMenuClickHandler = (e) => {
            const monthSelector = document.getElementById('calendar-month-selector');
            const monthMenu = document.getElementById('calendar-month-menu');
            if (!monthSelector.contains(e.target) && !monthMenu.contains(e.target) && monthMenu.classList.contains('active')) {
                this.hideCalendarMonthMenu();
            }
        };
        document.addEventListener('click', calendarMenuClickHandler);
        this.documentListeners.push({ event: 'click', handler: calendarMenuClickHandler });
        
        document.getElementById('reset-data-modal').addEventListener('click', (e) => {
            if (e.target.id === 'reset-data-modal') {
                this.closeResetDataModal();
            }
        });
        
        // Event delegation for reading plan interactions
        document.getElementById('today-reading').addEventListener('click', (e) => {
            // Handle checkbox clicks
            if (e.target.closest('.category-checkbox')) {
                const checkbox = e.target.closest('.category-checkbox');
                const day = parseInt(checkbox.dataset.day);
                const categoryId = checkbox.dataset.categoryId;
                this.toggleCategoryCompletion(day, categoryId);
            }
            
            // Handle read button clicks
            if (e.target.closest('.read-btn')) {
                const readBtn = e.target.closest('.read-btn');
                const reading = readBtn.dataset.reading;
                this.openReadingFromPlan(reading);
            }
        });
        
        // Keyboard shortcuts
        const keydownHandler = (e) => {
            this.handleKeyboardShortcuts(e);
        };
        document.addEventListener('keydown', keydownHandler);
        this.documentListeners.push({ event: 'keydown', handler: keydownHandler });
    }
    
    getCurrentDay() {
        // Find the first day that hasn't been completed
        for (let day = 1; day <= this.CONSTANTS.TOTAL_DAYS; day++) {
            if (!this.completedDays.has(day)) {
                return day;
            }
        }
        // If all days are completed, return 300
        return this.CONSTANTS.TOTAL_DAYS;
    }
    
    switchTab(tabName) {
        // Update nav buttons
        this.domCache.navButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update dropdown navigation
        this.updateDropdownNavigation(tabName);
        
        // Update tab content
        this.domCache.tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
        
        this.currentTab = tabName;
        
        // Scroll to top when switching tabs
        window.scrollTo(0, 0);
        
        // Update specific tab content
        if (tabName === 'progress') {
            this.updateProgressTab();
        } else if (tabName === 'overview') {
            this.updateOverviewTab();
        } else if (tabName === 'reading-plan') {
            // Reset to actual current day when switching to Today tab
            this.viewingDay = this.getCurrentDay();
            this.updateUI();
        } else if (tabName === 'bible-nav') {
            // Always default to Old Testament when switching to Bible tab
            this.switchTestament('old');
        } else if (tabName === 'settings') {
            this.updateSettingsTab();
        }
    }
    
    updateDropdownNavigation(tabName) {
        // Map tab names to display info
        const tabInfo = {
            'reading-plan': { icon: 'fas fa-calendar-day', text: 'Today' },
            'overview': { icon: 'fas fa-list-alt', text: 'Overview' },
            'bible-nav': { icon: 'fas fa-book-bible', text: 'Bible' },
            'progress': { icon: 'fas fa-chart-line', text: 'Progress' },
            'settings': { icon: 'fas fa-cog', text: 'Settings' }
        };
        
        const info = tabInfo[tabName];
        if (info) {
            document.getElementById('nav-dropdown-icon').className = info.icon;
            document.getElementById('nav-dropdown-text').textContent = info.text;
        }
        
        // Update active states for dropdown items
        document.querySelectorAll('.nav-dropdown-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeDropdownItem = document.querySelector(`.nav-dropdown-item[data-tab="${tabName}"]`);
        if (activeDropdownItem) {
            activeDropdownItem.classList.add('active');
        }
    }
    
    toggleNavDropdown() {
        const dropdown = document.getElementById('nav-dropdown');
        dropdown.classList.toggle('open');
    }
    
    closeNavDropdown() {
        const dropdown = document.getElementById('nav-dropdown');
        dropdown.classList.remove('open');
    }
    
    switchTestament(testament) {
        document.querySelectorAll('.testament-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-testament="${testament}"]`).classList.add('active');
        
        this.currentTestament = testament;
        this.loadBibleBooks();
    }
    
    loadBibleBooks() {
        const booksContainer = document.getElementById('books-container');
        const categoryData = this.getCategoryData(this.currentTestament);
        
        booksContainer.innerHTML = categoryData.map(category => `
            <div class="book-category">
                <div class="category-title">
                    <div class="category-icon">
                        <i class="${category.icon}"></i>
                    </div>
                    ${category.name}
                </div>
                <div class="books-grid">
                    ${category.books.map(book => `
                        <div class="book-card" onclick="app.openBook('${book.name}')">
                            <div class="book-title">${book.displayName || book.name}</div>
                            <div class="book-chapters">${book.chapters} ${book.chapters === 1 ? 'chapter' : 'chapters'}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
    
    getCategoryData(testament) {
        const catholicBible = this.getBibleBooksStructure();
        
        if (testament === 'old') {
            return [
                {
                    id: 'pentateuch',
                    name: 'Pentateuch',
                    icon: 'fas fa-scroll',
                    books: catholicBible.old.pentateuch
                },
                {
                    id: 'historical',
                    name: 'Historical Books',
                    icon: 'fas fa-landmark',
                    books: catholicBible.old.historical
                },
                {
                    id: 'wisdom',
                    name: 'Wisdom Books',
                    icon: 'fas fa-balance-scale',
                    books: catholicBible.old.wisdom
                },
                {
                    id: 'major-prophets',
                    name: 'Major Prophets',
                    icon: 'fas fa-gavel',
                    books: catholicBible.old['major-prophets']
                },
                {
                    id: 'minor-prophets',
                    name: 'Minor Prophets',
                    icon: 'fas fa-gavel',
                    books: catholicBible.old['minor-prophets']
                }
            ];
        } else {
            return [
                {
                    id: 'gospels',
                    name: 'Gospels & Acts',
                    icon: 'fas fa-cross',
                    books: catholicBible.new.gospels
                },
                {
                    id: 'epistles',
                    name: 'Epistles',
                    icon: 'fas fa-envelope',
                    books: catholicBible.new.epistles
                },
                {
                    id: 'revelation',
                    name: 'Revelation',
                    icon: 'fas fa-eye',
                    books: catholicBible.new.revelation
                }
            ];
        }
    }
    
    getBibleBooksStructure() {
        return {
            old: {
                pentateuch: [
                    { name: 'Genesis', chapters: 50 },
                    { name: 'Exodus', chapters: 40 },
                    { name: 'Leviticus', chapters: 27 },
                    { name: 'Numbers', chapters: 36 },
                    { name: 'Deuteronomy', chapters: 34 }
                ],
                historical: [
                    { name: 'Joshua', chapters: 24 },
                    { name: 'Judges', chapters: 21 },
                    { name: 'Ruth', chapters: 4 },
                    { name: '1 Samuel', chapters: 31 },
                    { name: '2 Samuel', chapters: 24 },
                    { name: '1 Kings', chapters: 22 },
                    { name: '2 Kings', chapters: 25 },
                    { name: '1 Chronicles', chapters: 29 },
                    { name: '2 Chronicles', chapters: 36 },
                    { name: 'Ezra', chapters: 10 },
                    { name: 'Nehemiah', chapters: 13 },
                    { name: 'Tobit', chapters: 14 },
                    { name: 'Judith', chapters: 16 },
                    { name: 'Esther', chapters: 10 },
                    { name: '1 Maccabees', chapters: 16 },
                    { name: '2 Maccabees', chapters: 15 }
                ],
                wisdom: [
                    { name: 'Job', chapters: 42 },
                    { name: 'Psalm', displayName: 'Psalms', chapters: 150 },
                    { name: 'Proverbs', chapters: 31 },
                    { name: 'Ecclesiastes', chapters: 12 },
                    { name: 'Song of Solomon', chapters: 8 },
                    { name: 'Wisdom of Solomon', chapters: 19 },
                    { name: 'Sirach', chapters: 51 }
                ],
                'major-prophets': [
                    { name: 'Isaiah', chapters: 66 },
                    { name: 'Jeremiah', chapters: 52 },
                    { name: 'Lamentations', chapters: 5 },
                    { name: 'Baruch', chapters: 6 },
                    { name: 'Ezekiel', chapters: 48 },
                    { name: 'Daniel', chapters: 14 }
                ],
                'minor-prophets': [
                    { name: 'Hosea', chapters: 14 },
                    { name: 'Joel', chapters: 3 },
                    { name: 'Amos', chapters: 9 },
                    { name: 'Obadiah', chapters: 1 },
                    { name: 'Jonah', chapters: 4 },
                    { name: 'Micah', chapters: 7 },
                    { name: 'Nahum', chapters: 3 },
                    { name: 'Habakkuk', chapters: 3 },
                    { name: 'Zephaniah', chapters: 3 },
                    { name: 'Haggai', chapters: 2 },
                    { name: 'Zechariah', chapters: 14 },
                    { name: 'Malachi', chapters: 4 }
                ]
            },
            new: {
                gospels: [
                    { name: 'Matthew', chapters: 28 },
                    { name: 'Mark', chapters: 16 },
                    { name: 'Luke', chapters: 24 },
                    { name: 'John', chapters: 21 },
                    { name: 'Acts', chapters: 28 }
                ],
                epistles: [
                    { name: 'Romans', chapters: 16 },
                    { name: '1 Corinthians', chapters: 16 },
                    { name: '2 Corinthians', chapters: 13 },
                    { name: 'Galatians', chapters: 6 },
                    { name: 'Ephesians', chapters: 6 },
                    { name: 'Philippians', chapters: 4 },
                    { name: 'Colossians', chapters: 4 },
                    { name: '1 Thessalonians', chapters: 5 },
                    { name: '2 Thessalonians', chapters: 3 },
                    { name: '1 Timothy', chapters: 6 },
                    { name: '2 Timothy', chapters: 4 },
                    { name: 'Titus', chapters: 3 },
                    { name: 'Philemon', chapters: 1 },
                    { name: 'Hebrews', chapters: 13 },
                    { name: 'James', chapters: 5 },
                    { name: '1 Peter', chapters: 5 },
                    { name: '2 Peter', chapters: 3 },
                    { name: '1 John', chapters: 5 },
                    { name: '2 John', chapters: 1 },
                    { name: '3 John', chapters: 1 },
                    { name: 'Jude', chapters: 1 }
                ],
                revelation: [
                    { name: 'Revelation', chapters: 22 }
                ]
            }
        };
    }
    
    getBibleBooks(testament, category = null) {
        const catholicBible = this.getBibleBooksStructure();
        
        if (category) {
            return catholicBible[testament]?.[category] || [];
        }
        
        // Return all books for the testament if no category specified
        const testamentBooks = catholicBible[testament];
        if (!testamentBooks) return [];
        
        return Object.values(testamentBooks).flat();
    }
    
    
    async openBook(bookName, chapter = 1) {
        try {
            // Use getBibleVerses which handles both regular and Esther section structures
            const verses = getBibleVerses(bookName, chapter.toString());
            const chapterData = getBibleChapter(bookName, chapter.toString());
            
            if (!verses) {
                throw new Error(`Chapter not found: ${bookName} ${chapter}`);
            }
            
            // Create a combined structure for displayBibleContent
            const combinedData = {
                verses: verses,
                footnotes: chapterData ? chapterData.footnotes || [] : []
            };
            
            this.displayBibleContent(bookName, chapter, combinedData);
        } catch (error) {
            console.error('Error loading Bible content:', error);
            this.showError(`Failed to load ${bookName} chapter ${chapter}`);
        }
    }
    
    displayBibleContent(bookName, chapter, chapterData) {
        // Build HTML from JSON verse data
        let contentHtml = `<div class="bible-chapter">`;
        contentHtml += `<h2>${bookName} ${chapter}</h2>`;
        
        // Handle new data structure with verses and footnotes
        const verses = chapterData.verses || chapterData; // Backward compatibility
        const footnotes = chapterData.footnotes || [];
        
        verses.forEach(verse => {
            // Handle chapter headings for Esther
            if (verse.isChapterHeading) {
                contentHtml += `<div class="chapter-heading">`;
                contentHtml += `<h3>${verse.text}</h3>`;
                contentHtml += `</div>`;
                return;
            }
            
            const verseClass = verse.isAddition ? 'verse addition' : 'verse';
            let verseText = verse.text;
            
            // Words of Christ styling is now handled by preserved spans in the verse text
            // The red color will be controlled by CSS based on settings
            
            contentHtml += `<p class="${verseClass}">`;
            if (verse.verse !== 0) {
                contentHtml += `<span class="verse-number">${verse.verse}</span>`;
            }
            contentHtml += verseText;
            contentHtml += `</p>`;
        });
        
        
        // Add footnotes section if any exist
        if (footnotes.length > 0) {
            contentHtml += `<div class="footnotes-section">`;
            contentHtml += `<hr class="footnotes-divider">`;
            contentHtml += `<h4>Footnotes</h4>`;
            footnotes.forEach(footnote => {
                contentHtml += `<div class="footnote" id="${footnote.id}">`;
                contentHtml += `<span class="footnote-marker">${footnote.marker}</span> `;
                contentHtml += `<span class="footnote-text">${footnote.text}</span>`;
                contentHtml += `</div>`;
            });
            contentHtml += `</div>`;
        }
        
        contentHtml += `</div>`;
        
        // Update the modal
        document.getElementById('reader-title').textContent = `${bookName} ${chapter}`;
        document.getElementById('reader-content').innerHTML = contentHtml;
        
        // Apply Words of Christ styling based on book/chapter and settings
        const readerModal = document.getElementById('bible-reader');
        if (this.shouldShowWordsOfChrist(bookName, chapter)) {
            readerModal.classList.add('words-of-christ-enabled');
        } else {
            readerModal.classList.remove('words-of-christ-enabled');
        }
        
        // Store current reading info with footnotes
        this.currentReading = { book: bookName, chapter: chapter, footnotes: footnotes };
        
        // Add footnote click handlers
        this.setupFootnoteHandlers();
        
        // Show the modal
        document.getElementById('bible-reader').classList.add('active');
        
        // Setup chapter menu and floating arrows
        this.setupChapterMenu(bookName, chapter);
        this.setupFloatingArrows(bookName, chapter);
        this.setupSwipeGestures();
        
        // Scroll to top - use setTimeout to ensure content is rendered
        setTimeout(() => {
            const modalBody = document.querySelector('#bible-reader .modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
        }, 0);
        
        // Apply font settings to the reader content
        this.applyReaderFont();
    }
    
    closeBibleReader() {
        document.getElementById('bible-reader').classList.remove('active');
        this.hideFootnotePopup();
        this.hideChapterMenu();
        this.removeSwipeListeners();
        this.cleanupFootnoteHandlers();
    }
    
    setupFootnoteHandlers() {
        // Clean up any existing footnote handlers first
        this.cleanupFootnoteHandlers();
        
        // Store footnote handlers for cleanup later
        this.footnoteHandlers = [];
        
        // Add click handlers to footnote markers
        const footnoteMarkers = document.querySelectorAll('.footnote-marker[data-footnote]');
        footnoteMarkers.forEach(marker => {
            const clickHandler = (e) => {
                const footnoteId = marker.getAttribute('data-footnote');
                this.showFootnotePopup(e, footnoteId);
            };
            
            // Store reference for cleanup
            this.footnoteHandlers.push({
                element: marker,
                handler: clickHandler
            });
            
            marker.addEventListener('click', clickHandler);
            
            // Add hover effect
            marker.style.cursor = 'pointer';
            marker.style.color = 'var(--info)';
            marker.style.textDecoration = 'underline';
        });
    }
    
    cleanupFootnoteHandlers() {
        if (this.footnoteHandlers) {
            this.footnoteHandlers.forEach(({ element, handler }) => {
                element.removeEventListener('click', handler);
            });
            this.footnoteHandlers = null;
        }
    }
    
    showFootnotePopup(event, footnoteId) {
        if (!this.currentReading || !this.currentReading.footnotes) return;
        
        const footnote = this.currentReading.footnotes.find(f => f.id === footnoteId);
        if (!footnote) return;
        
        // Create popup if it doesn't exist
        let popup = document.getElementById('footnote-popup');
        if (!popup) {
            popup = document.createElement('div');
            popup.id = 'footnote-popup';
            popup.className = 'footnote-popup';
            document.body.appendChild(popup);
        }
        
        // Set popup content
        popup.innerHTML = `
            <div class="footnote-popup-content">
                <span class="footnote-popup-marker">${footnote.marker}</span>
                <span class="footnote-popup-text">${footnote.text}</span>
                <button class="footnote-popup-close" onclick="app.hideFootnotePopup()">×</button>
            </div>
        `;
        
        // Position popup near the clicked element with simple edge detection
        const rect = event.target.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        popup.style.display = 'block';
        
        // Get actual popup dimensions after showing
        const popupRect = popup.getBoundingClientRect();
        const popupWidth = popupRect.width || 300;
        const popupHeight = popupRect.height || 100;
        
        let left = rect.left + window.scrollX;
        let top = rect.bottom + window.scrollY + 5;
        
        // Simple right edge check - shift left if would overflow
        if (left + popupWidth > viewportWidth - 10) {
            left = rect.right + window.scrollX - popupWidth;
        }
        
        // Simple left edge check
        if (left < 10) {
            left = 10;
        }
        
        // Simple bottom edge check - show above if would overflow
        if (rect.bottom + popupHeight > viewportHeight - 10) {
            top = rect.top + window.scrollY - popupHeight - 5;
        }
        
        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
        
        // Hide popup when clicking outside
        setTimeout(() => {
            document.addEventListener('click', this.hideFootnotePopupHandler, { once: true });
        }, 100);
    }
    
    hideFootnotePopup() {
        const popup = document.getElementById('footnote-popup');
        if (popup) {
            popup.style.display = 'none';
        }
    }
    
    hideFootnotePopupHandler = (event) => {
        const popup = document.getElementById('footnote-popup');
        if (popup && !popup.contains(event.target) && !event.target.classList.contains('footnote-marker')) {
            this.hideFootnotePopup();
        }
    }
    
    applyReaderFont() {
        const readerContent = document.getElementById('reader-content');
        if (!readerContent) return;
        
        // Apply font settings to the Bible reader content
        readerContent.className = '';
        readerContent.classList.add(`font-${this.settings.fontFamily}`, `font-${this.settings.fontSize}`);
    }
    
    navigateChapter(direction) {
        if (!this.currentReading) return;
        
        const { book, chapter } = this.currentReading;
        const bookInfo = this.findBookInfo(book);
        
        if (!bookInfo) return;
        
        let newChapter = chapter + direction;
        
        if (newChapter < 1 || newChapter > bookInfo.chapters) {
            return; // Could implement book navigation here
        }
        
        // Hide footnote popup when navigating to new chapter
        this.hideFootnotePopup();
        
        this.openBook(book, newChapter);
    }
    
    findBookInfo(bookName) {
        const allBooks = [
            ...this.getBibleBooks('old'),
            ...this.getBibleBooks('new')
        ];
        
        return allBooks.find(book => book.name === bookName);
    }
    
    markDayComplete() {
        if (!this.completedDays.has(this.viewingDay)) {
            const day = this.viewingDay;
            
            // Mark current day as complete
            this.completedDays.add(day);
            this.dayCompletionTimestamps[day] = new Date().toLocaleString();
            this._cacheInvalidated = true; // Invalidate expected finish cache
            this._parsedCompletionDates = null; // Invalidate completion dates cache
            
            // Mark all categories complete for current day
            const categories = ['psalm', 'gospel', 'wisdom', 'old-testament', 'new-testament'];
            categories.forEach(categoryId => {
                const key = `${day}-${categoryId}`;
                this.categoryCompletions[key] = true;
            });
            
            // Mark all previous days as complete too
            let previousDaysMarked = 0;
            for (let prevDay = 1; prevDay < day; prevDay++) {
                if (!this.completedDays.has(prevDay)) {
                    this.completedDays.add(prevDay);
                    this.dayCompletionTimestamps[prevDay] = new Date().toLocaleString();
                    previousDaysMarked++;
                    
                    // Mark all categories complete for previous days too
                    categories.forEach(categoryId => {
                        const key = `${prevDay}-${categoryId}`;
                        this.categoryCompletions[key] = true;
                    });
                }
            }
            
            // Update currentDay to reflect the new current day
            this.currentDay = this.getCurrentDay();
            
            this.saveProgress();
            this.updateUI();
            this.updateProgressTab();
            
            // Update overview tab if it's currently visible
            if (this.currentTab === 'overview') {
                this.updateOverviewTab();
            }
            
            // Show completion feedback
            this.showToast(`Day ${day} complete!`, 'success');
            
            // Show additional notification for previous days if any were marked complete
            if (previousDaysMarked > 0) {
                this.showPreviousDaysToast(previousDaysMarked);
            }
            
            // Check for milestone achievements (only for the specific day being completed)
            this.checkMilestoneAchievement(day);
        }
    }
    
    checkMilestoneAchievement(day) {
        const milestones = [...this.CONSTANTS.MILESTONES];
        
        if (milestones.includes(day)) {
            const percentage = Math.round((day / this.CONSTANTS.TOTAL_DAYS) * 100);
            const message = day === this.CONSTANTS.TOTAL_DAYS ? `🎉 Congratulations! ${percentage}% Finished! 🎉` : `${percentage}% Finished!`;
            
            if (day === this.CONSTANTS.TOTAL_DAYS) {
                // Show both toast and modal for Day 300
                this.showToast(message, 'success');
                this.showCompletionModal();
            } else {
                this.showToast(message, 'success');
            }
        }
    }
    
    showCompletionModal() {
        document.getElementById('completion-modal').classList.add('active');
    }
    
    closeCompletionModal() {
        document.getElementById('completion-modal').classList.remove('active');
    }
    
    showReadingInfoModal() {
        document.getElementById('reading-info-modal').classList.add('active');
    }
    
    closeReadingInfoModal() {
        document.getElementById('reading-info-modal').classList.remove('active');
    }
    
    updateUI() {
        // Update day counter
        this.domCache.currentDay.textContent = this.viewingDay;
        
        // Update day counter color based on completion
        const dayCounter = this.domCache.dayCounter;
        if (this.completedDays.has(this.viewingDay)) {
            dayCounter.classList.add('completed');
        } else {
            dayCounter.classList.remove('completed');
        }
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Update progress
        const completionPercent = (this.completedDays.size / this.CONSTANTS.TOTAL_DAYS * 100).toFixed(1);
        this.domCache.progressFill.style.width = `${completionPercent}%`;
        document.querySelector('.progress-text span:last-child').textContent = `${completionPercent}%`;
        document.querySelector('.progress-text span:first-child').textContent = 
            `${this.completedDays.size} of ${this.CONSTANTS.TOTAL_DAYS} days complete`;
        
        // Update header progress bar
        const headerProgressFill = document.querySelector('.header-progress-fill');
        const headerProgressPercentage = document.querySelector('.header-progress-percentage');
        if (headerProgressFill && headerProgressPercentage) {
            headerProgressFill.style.width = `${completionPercent}%`;
            headerProgressPercentage.textContent = `${completionPercent}%`;
        }
        
        // Update reading date
        const today = this.getTodayDate();
        this.domCache.readingDate.textContent = today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Update today's reading based on current day
        this.updateTodaysReading();
        this.updateDayCompletionStatus();
    }
    
    updateTodaysReading() {
        const readingPlan = this.getReadingForDay(this.viewingDay);
        const todayReading = this.domCache.todayReading;
        
        todayReading.innerHTML = readingPlan.map(category => {
            const isCompleted = this.isCategoryCompleted(this.viewingDay, category.id);
            return `
                <div class="reading-category" data-category="${category.id}">
                    <div class="category-checkbox ${isCompleted ? 'checked' : ''}" 
                         data-day="${this.viewingDay}" data-category-id="${category.id}">
                        ${isCompleted ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                    <div class="category-icon">
                        <i class="${category.icon}"></i>
                    </div>
                    <div class="category-content">
                        <div class="category-title">${category.title}</div>
                        <div class="category-reading">${category.reading}</div>
                    </div>
                    <button class="read-btn" data-reading="${category.reading}">Read</button>
                </div>
            `;
        }).join('');
    }
    
    getReadingForDay(day) {
        // Find the reading for this day from the READING_PLAN data
        const dayPlan = READING_PLAN.find(plan => plan.day === day);
        
        if (!dayPlan) {
            // Fallback if day not found - use simple cycle
            const index = (day - 1) % 5;
            const psalms = ['Psalm 1', 'Psalm 2', 'Psalm 3', 'Psalm 4', 'Psalm 5'];
            const gospels = ['Matthew 1', 'Matthew 2', 'Matthew 3', 'Matthew 4', 'Matthew 5'];
            const wisdom = ['Proverbs 1', 'Proverbs 2', 'Proverbs 3', 'Job 1', 'Ecclesiastes 1'];
            const oldTestament = ['Genesis 1', 'Genesis 2', 'Genesis 3', 'Exodus 1', 'Exodus 2'];
            const newTestament = ['Romans 1', 'Romans 2', '1 Corinthians 1', '1 Corinthians 2', 'Ephesians 1'];
            
            return [
                {
                    id: 'psalm',
                    title: 'Psalm',
                    reading: psalms[index],
                    icon: 'fas fa-music'
                },
                {
                    id: 'gospel',
                    title: 'Gospel',
                    reading: gospels[index],
                    icon: 'fas fa-cross'
                },
                {
                    id: 'wisdom',
                    title: 'Wisdom',
                    reading: wisdom[index],
                    icon: 'fas fa-balance-scale'
                },
                {
                    id: 'old-testament',
                    title: 'Old Testament',
                    reading: oldTestament[index],
                    icon: 'fas fa-scroll'
                },
                {
                    id: 'new-testament',
                    title: 'New Testament',
                    reading: newTestament[index],
                    icon: 'fas fa-dove'
                }
            ];
        }
        
        return [
            {
                id: 'psalm',
                title: 'Psalm',
                reading: `${dayPlan.psalm.book} ${dayPlan.psalm.chapter}`,
                icon: 'fas fa-music'
            },
            {
                id: 'gospel',
                title: 'Gospel',
                reading: `${dayPlan.gospel.book} ${dayPlan.gospel.chapter}`,
                icon: 'fas fa-cross'
            },
            {
                id: 'wisdom',
                title: 'Wisdom',
                reading: `${dayPlan.wisdom.book} ${dayPlan.wisdom.chapter}`,
                icon: 'fas fa-balance-scale'
            },
            {
                id: 'old-testament',
                title: 'Old Testament',
                reading: `${dayPlan.oldTestament.book} ${dayPlan.oldTestament.chapter}`,
                icon: 'fas fa-scroll'
            },
            {
                id: 'new-testament',
                title: 'New Testament',
                reading: `${dayPlan.newTestament.book} ${dayPlan.newTestament.chapter}`,
                icon: 'fas fa-dove'
            }
        ];
    }
    
    async openReadingFromPlan(reading) {
        // Parse the reading (e.g., "Genesis 1-2" or "Genesis 1")
        const match = reading.match(/^(.+?)\s+(\d+)(?:-(\d+))?$/);
        if (match) {
            const [, book, startChapter, endChapter] = match;
            await this.openBook(book, parseInt(startChapter));
        }
    }
    
    toggleCategoryCompletion(day, categoryId) {
        const key = `${day}-${categoryId}`;
        
        if (this.categoryCompletions[key]) {
            delete this.categoryCompletions[key];
        } else {
            this.categoryCompletions[key] = true;
        }
        
        this.saveProgress();
        this.updateTodaysReading();
        
        // Check if all categories are complete and auto-mark day complete
        this.checkAutoComplete(day);
        this.updateDayCompletionStatus();
    }
    
    checkAutoComplete(day) {
        const categories = ['psalm', 'gospel', 'wisdom', 'old-testament', 'new-testament'];
        const allCompleted = categories.every(categoryId => 
            this.isCategoryCompleted(day, categoryId)
        );
        
        if (allCompleted && !this.completedDays.has(day)) {
            // All categories completed - mark day as complete
            this.completedDays.add(day);
            this.dayCompletionTimestamps[day] = new Date().toLocaleString();
            this._cacheInvalidated = true; // Invalidate expected finish cache
            this._parsedCompletionDates = null; // Invalidate completion dates cache
            
            // Mark all previous days as complete too
            let previousDaysMarked = 0;
            for (let prevDay = 1; prevDay < day; prevDay++) {
                if (!this.completedDays.has(prevDay)) {
                    this.completedDays.add(prevDay);
                    this.dayCompletionTimestamps[prevDay] = new Date().toLocaleString();
                    previousDaysMarked++;
                }
            }
            
            // Update currentDay to reflect the new current day
            this.currentDay = this.getCurrentDay();
            
            this.saveProgress();
            this.updateUI();
            this.updateProgressTab();
            
            // Update overview tab if it's currently visible
            if (this.currentTab === 'overview') {
                this.updateOverviewTab();
            }
            
            this.showToast(`Day ${day} complete!`, 'success');
            
            // Show additional notification for previous days if any were marked complete
            if (previousDaysMarked > 0) {
                this.showPreviousDaysToast(previousDaysMarked);
            }
            
            // Check for milestone achievements (only for the specific day being completed)
            this.checkMilestoneAchievement(day);
        } else if (!allCompleted && this.completedDays.has(day)) {
            // Not all categories completed but day was marked complete - undo completion
            this.completedDays.delete(day);
            delete this.dayCompletionTimestamps[day];
            this._cacheInvalidated = true; // Invalidate expected finish cache
            this._parsedCompletionDates = null; // Invalidate completion dates cache
            this.saveProgress();
            this.updateUI();
            this.updateProgressTab();
            
            // Update overview tab if it's currently visible
            if (this.currentTab === 'overview') {
                this.updateOverviewTab();
            }
            
            this.showToast('Day completion undone', 'orange');
        }
    }
    
    isCategoryCompleted(day, categoryId) {
        const key = `${day}-${categoryId}`;
        return !!this.categoryCompletions[key];
    }
    
    updateDayCompletionStatus() {
        const categories = ['psalm', 'gospel', 'wisdom', 'old-testament', 'new-testament'];
        const completedCategories = categories.filter(categoryId => 
            this.isCategoryCompleted(this.viewingDay, categoryId)
        ).length;
        
        const completeBtn = document.getElementById('mark-complete');
        
        if (this.completedDays.has(this.viewingDay)) {
            completeBtn.innerHTML = '<i class="fas fa-check"></i> Day Complete';
            completeBtn.disabled = true;
        } else if (completedCategories === 5) {
            // This shouldn't normally be reached due to auto-complete, but just in case
            completeBtn.innerHTML = '<i class="fas fa-check"></i> All Categories Complete!';
            completeBtn.disabled = false;
        } else {
            completeBtn.innerHTML = `<i class="fas fa-check"></i> Mark Day Complete (${completedCategories}/5)`;
            completeBtn.disabled = false;
        }
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-day');
        const nextBtn = document.getElementById('next-day');
        
        // Disable previous button if on day 1
        prevBtn.disabled = this.viewingDay <= 1;
        
        // Disable next button if on day 300
        nextBtn.disabled = this.viewingDay >= 300;
    }
    
    navigateDay(direction) {
        const newDay = this.viewingDay + direction;
        
        if (newDay >= 1 && newDay <= 300) {
            this.viewingDay = newDay;
            this.updateUI();
        }
    }
    
    showDayJumpModal() {
        const modal = document.getElementById('day-jump-modal');
        const input = document.getElementById('day-input');
        
        input.value = this.currentDay;
        modal.classList.add('active');
        
        // Focus and select the input
        setTimeout(() => {
            input.focus();
            input.select();
        }, 100);
    }
    
    closeDayJumpModal() {
        document.getElementById('day-jump-modal').classList.remove('active');
    }
    
    jumpToDay() {
        const input = document.getElementById('day-input');
        const day = parseInt(input.value);
        
        if (isNaN(day) || day < 1 || day > 300) {
            this.showError('Please enter a valid day number between 1 and 300');
            return;
        }
        
        this.viewingDay = day;
        this.closeDayJumpModal();
        this.updateUI();
        this.updateProgressTab();
    }
    
    updateProgressTab() {
        // Update stats
        this.domCache.daysCompleted.textContent = this.completedDays.size;
        
        // Refresh calendar if it's open (since expected finish date may have changed)
        this.refreshCalendarIfOpen();
        // Calculate days remaining
        const daysRemaining = 300 - this.completedDays.size;
        this.domCache.daysRemaining.textContent = daysRemaining;
            
        // Calculate days missed based on actual calendar dates
        const daysMissed = this.calculateDaysMissed();
        this.domCache.daysMissed.textContent = daysMissed;
            
        // Calculate streak based on consecutive calendar days with at least one reading
        let streak = 0;
        const today = new Date();
        
        // Start from today and work backwards
        for (let daysBack = 0; daysBack < 365; daysBack++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - daysBack);
            
            // Check if any reading was completed on this calendar date
            let foundReadingOnDate = false;
            for (const [day, timestampStr] of this.getCachedCompletionEntries()) {
                const completionDate = new Date(timestampStr);
                // Check if completion was on the same calendar date (ignore time)
                if (this.isSameDateString(completionDate, checkDate)) {
                    foundReadingOnDate = true;
                    break;
                }
            }
            
            if (foundReadingOnDate) {
                streak++;
            } else {
                break; // Streak is broken
            }
        }
        this.domCache.streakDays.textContent = streak;
        
        // Update recent activity feed
        this.updateRecentActivityDisplay();
        
        // Update dates
        this.updateDateInfo();
    }
    
    getReadingDayForDate(calendarDate) {
        // Calculate how many days since start date (use device local dates)
        const startDate = new Date(this.startDate);
        const calendarDateLocal = new Date(calendarDate);
        
        // Calculate difference in days using local dates
        const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const calendarDay = new Date(calendarDateLocal.getFullYear(), calendarDateLocal.getMonth(), calendarDateLocal.getDate());
        
        const daysDiff = Math.floor((calendarDay - startDay) / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 0) return null; // Before start date
        
        // Find the reading day that should be done on this calendar date
        // Account for missed days - if you miss days, you stay on the same reading
        let readingDay = 1;
        let dayCount = 0;
        
        while (dayCount < daysDiff && readingDay <= 300) {
            dayCount++;
            // Only advance to next reading if current reading was completed
            if (this.completedDays.has(readingDay)) {
                readingDay++;
            }
        }
        
        return readingDay <= 300 ? readingDay : 300;
    }
    
    getDaysCompletedOnDate(calendarDate) {
        const daysCompleted = [];
        
        // Ensure we're working with local date strings for consistent comparison
        const targetYear = calendarDate.getFullYear();
        const targetMonth = calendarDate.getMonth();
        const targetDay = calendarDate.getDate();
        
        // Check all completed days to see which were completed on this calendar date
        for (const day of this.completedDays) {
            const timestamp = this.dayCompletionTimestamps[day];
            if (timestamp) {
                const completionDate = new Date(timestamp);
                
                // Compare using local date components to avoid timezone issues
                if (completionDate.getFullYear() === targetYear &&
                    completionDate.getMonth() === targetMonth &&
                    completionDate.getDate() === targetDay) {
                    daysCompleted.push(day);
                }
            }
        }
        
        return daysCompleted.sort((a, b) => a - b);
    }

    generateRecentActivity() {
        const activityFeed = this.domCache.activityFeed;
        if (!activityFeed) return;
        
        activityFeed.innerHTML = '';
        this.currentActivityData = []; // Reset activity data
        
        const today = this.getTodayDate();
        
        // Show last 7 calendar days (most recent first)
        for (let i = 0; i <= 6; i++) {
            const calendarDate = this.getDateDaysAgo(i);
            
            // Get all days completed on this calendar date
            const daysCompletedOnDate = this.getDaysCompletedOnDate(calendarDate);
            if (!this.isDateInReadingPlanRangeCached(calendarDate)) continue; // Skip dates outside reading plan range
            
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            
            const activityDay = document.createElement('div');
            activityDay.className = 'activity-day';
            
            const dayDate = document.createElement('div');
            dayDate.className = 'activity-day-number';
            
            const weekday = calendarDate.toLocaleDateString('en-US', { weekday: 'short' });
            const monthDay = calendarDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });
            
            const weekdayElement = document.createElement('div');
            weekdayElement.textContent = weekday;
            const monthDayElement = document.createElement('div');
            monthDayElement.textContent = monthDay;
            
            dayDate.appendChild(weekdayElement);
            dayDate.appendChild(monthDayElement);
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'activity-day-date';
            
            // Only show day numbers if readings were completed on this date
            if (daysCompletedOnDate.length > 1) {
                const { min: minDay, max: maxDay } = this.getMinMax(daysCompletedOnDate);
                
                // Create column layout for multiple days
                const dayRange = document.createElement('div');
                dayRange.textContent = `Days ${minDay}-${maxDay}`;
                const dayCount = document.createElement('div');
                dayCount.textContent = `(${daysCompletedOnDate.length}\u00A0days)`;
                dayCount.style.textAlign = 'center';
                
                dayNumber.appendChild(dayRange);
                dayNumber.appendChild(dayCount);
            } else if (daysCompletedOnDate.length === 1) {
                dayNumber.textContent = `Day ${daysCompletedOnDate[0]}`;
            } else {
                // No readings completed on this date - don't show day number
                dayNumber.textContent = '';
            }
            
            activityDay.appendChild(dayDate);
            activityDay.appendChild(dayNumber);
            
            const activityStatus = document.createElement('div');
            activityStatus.className = 'activity-status';
            
            const todayDate = new Date();
            
            // Check if start date is before today to determine N/A vs Missed logic (use local dates)
            const startDay = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
            const currentDay = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
            const calendarDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate());
            const isStartDateBeforeToday = startDay < currentDay;
            
            if (daysCompletedOnDate.length > 0) {
                activityStatus.classList.add('completed');
                if (daysCompletedOnDate.length > 1) {
                    activityStatus.innerHTML = '<i class="fas fa-check-double"></i> Completed';
                } else {
                    activityStatus.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
                }
            } else if (this.isSameDate(calendarDay, currentDay)) {
                activityStatus.classList.add('current');
                activityStatus.innerHTML = '<i class="fas fa-calendar-day"></i> Current';
            } else if (calendarDay > currentDay) {
                activityStatus.classList.add('upcoming');
                activityStatus.innerHTML = '<i class="fas fa-clock"></i> Upcoming';
            } else if (isStartDateBeforeToday && calendarDay >= startDay && calendarDay < currentDay) {
                // Days between start date and today when start date is in the past - show as N/A
                activityStatus.classList.add('not-available');
                activityStatus.innerHTML = '<i class="fas fa-minus-circle"></i> NA';
            } else {
                activityStatus.classList.add('missed');
                activityStatus.innerHTML = '<i class="fas fa-times-circle"></i> Missed';
            }
            
            // Extract data for graph rendering
            const dayOfWeek = calendarDate.toLocaleDateString('en-US', { weekday: 'short' });
            const statusClass = activityStatus.classList[1]; // Get the status class (completed, current, etc.)
            const statusIcon = activityStatus.innerHTML.match(/<i class="([^"]+)"><\/i>/)?.[1] || '';
            
            this.currentActivityData.push({
                date: calendarDate,
                dayOfWeek: dayOfWeek,
                statusClass: statusClass,
                statusIcon: statusIcon,
                daysCompleted: daysCompletedOnDate
            });
            
            activityItem.appendChild(activityDay);
            activityItem.appendChild(activityStatus);
            
            activityFeed.appendChild(activityItem);
        }
    }
    
    generateCurrentWeekActivity() {
        const activityFeed = this.domCache.activityFeed;
        if (!activityFeed) return;
        
        activityFeed.innerHTML = '';
        this.currentActivityData = []; // Reset activity data
        
        const today = this.getTodayDate();
        
        // Get the start of the current week (Sunday) using local dates
        const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const startOfWeek = this.getDateDaysAgo(dayOfWeek);
        
        // Show all 7 days of the current week (Saturday to Sunday, inverted)
        for (let i = 6; i >= 0; i--) {
            const calendarDate = new Date(startOfWeek.getTime() + (i * this.CONSTANTS.MS_PER_DAY));
            
            // Get all days completed on this calendar date
            const daysCompletedOnDate = this.getDaysCompletedOnDate(calendarDate);
            
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            
            const activityDay = document.createElement('div');
            activityDay.className = 'activity-day';
            
            const dayDate = document.createElement('div');
            dayDate.className = 'activity-day-number';
            
            const weekday = calendarDate.toLocaleDateString('en-US', { weekday: 'short' });
            const monthDay = calendarDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });
            
            const weekdayElement = document.createElement('div');
            weekdayElement.textContent = weekday;
            const monthDayElement = document.createElement('div');
            monthDayElement.textContent = monthDay;
            
            dayDate.appendChild(weekdayElement);
            dayDate.appendChild(monthDayElement);
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'activity-day-date';
            
            // Only show day numbers if readings were completed on this date
            if (daysCompletedOnDate.length > 1) {
                const { min: minDay, max: maxDay } = this.getMinMax(daysCompletedOnDate);
                
                // Create column layout for multiple days
                const dayRange = document.createElement('div');
                dayRange.textContent = `Days ${minDay}-${maxDay}`;
                const dayCount = document.createElement('div');
                dayCount.textContent = `(${daysCompletedOnDate.length}\u00A0days)`;
                dayCount.style.textAlign = 'center';
                
                dayNumber.appendChild(dayRange);
                dayNumber.appendChild(dayCount);
            } else if (daysCompletedOnDate.length === 1) {
                dayNumber.textContent = `Day ${daysCompletedOnDate[0]}`;
            } else {
                // No readings completed on this date - don't show day number
                dayNumber.textContent = '';
            }
            
            activityDay.appendChild(dayDate);
            activityDay.appendChild(dayNumber);
            
            const activityStatus = document.createElement('div');
            activityStatus.className = 'activity-status';
            
            const todayDate = new Date();
            const currentDay = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
            const calendarDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate());
            
            if (daysCompletedOnDate.length > 0) {
                activityStatus.classList.add('completed');
                if (daysCompletedOnDate.length > 1) {
                    activityStatus.innerHTML = '<i class="fas fa-check-double"></i> Completed';
                } else {
                    activityStatus.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
                }
            } else if (this.isSameDate(calendarDay, currentDay)) {
                activityStatus.classList.add('current');
                activityStatus.innerHTML = '<i class="fas fa-calendar-day"></i> Current';
            } else if (calendarDay > currentDay) {
                activityStatus.classList.add('upcoming');
                activityStatus.innerHTML = '<i class="fas fa-clock"></i> Upcoming';
            } else {
                // Past dates - check if they're within the reading plan range
                const startDay = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
                const startDateSetOnDay = new Date(this.startDateSetOn.getFullYear(), this.startDateSetOn.getMonth(), this.startDateSetOn.getDate());
                
                if (calendarDay < startDay) {
                    // Days before start date - show as N/A (not in reading plan)
                    activityStatus.classList.add('not-available');
                    activityStatus.innerHTML = '<i class="fas fa-minus-circle"></i> NA';
                } else if (startDay < startDateSetOnDay && calendarDay >= startDay && calendarDay < startDateSetOnDay) {
                    // Days between start date and when start date was set - show as N/A
                    activityStatus.classList.add('not-available');
                    activityStatus.innerHTML = '<i class="fas fa-minus-circle"></i> NA';
                } else {
                    // Days within reading plan range that weren't completed - show as missed
                    activityStatus.classList.add('missed');
                    activityStatus.innerHTML = '<i class="fas fa-times-circle"></i> Missed';
                }
            }
            
            // Extract data for graph rendering
            const dayOfWeek = calendarDate.toLocaleDateString('en-US', { weekday: 'short' });
            const statusClass = activityStatus.classList[1]; // Get the status class (completed, current, etc.)
            const statusIcon = activityStatus.innerHTML.match(/<i class="([^"]+)"><\/i>/)?.[1] || '';
            
            this.currentActivityData.push({
                date: calendarDate,
                dayOfWeek: dayOfWeek,
                statusClass: statusClass,
                statusIcon: statusIcon,
                daysCompleted: daysCompletedOnDate
            });
            
            activityItem.appendChild(activityDay);
            activityItem.appendChild(activityStatus);
            
            activityFeed.appendChild(activityItem);
        }
    }
    
    renderActivityGraph() {
        const activityGraph = this.domCache.activityGraph;
        if (!activityGraph) return;
        
        // Show the graph
        activityGraph.style.display = 'flex';
        activityGraph.innerHTML = '';
        
        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();
        
        // Render each day from the extracted activity data (reverse to show oldest first)
        this.currentActivityData.slice().reverse().forEach(dayData => {
            const dayElement = document.createElement('div');
            dayElement.className = 'activity-graph-day';
            
            // Create symbol element
            const symbolElement = document.createElement('div');
            symbolElement.className = `activity-graph-symbol ${dayData.statusClass}`;
            symbolElement.innerHTML = `<i class="${dayData.statusIcon}"></i>`;
            
            // Create day label element  
            const labelElement = document.createElement('div');
            labelElement.className = 'activity-graph-label';
            labelElement.textContent = dayData.dayOfWeek;
            
            dayElement.appendChild(symbolElement);
            dayElement.appendChild(labelElement);
            fragment.appendChild(dayElement);
        });
        
        // Single DOM operation
        activityGraph.appendChild(fragment);
    }
    
    updateRecentActivityDisplay() {
        // Update header text based on selected view
        const headerElement = document.getElementById('recent-activity-header');
        if (headerElement) {
            headerElement.textContent = this.settings.recentActivityView === 'current-week' ? 'Current Week' : 'Last 7 Days';
        }
        
        // Generate activity data and render both list and graph
        if (this.settings.recentActivityView === 'current-week') {
            this.generateCurrentWeekActivity();
        } else {
            this.generateRecentActivity();
        }
        
        // Render activity graph if enabled
        if (this.settings.showActivityGraph) {
            this.renderActivityGraph();
        } else {
            // Hide graph if disabled
            const activityGraph = document.getElementById('activity-graph');
            if (activityGraph) {
                activityGraph.style.display = 'none';
            }
        }
    }
    
    updateDateInfo() {
        // Update start date display
        const startDateElement = document.getElementById('start-date');
        if (startDateElement) {
            startDateElement.textContent = this.startDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
        
        // Calculate and update expected finish date
        const expectedFinishElement = document.getElementById('expected-finish');
        if (expectedFinishElement) {
            const expectedFinish = this.calculateExpectedFinishDate();
            expectedFinishElement.textContent = expectedFinish.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    }
    
    calculateDaysMissed() {
        const today = new Date();
        const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        let missedDays = 0;
        
        // Check each day from start date to today (use local dates)
        for (let day = 1; day <= this.CONSTANTS.TOTAL_DAYS; day++) {
            const dayDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + (day - 1));
            
            // If this day's date has passed and it's not completed, it's missed
            if (dayDate < currentDay && !this.completedDays.has(day)) {
                missedDays++;
            }
            
            // Stop checking if we're past today
            if (dayDate >= currentDay) {
                break;
            }
        }
        
        return missedDays;
    }

    calculateExpectedFinishDate() {
        // Return cached result if valid
        if (this._cachedExpectedFinish && !this._cacheInvalidated) {
            return this._cachedExpectedFinish;
        }
        
        const today = new Date();
        const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        const daysRemaining = 300 - this.completedDays.size;
        
        // If no days remaining, return today
        if (daysRemaining <= 0) {
            this._cachedExpectedFinish = currentDay;
        } else {
            // Expected finish = today + days remaining - 1
            this._cachedExpectedFinish = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + daysRemaining - 1);
        }
        
        this._cacheInvalidated = false;
        return this._cachedExpectedFinish;
    }
    
    showStartDateModal() {
        const modal = document.getElementById('start-date-modal');
        const input = document.getElementById('start-date-input');
        
        // Set current start date as default
        const dateString = this.startDate.toLocaleDateString('en-CA');
        input.value = dateString;
        
        modal.classList.add('active');
    }
    
    closeStartDateModal() {
        document.getElementById('start-date-modal').classList.remove('active');
    }
    
    updateStartDate() {
        const input = document.getElementById('start-date-input');
        const dateString = input.value;
        
        if (dateString) {
            // Parse the date string manually to avoid timezone issues
            const [year, month, day] = dateString.split('-').map(Number);
            const newDate = new Date(year, month - 1, day); // month is 0-indexed
            
            this.startDate = newDate;
            this.startDateSetOn = new Date(); // Track when this change was made
            this._cacheInvalidated = true; // Invalidate expected finish cache
            this.saveProgress();
            this.updateDateInfo();
            this.updateRecentActivityDisplay();
            this.closeStartDateModal();
            this.showToast('Start date updated successfully');
        } else {
            this.showToast('Please select a valid date', 'error');
        }
    }
    
    showResetDataModal() {
        document.getElementById('reset-data-modal').classList.add('active');
    }
    
    closeResetDataModal() {
        document.getElementById('reset-data-modal').classList.remove('active');
    }
    
    resetAllData() {
        // Clear all localStorage data
        localStorage.removeItem('bible300Progress');
        
        // Reset all app state
        this.currentDay = 1;
        this.viewingDay = 1;
        this.completedDays = new Set();
        this.dayCompletionTimestamps = {};
        this.categoryCompletions = {};
        this.startDate = new Date();
        this.startDateSetOn = new Date();
        this._cacheInvalidated = true; // Invalidate expected finish cache
        this._parsedCompletionDates = null; // Invalidate completion dates cache
        
        // Update UI
        this.updateUI();
        this.updateProgressTab();
        
        // Close modal and show confirmation
        this.closeResetDataModal();
        this.showToast('All data has been reset successfully');
    }
    
    // Calendar Modal Methods
    openCalendarModal() {
        // Always open to current month
        const today = new Date();
        this.currentCalendarMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        
        this.generateAvailableMonths();
        
        // If current month is outside the available range, default to start month
        const isInRange = this.availableMonths.some(month => this.isSameDate(month, this.currentCalendarMonth));
        
        if (!isInRange) {
            this.currentCalendarMonth = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), 1);
        }
        
        this.updateCalendarView();
        this.setupCalendarSwipeNavigation();
        document.getElementById('calendar-modal').classList.add('active');
    }
    
    closeCalendarModal() {
        document.getElementById('calendar-modal').classList.remove('active');
        this.hideCalendarMonthMenu();
        this.cleanupCalendarSwipeNavigation();
    }
    
    generateAvailableMonths() {
        const startDate = new Date(this.startDate);
        const expectedFinish = this.calculateExpectedFinishDate();
        
        this.availableMonths = [];
        const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        const end = new Date(expectedFinish.getFullYear(), expectedFinish.getMonth(), 1);
        
        while (current <= end) {
            this.availableMonths.push(new Date(current));
            current.setMonth(current.getMonth() + 1);
        }
    }
    
    updateCalendarView() {
        // Update month title
        const monthTitle = document.getElementById('calendar-month-title');
        monthTitle.textContent = this.currentCalendarMonth.toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
        
        // Update navigation arrows
        this.updateCalendarNavigation();
        
        // Generate calendar grid
        this.generateCalendarGrid();
        
        // Update month dropdown
        this.updateCalendarMonthDropdown();
    }

    refreshCalendarIfOpen() {
        // Check if calendar modal is open
        const calendarModal = document.getElementById('calendar-modal');
        if (calendarModal && calendarModal.classList.contains('active')) {
            // Store current available months for comparison
            const oldAvailableMonths = this.availableMonths ? [...this.availableMonths] : [];
            
            // Regenerate available months with new expected finish date
            this.generateAvailableMonths();
            
            // Check if available months actually changed
            const monthsChanged = !oldAvailableMonths || 
                oldAvailableMonths.length !== this.availableMonths.length ||
                !oldAvailableMonths.every((month, index) => month.getTime() === this.availableMonths[index].getTime());
            
            // Only update if months changed or current month is out of range
            const currentMonthTime = this.currentCalendarMonth.getTime();
            const isInRange = this.availableMonths.some(month => month.getTime() === currentMonthTime);
            
            if (monthsChanged || !isInRange) {
                // If current month is now out of range, default to first available month
                if (!isInRange && this.availableMonths.length > 0) {
                    this.currentCalendarMonth = new Date(this.availableMonths[0]);
                }
                
                // Update the calendar view
                this.updateCalendarView();
            } else {
                // Just refresh the calendar grid to update day statuses
                this.generateCalendarGrid();
            }
        }
    }
    
    updateCalendarNavigation() {
        const prevBtn = document.getElementById('calendar-prev');
        const nextBtn = document.getElementById('calendar-next');
        
        // Disable prev if at first available month
        const isFirstMonth = this.isSameDate(this.currentCalendarMonth, this.availableMonths[0]);
        prevBtn.disabled = isFirstMonth;
        prevBtn.style.opacity = isFirstMonth ? '0.5' : '1';
        
        // Disable next if at last available month
        const lastMonth = this.availableMonths[this.availableMonths.length - 1];
        const isLastMonth = this.isSameDate(this.currentCalendarMonth, lastMonth);
        nextBtn.disabled = isLastMonth;
        nextBtn.style.opacity = isLastMonth ? '0.5' : '1';
    }
    
    navigateCalendarMonth(direction) {
        const currentIndex = this.availableMonths.findIndex(month => 
            month.getTime() === this.currentCalendarMonth.getTime()
        );
        
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < this.availableMonths.length) {
            this.currentCalendarMonth = new Date(this.availableMonths[newIndex]);
            this.updateCalendarView();
        }
    }
    
    generateCalendarGrid() {
        const calendarGrid = this.domCache.calendarGrid;
        // Remove existing calendar days (keep weekday headers)
        const existingDays = calendarGrid.querySelectorAll('.calendar-day, .calendar-day.empty');
        existingDays.forEach(day => day.remove());
        
        const year = this.currentCalendarMonth.getFullYear();
        const month = this.currentCalendarMonth.getMonth();
        
        // Get first day of month and how many days in month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday
        
        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            fragment.appendChild(emptyDay);
        }
        
        // Pre-calculate statuses for all days to avoid repeated calculations
        const dayStatuses = new Map();
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            dayStatuses.set(day, this.getCalendarDayStatus(currentDate));
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'calendar-day-number';
            dayNumber.textContent = day;
            
            const dayStatus = document.createElement('div');
            dayStatus.className = 'calendar-day-status';
            
            // Use pre-calculated status
            const status = dayStatuses.get(day);
            
            if (status) {
                dayStatus.className += ` ${status.class}`;
                dayStatus.innerHTML = `<i class="${status.icon}"></i>`;
                
                // Style days outside reading plan range
                if (status.class === 'not-in-range') {
                    dayElement.classList.add('not-in-range');
                }
            }
            
            dayElement.appendChild(dayNumber);
            dayElement.appendChild(dayStatus);
            fragment.appendChild(dayElement);
        }
        
        // Single DOM operation instead of multiple appendChild calls
        calendarGrid.appendChild(fragment);
    }

    getCalendarDayStatus(date) {
        const today = new Date();
        const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const targetDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        
        const startDay = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
        const expectedFinish = this.calculateExpectedFinishDate();
        const startDateSetOnDay = new Date(this.startDateSetOn.getFullYear(), this.startDateSetOn.getMonth(), this.startDateSetOn.getDate());
        
        // Check if date is outside the reading plan range
        if (targetDay < startDay || targetDay > expectedFinish) {
            return {
                class: 'not-in-range',
                icon: ''
            };
        }
        
        // Count readings completed on this date
        const readingsCompletedOnDate = this.getReadingsCompletedOnDate(targetDay);
        
        if (targetDay.getTime() === currentDay.getTime()) {
            // Today
            if (readingsCompletedOnDate > 1) {
                return {
                    class: 'completed',
                    icon: 'fas fa-check-double'
                };
            } else if (readingsCompletedOnDate === 1) {
                return {
                    class: 'completed',
                    icon: 'fas fa-check-circle'
                };
            } else {
                return {
                    class: 'current',
                    icon: 'fas fa-calendar-day'
                };
            }
        } else if (targetDay > currentDay) {
            // Future dates
            return {
                class: 'upcoming',
                icon: 'fas fa-clock'
            };
        } else {
            // Past dates
            if (readingsCompletedOnDate > 1) {
                return {
                    class: 'completed',
                    icon: 'fas fa-check-double'
                };
            } else if (readingsCompletedOnDate === 1) {
                return {
                    class: 'completed',
                    icon: 'fas fa-check-circle'
                };
            } else {
                // Check if this date is between start date and when start date was set
                // (for NA logic when start date was set in the past)
                if (startDay < startDateSetOnDay && targetDay >= startDay && targetDay < startDateSetOnDay) {
                    return {
                        class: 'not-available',
                        icon: 'fas fa-minus-circle'
                    };
                } else {
                    return {
                        class: 'missed',
                        icon: 'fas fa-times-circle'
                    };
                }
            }
        }
    }

    getReadingsCompletedOnDate(targetDate) {
        // Cache parsed completion dates to avoid repeated parsing
        if (!this._parsedCompletionDates) {
            this._parsedCompletionDates = {};
            for (const [day, timestamp] of this.getCachedCompletionEntries()) {
                const completionDate = new Date(timestamp);
                this._parsedCompletionDates[day] = new Date(completionDate.getFullYear(), completionDate.getMonth(), completionDate.getDate());
            }
        }
        
        const targetTime = targetDate.getTime();
        return Object.keys(this._parsedCompletionDates).filter(day => {
            return this._parsedCompletionDates[day].getTime() === targetTime;
        }).length;
    }

    isDateInReadingPlanRange(date) {
        const startDay = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate());
        const expectedFinish = this.calculateExpectedFinishDate();
        const targetDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        
        return targetDay >= startDay && targetDay <= expectedFinish;
    }
    
    toggleCalendarMonthMenu() {
        const menu = document.getElementById('calendar-month-menu');
        menu.classList.toggle('active');
    }
    
    hideCalendarMonthMenu() {
        document.getElementById('calendar-month-menu').classList.remove('active');
    }
    
    updateCalendarMonthDropdown() {
        const monthGrid = document.getElementById('calendar-month-grid');
        monthGrid.innerHTML = '';
        
        this.availableMonths.forEach(month => {
            const monthBtn = document.createElement('button');
            monthBtn.className = 'chapter-btn';
            monthBtn.textContent = month.toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
            });
            
            if (month.getTime() === this.currentCalendarMonth.getTime()) {
                monthBtn.classList.add('active');
            }
            
            monthBtn.addEventListener('click', () => {
                this.currentCalendarMonth = new Date(month);
                this.updateCalendarView();
                this.hideCalendarMonthMenu();
            });
            
            monthGrid.appendChild(monthBtn);
        });
    }
    
    
    setupCalendarSwipeNavigation() {
        const calendarContent = document.getElementById('calendar-content');
        if (!calendarContent || !this.settings.enableSwipeNavigation) return;
        
        // Clean up any existing listeners first
        this.cleanupCalendarSwipeNavigation();
        
        let startX = 0;
        let startY = 0;
        let isSwipeInProgress = false;
        
        this.calendarTouchStartHandler = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwipeInProgress = false;
        };
        
        this.calendarTouchMoveHandler = (e) => {
            if (!startX || !startY) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30 && !isSwipeInProgress) {
                isSwipeInProgress = true;
                
                if (diffX > 0) {
                    // Swipe left - next month
                    this.navigateCalendarMonth(1);
                } else {
                    // Swipe right - previous month
                    this.navigateCalendarMonth(-1);
                }
                
                // Reset coordinates
                startX = 0;
                startY = 0;
            }
        };
        
        this.calendarTouchEndHandler = () => {
            startX = 0;
            startY = 0;
            isSwipeInProgress = false;
        };
        
        calendarContent.addEventListener('touchstart', this.calendarTouchStartHandler, { passive: true });
        calendarContent.addEventListener('touchmove', this.calendarTouchMoveHandler, { passive: true });
        calendarContent.addEventListener('touchend', this.calendarTouchEndHandler, { passive: true });
    }
    
    cleanupCalendarSwipeNavigation() {
        const calendarContent = document.getElementById('calendar-content');
        if (!calendarContent) return;
        
        if (this.calendarTouchStartHandler) {
            calendarContent.removeEventListener('touchstart', this.calendarTouchStartHandler);
        }
        if (this.calendarTouchMoveHandler) {
            calendarContent.removeEventListener('touchmove', this.calendarTouchMoveHandler);
        }
        if (this.calendarTouchEndHandler) {
            calendarContent.removeEventListener('touchend', this.calendarTouchEndHandler);
        }
        
        this.calendarTouchStartHandler = null;
        this.calendarTouchMoveHandler = null;
        this.calendarTouchEndHandler = null;
    }

    handleKeyboardShortcuts(e) {
        // ESC to close modals
        if (e.key === 'Escape') {
            this.closeBibleReader();
            this.closeDayJumpModal();
            this.closeStartDateModal();
            this.closeResetDataModal();
            this.closeCalendarModal();
            this.closeCompletionModal();
        }
        
        // Arrow keys for chapter navigation when Bible reader is open
        if (document.getElementById('bible-reader').classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.navigateChapter(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.navigateChapter(1);
            }
        }
        
        // Arrow keys for month navigation when calendar modal is open
        if (document.getElementById('calendar-modal').classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.navigateCalendarMonth(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.navigateCalendarMonth(1);
            }
        }
        
    }
    
    showError(message) {
        this.showToast(message, 'error');
    }
    
    showToast(message, type = 'success') {
        // Initialize toast queue if it doesn't exist
        if (!this.toastQueue) {
            this.toastQueue = [];
            this.isProcessingToasts = false;
        }
        
        // Add to queue
        this.toastQueue.push({ message, type });
        
        // Process queue if not already processing
        if (!this.isProcessingToasts) {
            this.processToastQueue();
        }
    }
    
    processToastQueue() {
        if (this.toastQueue.length === 0) {
            this.isProcessingToasts = false;
            return;
        }
        
        this.isProcessingToasts = true;
        const { message, type } = this.toastQueue.shift();
        
        this.displayToast(message, type);
        
        // Process next toast after queue delay
        setTimeout(() => {
            this.processToastQueue();
        }, this.CONSTANTS.QUEUE_DELAY);
    }
    
    displayToast(message, type = 'success') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        let backgroundColor;
        const rootStyles = getComputedStyle(document.documentElement);
        switch(type) {
            case 'error':
                backgroundColor = rootStyles.getPropertyValue('--error').trim();
                break;
            case 'orange':
                backgroundColor = rootStyles.getPropertyValue('--warning').trim();
                break;
            case 'gray':
                backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--text-placeholder').trim();
                break;
            case 'success':
            default:
                backgroundColor = rootStyles.getPropertyValue('--success').trim();
                break;
        }
        
        const isLightMode = document.documentElement.classList.contains('light-mode');
        const textColor = isLightMode ? 'white' : 'black';
        
        // Calculate position based on existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        let topOffset = 20;
        
        // Calculate cumulative height of existing toasts
        existingToasts.forEach(existingToast => {
            topOffset += existingToast.offsetHeight + 10; // Add toast height + 10px gap
        });
        
        toast.style.cssText = `
            position: fixed;
            top: ${topOffset}px;
            right: 20px;
            background: ${backgroundColor};
            color: ${textColor} !important;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 6px var(--shadow-color);
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
        `;
        
        // Create dismiss function with proper cleanup
        const dismissToast = () => {
            if (toast.parentNode) {
                toast.style.animation = 'slideOut 0.3s ease-out';
                // Remove event listener to prevent memory leak
                toast.removeEventListener('click', dismissToast);
                setTimeout(() => {
                    if (toast.parentNode) {
                        document.body.removeChild(toast);
                    }
                }, this.CONSTANTS.ANIMATION_DELAY);
            }
        };
        
        // Add click to dismiss functionality
        toast.style.cursor = 'pointer';
        toast.addEventListener('click', dismissToast);
        
        // Auto-dismiss after 5 seconds
        const autoTimer = setTimeout(dismissToast, this.CONSTANTS.TOAST_DURATION);
        
        // Store timer reference for potential cleanup
        toast._autoTimer = autoTimer;
        
        document.body.appendChild(toast);
    }
    
    showProgressToast(action) {
        this.showToast(`Progress ${action} successfully`);
    }
    
    showPreviousDaysToast(count) {
        const dayWord = count === 1 ? 'day' : 'days';
        this.showToast(`${count} previous ${dayWord} also marked complete`, 'success');
    }
    
    
    saveProgress() {
        const data = {
            currentDay: this.currentDay,
            completedDays: Array.from(this.completedDays),
            dayCompletionTimestamps: this.dayCompletionTimestamps,
            categoryCompletions: this.categoryCompletions,
            startDate: this.startDate.toLocaleDateString('en-CA'),
            startDateSetOn: this.startDateSetOn.toLocaleString(),
            lastUpdated: new Date().toLocaleString()
        };
        
        localStorage.setItem('bible300Progress', JSON.stringify(data));
    }
    
    loadProgress() {
        try {
            const saved = localStorage.getItem('bible300Progress');
            if (saved) {
                const data = JSON.parse(saved);
                this.currentDay = data.currentDay || 1;
                this.completedDays = new Set(data.completedDays || []);
                this.dayCompletionTimestamps = data.dayCompletionTimestamps || {};
                this.categoryCompletions = data.categoryCompletions || {};
                // Parse date string in YYYY-MM-DD format to avoid timezone issues
                if (data.startDate) {
                    const [year, month, day] = data.startDate.split('-').map(Number);
                    this.startDate = new Date(year, month - 1, day);
                } else {
                    this.startDate = new Date();
                }
                // Load when start date was set
                if (data.startDateSetOn) {
                    this.startDateSetOn = new Date(data.startDateSetOn);
                } else {
                    this.startDateSetOn = new Date(); // Default to now if not saved
                }
                // Invalidate caches after loading new data
                this._cacheInvalidated = true;
                this._parsedCompletionDates = null;
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }
    
    // Export/Import functionality for reading progress backup
    exportProgress() {
        const data = {
            currentDay: this.currentDay,
            completedDays: Array.from(this.completedDays),
            dayCompletionTimestamps: this.dayCompletionTimestamps,
            categoryCompletions: this.categoryCompletions,
            startDate: this.startDate.toLocaleDateString('en-CA'),
            exportDate: new Date().toLocaleString(),
            version: this.APP_VERSION
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        const today = new Date();
        const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        a.download = `bible300-progress-${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        this.showProgressToast('exported');
    }
    
    importProgress(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.currentDay && data.completedDays && data.categoryCompletions) {
                    this.currentDay = data.currentDay;
                    this.viewingDay = this.getCurrentDay();
                    this.completedDays = new Set(data.completedDays);
                    this.dayCompletionTimestamps = data.dayCompletionTimestamps || {};
                    this.categoryCompletions = data.categoryCompletions;
                    
                    // Parse start date string in YYYY-MM-DD format to avoid timezone issues
                    if (data.startDate) {
                        const [year, month, day] = data.startDate.split('-').map(Number);
                        this.startDate = new Date(year, month - 1, day);
                    } else {
                        this.startDate = new Date();
                    }
                    
                    this.saveProgress();
                    this.updateUI();
                    this.updateProgressTab();
                    
                    this.showProgressToast('imported');
                } else {
                    throw new Error('Invalid backup file format');
                }
            } catch (error) {
                console.error('Error importing progress:', error);
                this.showToast('Failed to import progress. Please check the file format.', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Overview Tab Methods
    updateOverviewTab() {
        this.setupOverviewEventListeners();
        this.generateDaysOverview();
        
        // Reset to "All Days" filter and clear search when switching to overview
        setTimeout(() => {
            // Clear search input
            const searchInput = document.getElementById('book-search-input');
            const clearBtn = document.getElementById('clear-search-btn');
            const searchResultsText = document.getElementById('search-results-text');
            
            if (searchInput) {
                searchInput.value = '';
            }
            if (clearBtn) {
                clearBtn.style.display = 'none';
            }
            if (searchResultsText) {
                searchResultsText.style.display = 'none';
            }
            
            // Reset to "All Days" filter
            this.updateActiveFilterButton('all');
            this.applyQuickFilter('all');
        }, 0);
    }

    setupOverviewEventListeners() {
        // Click on day card to navigate
        document.getElementById('days-container').addEventListener('click', (e) => {
            const dayCard = e.target.closest('.day-overview-card');
            if (dayCard) {
                const dayNumber = parseInt(dayCard.dataset.day);
                this.switchTab('reading-plan');
                this.viewingDay = dayNumber;
                this.updateUI();
            }
        });

        // Live search/filter functionality
        const searchInput = document.getElementById('book-search-input');
        const clearBtn = document.getElementById('clear-search-btn');

        // Live filtering as user types
        searchInput.addEventListener('input', () => {
            this.filterDays();
        });

        // Clear filter
        clearBtn.addEventListener('click', () => {
            this.clearDayFilter();
        });

        // Quick filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterType = btn.dataset.filter;
                this.updateActiveFilterButton(filterType);
                this.applyQuickFilter(filterType);
            });
        });
    }

    generateDaysOverview() {
        const container = document.getElementById('days-container');
        let html = '';

        for (let day = 1; day <= this.CONSTANTS.TOTAL_DAYS; day++) {
            const readings = this.getDayReadings(day);
            const isCompleted = this.completedDays.has(day);

            html += `
                <div class="day-overview-card ${isCompleted ? 'completed' : ''}" data-day="${day}">
                    <div class="day-overview-header">
                        <div class="day-overview-number">Day ${day}</div>
                    </div>
                    <div class="day-overview-readings">
                        ${readings.map(reading => `
                            <div class="reading-category-overview">
                                <span class="category-name">${reading.category}</span>
                                <span class="reading-text">${reading.text}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    getDayReadings(day) {
        // Find the reading for this day from the READING_PLAN data
        const dayPlan = READING_PLAN.find(plan => plan.day === day);
        
        if (!dayPlan) {
            // Fallback if day not found
            return [
                { category: 'Psalm', text: `Psalm ${day}` },
                { category: 'Gospel', text: `Gospel Reading ${day}` },
                { category: 'Wisdom', text: `Wisdom ${day}` },
                { category: 'OT', text: `Old Testament ${day}` },
                { category: 'NT', text: `New Testament ${day}` }
            ];
        }
        
        let oldTestamentText = `${dayPlan.oldTestament.book} ${dayPlan.oldTestament.chapter}`;
        
        return [
            { 
                category: 'Psalm', 
                text: `${dayPlan.psalm.book} ${dayPlan.psalm.chapter}` 
            },
            { 
                category: 'Gospel', 
                text: `${dayPlan.gospel.book} ${dayPlan.gospel.chapter}` 
            },
            { 
                category: 'Wisdom', 
                text: `${dayPlan.wisdom.book} ${dayPlan.wisdom.chapter}` 
            },
            { 
                category: 'OT', 
                text: oldTestamentText
            },
            { 
                category: 'NT', 
                text: `${dayPlan.newTestament.book} ${dayPlan.newTestament.chapter}` 
            }
        ];
    }

    filterDays() {
        const searchInput = document.getElementById('book-search-input');
        const query = searchInput.value.trim();
        const clearBtn = document.getElementById('clear-search-btn');
        
        // Show/hide clear button based on input
        clearBtn.style.display = query ? 'flex' : 'none';
        
        // Get current quick filter
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const quickFilterType = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
        
        // If no query, apply current quick filter
        if (!query) {
            this.applyQuickFilter(quickFilterType);
            return;
        }
        
        const normalizedQuery = query.toLowerCase();
        const dayCards = document.querySelectorAll('.day-overview-card');
        let visibleCount = 0;
        
        dayCards.forEach(card => {
            const day = parseInt(card.dataset.day);
            
            // Check both book filter and quick filter
            const matchesBookFilter = this.dayMatchesFilter(day, normalizedQuery);
            const matchesQuickFilter = this.dayMatchesQuickFilter(day, quickFilterType);
            
            if (matchesBookFilter && matchesQuickFilter) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update header to show combined filter status
        this.updateCombinedFilterStatus(query, quickFilterType, visibleCount);
    }

    dayMatchesQuickFilter(day, filterType) {
        switch (filterType) {
            case 'all':
                return true;
            case 'completed':
                return this.completedDays.has(day);
            case 'remaining':
                return !this.completedDays.has(day);
            default:
                return true;
        }
    }

    updateCombinedFilterStatus(query, quickFilterType, count) {
        const searchResultsText = document.getElementById('search-results-text');
        
        searchResultsText.textContent = `${count} days match "${query}"`;
        searchResultsText.style.display = 'block';
    }

    dayMatchesFilter(day, query) {
        const readings = this.getDayReadings(day);
        
        return readings.some(reading => {
            const fullReading = reading.text;
            const bookName = this.extractBookName(fullReading);
            
            // Check if book name matches or full reading contains query
            return this.bookNameMatches(bookName, query) || 
                   fullReading.toLowerCase().includes(query);
        });
    }

    extractBookName(readingText) {
        // Handle multi-word book names
        const parts = readingText.split(' ');
        
        // Common multi-word book patterns
        const multiWordBooks = [
            '1 Chronicles', '2 Chronicles', '1 Corinthians', '2 Corinthians',
            '1 Kings', '2 Kings', '1 Maccabees', '2 Maccabees',
            '1 Peter', '2 Peter', '1 Samuel', '2 Samuel',
            '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy',
            '1 John', '2 John', '3 John', 'Song of Solomon', 'Wisdom of Solomon'
        ];
        
        // Check for multi-word books first
        for (const multiBook of multiWordBooks) {
            if (readingText.startsWith(multiBook)) {
                return multiBook;
            }
        }
        
        // Default to first word
        return parts[0];
    }

    bookNameMatches(bookName, query) {
        const normalizedBook = bookName.toLowerCase();
        
        // Direct match
        if (normalizedBook.includes(query)) {
            return true;
        }
        
        // Handle common variations
        const variations = {
            'psalms': 'psalm',
            'psalm': 'psalms',
            'matt': 'matthew',
            'matthew': 'matt',
            'gen': 'genesis',
            'genesis': 'gen',
            'ex': 'exodus',
            'exodus': 'ex',
            'rev': 'revelation',
            'revelation': 'rev',
            '1chr': '1 chronicles',
            '2chr': '2 chronicles',
            '1cor': '1 corinthians',
            '2cor': '2 corinthians',
            '1sam': '1 samuel',
            '2sam': '2 samuel',
            '1ki': '1 kings',
            '2ki': '2 kings',
            '1pet': '1 peter',
            '2pet': '2 peter',
            '1tim': '1 timothy',
            '2tim': '2 timothy',
            '1th': '1 thessalonians',
            '2th': '2 thessalonians',
            'song': 'song of solomon',
            'wisdom': 'wisdom of solomon'
        };
        
        // Check variations
        if (variations[query] && normalizedBook.includes(variations[query])) {
            return true;
        }
        
        return false;
    }

    showAllDays() {
        const dayCards = document.querySelectorAll('.day-overview-card');
        dayCards.forEach(card => {
            card.style.display = 'block';
        });
        this.updateFilterStatus('');
    }

    updateFilterStatus(query) {
        const searchResultsText = document.getElementById('search-results-text');
        
        if (query) {
            const visibleCards = document.querySelectorAll('.day-overview-card[style*="block"], .day-overview-card:not([style*="none"])');
            const visibleCount = Array.from(visibleCards).filter(card => 
                !card.style.display || card.style.display === 'block'
            ).length;
            
            searchResultsText.textContent = `${visibleCount} days match "${query}"`;
            searchResultsText.style.display = 'block';
        } else {
            searchResultsText.style.display = 'none';
        }
    }

    toggleSearchIcon() {
        const searchInput = document.getElementById('book-search-input');
        const searchIcon = document.querySelector('.search-icon');
        
        if (searchInput && searchIcon) {
            if (searchInput.value.trim()) {
                searchIcon.style.display = 'none';
            } else {
                searchIcon.style.display = 'block';
            }
        }
    }

    applyQuickFilter(filterType) {
        const searchInput = document.getElementById('book-search-input');
        const query = searchInput.value.trim();
        
        // If there's a search query, use the combined filtering logic
        if (query) {
            this.filterDays();
            return;
        }
        
        // Otherwise, apply just the quick filter
        const dayCards = document.querySelectorAll('.day-overview-card');
        let visibleCount = 0;
        
        dayCards.forEach(card => {
            const day = parseInt(card.dataset.day);
            let shouldShow = false;
            
            switch (filterType) {
                case 'all':
                    shouldShow = true;
                    break;
                case 'completed':
                    shouldShow = this.completedDays.has(day);
                    break;
                case 'remaining':
                    shouldShow = !this.completedDays.has(day);
                    break;
            }
            
            if (shouldShow) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update header
        this.updateQuickFilterStatus(filterType, visibleCount);
    }

    updateActiveFilterButton(activeFilter) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            if (btn.dataset.filter === activeFilter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    updateQuickFilterStatus(filterType, count) {
        const searchResultsText = document.getElementById('search-results-text');
        
        switch (filterType) {
            case 'all':
                searchResultsText.style.display = 'none';
                break;
            case 'completed':
                searchResultsText.textContent = `${count} completed days`;
                searchResultsText.style.display = 'block';
                break;
            case 'remaining':
                searchResultsText.textContent = `${count} remaining days`;
                searchResultsText.style.display = 'block';
                break;
        }
    }

    clearDayFilter() {
        const searchInput = document.getElementById('book-search-input');
        const clearBtn = document.getElementById('clear-search-btn');
        
        searchInput.value = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        
        // Reapply the current quick filter instead of showing all days
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        if (activeFilterBtn) {
            const filterType = activeFilterBtn.dataset.filter;
            this.applyQuickFilter(filterType);
        } else {
            this.showAllDays();
        }
    }

    // Settings Tab Methods
    updateSettingsTab() {
        this.setupSettingsEventListeners();
        this.loadSettingsUI();
    }

    setupSettingsEventListeners() {
        // Prevent multiple event listener attachments
        if (this.settingsEventListenersSetup) {
            return;
        }
        this.settingsEventListenersSetup = true;
        
        // Words of Christ in Red toggle
        document.getElementById('words-of-christ-red').addEventListener('change', (e) => {
            this.settings.wordsOfChristRed = e.target.checked;
            this.saveSettings();
            this.applySettings();
        });

        // Words of Christ Scope setting
        document.getElementById('words-of-christ-scope').addEventListener('change', (e) => {
            this.settings.wordsOfChristScope = e.target.value;
            this.saveSettings();
            this.applySettings();
        });

        // Font Family setting
        document.getElementById('font-family-setting').addEventListener('change', (e) => {
            this.settings.fontFamily = e.target.value;
            this.saveSettings();
            this.applySettings();
        });

        // Font Size setting
        document.getElementById('font-size-setting').addEventListener('change', (e) => {
            this.settings.fontSize = e.target.value;
            this.saveSettings();
            this.applySettings();
        });

        // Tab Layout setting
        document.getElementById('tab-layout-setting').addEventListener('change', (e) => {
            this.settings.tabLayout = e.target.value;
            this.saveSettings();
            this.applySettings();
        });

        // Show Floating Arrows toggle
        document.getElementById('show-floating-arrows').addEventListener('change', (e) => {
            this.settings.showFloatingArrows = e.target.checked;
            this.saveSettings();
            this.applySettings();
        });

        // Enable Swipe Navigation toggle
        document.getElementById('enable-swipe-navigation').addEventListener('change', (e) => {
            this.settings.enableSwipeNavigation = e.target.checked;
            this.saveSettings();
            this.applySettings();
        });

        document.getElementById('show-activity-graph').addEventListener('change', (e) => {
            this.settings.showActivityGraph = e.target.checked;
            this.saveSettings();
            this.updateRecentActivityDisplay(); // Refresh activity display to show/hide graph
        });

        // Recent Activity View setting
        document.getElementById('recent-activity-view').addEventListener('change', (e) => {
            this.settings.recentActivityView = e.target.value;
            this.saveSettings();
            this.updateRecentActivityDisplay();
        });


        // Dark Mode toggle
        document.getElementById('dark-mode').addEventListener('change', (e) => {
            this.settings.darkMode = e.target.checked;
            this.saveSettings();
            this.applySettings();
        });


        // Export Progress button
        document.getElementById('export-progress').addEventListener('click', () => {
            this.exportProgress();
        });

        // Import Progress button
        document.getElementById('import-progress').addEventListener('click', () => {
            document.getElementById('import-file').click();
        });

        // Import file handler
        document.getElementById('import-file').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.importProgress(e.target.files[0]);
            }
        });

        // Reset All Data button
        document.getElementById('reset-all-data').addEventListener('click', () => {
            this.showResetDataModal();
        });
    }

    loadSettingsUI() {
        // Load current settings into UI
        document.getElementById('words-of-christ-red').checked = this.settings.wordsOfChristRed;
        document.getElementById('words-of-christ-scope').value = this.settings.wordsOfChristScope;
        document.getElementById('font-family-setting').value = this.settings.fontFamily;
        document.getElementById('font-size-setting').value = this.settings.fontSize;
        document.getElementById('tab-layout-setting').value = this.settings.tabLayout;
        document.getElementById('show-floating-arrows').checked = this.settings.showFloatingArrows;
        document.getElementById('enable-swipe-navigation').checked = this.settings.enableSwipeNavigation;
        document.getElementById('show-activity-graph').checked = this.settings.showActivityGraph;
        document.getElementById('recent-activity-view').value = this.settings.recentActivityView;
        document.getElementById('dark-mode').checked = this.settings.darkMode;
    }

    saveSettings() {
        localStorage.setItem('bible300Settings', JSON.stringify(this.settings));
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('bible300Settings');
            if (saved) {
                const settings = JSON.parse(saved);
                
                this.settings = { ...this.settings, ...settings };
            } else {
                // First time user - save the default settings
                this.saveSettings();
            }
        } catch (error) {
            console.error('Error loading settings:', error);
            // On error, save the default settings
            this.saveSettings();
        }
    }

    applySettings() {
        // Apply font family setting
        document.documentElement.classList.remove('font-inter', 'font-noto-sans', 'font-noto-serif');
        document.documentElement.classList.add(`font-${this.settings.fontFamily}`);
        
        // Load fonts if needed and update UI labels
        if (this.settings.fontFamily !== 'inter') {
            this.checkFontLoading(this.settings.fontFamily).then(status => {
                this.updateFontLabels(status);
            });
        } else {
            this.updateFontLabels('system');
        }

        // Apply font size setting
        document.documentElement.classList.remove('font-small', 'font-medium', 'font-large', 'font-extra-large');
        document.documentElement.classList.add(`font-${this.settings.fontSize}`);
        
        // Apply tab layout setting
        document.documentElement.classList.remove('layout-horizontal', 'layout-dropdown');
        document.documentElement.classList.add(`layout-${this.settings.tabLayout}`);
        
        // Apply floating arrows setting
        if (this.settings.showFloatingArrows) {
            document.documentElement.classList.remove('hide-floating-arrows');
        } else {
            document.documentElement.classList.add('hide-floating-arrows');
        }
        

        // Apply swipe navigation setting - only if reader is open
        if (document.getElementById('bible-reader').classList.contains('active')) {
            this.setupSwipeGestures();
        }


        // Apply dark mode setting
        if (this.settings.darkMode) {
            document.documentElement.classList.remove('light-mode');
            this.updateThemeColor(getComputedStyle(document.documentElement).getPropertyValue('--background-primary').trim());
        } else {
            document.documentElement.classList.add('light-mode');
            this.updateThemeColor(getComputedStyle(document.documentElement).getPropertyValue('--background-secondary').trim());
        }

        // Words of Christ setting is now applied per-book in displayBibleContent
        // Remove any existing global classes
        document.documentElement.classList.remove('words-of-christ-enabled');
        document.documentElement.classList.remove('words-of-christ-earthly-only');
    }
    
    shouldShowWordsOfChrist(bookName, chapter = null) {
        // Check if Words of Christ should be enabled for this book/chapter
        if (!this.settings.wordsOfChristRed) {
            return false;
        }
        
        if (this.settings.wordsOfChristScope === 'all') {
            return true;
        }
        
        // For 'earthly' scope, only show in Gospels and Acts 1
        const gospelBooks = ['Matthew', 'Mark', 'Luke', 'John'];
        if (gospelBooks.includes(bookName)) {
            return true;
        }
        
        // Acts only for chapter 1 in earthly ministry scope
        if (bookName === 'Acts' && chapter === 1) {
            return true;
        }
        
        return false;
    }
    
    updateThemeColor(color) {
        // Update the theme-color meta tag for mobile browsers
        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', color);
        } else {
            // Create the meta tag if it doesn't exist
            themeColorMeta = document.createElement('meta');
            themeColorMeta.name = 'theme-color';
            themeColorMeta.content = color;
            document.head.appendChild(themeColorMeta);
        }
    }
    
    updateVersionDisplay() {
        // Update the version display in Settings from centralized constant
        const versionElement = document.getElementById('app-version-display');
        if (versionElement) {
            versionElement.textContent = `Bible 300 PWA v${this.APP_VERSION}`;
        }
    }

    async checkFontLoading(fontFamily) {
        if (fontFamily === 'inter') {
            return 'System fonts (always available)';
        }

        const fontName = fontFamily === 'noto-sans' ? 'Noto Sans Local' : 'Noto Serif Local';
        const fileName = fontFamily === 'noto-sans' ? 'NotoSans-VariableFont.ttf' : 'NotoSerif-VariableFont.ttf';
        
        try {
            // First, check if we can actually fetch the font file
            const fontUrl = `./fonts/${fileName}`;
            const response = await fetch(fontUrl);
            
            if (!response.ok) {
                return `❌ Font file fetch failed: ${response.status} (likely file:// protocol)`;
            }
            
            // Try to load the font using FontFace API
            if ('FontFace' in window) {
                const fontFace = new FontFace(fontName, `url(${fontUrl})`);
                const loadedFont = await fontFace.load();
                
                // Add to document fonts if not already there
                if (!document.fonts.has(loadedFont)) {
                    document.fonts.add(loadedFont);
                }
                
                // Check if we're actually using the loaded font vs system font
                const isUsingLoadedFont = await this.testFontActuallyLoaded(fontName);
                
                return `✅ Font file loaded via FontFace API | Actually applied: ${isUsingLoadedFont}`;
            }
            
            return `❌ FontFace API not available`;
            
        } catch (error) {
            return `❌ ${fontName} failed: ${error.message}`;
        }
    }

    async testFontActuallyLoaded(fontName) {
        // Test if the font is actually being used by comparing with a definitely different font
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Measure with Comic Sans (should be very different)
        ctx.font = '48px "Comic Sans MS", cursive';
        const comicWidth = ctx.measureText('Testing Font Width').width;
        
        // Measure with our target font
        ctx.font = `48px "${fontName}", sans-serif`;
        const targetWidth = ctx.measureText('Testing Font Width').width;
        
        // If widths are significantly different, the font is actually being used
        const difference = Math.abs(comicWidth - targetWidth);
        return difference > 5 ? 'YES - font is different from system' : 'NO - likely using system font';
    }

    updateFontLabels(status) {
        const select = document.getElementById('font-family-setting');
        if (!select) return;

        const options = select.getElementsByTagName('option');
        
        // Update labels based on whether fonts are actually loading
        const isLoadingRealFonts = status.includes('✅') && status.includes('Font file loaded');
        
        for (let option of options) {
            switch (option.value) {
                case 'inter':
                    option.textContent = 'Default';
                    break;
                case 'noto-sans':
                    option.textContent = 'Noto Sans';
                    break;
                case 'noto-serif':
                    option.textContent = 'Noto Serif';
                    break;
            }
        }
    }

    async checkFontByMeasurement(fontName) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            // Measure with default font
            context.font = '72px monospace';
            const defaultWidth = context.measureText('The quick brown fox').width;
            
            // Measure with target font
            context.font = `72px "${fontName}", monospace`;
            const testWidth = context.measureText('The quick brown fox').width;
            
            // If widths are different, the font loaded
            if (Math.abs(defaultWidth - testWidth) > 1) {
                resolve(`✅ ${fontName} loaded`);
            } else {
                resolve(`❌ ${fontName} not loaded (using fallback)`);
            }
        });
    }

    
    // Chapter Menu Methods  
    setupChapterMenu(bookName, currentChapter) {
        const bookInfo = this.findBookInfo(bookName);
        if (!bookInfo) return;
        
        // Update chapter menu title
        document.getElementById('chapter-menu-title').textContent = bookName;
        
        // Generate chapter grid
        const grid = document.getElementById('chapter-grid');
        let html = '';
        
        for (let chapter = 1; chapter <= bookInfo.chapters; chapter++) {
            const isCurrentChapter = chapter === currentChapter;
            html += `<button class="chapter-btn ${isCurrentChapter ? 'current' : ''}" 
                     onclick="app.openBook('${bookName}', ${chapter})">${chapter}</button>`;
        }
        
        grid.innerHTML = html;
    }
    
    toggleChapterMenu() {
        const menu = document.getElementById('chapter-menu');
        const header = document.getElementById('chapter-selector-header');
        menu.classList.toggle('active');
        header.classList.toggle('active');
    }
    
    hideChapterMenu() {
        const menu = document.getElementById('chapter-menu');
        const header = document.getElementById('chapter-selector-header');
        menu.classList.remove('active');
        header.classList.remove('active');
    }
    
    // Floating Arrows Methods
    setupFloatingArrows(bookName, currentChapter) {
        const bookInfo = this.findBookInfo(bookName);
        if (!bookInfo) return;
        
        const prevBtn = document.getElementById('floating-prev');
        const nextBtn = document.getElementById('floating-next');
        
        // Enable/disable buttons based on current chapter
        prevBtn.disabled = currentChapter <= 1;
        nextBtn.disabled = currentChapter >= bookInfo.chapters;
    }
    
    // Swipe Gesture Methods
    setupSwipeGestures() {
        const readerContent = document.getElementById('reader-content');
        if (!readerContent) return;
        
        // Check if swipe navigation is enabled
        if (!this.settings.enableSwipeNavigation) {
            this.removeSwipeListeners();
            return;
        }
        
        // Remove existing listeners first to prevent duplicates
        this.removeSwipeListeners();
        
        let startX = null;
        let startY = null;
        let isScrolling = null;
        
        const onTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = null;
        };
        
        const onTouchMove = (e) => {
            if (!startX || !startY) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            if (isScrolling === null) {
                isScrolling = Math.abs(diffY) > Math.abs(diffX);
            }
            
            // If user is scrolling vertically, don't interfere
            if (isScrolling) return;
            
            // Prevent horizontal scrolling during swipe
            e.preventDefault();
        };
        
        const onTouchEnd = (e) => {
            if (!startX || !startY || isScrolling) {
                startX = null;
                startY = null;
                isScrolling = null;
                return;
            }
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const threshold = 50; // Minimum swipe distance
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Swiped left - next chapter
                    this.navigateChapter(1);
                } else {
                    // Swiped right - previous chapter
                    this.navigateChapter(-1);
                }
            }
            
            startX = null;
            startY = null;
            isScrolling = null;
        };
        
        // Store listeners for cleanup
        this.swipeListeners = { onTouchStart, onTouchMove, onTouchEnd };
        
        // Add touch event listeners
        readerContent.addEventListener('touchstart', onTouchStart, { passive: false });
        readerContent.addEventListener('touchmove', onTouchMove, { passive: false });
        readerContent.addEventListener('touchend', onTouchEnd, { passive: false });
    }
    
    removeSwipeListeners() {
        const readerContent = document.getElementById('reader-content');
        if (!readerContent || !this.swipeListeners) return;
        
        readerContent.removeEventListener('touchstart', this.swipeListeners.onTouchStart);
        readerContent.removeEventListener('touchmove', this.swipeListeners.onTouchMove);
        readerContent.removeEventListener('touchend', this.swipeListeners.onTouchEnd);
        
        this.swipeListeners = null;
    }

    setupUniversalScrollPrevention() {
        // Store references for cleanup
        this.scrollPreventionObservers = [];
        // Store scroll position to restore when modal closes
        this.savedScrollPosition = 0;
        
        // Enhanced for iOS PWA keyboard viewport changes
        const updateScrollPrevention = () => {
            const hasActiveModal = document.querySelector('.modal.active');
            if (hasActiveModal) {
                // Save current scroll position before fixing position
                this.savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                
                // Use position fixed to prevent scroll during viewport changes
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = `-${this.savedScrollPosition}px`;
                document.body.style.width = '100%';
            } else {
                // Restore scroll position when modal closes
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                
                // Restore the scroll position
                window.scrollTo(0, this.savedScrollPosition);
            }
        };

        // Watch all modals for class changes
        document.querySelectorAll('.modal').forEach(modal => {
            const observer = new MutationObserver(updateScrollPrevention);
            observer.observe(modal, { 
                attributes: true, 
                attributeFilter: ['class'] 
            });
            this.scrollPreventionObservers.push(observer);
        });

        // Re-apply when keyboard changes viewport (iOS PWA specific)
        this.resizeListener = updateScrollPrevention;
        window.addEventListener('resize', this.resizeListener);

        // Initial check in case any modal is already active
        updateScrollPrevention();
    }
    
    // Cleanup method for scroll prevention
    cleanupScrollPrevention() {
        // Disconnect observers
        this.scrollPreventionObservers?.forEach(observer => observer.disconnect());
        this.scrollPreventionObservers = [];
        
        // Remove resize listener
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
        }
    }
    
    // Cleanup method for document listeners
    cleanupDocumentListeners() {
        // Remove all document-level event listeners
        this.documentListeners?.forEach(({ event, handler }) => {
            document.removeEventListener(event, handler);
        });
        this.documentListeners = [];
    }
    
    // Complete cleanup method
    cleanup() {
        this.cleanupScrollPrevention();
        this.cleanupDocumentListeners();
        this.domCache = {}; // Clear DOM cache
        this.dateCache = { today: null, todayStart: null, lastUpdate: 0 }; // Clear date cache
        this.jsonCache = { completionEntries: null, completionKeys: null, lastCompletionUpdate: 0 }; // Clear JSON cache
        this.dateValidationCache.clear(); // Clear date validation cache
    }
}

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new Bible300App();
});

// Handle install prompt for PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button/banner
    showInstallPromotion();
});

function showInstallPromotion() {
    // You could show a custom install banner here
}

// Handle successful installation
window.addEventListener('appinstalled', (evt) => {
    app.showToast('Bible 300 installed successfully 📱');
});

// Handle updates
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Show update notification
        app.showToast('App updated. New features available 🚀');
    });
}