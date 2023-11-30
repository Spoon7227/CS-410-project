let currentTabId = null;

// When the popup loads, get the current tab ID
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    currentTabId = tabs[0].id;
});

document.getElementById('analyze').addEventListener('click', () => {
    if (currentTabId !== null) {
        chrome.tabs.sendMessage(currentTabId, {action: "analyzeSentiment"});
    }
});

// Update the popup's display when it receives the selected text
document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({action: "getSelectedText"}, (response) => {
        document.getElementById('selectedText').textContent = response.text;
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "analysisResult") {
        const resultElement = document.getElementById('analysisResult');
        console.log("?")
        if (resultElement) {
            resultElement.textContent = message.result.result;
            resultElement.style.backgroundColor =  message.result.color;
        }
    }
});