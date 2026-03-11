(function () {
  const WEBHOOK_URL = '/api/chat/';
  const SID_KEY = 'faq_session_id_' + location.host;
  const sid = localStorage.getItem(SID_KEY) || (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));
  localStorage.setItem(SID_KEY, sid);

  function init() {
    let chatHasBeenOpened = false;

    // Chat bubble con logo de OH México
    const bubble = document.createElement('div');
    bubble.className = 'oh-chat-bubble';
    bubble.style.cssText = 'position:fixed;right:20px;bottom:20px;width:64px;height:64px;border-radius:50%;background:#B33D26;box-shadow:0 12px 32px rgba(179,61,38,0.4),0 4px 12px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;z-index:2147483647;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);transform:scale(1);border:2px solid rgba(255,255,255,0.2)';

    bubble.addEventListener('mouseenter', () => {
      bubble.style.transform = 'scale(1.05)';
      bubble.style.boxShadow = '0 16px 40px rgba(179,61,38,0.5),0 8px 16px rgba(0,0,0,0.3)';
      bubble.style.background = '#CD7925';
    });
    bubble.addEventListener('mouseleave', () => {
      bubble.style.transform = 'scale(1)';
      bubble.style.boxShadow = '0 12px 32px rgba(179,61,38,0.4),0 4px 12px rgba(0,0,0,0.2)';
      bubble.style.background = '#B33D26';
    });

    const bubbleImg = document.createElement('img');
    bubbleImg.src = '/image/OH-Mexico.png';
    bubbleImg.alt = 'OH México Chat';
    bubbleImg.style.cssText = 'width:34px;height:34px;object-fit:contain';
    bubble.appendChild(bubbleImg);
    document.body.appendChild(bubble);

    // Speech bubble de bienvenida
    const speechBubble = document.createElement('div');
    speechBubble.className = 'oh-speech-bubble';
    speechBubble.style.cssText = 'position:fixed;right:100px;bottom:40px;background:#E6BAA8;color:#27292B;padding:12px 16px;border-radius:16px;border-bottom-right-radius:4px;box-shadow:0 8px 24px rgba(0,0,0,0.4),0 4px 12px rgba(0,0,0,0.2);font-family:"IBM Plex Sans",system-ui,sans-serif;font-size:14px;font-weight:600;max-width:250px;z-index:2147483646;opacity:0;transform:translateY(10px) scale(0.9);transition:all 0.4s cubic-bezier(0.4,0,0.2,1);pointer-events:none;border:1px solid rgba(179,61,38,0.2)';
    speechBubble.textContent = "Hi! I'm Sara, how can I help you?";

    const arrow = document.createElement('div');
    arrow.style.cssText = 'position:absolute;right:-8px;bottom:20px;width:0;height:0;border-left:8px solid #E6BAA8;border-top:8px solid transparent;border-bottom:8px solid transparent;filter:drop-shadow(2px 0px 2px rgba(0,0,0,0.2))';
    speechBubble.appendChild(arrow);
    document.body.appendChild(speechBubble);

    speechBubble.onclick = () => {
      speechBubble.style.opacity = '0';
      speechBubble.style.transform = 'translateY(10px) scale(0.9)';
      setTimeout(() => { speechBubble.style.pointerEvents = 'none'; }, 400);
    };

    // Mostrar speech bubble después de 5 segundos
    setTimeout(() => {
      if (!chatHasBeenOpened) {
        speechBubble.style.opacity = '1';
        speechBubble.style.transform = 'translateY(0) scale(1)';
        speechBubble.style.pointerEvents = 'auto';

        setTimeout(() => {
          speechBubble.style.opacity = '0';
          speechBubble.style.transform = 'translateY(10px) scale(0.9)';
          setTimeout(() => { speechBubble.style.pointerEvents = 'none'; }, 400);
        }, 10000);
      }
    }, 5000);

    // Animación pulse con el rojo venetian
    const style = document.createElement('style');
    style.textContent = `
      @keyframes oh-pulse {
        0%   { box-shadow: 0 12px 32px rgba(179,61,38,0.4), 0 4px 12px rgba(0,0,0,0.2), 0 0 0 0 rgba(179,61,38,0.5); }
        70%  { box-shadow: 0 12px 32px rgba(179,61,38,0.4), 0 4px 12px rgba(0,0,0,0.2), 0 0 0 20px rgba(179,61,38,0); }
        100% { box-shadow: 0 12px 32px rgba(179,61,38,0.4), 0 4px 12px rgba(0,0,0,0.2), 0 0 0 0 rgba(179,61,38,0); }
      }
      .oh-chat-bubble {
        animation: oh-pulse 3s infinite;
      }
    `;
    document.head.appendChild(style);

    // Panel del chat
    const panel = document.createElement('div');
    panel.className = 'oh-chat-panel';
    panel.style.cssText = 'position:fixed;right:20px;bottom:96px;width:400px;height:580px;background:rgb(250,249,246);border:1px solid rgba(179,61,38,0.25);border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,0.12),0 8px 24px rgba(0,0,0,0.08);display:none;flex-direction:column;z-index:2147483647;transform:translateY(20px);opacity:0;transition:all 0.3s cubic-bezier(0.4,0,0.2,1)';

    // Header
    const header = document.createElement('div');
    header.style.cssText = 'padding:20px 24px 16px;border-bottom:1px solid rgba(179,61,38,0.2);font-family:"IBM Plex Sans",system-ui,sans-serif;font-weight:600;font-size:18px;display:flex;align-items:center;justify-content:space-between;flex:0 0 auto;background:rgb(250,249,246);border-radius:20px 20px 0 0';
    header.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:36px;height:36px;background:#B33D26;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(179,61,38,0.4)">
          <img src="/image/OH-Mexico.png" alt="OH México" style="width:20px;height:20px;object-fit:contain">
        </div>
        <div>
          <div style="color:#27292B;font-size:16px;font-weight:700;line-height:1.2">Sara</div>
          <div style="color:#CD7925;font-size:12px;font-weight:500">OH México</div>
        </div>
      </div>
      <div style="display:flex;align-items:center">
        <button id="ohCloseBtn" style="background:rgba(179,61,38,0.1);border:0;cursor:pointer;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#27292B;transition:all 0.2s;font-size:18px" onmouseover="this.style.background='rgba(179,61,38,0.2)'" onmouseout="this.style.background='rgba(179,61,38,0.1)'">×</button>
      </div>
    `;
    panel.appendChild(header);

    // Área de chat
    const chatlogDiv = document.createElement('div');
    chatlogDiv.id = 'oh-chatlog';
    chatlogDiv.style.cssText = 'padding:20px 24px;overflow-y:auto;flex:1;min-height:0;font-family:"IBM Plex Sans",system-ui,sans-serif;font-size:14px;line-height:1.5;background:rgb(250,249,246);color:#27292B;scrollbar-width:thin;scrollbar-color:rgba(179,61,38,0.3) transparent';

    const scrollbarStyle = document.createElement('style');
    scrollbarStyle.textContent = `
      #oh-chatlog::-webkit-scrollbar { width: 6px; }
      #oh-chatlog::-webkit-scrollbar-track { background: transparent; }
      #oh-chatlog::-webkit-scrollbar-thumb { background-color: rgba(179,61,38,0.3); border-radius: 3px; }
      #oh-chatlog::-webkit-scrollbar-thumb:hover { background-color: rgba(179,61,38,0.5); }
    `;
    document.head.appendChild(scrollbarStyle);

    // Mensaje de bienvenida
    setTimeout(() => {
      addMsg("Hi! I'm Sara 👋 How can I help you? Ask me about our menu, locations, hours, reservations or anything about OH México.", 'bot');
    }, 500);

    panel.appendChild(chatlogDiv);

    // Formulario de input
    const formEl = document.createElement('form');
    formEl.id = 'oh-faqform';
    formEl.style.cssText = 'display:flex;gap:12px;align-items:center;padding:20px 24px;border-top:1px solid rgba(179,61,38,0.2);flex:0 0 auto;flex-shrink:0;background:rgb(250,249,246);border-radius:0 0 20px 20px';
    formEl.innerHTML = `
      <input
        id="oh-faqinput"
        autocomplete="off"
        placeholder="Ask me something about OH México..."
        style="flex:1;padding:14px 16px;border:1px solid rgba(179,61,38,0.25);border-radius:12px;font-family:'IBM Plex Sans',system-ui,sans-serif;font-size:14px;background:rgb(250,249,246);color:#27292B;transition:all 0.2s;outline:none"
        onfocus="this.style.border='1px solid #B33D26';this.style.boxShadow='0 0 0 2px rgba(179,61,38,0.2)'"
        onblur="this.style.border='1px solid rgba(179,61,38,0.25)';this.style.boxShadow='none'"
      />
      <button
        type="submit"
        style="padding:14px 20px;border:0;background:linear-gradient(135deg,#B33D26 0%,#CD7925 100%);color:#fff;border-radius:12px;font-family:'IBM Plex Sans',system-ui,sans-serif;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;min-width:80px;flex-shrink:0"
        onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 8px 16px rgba(179,61,38,0.4)'"
        onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'"
      >
        Send
      </button>
    `;
    panel.appendChild(formEl);
    document.body.appendChild(panel);

    const chatlog = panel.querySelector('#oh-chatlog');
    const form = panel.querySelector('#oh-faqform');
    const input = panel.querySelector('#oh-faqinput');
    const closeBtn = panel.querySelector('#ohCloseBtn');

    function addMsg(text, who, isTyping = false) {
      const container = document.createElement('div');
      container.style.cssText = 'margin:14px 0;display:flex;width:100%;opacity:0;transform:translateY(10px);animation:oh-msg-fade-in 0.4s cubic-bezier(0.4,0,0.2,1) forwards';

      const bubbleMsg = document.createElement('div');
      bubbleMsg.style.cssText = 'padding:12px 16px;border-radius:16px;max-width:85%;word-wrap:break-word;overflow-wrap:break-word;white-space:pre-wrap;box-sizing:border-box;font-family:"IBM Plex Sans",system-ui,sans-serif;font-size:14px;line-height:1.4;position:relative';

      if (who === 'user') {
        container.style.justifyContent = 'flex-end';
        bubbleMsg.style.background = 'linear-gradient(135deg,#B33D26 0%,#CD7925 100%)';
        bubbleMsg.style.color = '#ffffff';
        bubbleMsg.style.borderBottomRightRadius = '6px';
        bubbleMsg.style.boxShadow = '0 4px 12px rgba(179,61,38,0.3)';
      } else {
        bubbleMsg.style.background = 'rgba(179,61,38,0.06)';
        bubbleMsg.style.color = '#27292B';
        bubbleMsg.style.border = '1px solid rgba(179,61,38,0.2)';
        bubbleMsg.style.borderBottomLeftRadius = '6px';

        const avatar = document.createElement('div');
        avatar.style.cssText = 'width:26px;height:26px;background:#B33D26;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-right:10px;flex-shrink:0;margin-top:2px;box-shadow:0 2px 6px rgba(179,61,38,0.3)';
        const avatarImg = document.createElement('img');
        avatarImg.src = '/image/OH-Mexico.png';
        avatarImg.alt = 'Sara';
        avatarImg.style.cssText = 'width:14px;height:14px;object-fit:contain';
        avatar.appendChild(avatarImg);
        container.appendChild(avatar);
      }

      if (isTyping) {
        bubbleMsg.innerHTML = '<div class="oh-typing-indicator"><span></span><span></span><span></span></div>';
      } else {
        bubbleMsg.textContent = text;
      }

      container.appendChild(bubbleMsg);
      chatlog.appendChild(container);
      chatlog.scrollTop = chatlog.scrollHeight;
    }

    // Estilos de animación
    if (!document.querySelector('#oh-msg-animations')) {
      const msgAnimStyle = document.createElement('style');
      msgAnimStyle.id = 'oh-msg-animations';
      msgAnimStyle.textContent = `
        @keyframes oh-msg-fade-in {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes oh-panel-slide-in {
          0%   { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes oh-panel-slide-out {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(20px) scale(0.95); }
        }
        .oh-panel-show { animation: oh-panel-slide-in 0.3s cubic-bezier(0.4,0,0.2,1) forwards; }
        .oh-panel-hide { animation: oh-panel-slide-out 0.2s cubic-bezier(0.4,0,0.2,1) forwards; }
      `;
      document.head.appendChild(msgAnimStyle);
    }

    // Abrir / cerrar panel
    bubble.onclick = () => {
      chatHasBeenOpened = true;

      if (speechBubble.style.opacity === '1') {
        speechBubble.style.opacity = '0';
        speechBubble.style.transform = 'translateY(10px) scale(0.9)';
        setTimeout(() => { speechBubble.style.pointerEvents = 'none'; }, 400);
      }

      if (panel.style.display === 'none' || !panel.style.display) {
        panel.style.display = 'flex';
        panel.className = 'oh-chat-panel oh-panel-show';
        setTimeout(() => input.focus(), 300);
      } else {
        panel.className = 'oh-chat-panel oh-panel-hide';
        setTimeout(() => { panel.style.display = 'none'; }, 200);
      }
    };

    closeBtn.onclick = () => {
      panel.className = 'oh-chat-panel oh-panel-hide';
      setTimeout(() => { panel.style.display = 'none'; }, 200);
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const message = input.value.trim();
      if (!message) return;

      addMsg(message, 'user');
      input.value = '';
      addMsg('', 'bot', true);

      try {
        const res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, session_id: sid, page_url: location.href, source: 'web' })
        });

        const typingMsg = chatlog.lastChild;
        if (typingMsg) typingMsg.remove();

        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

        const data = await res.json();
        let reply = null;
        if (Array.isArray(data) && data.length > 0) {
          reply = data[0].reply;
        } else if (data.reply) {
          reply = data.reply;
        }

        addMsg(reply || "Sorry, I couldn't find that information. Could you rephrase your question?", 'bot');
      } catch (err) {
        const typingMsg = chatlog.lastChild;
        if (typingMsg) typingMsg.remove();
        addMsg(`Oops, something went wrong: ${err.message}. Please try again.`, 'bot');
      }
    });

    // Escape para cerrar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (panel.style.display === 'flex') {
          closeBtn.click();
        } else if (speechBubble.style.opacity === '1') {
          speechBubble.style.opacity = '0';
          speechBubble.style.transform = 'translateY(10px) scale(0.9)';
          setTimeout(() => { speechBubble.style.pointerEvents = 'none'; }, 400);
        }
      }
    });

    // Responsive mobile
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        panel.style.width = 'calc(100vw - 32px)';
        panel.style.height = 'calc(100vh - 120px)';
        panel.style.right = '16px';
        panel.style.bottom = '88px';
        speechBubble.style.right = '84px';
        speechBubble.style.bottom = '36px';
        speechBubble.style.maxWidth = '200px';
        speechBubble.style.fontSize = '13px';
      } else {
        panel.style.width = '400px';
        panel.style.height = '580px';
        panel.style.right = '20px';
        panel.style.bottom = '96px';
        speechBubble.style.right = '100px';
        speechBubble.style.bottom = '40px';
        speechBubble.style.maxWidth = '250px';
        speechBubble.style.fontSize = '14px';
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
