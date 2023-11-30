# CS-410-project
# Text Sentiment Highlighter - Chrome Extension

## Overview

**Text Sentiment Highlighter** is a Chrome extension designed to analyze and visually highlight the sentiment of selected text on any webpage. It determines the sentiment (positive, negative, neutral, or mixed) of the text that the user has selected, then applies a colored highlight (green, red, none, orange) on the selected text. This tool is useful for navigating web pages by quickly filtering and understanding textual content based on sentiments. This tool is particularly useful in social media feeds, news articles, blog posts, or any website where textual content and human conversations are prominent. 

## Implementation

The extension is implemented using HTML, CSS, JavaScript, and utilizes `compendium-js` for the sentiment analysis part. It follows a standard Chrome extension structure:

- **Manifest File**: `manifest.json` outlines the extension's settings, including permissions, scripts, and other Chrome Extension-related configurations.
- **Background Script**: `background.js` (service worker) acts as a central message handler, coordinating messages between content scripts and the popup by maintaining states.
- **Content Script**: `content.js` is responsible for performing the sentiment analysis on the selected text on the webpage and sending the results back to the popup.
- **Popup**: `popup.html` and `popup.js` create a user interface that appears when the user clicks on the extension icon. It displays the selected text and the sentiment analysis result.

### Usage

#### Installation

To install the extension:

1. Clone or download the repository to your local machine.
2. Download bower with `npm install -g bower`.
3. Navigate to the project directory
3. Install `compendium-js` by  running `bower install --save compendium`. This should add a `bower_components/compendium` folder.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" at the top-right.
4. Click on "Load unpacked" and select the directory where the extension files are located.

#### Running the Extension

1. Navigate to any webpage and reload.
2. Select a portion of text.
3. Click on the extension icon in your browser toolbar.
4. The popup will display the selected text and a button "Analyze Sentiment".
5. Click the button to view the sentiment analysis and highlights of the selected text.

### APIs Used

- `compendium-js`: An NLP library used for sentiment analysis.
- Chrome Extension APIs: Used for message passing between content scripts, background service worker, and popup.
