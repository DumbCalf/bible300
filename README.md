# Bible 300

A 300-day Bible reading plan progressive web app (PWA) featuring the complete King James Version with deuterocanonical books. **Fully functional offline immediately after first visit.**

## Features

### 📖 Complete Bible Navigation
- Full KJV Bible with deuterocanonical books (Catholic edition)
- Easy book and chapter navigation with swipe gestures (configurable)
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
- **Enhanced progress tracking** with condensed layout and color-coded statistics
- **Milestone notifications** - Celebration popups at 25%, 33%, 50%, 67%, 75%, and 100% completion
- **Special Day 300 completion** - Modal popup with inspirational St. John Chrysostom quote
- **Reading inspiration modal** - James 1:21-22 quote accessible from Today's Reading header
- Jump to any day functionality
- Reading streak counter
- Start date management through settings
- Recent activity tracking with two view modes
- **Visual activity graph** showing weekly status at a glance
- **Compact date display** with improved spacing and formatting

### 🎨 Reading Experience
- Clean, distraction-free interface
- **Dark mode enabled by default** with optimized text color hierarchy
- Light and dark mode support
- Adjustable font size (Small, Medium, Large, Extra Large)
- Multiple font family options (Inter, Noto Sans, Noto Serif)
- Words of Christ displayed in red (configurable scope)
- **Improved date formatting** with flexible display options
- Responsive design for all devices
- Auto-scroll to top when switching sections

### 📊 Statistics & Activity Tracking
- **Condensed progress layout** with reading schedule above stats
- **Color-coded statistics** - Green (days complete), Dark red (days missed), Blue (completion %), Orange (streak)
- **Responsive stats display** - 1x4 grid on desktop, 2x2 grid on mobile
- **Smart calendar overview modal** - Fully responsive monthly calendar with intelligent range calculation
  - **Dynamic month range** - Shows only months from start date to expected finish date
  - **Accurate status tracking** - Proper handling of multiple readings per day
  - **Intelligent expected finish calculation** - Based on actual progress (today + remaining days)
  - **Real-time updates** - Calendar refreshes automatically when progress changes
  - **Proper N/A logic** - Days before start date or between start date and when it was set show correctly
- **Enhanced current week view** (default) showing complete Sunday-Saturday week
- Last 7 Days view option with improved date range handling
- **Visual activity graph** displaying accurate status symbols above day names
- **Enhanced status indicators** - Calendar-day icon for current day, proper checkmark colors, improved contrast
- **Simplified section headers** - Shows "Current Week" or "Last 7 Days" based on selected view
- Completion timestamps with local timezone support
- **Performance optimized** - Cached calculations for smooth calendar rendering
- Export/import progress functionality
- Reading statistics and analytics

### 📱 Progressive Web App
- **Complete offline functionality immediately after first visit**
- **Entire Bible and reading plan cached instantly**
- Install as native app on mobile devices
- Fast loading with comprehensive service worker caching
- **Custom home screen icon** for iOS Safari "Add to Home Screen"
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
- **Intelligent calendar overview** - Fully responsive monthly view with accurate status tracking
  - **Dynamic date range** - Only shows relevant months (start date to expected finish)
  - **Accurate status symbols** - ✅ completed, ▶️ current, 🕐 upcoming, ❌ missed, ➖ N/A
  - **Smart expected finish** - Recalculates based on actual reading pace, not original schedule
  - **Multiple readings support** - Double checkmarks for multiple readings per day
  - **Correct current day handling** - Proper icon colors (green checkmarks vs blue current day)
- **Smart calendar navigation** - Opens to current month, keyboard/swipe/arrow navigation
- **Real-time calendar updates** - Calendar range and status update automatically with progress
- **Universal modal scroll prevention** - Background scrolling disabled when any modal is open
- **Enhanced toast notifications** - Click-to-dismiss with intelligent stacking, dynamic spacing, and auto-repositioning
- **Achievement celebrations** - Progress milestone notifications and completion ceremonies
- **Enhanced modal spacing** for better readability
- **Responsive UI components** that adapt to screen size

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
   - **Statistics**: Enhanced reading statistics with condensed layout and color-coded metrics
   - **Statistics**: Enhanced reading statistics with condensed layout and color-coded metrics
   - **Settings**: Customize your reading experience and manage start date

### Reading Plan Structure
Each day includes readings from:
- **Psalm**: Daily psalm reading
- **Gospel**: Passages from Matthew, Mark, Luke, or John
- **Wisdom**: Proverbs, Ecclesiastes, Ecclesiasticus, Wisdom
- **Old Testament**: Historical and prophetic books
- **New Testament**: Epistles, Acts, Revelation

### Settings & Customization
- **Start Date Management**: Set reading plan start date from Settings > Statistics
  - **Smart tracking** - App remembers when start date was set for accurate N/A day calculation
  - **Dynamic calendar range** - Calendar automatically adjusts to show relevant months
- **Recent Activity View**: Current Week (default) showing complete Sunday-Saturday or Last 7 Days
- **Activity Graph**: Toggle visual activity status display (enabled by default)
- **Tab Layout**: Dropdown (default) or Horizontal
- **Navigation**: Configurable swipe gestures for mobile chapter navigation
- **Font Options**: Size and family customization with full italic support
- **Words of Christ**: Red text with scope options
- **Dark/Light Mode**: Dark mode enabled by default
- **Data Management**: Export, import, and reset functionality with proper cache invalidation

## Technical Details

- **Translation**: King James Version (KJV) - Catholic Edition
- **Offline Support**: **Complete offline functionality immediately**
- **Caching Strategy**: Aggressive caching of all content on first visit
- **Data Size**: ~14MB initial download includes entire Bible
- **Storage**: LocalStorage for progress, ServiceWorker cache for content
- **Responsive**: Works on phones, tablets, and desktop
- **Browser Support**: Modern browsers with PWA capabilities
- **Timezone Handling**: All dates use device local timezone
- **Performance Optimizations**:
  - **Intelligent caching** - Expected finish date and completion data cached with smart invalidation
  - **Efficient calendar rendering** - Only updates when necessary, reduced DOM manipulation
  - **Optimized date parsing** - Completion dates parsed once and cached
  - **Smart refresh logic** - Calendar only fully refreshes when month range changes
  - **Memory efficient** - No memory leaks, proper event listener cleanup

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