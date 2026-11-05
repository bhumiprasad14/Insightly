document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['researchNotes'], function (result) {
        if (result.researchNotes) {
            document.getElementById('notes').value = result.researchNotes;
        }
    });
    document.getElementById('summarizeBtn').addEventListener('click', summarizeText);
    document.getElementById('saveNotesBtn').addEventListener('click', saveNotes);

});
async function summarizeText() {
    const loader = document.getElementById('loader');
    const summarizeBtn = document.getElementById('summarizeBtn');
    try {
        //Showing loader
        loader.style.display='block';
        //Disable button
        summarizeBtn.disabled = true;

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => window.getSelection().toString()
        });

        if (!result) {
            showResult('Please select some text first to summarize.');
            return;
        }
        const response = await fetch('http://localhost:8080/api/research/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: result, operation: 'summarize' })
        });
        if (!response.ok) {
            throw new Error('API Error: ${response.status}');
        }
        const text = await response.text();
        showResult(text.replace(/\\n/g, '<br>'));
    }
    catch (error) {
        showResult('Error: ' + error.message);
    }
    finally{
        // Hide loader after backend responds
        loader.style.display = 'none';

        // Enable button again
        summarizeBtn.disabled = false;
    }
}
async function saveNotes() {
    const notes=document.getElementById('notes').value;
    chrome.storage.local.set({ researchNotes: notes }, function () {
        showResult('Notes saved successfully!');
    });

}
function showResult(content) {
    const formattedContent = content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

    document.getElementById('results').innerHTML =`<div class="result-item"><div class="result-content">${formattedContent}</div> </div>`
}