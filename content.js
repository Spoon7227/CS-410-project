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

// When the user selects text, send it to the popup
document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        chrome.runtime.sendMessage({action: "selectedText", text: selectedText});
    }
});

// Listener for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyzeSentiment") {
        analyzeAndHighlightSelection();
    }
});

function analyzeAndHighlightSelection() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return; // No selection made

    const selectedText = selection.toString().trim();
    if (selectedText) {
        // Analyze the sentiment of the selected text
        const sentimentLabel = analyzeSentiment(selectedText);

        // Apply different highlight based on sentiment
        switch (sentimentLabel) {
            case "negative":
                applyOverlayToSelection(selection, "red");
                chrome.runtime.sendMessage({ action: "analysisResult", result: {result: "negative", color: "red"} });
                break;
            case "positive":
                applyOverlayToSelection(selection, "green");
                chrome.runtime.sendMessage({ action: "analysisResult", result: {result: "positive", color: "green"} });
                break;
            case "mixed":
                applyOverlayToSelection(selection, "orange");
                chrome.runtime.sendMessage({ action: "analysisResult", result: {result: "mixed", color: "orange"} });
                break;
            case "neutral":
                chrome.runtime.sendMessage({ action: "analysisResult", result: {result: "neutral", color: "white"} });
                break;
            default:
        }
    }
}

function applyOverlayToSelection(selection, color) {
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
    overlay.style.backgroundColor = color;

    // Add the overlay to the body
    document.body.appendChild(overlay);
}

// Uses compendium-js library for sentiment analysis
function analyzeSentiment(text) {
    result = compendium.analyse(text)[0]

    console.log("Analyzed Text: " + text + "\n\nSentiment Label: " + result.profile.label, "\nSentiment Score: " + result.profile.sentiment);

    return result.profile.label;
}


