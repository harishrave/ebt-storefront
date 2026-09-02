let activeModal = null;

export function createSizeGuideModal({ data, onClose }) {
  if (activeModal) return activeModal;

  let modalElement = null;
  let lastTrigger = null;
  let activeTab = 'women';
  let isOpen = false;
  let keydownBound = false;

  const focusableSelector = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  function getFocusableElements() {
    if (!modalElement) return [];
    return Array.from(modalElement.querySelectorAll(focusableSelector)).filter((element) => !element.hasAttribute('hidden'));
  }

  function renderTabButtons(container) {
    const tabs = ['women', 'men', 'rings'];
    const tabNames = { women: 'Women', men: 'Men', rings: 'Rings' };
    const tabList = document.createElement('div');
    tabList.className = 'size-guide-tabs';
    tabList.setAttribute('role', 'tablist');

    tabs.forEach((tab) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'size-guide-tabs__button';
      button.setAttribute('role', 'tab');
      button.dataset.tab = tab;
      button.textContent = tabNames[tab];
      button.addEventListener('click', () => setActiveTab(tab));
      tabList.appendChild(button);
    });

    container.appendChild(tabList);
  }

  function renderSection(section, panel) {
    const title = document.createElement('h4');
    title.className = 'size-guide-panel__title';
    title.textContent = section.title;
    panel.appendChild(title);

    if (section.type === 'table') {
      const wrapper = document.createElement('div');
      wrapper.className = 'size-guide-table-wrapper';
      const table = document.createElement('table');
      table.className = 'size-guide-table';
      const thead = document.createElement('thead');
      const headRow = document.createElement('tr');
      section.columns.forEach((column) => {
        const th = document.createElement('th');
        th.textContent = column;
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);
      const tbody = document.createElement('tbody');
      section.rows.forEach((row) => {
        const tr = document.createElement('tr');
        Object.keys(row).forEach((key) => {
          const td = document.createElement('td');
          td.textContent = row[key];
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.append(thead, tbody);
      wrapper.appendChild(table);
      panel.appendChild(wrapper);
    }
  }

  function renderPanel(tabKey, label, sections) {
    const panel = document.createElement('section');
    panel.className = 'size-guide-panel';
    panel.dataset.tabPanel = tabKey;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-label', label);
    sections.forEach((section) => renderSection(section, panel));
    return panel;
  }

  function syncTabs() {
    if (!modalElement) return;
    const buttons = modalElement.querySelectorAll('[role="tab"]');
    const panels = modalElement.querySelectorAll('[role="tabpanel"]');
    buttons.forEach((button) => {
      const isSelected = button.dataset.tab === activeTab;
      button.setAttribute('aria-selected', String(isSelected));
      button.tabIndex = isSelected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.tabPanel !== activeTab;
    });
  }

  function setActiveTab(tab) {
    if (!data[tab]) return;
    activeTab = tab;
    syncTabs();
  }

  function trapFocus(event) {
    if (event.key !== 'Tab') return;
    const focusable = getFocusableElements();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    trapFocus(event);
  }

  function close() {
    if (!modalElement || !isOpen) return;
    isOpen = false;
    modalElement.classList.remove('is-open');
    modalElement.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleKeydown);
    keydownBound = false;
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
    if (typeof onClose === 'function') {
      onClose();
    }
  }

  function ensureModal() {
    if (modalElement) return modalElement;

    modalElement = document.createElement('div');
    modalElement.className = 'size-guide-modal';
    modalElement.setAttribute('aria-hidden', 'true');

    const backdrop = document.createElement('div');
    backdrop.className = 'size-guide-modal__backdrop';
    backdrop.addEventListener('click', close);

    const dialog = document.createElement('div');
    dialog.className = 'size-guide-modal__dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'size-guide-modal-title');

    const header = document.createElement('div');
    header.className = 'size-guide-modal__header';
    const title = document.createElement('h3');
    title.className = 'size-guide-modal__title';
    title.id = 'size-guide-modal-title';
    title.textContent = 'Size Guide';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'size-guide-modal__close';
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', close);

    header.append(title, closeButton);
    dialog.appendChild(header);
    renderTabButtons(dialog);

    Object.entries(data).forEach(([key, entry]) => {
      dialog.appendChild(renderPanel(key, entry.label, entry.sections));
    });

    modalElement.append(backdrop, dialog);
    document.body.appendChild(modalElement);
    syncTabs();
    return modalElement;
  }

  function open(trigger) {
    lastTrigger = trigger || document.activeElement;
    ensureModal();
    isOpen = true;
    modalElement.classList.add('is-open');
    modalElement.setAttribute('aria-hidden', 'false');
    setActiveTab('women');
    if (!keydownBound) {
      document.addEventListener('keydown', handleKeydown);
      keydownBound = true;
    }
    const [firstFocusable] = getFocusableElements();
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  activeModal = { open, close, setActiveTab, get element() { return modalElement; } };
  return activeModal;
}
