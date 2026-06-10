# Native Browser Architecture (V2)

This document outlines the architectural blueprint for the **Downloadable Native Browser**, intended as a production-ready application to replace the simple web preview with true desktop and mobile browser capabilities.

## 1. Core Architecture Strategy

The native browser will be built using a **multi-process architecture** (similar to Chromium/WebKit) wrapped in a modern, lightweight desktop environment framework. 

### Recommended Framework: Tauri (Rust + WebKit/WebView2)
Instead of Electron (which ships a heavy embedded Chromium instance), the native browser should utilize **Tauri**. 
- **macOS:** Uses WKWebView (WebKit).
- **Windows:** Uses Edge WebView2 (Chromium).
- **Mobile:** Uses native OS WebViews via Tauri Mobile (Rust + Swift/Kotlin bindings).
- **Benefit:** Massive reduction in bundle size (< 10MB installers) and lower RAM footprint compared to Electron.

### Process Model
1. **Main Process (Rust):** Handles native APIs, filesystem access, database (SQLite) connections, OS-level window management, and native downloads.
2. **Browser Window UI (React/Next.js):** The "Chrome" of the browser (tabs, URL bar, settings, downloads panel). This will be a refined version of our React `Browser Window Component`.
3. **WebContents (WebView):** The isolated sandbox where actual web pages render. 

## 2. Sync Engine & User Accounts

To support seamless sync across macOS, Windows, iOS, and Android:

### Data Models
- **Bookmarks/Favorites:** Tree structure.
- **History:** Time-series navigation logs.
- **Tabs/Sessions:** Current open tabs and active states per device.
- **Settings:** Browser preferences, default search engine.

### Sync Infrastructure
- **Backend:** Node.js / Go backend with WebSockets for real-time sync.
- **Database:** PostgreSQL for relational data, Redis for active session states.
- **Encryption:** End-to-End Encryption (E2EE). The client generates a local encryption key (derived from their master password) to encrypt history and bookmarks *before* pushing to the sync server.

## 3. Desktop Integration Features

The native Rust backend will expose IPC (Inter-Process Communication) methods to the React frontend to support:
- **Taskbar/Dock:** Dynamic icon updates (e.g., download progress badge).
- **File System:** Native file picker dialogs, drag-and-drop to upload files, and a dedicated download manager saving directly to the user's `~/Downloads` folder.
- **Shortcuts:** Global OS-level keyboard shortcuts (e.g., launching a new window).
- **Deep Linking:** Registering as the OS default browser (`http://` and `https://` protocol handler).

## 4. Mobile Architecture (iOS & Android)

- **Framework:** React Native + `react-native-webview` (or Tauri Mobile when fully stable).
- **UI:** A completely separate layout optimized for touch, featuring:
  - Bottom navigation bar.
  - Pull-to-refresh.
  - A visual, card-based tab manager.
- **Engine:** Uses Safari WebKit on iOS and Chrome Custom Tabs/System WebView on Android.

## 5. Performance Optimizations

To handle 100+ tabs efficiently:
- **Tab Suspension:** If a tab has been inactive for > 15 minutes, its WebView process is terminated, keeping only the React tab UI active. Clicking the tab reloads the URL.
- **Virtualization:** The React UI for tabs will use `react-virtual` to only render the DOM nodes for visible tabs in the tab strip.
- **Local Caching:** Heavy reliance on SQLite (via Rust) to instantly query thousands of history items for the URL bar autocomplete, rather than doing it in JavaScript memory.

## 6. The Web Preview vs. Native

The **Web Preview** (the `browser-window.tsx` React component) is a marketing tool. It uses standard `<iframe>` elements to simulate browsing. Because of web security (`X-Frame-Options`, `Content-Security-Policy`), many sites will refuse to load in an iframe. 

The **Native Application** solves this because Tauri/Electron WebViews are not subject to standard iframe CORS/CSP restrictions—they operate as top-level browser contexts, guaranteeing 100% website compatibility.
