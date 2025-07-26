// Bible 300 - Main Application
class Bible300App {
    constructor() {
        this.currentDay = 1; // The actual current/active day for progression
        this.viewingDay = 1; // The day currently being viewed in the UI
        this.completedDays = new Set();
        this.dayCompletionTimestamps = {}; // Track when each day was completed
        this.categoryCompletions = {}; // Track individual category completions
        this.currentTab = 'reading-plan';
        this.currentTestament = 'old';
        this.startDate = new Date(); // Default to today
        this.settings = {
            wordsOfChristRed: false,
            fontSize: 'medium',
            fontFamily: 'inter', // inter, noto-sans, noto-serif
            darkMode: true // Default to dark theme (but inverted logic)
        };
        
        // Load saved data
        this.loadProgress();
        this.loadSettings();
        
        // Initialize the app
        this.init();
    }
    
    init() {
        this.viewingDay = this.getCurrentDay(); // Initialize viewing day to actual current day
        this.setupEventListeners();
        this.applySettings(); // Apply saved settings
        this.updateUI();
        this.loadBibleBooks();
        this.updateProgressTab();
        this.switchTab('reading-plan'); // Ensure Today tab is selected on load
    }
    
    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });
        
        // Testament tabs
        document.querySelectorAll('.testament-btn').forEach(btn => {
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
        
        document.getElementById('prev-chapter').addEventListener('click', () => {
            this.navigateChapter(-1);
        });
        
        document.getElementById('next-chapter').addEventListener('click', () => {
            this.navigateChapter(1);
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
        document.addEventListener('click', (e) => {
            const chapterHeader = document.getElementById('chapter-selector-header');
            const chapterMenu = document.getElementById('chapter-menu');
            if (!chapterHeader.contains(e.target) && !chapterMenu.contains(e.target) && chapterMenu.classList.contains('active')) {
                this.hideChapterMenu();
            }
        });
        
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
        document.getElementById('change-start-date-btn').addEventListener('click', () => {
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
        
        document.getElementById('confirm-reset-data-btn').addEventListener('click', () => {
            this.resetAllData();
        });
        
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
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }
    
    getCurrentDay() {
        // Find the first day that hasn't been completed
        for (let day = 1; day <= 300; day++) {
            if (!this.completedDays.has(day)) {
                return day;
            }
        }
        // If all days are completed, return 300
        return 300;
    }
    
    switchTab(tabName) {
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
        
        this.currentTab = tabName;
        
        // Update specific tab content
        if (tabName === 'progress') {
            this.updateProgressTab();
        } else if (tabName === 'overview') {
            this.updateOverviewTab();
        } else if (tabName === 'reading-plan') {
            // Reset to actual current day when switching to Today tab
            this.viewingDay = this.getCurrentDay();
            this.updateUI();
        } else if (tabName === 'settings') {
            this.updateSettingsTab();
        }
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
            
            // Apply Words of Christ styling if enabled and verse is marked
            if (verse.wordsOfChrist && this.settings.wordsOfChristRed) {
                verseText = `<span class="words-of-christ">${verseText}</span>`;
            }
            
            contentHtml += `<p class="${verseClass}">`;
            contentHtml += `<span class="verse-number">${verse.verse}</span>`;
            contentHtml += verseText;
            contentHtml += `</p>`;
        });
        
        // Add bottom navigation controls
        const bookInfo = this.findBookInfo(bookName);
        const canGoPrev = chapter > 1;
        const canGoNext = bookInfo && chapter < bookInfo.chapters;
        
        if (canGoPrev || canGoNext) {
            contentHtml += `<div class="bottom-navigation">`;
            
            if (canGoPrev) {
                contentHtml += `<button class="nav-chapter-btn bottom-nav-btn" onclick="app.navigateChapter(-1)">`;
                contentHtml += `<i class="fas fa-chevron-left"></i> Chapter ${chapter - 1}`;
                contentHtml += `</button>`;
            } else {
                contentHtml += `<div class="nav-spacer"></div>`;
            }
            
            if (canGoNext) {
                contentHtml += `<button class="nav-chapter-btn bottom-nav-btn" onclick="app.navigateChapter(1)">`;
                contentHtml += `Chapter ${chapter + 1} <i class="fas fa-chevron-right"></i>`;
                contentHtml += `</button>`;
            } else {
                contentHtml += `<div class="nav-spacer"></div>`;
            }
            
            contentHtml += `</div>`;
        }
        
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
    }
    
    setupFootnoteHandlers() {
        // Add click handlers to footnote markers
        const footnoteMarkers = document.querySelectorAll('.footnote-marker[data-footnote]');
        footnoteMarkers.forEach(marker => {
            marker.addEventListener('click', (e) => {
                const footnoteId = marker.getAttribute('data-footnote');
                this.showFootnotePopup(e, footnoteId);
            });
            
            // Add hover effect
            marker.style.cursor = 'pointer';
            marker.style.color = '#007bff';
            marker.style.textDecoration = 'underline';
        });
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
        
        // Position popup near the clicked element
        const rect = event.target.getBoundingClientRect();
        popup.style.display = 'block';
        popup.style.left = `${rect.left + window.scrollX}px`;
        popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
        
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
            this.dayCompletionTimestamps[day] = new Date().toISOString();
            
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
                    this.dayCompletionTimestamps[prevDay] = new Date().toISOString();
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
            if (previousDaysMarked > 0) {
                this.showToast(`Day ${day} marked complete! (${previousDaysMarked} previous days also completed)`, 'success');
            } else {
                this.showToast('Day marked complete!');
            }
        }
    }
    
    updateUI() {
        // Update day counter
        document.getElementById('current-day').textContent = this.viewingDay;
        
        // Update day counter color based on completion
        const dayCounter = document.querySelector('.day-counter');
        if (this.completedDays.has(this.viewingDay)) {
            dayCounter.classList.add('completed');
        } else {
            dayCounter.classList.remove('completed');
        }
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Update progress
        const completionPercent = (this.completedDays.size / 300 * 100).toFixed(2);
        document.querySelector('.progress-fill').style.width = `${completionPercent}%`;
        document.querySelector('.progress-text span:last-child').textContent = `${completionPercent}%`;
        document.querySelector('.progress-text span:first-child').textContent = 
            `${this.completedDays.size} of 300 days completed`;
        
        // Update reading date
        const today = new Date();
        document.getElementById('reading-date').textContent = today.toLocaleDateString('en-US', {
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
        const todayReading = document.getElementById('today-reading');
        
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
        console.log('Checking auto-complete for day:', day); // debug
        const categories = ['psalm', 'gospel', 'wisdom', 'old-testament', 'new-testament'];
        const allCompleted = categories.every(categoryId => 
            this.isCategoryCompleted(day, categoryId)
        );
        console.log('All completed:', allCompleted, 'Day already complete:', this.completedDays.has(day)); // debug
        
        if (allCompleted && !this.completedDays.has(day)) {
            // All categories completed - mark day as complete
            this.completedDays.add(day);
            this.dayCompletionTimestamps[day] = new Date().toISOString();
            
            // Mark all previous days as complete too
            let previousDaysMarked = 0;
            for (let prevDay = 1; prevDay < day; prevDay++) {
                if (!this.completedDays.has(prevDay)) {
                    this.completedDays.add(prevDay);
                    this.dayCompletionTimestamps[prevDay] = new Date().toISOString();
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
            
            if (previousDaysMarked > 0) {
                this.showToast(`Day ${day} completed! (${previousDaysMarked} previous days also marked complete)`, 'success');
            } else {
                this.showToast('Day completed!', 'success');
            }
        } else if (!allCompleted && this.completedDays.has(day)) {
            // Not all categories completed but day was marked complete - undo completion
            this.completedDays.delete(day);
            delete this.dayCompletionTimestamps[day];
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
            completeBtn.innerHTML = '<i class="fas fa-check-double"></i> Day Completed';
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
        
        this.showToast(`Jumped to Day ${day}`);
    }
    
    updateProgressTab() {
        // Update stats
        document.getElementById('days-completed').textContent = this.completedDays.size;
        document.getElementById('completion-percent').textContent = 
            `${(this.completedDays.size / 300 * 100).toFixed(1)}%`;
            
        // Calculate days missed based on actual calendar dates
        const daysMissed = this.calculateDaysMissed();
        document.getElementById('days-missed').textContent = daysMissed;
            
        // Calculate streak (simplified)
        let streak = 0;
        for (let i = this.currentDay - 1; i >= 1; i--) {
            if (this.completedDays.has(i)) {
                streak++;
            } else {
                break;
            }
        }
        document.getElementById('streak-days').textContent = streak;
        
        // Update recent activity feed
        this.generateRecentActivity();
        
        // Update dates
        this.updateDateInfo();
    }
    
    getReadingDayForDate(calendarDate) {
        // Calculate how many days since start date
        const startDate = new Date(this.startDate);
        startDate.setHours(0, 0, 0, 0);
        calendarDate.setHours(0, 0, 0, 0);
        
        const daysDiff = Math.floor((calendarDate - startDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 0) return null; // Before start date
        
        // Find the reading day that should be done on this calendar date
        // Account for missed days - if you miss days, you stay on the same reading
        let readingDay = 1;
        let calendarDay = 0;
        
        while (calendarDay < daysDiff && readingDay <= 300) {
            calendarDay++;
            // Only advance to next reading if current reading was completed
            if (this.completedDays.has(readingDay)) {
                readingDay++;
            }
        }
        
        return readingDay <= 300 ? readingDay : 300;
    }
    
    getDaysCompletedOnDate(calendarDate) {
        const daysCompleted = [];
        const targetDateStr = calendarDate.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        // Check all completed days to see which were completed on this calendar date
        for (const day of this.completedDays) {
            const timestamp = this.dayCompletionTimestamps[day];
            if (timestamp) {
                const completionDate = new Date(timestamp);
                const completionDateStr = completionDate.toISOString().split('T')[0];
                
                if (completionDateStr === targetDateStr) {
                    daysCompleted.push(day);
                }
            }
        }
        
        return daysCompleted.sort((a, b) => a - b);
    }

    generateRecentActivity() {
        const activityFeed = document.getElementById('activity-feed');
        if (!activityFeed) return;
        
        activityFeed.innerHTML = '';
        
        const today = new Date();
        
        // Show last 7 calendar days (most recent first)
        for (let i = 0; i <= 6; i++) {
            const calendarDate = new Date(today);
            calendarDate.setDate(today.getDate() - i);
            calendarDate.setHours(0, 0, 0, 0);
            
            // Get all days completed on this calendar date
            const daysCompletedOnDate = this.getDaysCompletedOnDate(calendarDate);
            const readingDay = this.getReadingDayForDate(new Date(calendarDate));
            
            if (readingDay === null) continue; // Skip dates before start date
            
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            
            const activityDay = document.createElement('div');
            activityDay.className = 'activity-day';
            
            const dayDate = document.createElement('div');
            dayDate.className = 'activity-day-number';
            dayDate.textContent = calendarDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'activity-day-date';
            
            // Show multiple days if completed on same date
            if (daysCompletedOnDate.length > 1) {
                const minDay = Math.min(...daysCompletedOnDate);
                const maxDay = Math.max(...daysCompletedOnDate);
                dayNumber.textContent = `Days ${minDay}-${maxDay} (${daysCompletedOnDate.length} days)`;
            } else if (daysCompletedOnDate.length === 1) {
                dayNumber.textContent = `Day ${daysCompletedOnDate[0]}`;
            } else {
                dayNumber.textContent = `Day ${readingDay}`;
            }
            
            activityDay.appendChild(dayDate);
            activityDay.appendChild(dayNumber);
            
            const activityStatus = document.createElement('div');
            activityStatus.className = 'activity-status';
            
            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);
            
            if (daysCompletedOnDate.length > 0) {
                activityStatus.classList.add('completed');
                if (daysCompletedOnDate.length > 1) {
                    activityStatus.innerHTML = `<i class="fas fa-check-double"></i> ${daysCompletedOnDate.length} Days Completed`;
                } else {
                    activityStatus.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
                }
            } else if (calendarDate.getTime() === todayDate.getTime()) {
                activityStatus.classList.add('current');
                activityStatus.innerHTML = '<i class="fas fa-play-circle"></i> Current';
            } else if (calendarDate > todayDate) {
                activityStatus.classList.add('upcoming');
                activityStatus.innerHTML = '<i class="fas fa-clock"></i> Upcoming';
            } else {
                activityStatus.classList.add('missed');
                activityStatus.innerHTML = '<i class="fas fa-times-circle"></i> Missed';
            }
            
            activityItem.appendChild(activityDay);
            activityItem.appendChild(activityStatus);
            
            activityFeed.appendChild(activityItem);
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
        today.setHours(0, 0, 0, 0);
        
        let missedDays = 0;
        
        // Check each day from start date to today
        for (let day = 1; day <= 300; day++) {
            const dayDate = new Date(this.startDate);
            dayDate.setDate(this.startDate.getDate() + (day - 1));
            dayDate.setHours(0, 0, 0, 0);
            
            // If this day's date has passed and it's not completed, it's missed
            if (dayDate < today && !this.completedDays.has(day)) {
                missedDays++;
            }
            
            // Stop checking if we're past today
            if (dayDate >= today) {
                break;
            }
        }
        
        return missedDays;
    }

    calculateExpectedFinishDate() {
        // Original plan: start date + 299 days (300-day plan)
        const originalFinish = new Date(this.startDate);
        originalFinish.setDate(this.startDate.getDate() + 299);
        
        // Calculate missed days based on actual calendar dates
        const daysMissed = this.calculateDaysMissed();
        
        // Expected finish = original finish + missed days
        const expectedFinish = new Date(originalFinish);
        expectedFinish.setDate(originalFinish.getDate() + daysMissed);
        
        return expectedFinish;
    }
    
    showStartDateModal() {
        const modal = document.getElementById('start-date-modal');
        const input = document.getElementById('start-date-input');
        
        // Set current start date as default
        input.value = this.startDate.toISOString().split('T')[0];
        
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
            this.saveProgress();
            this.updateDateInfo();
            this.generateRecentActivity();
            this.closeStartDateModal();
            this.showToast('Start date updated successfully!');
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
        
        // Update UI
        this.updateUI();
        this.updateProgressTab();
        
        // Close modal and show confirmation
        this.closeResetDataModal();
        this.showToast('All data has been reset successfully!');
    }

    handleKeyboardShortcuts(e) {
        // ESC to close modals
        if (e.key === 'Escape') {
            this.closeBibleReader();
            this.closeDayJumpModal();
            this.closeStartDateModal();
            this.closeResetDataModal();
        }
        
        // Arrow keys for chapter navigation when modal is open
        if (document.getElementById('bible-reader').classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.navigateChapter(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.navigateChapter(1);
            }
        }
        
        // Number keys for tab switching
        if (e.key >= '1' && e.key <= '3' && !e.target.matches('input')) {
            const tabs = ['reading-plan', 'bible-nav', 'progress'];
            const tabIndex = parseInt(e.key) - 1;
            if (tabs[tabIndex]) {
                this.switchTab(tabs[tabIndex]);
            }
        }
    }
    
    showError(message) {
        this.showToast(message, 'error');
    }
    
    showToast(message, type = 'success') {
        console.log('Showing toast:', message, type); // debug
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        let backgroundColor;
        switch(type) {
            case 'error':
                backgroundColor = '#ef4444';
                break;
            case 'orange':
                backgroundColor = '#f59e0b';
                break;
            case 'gray':
                backgroundColor = '#6b7280';
                break;
            case 'success':
            default:
                backgroundColor = '#10b981';
                break;
        }
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${backgroundColor};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 3000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (toast.parentNode) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    saveProgress() {
        const data = {
            currentDay: this.currentDay,
            completedDays: Array.from(this.completedDays),
            dayCompletionTimestamps: this.dayCompletionTimestamps,
            categoryCompletions: this.categoryCompletions,
            startDate: this.startDate.toISOString(),
            lastUpdated: new Date().toISOString()
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
                this.startDate = data.startDate ? new Date(data.startDate) : new Date();
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }
    
    // Export/Import functionality for backup
    exportProgress() {
        const data = {
            currentDay: this.currentDay,
            completedDays: Array.from(this.completedDays),
            dayCompletionTimestamps: this.dayCompletionTimestamps,
            categoryCompletions: this.categoryCompletions,
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `bible300-progress-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        this.showToast('Progress exported successfully!');
    }
    
    async importProgress(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            if (data.version && data.currentDay && data.completedDays) {
                this.currentDay = data.currentDay;
                this.completedDays = new Set(data.completedDays);
                this.dayCompletionTimestamps = data.dayCompletionTimestamps || {};
                this.categoryCompletions = data.categoryCompletions || {};
                this.saveProgress();
                this.updateUI();
                this.updateProgressTab();
                this.showToast('Progress imported successfully!');
            } else {
                throw new Error('Invalid backup file format');
            }
        } catch (error) {
            console.error('Error importing progress:', error);
            this.showError('Failed to import progress. Please check the file format.');
        }
    }

    // Overview Tab Methods
    updateOverviewTab() {
        this.setupOverviewEventListeners();
        this.generateDaysOverview();
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
    }

    generateDaysOverview() {
        const container = document.getElementById('days-container');
        let html = '';

        for (let day = 1; day <= 300; day++) {
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
        
        // Check if any readings need deuterocanonical integration
        let oldTestamentText = `${dayPlan.oldTestament.book} ${dayPlan.oldTestament.chapter}`;
        if (dayPlan.oldTestament.book === 'Daniel' || dayPlan.oldTestament.book === 'Esther') {
            oldTestamentText += ' (with additions)';
        }
        
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

    // Settings Tab Methods
    updateSettingsTab() {
        this.setupSettingsEventListeners();
        this.loadSettingsUI();
    }

    setupSettingsEventListeners() {
        // Words of Christ in Red toggle
        document.getElementById('words-of-christ-red').addEventListener('change', (e) => {
            this.settings.wordsOfChristRed = e.target.checked;
            this.saveSettings();
            this.applySettings();
        });

        // Font Family setting
        document.getElementById('font-family-setting').addEventListener('change', (e) => {
            console.log('Font family changed to:', e.target.value);
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

        // Dark Mode toggle
        document.getElementById('dark-mode').addEventListener('change', (e) => {
            // Invert the setting since our CSS logic is inverted
            this.settings.darkMode = !e.target.checked;
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
        document.getElementById('font-family-setting').value = this.settings.fontFamily;
        document.getElementById('font-size-setting').value = this.settings.fontSize;
        // Invert the toggle display since our CSS logic is inverted
        // When darkMode is false (dark theme), toggle should be OFF
        // When darkMode is true (light theme), toggle should be ON
        document.getElementById('dark-mode').checked = !this.settings.darkMode;
    }

    saveSettings() {
        localStorage.setItem('bible300Settings', JSON.stringify(this.settings));
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('bible300Settings');
            if (saved) {
                const settings = JSON.parse(saved);
                
                // Check if this is an older version that needs dark mode migration
                if (!settings.hasOwnProperty('darkModeMigrated') || settings.darkModeMigrated !== true) {
                    console.log('Forcing dark mode default for all users');
                    // Force dark mode = true for all users (new and existing)
                    this.settings = {
                        wordsOfChristRed: settings.wordsOfChristRed || false,
                        fontSize: settings.fontSize || 'medium',
                        fontFamily: settings.fontFamily || 'inter',
                        darkMode: true, // Default to dark theme (but inverted logic)
                        darkModeMigrated: true // Mark as migrated
                    };
                    console.log('Migrated settings:', this.settings);
                    this.saveSettings(); // Save the updated settings
                } else {
                    this.settings = { ...this.settings, ...settings };
                }
            } else {
                // First time user - save the default settings including dark mode = true
                console.log('First time user, saving default settings with dark mode = true');
                this.settings.darkModeMigrated = true;
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
        console.log('Applying font family:', this.settings.fontFamily);
        document.documentElement.classList.remove('font-inter', 'font-noto-sans', 'font-noto-serif');
        document.documentElement.classList.add(`font-${this.settings.fontFamily}`);
        console.log('Applied class:', `font-${this.settings.fontFamily}`);
        console.log('Current documentElement classes:', document.documentElement.className);
        
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

        // Apply dark mode setting
        if (this.settings.darkMode) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }

        // Words of Christ in red will be applied when Bible content is displayed
        // This is a placeholder for future implementation
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
                    option.textContent = 'Inter (Default)';
                    break;
                case 'noto-sans':
                    option.textContent = isLoadingRealFonts ? 'Noto Sans' : 'Sans Serif (System)';
                    break;
                case 'noto-serif':
                    option.textContent = isLoadingRealFonts ? 'Noto Serif' : 'Serif (System)';
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


    exportProgress() {
        const data = {
            currentDay: this.currentDay,
            completedDays: Array.from(this.completedDays),
            categoryCompletions: this.categoryCompletions,
            startDate: this.startDate.toISOString(),
            settings: this.settings,
            exportDate: new Date().toISOString(),
            version: '2.1.0'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bible300-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast('Progress exported successfully!');
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
                    this.startDate = data.startDate ? new Date(data.startDate) : new Date();
                    
                    if (data.settings) {
                        this.settings = { ...this.settings, ...data.settings };
                        this.saveSettings();
                        this.applySettings();
                    }
                    
                    this.saveProgress();
                    this.updateUI();
                    this.updateProgressTab();
                    this.loadSettingsUI();
                    
                    this.showToast('Progress imported successfully!');
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
    console.log('PWA install prompt available');
}

// Handle successful installation
window.addEventListener('appinstalled', (evt) => {
    console.log('PWA was installed');
    app.showToast('Bible 300 installed successfully! 📱');
});

// Handle updates
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Show update notification
        app.showToast('App updated! New features available. 🚀');
    });
}