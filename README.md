# Bible 300

A 300-day Bible reading plan progressive web app (PWA) featuring the complete King James Version with deuterocanonical books. **Fully functional offline immediately after first visit.**

## Features

### 📖 Complete Bible Navigation
- Full KJV Bible with deuterocanonical books (Catholic edition)
- Easy book and chapter navigation with swipe gestures
- Search functionality across all books
- Clickable footnotes with detailed references
- Floating navigation arrows (optional)

### 📅 300-Day Reading Plan
- Structured daily reading schedule with 5 categories per day:
  - Psalm
  - Gospel
  - Wisdom Literature
  - Old Testament
  - New Testament
- Individual category completion tracking
- Progress tracking with completion statistics
- Jump to any day functionality
- Reading streak counter
- Customizable start date
- Recent activity tracking with two view modes

### 🎨 Reading Experience
- Clean, distraction-free interface
- **Dark mode enabled by default**
- Light and dark mode support
- Adjustable font size (Small, Medium, Large, Extra Large)
- Multiple font family options (Inter, Noto Sans, Noto Serif)
- Words of Christ displayed in red (configurable scope)
- Responsive design for all devices
- Auto-scroll to top when switching sections

### 📊 Progress & Activity Tracking
- **Current Week view** (default) showing Saturday to Sunday
- Last 7 Days view option
- Dynamic section headers that reflect selected view
- Completion timestamps with local timezone support
- Export/import progress functionality
- Reading statistics and analytics

### 📱 Progressive Web App
- **Complete offline functionality immediately after first visit**
- **Entire Bible and reading plan cached instantly**
- Install as native app on mobile devices
- Fast loading with comprehensive service worker caching
- Home screen icon support
- **Dropdown navigation by default** (mobile-optimized)
- Horizontal navigation option available

### ✨ Special Features
- Deuterocanonical content clearly marked in italics
- Chapter headings for enhanced navigation
- Footnote hover effects without text reflow
- Multiple footnotes support on single verses
- Paragraph symbols (¶) preserved from original text
- Consistent local timezone handling throughout app
- Auto-completion when all categories are finished
- Toast notifications for user feedback

## Offline Functionality

### 🚀 Immediate Full Offline Access
**Everything cached on first visit:**
- ✅ **Complete Bible text** - All books, chapters, and verses
- ✅ **Entire 300-day reading plan** - Every day's assignments
- ✅ **All fonts** - Noto Sans, Noto Serif (regular + italic), Font Awesome
- ✅ **Complete app functionality** - No features require internet

### 📚 What Works Offline
- **Read any Bible chapter** - Complete KJV with deuterocanonical books
- **Follow reading plan** - All 300 days accessible
- **Track progress** - Mark days and categories complete
- **View recent activity** - Both Current Week and Last 7 Days
- **Search Bible** - Full-text search across entire Bible
- **Customize settings** - Fonts, themes, layouts
- **Navigate seamlessly** - All books, chapters, footnotes
- **Install as app** - Full PWA functionality

### 🔄 Data Storage
- **Reading progress** - Stored locally, persists between sessions
- **Settings** - All preferences saved locally
- **Recent activity** - Calculated from local data and device time
- **No data loss** - Everything works without internet connection

## Usage

1. Visit the app URL in your browser
2. **Everything downloads automatically** - Complete Bible, reading plan, fonts
3. **Immediately usable offline** - Close browser, turn off internet, reopen
4. Add to home screen for native app experience
5. Navigate using the dropdown menu or tabs:
   - **Today**: Current day's reading plan with category checkboxes
   - **Overview**: All 300 days with search and filtering
   - **Bible**: Full Bible navigation (defaults to Old Testament)
   - **Progress**: Reading statistics and recent activity
   - **Settings**: Customize your reading experience

### Reading Plan Structure
Each day includes readings from:
- **Psalm**: Daily psalm reading
- **Gospel**: Passages from Matthew, Mark, Luke, or John
- **Wisdom**: Proverbs, Ecclesiastes, Ecclesiasticus, Wisdom
- **Old Testament**: Historical and prophetic books
- **New Testament**: Epistles, Acts, Revelation

### Settings & Customization
- **Recent Activity View**: Current Week (default) or Last 7 Days
- **Tab Layout**: Dropdown (default) or Horizontal
- **Font Options**: Size and family customization with full italic support
- **Words of Christ**: Red text with scope options
- **Dark/Light Mode**: Dark mode enabled by default
- **Data Management**: Export, import, and reset functionality

## Technical Details

- **Translation**: King James Version (KJV) - Catholic Edition
- **Offline Support**: **Complete offline functionality immediately**
- **Caching Strategy**: Aggressive caching of all content on first visit
- **Data Size**: ~14MB initial download includes entire Bible
- **Storage**: LocalStorage for progress, ServiceWorker cache for content
- **Responsive**: Works on phones, tablets, and desktop
- **Browser Support**: Modern browsers with PWA capabilities
- **Timezone Handling**: All dates use device local timezone
- **Performance**: Optimized loading and smooth navigation

## Installation

### First Visit
1. Visit the app URL in your browser
2. **Automatic download** - Complete Bible and reading plan cache immediately
3. **Instant offline capability** - Full functionality without internet

### Native App Experience
1. Tap "Add to Home Screen" when prompted
2. Use as a native app with complete offline access
3. **No internet required** after installation

## Browser vs Mobile Experience

The app provides platform-optimized experiences:
- **Dropdown navigation** by default (better for mobile)
- **Native form controls** that adapt to each platform
- **Touch-optimized** interface elements
- **Responsive** layout that works across all screen sizes
- **Complete offline parity** - Same features online and offline

## Offline-First Design

This app is built with an **offline-first philosophy**:
- **Primary use case**: Reading without internet connection
- **Complete functionality**: No reduced feature set when offline
- **Instant access**: No waiting for downloads during use
- **Reliable experience**: Works in areas with poor connectivity
- **Data persistence**: All progress saved locally

---

*Bible 300 PWA v2.1.0 - A modern way to read through the Bible in 300 days, completely offline*