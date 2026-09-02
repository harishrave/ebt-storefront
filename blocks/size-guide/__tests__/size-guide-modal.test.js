import { strict as assert } from 'node:assert';
import { createSizeGuideModal } from '../size-guide-modal.js';
import { sizeGuideData } from '../size-guide-data.js';

describe('createSizeGuideModal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('creates a single modal and defaults to women', () => {
    const modal = createSizeGuideModal({ data: sizeGuideData });
    modal.open(document.createElement('button'));
    modal.open(document.createElement('button'));

    assert.equal(document.querySelectorAll('.size-guide-modal').length, 1);
    assert.equal(document.querySelectorAll('[role="tabpanel"]').length, 3);
    const selected = document.querySelector('[role="tab"][aria-selected="true"]');
    assert.equal(selected?.dataset.tab, 'women');
  });

  it('switches tabs without closing and shows one panel at a time', () => {
    const modal = createSizeGuideModal({ data: sizeGuideData });
    modal.open(document.createElement('button'));

    modal.setActiveTab('men');
    assert.equal(document.querySelector('[role="tab"][aria-selected="true"]')?.dataset.tab, 'men');
    assert.equal([...document.querySelectorAll('[role="tabpanel"]')].filter((panel) => !panel.hidden).length, 1);

    modal.setActiveTab('rings');
    assert.equal(document.querySelector('[role="tab"][aria-selected="true"]')?.dataset.tab, 'rings');
    assert.equal([...document.querySelectorAll('[role="tabpanel"]')].filter((panel) => !panel.hidden).length, 1);
  });
});
