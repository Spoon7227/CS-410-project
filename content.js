function injectCSS(cssFileName) {
    const cssPath = chrome.runtime.getURL(cssFileName);
    if (!document.head.querySelector(`link[href="${cssPath}"]`)) {
        const link = document.createElement('link');
        link.href = cssPath;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        console.log('Injecting CSS at', chrome.runtime.getURL(cssFileName));

    }
}

injectCSS('sentimentstyle.css');

function analyzeAndHighlightSelection() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return; // No selection made

    const selectedText = selection.toString().trim();
    if (selectedText) {
        console.log("Analyzing selected text: ", selectedText)


        // Analyze the sentiment of the selected text
        const sentimentScore = analyzeSentiment(selectedText);
        // If the sentiment is negative, apply the highlight
        if (sentimentScore < 0) {
            applyOverlayToSelection(selection);
        }
    }
}

function applyOverlayToSelection(selection) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const overlay = document.createElement('div');

    // Style the overlay
    overlay.className = 'censor';

    // Set the overlay dimensions and position
    overlay.style.top = `${rect.top + window.scrollY}px`;
    overlay.style.left = `${rect.left + window.scrollX}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;

    // Add the overlay to the body
    document.body.appendChild(overlay);
}

function analyzeSentiment(text) {
    // Your sentiment analysis logic here
    // Dummy return value for demonstration
    return Math.random() * 2 - 1; // This should be replaced with actual sentiment analysis
}

// Listener for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyzeSentiment") {
        console.log("?")
        analyzeAndHighlightSelection();
    }
});
