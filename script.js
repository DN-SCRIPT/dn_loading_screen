document.addEventListener('DOMContentLoaded', function() {
    
    let states = {
    'INIT_BEFORE_MAP_LOADED': {
      weight: 0.1,
      count: 0,
      done: 0
    },
    'MAP': {
      weight: 0.4,
      count: 0,
      done: 0
    },
    'INIT_AFTER_MAP_LOADED': {
      weight: 0.3,
      count: 0,
      done: 0
    },
    'INIT_SESSION': {
      weight: 0.2,
      count: 0,
      done: 0
    }
  };
  
  const handlers = {
    startInitFunctionOrder: (data) => {
      if (data.type == 'INIT_SESSION' && states['INIT_BEFORE_MAP_LOADED'].count < 1) {
        states['INIT_BEFORE_MAP_LOADED'].count = 1;
        states['INIT_BEFORE_MAP_LOADED'].done = 1;
        states['MAP'].count = 1;
        states['MAP'].done = 1;
        states['INIT_AFTER_MAP_LOADED'].count = 1;
        states['INIT_AFTER_MAP_LOADED'].done = 1;
      }
  
      states[data.type].count += data.count;
    },
    initFunctionInvoked: (data) => states[data.type].done++,
    startDataFileEntries: (data) => states['MAP'].count = data.count,
    performMapLoadFunction: (data) => states['MAP'].done++
  };
  
  let last = 0;
  
  window.addEventListener('message', (e) => (handlers[e.data.eventName] || (() => {}))(e.data));
  
  setInterval(() => {
    let progress = 0;
    for (let type in states) {
      const state = states[type];
      if (state.done < 1 || state.count < 1) continue;
      progress += (state.done / state.count) * state.weight;
    }
  
    let total = Math.min(Math.round(progress * 100), 100);
    if (total < last) total = last;
    last = total;
  
    document.getElementById('progress').value = total;
  }, 100);});

  function copyToClipboard() {
   
    const link = document.getElementById('copyLink');
    
    // Create a temporary textarea element to hold the link
    const textarea = document.createElement('textarea');
    textarea.value = link.href;

    // Set the position to absolute to move it out of view
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';

    // Append the textarea to the body and select its content
    document.body.appendChild(textarea);
    textarea.select();

    // Execute the copy command and remove the textarea
    document.execCommand('copy');
    document.body.removeChild(textarea);
}


function copyToClipboard1() {
   
  const link = document.getElementById('copyLink1');
  
  // Create a temporary textarea element to hold the link
  const textarea = document.createElement('textarea');
  textarea.value = link.href;

  // Set the position to absolute to move it out of view
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';

  // Append the textarea to the body and select its content
  document.body.appendChild(textarea);
  textarea.select();

  // Execute the copy command and remove the textarea
  document.execCommand('copy');
  document.body.removeChild(textarea);
}



document.addEventListener('DOMContentLoaded', function () {
  const messages = [
      { title: 'Content', message: 'copied to clipboard.', icon: 'fas fa-fire' }
  ];
  let index = 0;

  function createToast(title, message, iconClass) {
      const toastContainer = document.getElementById('toast-container');
      const toast = document.createElement('div');
      const icon = document.createElement('i');
      const toastHeader = document.createElement('div');
      const closeBtn = document.createElement('button');
      
      toast.className = 'toast';
      icon.className = iconClass;
      toastHeader.className = 'toast-header';
      toastHeader.innerText = title;
      toastHeader.prepend(icon); 
      toast.appendChild(toastHeader);
      
      const messageSpan = document.createElement('span');
      messageSpan.className = 'toast-message';
      messageSpan.innerText = message;
      toast.appendChild(messageSpan);

      closeBtn.className = 'close-btn';
      closeBtn.innerHTML = '×';
      closeBtn.onclick = function() {
          toast.classList.add('hide');
          setTimeout(() => toast.remove(), 300);
      };
      toast.appendChild(closeBtn);

      toastContainer.appendChild(toast);

      setTimeout(() => {
          toast.classList.add('hide');
          setTimeout(() => toast.remove(), 300);
      }, 5000);
  }

  function scheduleToasts() {
      if (index < messages.length) {
          const { title, message, icon } = messages[index++];
          createToast(title, message, icon);
          setTimeout(scheduleToasts, 7000); 
      }
  }

  const button = document.getElementById('showToastsButton');
  button.addEventListener('click', function() {
      scheduleToasts();
  });

});
