document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['researchNotes'], function (result) {
        if (result.researchNotes) {
            document.getElementById('notes').value = result.researchNotes;
        }
    });
    document.getElementById('summarizeBtn').addEventListener('click', summarizeText);
    document.getElementById('suggestBtn').addEventListener('click', suggestText);
    document.getElementById('saveNotesBtn').addEventListener('click', saveNotes);
    document.getElementById('languagesBtn').addEventListener('change', function () {
        const selectedLanguage = this.value;

        console.log(selectedLanguage);
    });
    // Fetch languages
    loadLanguages();
});
async function summarizeText() {
    const loader = document.getElementById('loader');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const selectedLanguage = document.getElementById('languagesBtn').value;

    console.log("Selected language:", selectedLanguage);
    try {
        //Showing loader
        loader.style.display = 'block';
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
            body: JSON.stringify({ content: result, operation: 'summarize', language: selectedLanguage })
        });
        if (!response.ok) {
            throw new Error('API Error: ${response.status}');
        }
        const text = await response.text();
        showResult(text);
    }
    catch (error) {
        showResult('Error: ' + error.message);
    }
    finally {
        // Hide loader after backend responds
        loader.style.display = 'none';

        // Enable button again
        summarizeBtn.disabled = false;
    }
}
async function suggestText() {
    const loader = document.getElementById('loader');
    const suggestBtn = document.getElementById('suggestBtn');
    const selectedLanguage = document.getElementById('languagesBtn').value;

    try {
        //Showing loader
        loader.style.display = 'block';
        //Disable button
        suggestBtn.disabled = true;

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => window.getSelection().toString()
        });

        if (!result) {
            showResult('Please select some text first to suggest.');
            return;
        }
        const response = await fetch('http://localhost:8080/api/research/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: result, operation: 'suggest', language: selectedLanguage })
        });
        if (!response.ok) {
            throw new Error('API Error: ${response.status}');
        }
        const text = await response.text();
        showResult(text);
    }
    catch (error) {
        showResult('Error: ' + error.message);
    }
    finally {
        // Hide loader after backend responds
        loader.style.display = 'none';

        // Enable button again
        suggestBtn.disabled = false;
    }
}

async function saveNotes() {
    const notes = document.getElementById('notes').value;
    chrome.storage.local.set({ researchNotes: notes }, function () {
        showResult('Notes saved successfully!');
    });

}
function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (char) {
        const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return entities[char];
    });
}

function showResult(content) {

    let formattedContent = escapeHtml(content);

    // Convert Markdown headings
    formattedContent = formattedContent.replace(
        /^######\s+(.*)$/gm, '<h6>$1</h6>'
    );
    formattedContent = formattedContent.replace(
        /^#####\s+(.*)$/gm, '<h5>$1</h5>'
    );
    formattedContent = formattedContent.replace(
        /^####\s+(.*)$/gm, '<h4>$1</h4>'
    );
    formattedContent = formattedContent.replace(
        /^###\s+(.*)$/gm, '<h3>$1</h3>'
    );
    formattedContent = formattedContent.replace(
        /^##\s+(.*)$/gm, '<h2>$1</h2>'
    );
    formattedContent = formattedContent.replace(
        /^#\s+(.*)$/gm, '<h1>$1</h1>'
    );

    // Convert Markdown links
    formattedContent = formattedContent.replace(
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Convert bold text
    formattedContent = formattedContent.replace(
        /\*\*(.*?)\*\*/g, '<strong>$1</strong>'
    );
    // Convert plain URLs into clickable links
    formattedContent = formattedContent.replace(
        /(?<!["'=])(https?:\/\/[^\s<]+)/g,
        (url) => {
            const cleanUrl = url.replace(/[.,;:!?)]*$/, '');
            const trailing = url.substring(cleanUrl.length);

            return `<a href="${cleanUrl}" target="_blank"
                rel="noopener noreferrer">${cleanUrl}</a>${trailing}`;
        }
    );
    // Convert newlines
    formattedContent = formattedContent.replace(/\n/g, '<br>');

    document.getElementById('results').innerHTML =
        `<div class="result-item">
            <div class="result-content">${formattedContent}</div>
        </div>`;
}
async function loadLanguages() {
    const dropdown = document.getElementById('languagesBtn');

    try {
        const response = await fetch('http://localhost:8080/api/languages');

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const languages = await response.json();

        dropdown.innerHTML = '<option value="">Select Language</option>';

        if (!languages.length) {
            dropdown.innerHTML = '<option value="">No languages available</option>';
            return;
        }

        languages.forEach(language => {
            const option = document.createElement('option');

            option.value = language.code;
            option.textContent = language.name;

            dropdown.appendChild(option);
        });
        dropdown.value = 'en'; 

    } catch (error) {
        console.error('Error loading languages:', error);
        dropdown.innerHTML = '<option value="">Unable to load languages</option>';
    }
}