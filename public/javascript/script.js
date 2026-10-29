     const chatHistory = document.getElementById('chat-history');
     const chatInput = document.getElementById('chat-input');

        // Initial Greeting
        window.onload = () => {
            appendMessage("ToriAI", "Hey! Chat with me about Tori's professional background. What would you like to check out?", "bot-name");
        };

        // Allow pressing 'Enter' to send messages
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
            
        });


        // Appends a message to the chat box
        function appendMessage(sender, text, cssClass) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'message';
            msgDiv.innerHTML = `<span class="${cssClass}">${sender}:</span> ${text}`;
            chatHistory.appendChild(msgDiv);
            chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to bottom
        }

        // Handles the chunky toolbar buttons
   function handleQuickAction(action) {
    if (action === 'resume') {
        appendMessage("System", "Opening Resume in a new tab...", "system-msg");
        // Make sure this matches the exact name of the PDF in your public/assets folder
        window.open('/assets/tori-resume.pdf', '_blank');
    } else if (action === 'youtube') {
        appendMessage("System", "Opening YouTube Channel in a new tab...", "system-msg");
        // Replace with your actual YouTube URL
        window.open('https://www.youtube.com/channel/UCFUNUK6oponxDjVXavSrK8w', '_blank');
    } else if (action === 'github') {
        appendMessage("System", "Opening GitHub profile in a new tab...", "system-msg");
        // Replace with your actual GitHub URL
        window.open('https://github.com/adams-tee', '_blank');
    } else if (action === 'projects') {
        appendMessage("System", "Opening Projects in a new tab...", "system-msg");
        // Replace with your actual projects URL
        window.open('/projects.html', '_blank');
    }
}

        // Handles custom AI chat via the Node.js server
        async function sendMessage() {
            const text = chatInput.value.trim();
            if (!text) return;

            // 1. Show user message and clear input
        window.open('https://github.com/adams-tee', '_blank');
    }

        // Handles custom AI chat via the Node.js server
        async function sendMessage() {
            const text = chatInput.value.trim();
            if (!text) return;

            // 1. Show user message and clear input
            appendMessage("You", text, "user-name");
            chatInput.value = '';

            // 2. Show a temporary typing indicator, create a unique ID for it so we can remove it later
            const typingId = "typing-" + Date.now();
            const typingDiv = document.createElement('div');
            typingDiv.id = typingId;
            typingDiv.className = 'message system-msg';
            typingDiv.innerText = "ToriAI is typing...";
            chatHistory.appendChild(typingDiv);
            chatHistory.scrollTop = chatHistory.scrollHeight;

            try {
                // 3. Send POST request to your server.js route
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: text })
                });

                const data = await response.json();

                // 4. Remove typing indicator and show AI response
                document.getElementById(typingId).remove();
                
                if (response.ok) {
                    appendMessage("ToriAI", data.reply, "bot-name");
            
                } else {
                    appendMessage("System", "Error: Could not connect to AI. Try again.", "system-msg");
                }

            } catch (error) {
                console.error("Chat error:", error);
                document.getElementById(typingId).remove();
                appendMessage("System", "Warning: Connection timed out. Is someone using the landline?", "system-msg");
            }
        }

        // PROJECTS HTML //
        
            function switchTab(evt, projectId) {
            // Hide all panels
            const panels = document.getElementsByClassName("tab-panel");
            for (let i = 0; i < panels.length; i++) {
                panels[i].classList.remove("active");
            }

            // Remove 'active' styling from all tabs
            const tabs = document.getElementsByClassName("tab");
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove("active");
            }

            // Show the selected panel and make the clicked tab active
            document.getElementById(projectId).classList.add("active");
            evt.currentTarget.classList.add("active");
        }