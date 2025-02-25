

# AI AdBlocker Chrome Extension

Welcome to **AI AdBlocker**, a Chrome extension that uses artificial intelligence to detect and block ads across websites, with advanced support for blocking YouTube ads. This extension combines traditional network request blocking with a machine learning model trained on TensorFlow.js to identify and remove ad elements dynamically.

## Overview

AI AdBlocker leverages:
- **Network Blocking**: Blocks known ad domains (e.g., `doubleclick.net`, `adsense.google.com`) using Chrome’s `webRequest` API.
- **AI-Powered Detection**: Uses a TensorFlow.js model to analyze DOM elements (e.g., size, text content) and predict whether they’re ads, with special handling for YouTube overlay and banner ads.
- **YouTube Ad Blocking**: Includes advanced logic to skip skippable video ads, remove overlay/banner ads, and attempt to mitigate non-skippable video ads.

This project is ideal for developers interested in browser extensions, machine learning, and ad-blocking technologies.

## Features
- Blocks ads on any website using heuristic and AI-based detection.
- Targets YouTube ads, including skippable and overlay ads.
- Lightweight and extensible, with a toggleable UI via a popup.
- Cross-compatible with Chrome (Manifest V3).

## Prerequisites
- **Node.js**: Version 16.20.2 or higher (recommended for TensorFlow.js compatibility).
- **npm**: Installed with Node.js.
- **Chrome Browser**: For testing and using the extension.
- **Python 3.9** (optional, for building TensorFlow.js with native bindings if needed).

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-adblocker.git
cd ai-adblocker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Train the Model (Optional)
If the `model/` folder is missing or needs updating:
```bash
node train.js
```
This generates or updates `model/model.json` and `model/weights.bin` in the project directory.

### 4. Load the Extension in Chrome
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" (top-right toggle).
3. Click "Load unpacked" and select the `ai-adblocker` directory (or `D:\ai_ad_blocker` if working locally).

## Usage
- **Activate the Extension**: After loading, click the extension icon in Chrome’s toolbar to access the popup. Toggle it on/off to enable/disable ad blocking.
- **Test on Websites**: Visit sites with ads (e.g., `cnn.com`, `youtube.com`) to see ads blocked or removed.
- **YouTube Testing**: Play videos on `youtube.com` to check for skippable ad skipping, overlay removal, and video ad mitigation.

### Debugging
- Open Chrome DevTools (`Ctrl+Shift+I`) on test pages.
- Check the Console for logs like `Blocked: <url>` or `Removed YouTube ad element`.
- Use the Network tab to verify blocked ad requests.

## Project Structure
```
ai-adblocker/
├── background.js         # Network request blocking logic
├── content.js            # AI and DOM-based ad detection/removal
├── icon.png              # Extension icon (16x16 or 32x32 PNG)
├── manifest.json         # Extension manifest (Manifest V3)
├── model/                # Trained TensorFlow.js model files
│   ├── model.json
│   └── weights.bin
├── package.json          # npm dependencies and scripts
├── package-lock.json     # Exact dependency versions
├── popup.html            # Popup UI
├── popup.js              # Popup logic (toggle on/off)
├── styles.css            # CSS for hiding ads
├── worker.js             # Web Worker for TensorFlow.js predictions
└── train.js              # Script to train the TensorFlow.js model
```

## Contributing
We welcome contributions! Here’s how to get started:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes, commit them, and push to your fork:
   ```bash
   git add .
   git commit -m "Add your descriptive message"
   git push origin feature/your-feature-name
   ```
4. Submit a pull request to the main repository.

### Reporting Issues
- Use GitHub Issues to report bugs or request features.
- Provide detailed reproduction steps, including the site tested and expected vs. actual behavior.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details (create a `LICENSE` file with MIT terms if not present).

## Acknowledgments
- Built with TensorFlow.js for AI capabilities.
- Inspired by open-source adblockers like uBlock Origin.
- Thanks to the Chrome Extensions and Machine Learning communities for their resources.

---

### Notes
- Replace `https://github.com/your-username/ai-adblocker.git` with your actual GitHub repository URL.
- If you don’t have a `LICENSE` file, you can create one with MIT terms or choose another license (e.g., Apache, GPL). Here’s a basic MIT license for reference (save as `LICENSE`):
  ```
  MIT License

  Copyright (c) [2025] [Your Name]

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  ```

- Add this `README.md` to `D:\ai_ad_blocker`, then:
  ```bash
  git add README.md
  git commit -m "Add README.md"
  git push origin main
  ```
