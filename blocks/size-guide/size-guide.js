import { isSizeGuideEnabled } from './size-guide-api.js';
import { createSizeGuideModal } from './size-guide-modal.js';
import { sizeGuideData } from './size-guide-data.js';

function getSku() {
  return document.querySelector('meta[name="sku"]')?.content?.trim() || '';
}

function getGraphQLEndpoint() {
  return window?.commerceConfig?.graphqlEndpoint || window?.location?.origin || '';
}

function renderButton(container, modal) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'size-guide-button';
  button.textContent = 'Size Guide';
  button.addEventListener('click', () => modal.open(button));
  container.appendChild(button);
}

export default async function decorate(block) {
  block.classList.add('size-guide-block');
  block.textContent = '';

  const sku = getSku();
  if (!sku) return;

  const enabled = await isSizeGuideEnabled({ sku, endpoint: getGraphQLEndpoint() });
  if (!enabled) return;

  const modal = createSizeGuideModal({ data: sizeGuideData });
  renderButton(block, modal);
}
