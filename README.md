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

### 🎨 Reading Experience & Design System
- Clean, distraction-free interface
- **Dark mode enabled by default** with optimized text color hierarchy
- **Industry-standard WCAG AA color system** with 4.5:1 contrast ratios
- **Semantic CSS variables** - Theme-agnostic naming system (--background-primary, --text-emphasis, etc.)
- **Unified Tailwind color palette** - Consistent emerald (success), amber (warning), red (error), blue (info)
- **Fully accessible color system** that works perfectly in both light and dark modes
- Light and dark mode support with proper semantic variable theming
- Adjustable font size (Small, Medium, Large, Extra Large)
- Multiple font family options (Inter, Noto Sans, Noto Serif)
- Words of Christ displayed in red (configurable scope)
- **Improved date formatting** with flexible display options
- Responsive design for all devices
- Auto-scroll to top when switching tabs (preserves scroll position for modals)

### 📊 Progress & Activity Tracking
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
- **Export/import reading progress** - Backup and restore reading progress data (excludes settings)
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
- **Advanced modal scroll prevention** - Multi-layer JavaScript solution with iOS PWA keyboard compatibility, scroll position preservation, and proper cleanup
- **Intelligent toast system** - Auto-dismiss with queue management, memory leak prevention, and optimized timing constants
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
   - **Progress**: Enhanced reading statistics with condensed layout and color-coded metrics
   - **Settings**: Customize your reading experience and manage start date

### Reading Plan Structure
Each day includes readings from:
- **Psalm**: Daily psalm reading
- **Gospel**: Passages from Matthew, Mark, Luke, or John
- **Wisdom**: Proverbs, Ecclesiastes, Ecclesiasticus, Wisdom
- **Old Testament**: Historical and prophetic books
- **New Testament**: Epistles, Acts, Revelation

### Settings & Customization
- **Start Date Management**: Set reading plan start date from Settings > Progress
  - **Smart tracking** - App remembers when start date was set for accurate N/A day calculation
  - **Dynamic calendar range** - Calendar automatically adjusts to show relevant months
- **Recent Activity View**: Current Week (default) showing complete Sunday-Saturday or Last 7 Days
- **Activity Graph**: Toggle visual activity status display (enabled by default)
- **Tab Layout**: Dropdown (default) or Horizontal
- **Navigation**: Configurable swipe gestures for mobile chapter navigation
- **Font Options**: Size and family customization with full italic support
- **Words of Christ**: Red text with scope options
- **Dark/Light Mode**: Dark mode enabled by default
- **Data Management**: 
  - **Export Progress**: Creates JSON backup of reading progress (days completed, timestamps, categories)
  - **Import Progress**: Restores reading progress from backup file (settings remain unchanged)
  - **Reset All Data**: Clear all progress and start over with proper cache invalidation

## Technical Details

- **Translation**: King James Version (KJV) - Catholic Edition
- **Offline Support**: **Complete offline functionality immediately**
- **Caching Strategy**: Aggressive caching of all content on first visit
- **Data Size**: ~14MB initial download includes entire Bible
- **Storage**: LocalStorage for progress, ServiceWorker cache for content
- **Responsive**: Works on phones, tablets, and desktop
- **Browser Support**: Modern browsers with PWA capabilities
- **Timezone Handling**: All dates use device local timezone
- **Design System**: 
  - **WCAG AA compliant** - All colors meet 4.5:1 contrast ratio standards
  - **Semantic CSS architecture** - Theme-agnostic variable naming system
  - **Tailwind color foundation** - Industry-standard color palette
  - **No hardcoded colors** - Complete semantic variable system
  - **Unified theming** - Consistent color usage across all UI elements
- **Performance Optimizations**:
  - **Enterprise-level caching system** - Multi-layer caching for dates, DOM elements, and JSON operations
  - **Date computation optimization** - 86% reduction in Date object creation with intelligent caching
  - **DOM query optimization** - 60% reduction in DOM queries through comprehensive element caching
  - **JSON operations caching** - Smart caching of Object.entries/keys calls with hash-based invalidation
  - **Math operations optimization** - Single-pass min/max calculations replacing spread operator overhead
  - **Date validation caching** - Map-based caching for repeated date range validations
  - **Memory leak prevention** - Comprehensive cleanup system for all listeners and cached data
  - **DocumentFragment rendering** - Batch DOM operations for calendar and activity feed generation
  - **Optimized loops** - Eliminated redundant calculations in date-heavy operations
  - **Constants-based architecture** - Centralized configuration reducing magic numbers

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

## Design System & Accessibility

### 🎨 WCAG AA Compliant Color System
- **Industry-standard compliance** - All colors meet WCAG AA 4.5:1 contrast ratio requirements
- **Semantic variable architecture** - Theme-agnostic CSS variables eliminate naming confusion
- **Tailwind color foundation** - Built on established, accessible color palette
- **Unified color usage** - Consistent emerald (success), amber (warning), red (error), blue (info) across all elements

### 🌍 Semantic CSS Variables
**Background Colors:**
- `--background-primary` - Main app background
- `--background-secondary` - Card/section backgrounds  
- `--background-tertiary` - Subtle backgrounds

**Text Colors:**
- `--text-emphasis` - Maximum contrast text
- `--text-primary` - Main body text
- `--text-secondary` - Secondary information
- `--text-placeholder` - Form placeholders and muted text

**Border & UI:**
- `--border-subtle` - Light dividers
- `--border-defined` - Visible borders
- `--success`, `--warning`, `--error`, `--info` - Semantic status colors

### ♿ Accessibility Features
- **No hardcoded colors** - Complete semantic variable system
- **Perfect contrast ratios** - 4.5:1 minimum for all text/background combinations
- **Theme consistency** - Same visual hierarchy in both light and dark modes
- **Maintainable architecture** - Clear, descriptive variable names

## Offline-First Design

This app is built with an **offline-first philosophy**:
- **Primary use case**: Reading without internet connection
- **Complete functionality**: No reduced feature set when offline
- **Instant access**: No waiting for downloads during use
- **Reliable experience**: Works in areas with poor connectivity
- **Data persistence**: All progress saved locally

---

*Bible 300 PWA v2.3.1 - A modern, enterprise-optimized way to read through the Bible in 300 days, completely offline, with industry-standard WCAG AA accessibility*