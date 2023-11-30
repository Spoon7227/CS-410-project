let selectedText = '';  // Variable to hold the selected text

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "selectedText") {
        selectedText = message.text;
    } else if (message.action === "getSelectedText") {
        sendResponse({text: selectedText});
    }
});
