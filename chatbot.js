    // Function to append user message to the chatbox
    function appendUserMessage(message) {
      const chatbox = document.getElementById("chatbox");
      const userMessage = document.createElement("div");
      userMessage.classList.add("user-message");
      userMessage.innerHTML = `
        <div class="mb-2">
          <div class="card-body">
            <p class="card-text">${message}</p>
          </div>
        </div>
      `;
      chatbox.appendChild(userMessage);
    }

    // Function to append assistant message to the chatbox
    function appendAssistantMessage(message) {
      const chatbox = document.getElementById("chatbox");
      const assistantMessage = document.createElement("div");
      assistantMessage.classList.add("assistant-message");
      assistantMessage.innerHTML = `
        <div class="mb-2">
          <div class="card-body">
            <span class="mwai-name"><div class="mwai-name-text" style="color:#6149eb;"><img src="https://cdn-icons-png.flaticon.com/512/630/630426.png" style="width: 20px;vertical-align: middle;margin-left: -8px;margin-right: 5px;">My AI Chatbot</div></span>
            <p class="card-text">${message}</p>
          </div>
        </div>
      `;
      chatbox.appendChild(assistantMessage);
    }

    // Function to append typing indicator to the chatbox
    function showTypingIndicator() {
      const chatbox = document.getElementById("chatbox");
      const typingIndicator = document.createElement("div");
      typingIndicator.classList.add("typing-indicator");
      chatbox.appendChild(typingIndicator);
    }

    // Function to remove typing indicator from the chatbox
    function hideTypingIndicator() {
      const chatbox = document.getElementById("chatbox");
      const typingIndicator = chatbox.querySelector(".typing-indicator");
      if (typingIndicator) {
        chatbox.removeChild(typingIndicator);
      }
    }

    // Function to send user message to the server and receive assistant's response
    async function sendMessage() {
      const userInput = document.getElementById("user-input").value;
      if (userInput.trim() === "") return;

      appendUserMessage(userInput);
      document.getElementById("user-input").value = "";

      showTypingIndicator();
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk-*YOUR_API_KEY*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'model': 'gpt-3.5-turbo',
          'max_tokens': 500,
          'messages': [
            {
              'role': 'system',
              'content': 'You are a complete AI assistant. Your name is My AI Chatbot, an AI created by My Company on January 1 2021.'
            },
            {
              'role': 'user',
              'content': userInput
            }
          ]
        })
      });

      hideTypingIndicator();
      const responseData = await response.json();
      const assistantResponse = responseData.choices[0].message.content;
      appendAssistantMessage(assistantResponse);
    }

    // Event listener for send button click
    document.getElementById("send-btn").addEventListener("click", sendMessage);

    // Event listener for enter key press
    document.getElementById("user-input").addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
      }
    });
    // Event listener for touch events on mobile devices
    document.getElementById("send-btn").addEventListener("touchend", function(event) {
      event.preventDefault();
      sendMessage();
    });
