import { strict as assert } from 'node:assert';
import decorate from '../size-guide.js';
import * as api from '../size-guide-api.js';

describe('size guide block', () => {
  let originalFetchEnabled;

  beforeEach(() => {
    document.body.innerHTML = '';
    originalFetchEnabled = api.isSizeGuideEnabled;
  });

  afterEach(() => {
    api.isSizeGuideEnabled = originalFetchEnabled;
  });

  it('renders the Size Guide button when enabled', async () => {
    api.isSizeGuideEnabled = async () => true;
    const block = document.createElement('div');
    document.body.appendChild(block);

    await decorate(block);

    assert.equal(block.querySelectorAll('button').length, 1);
    assert.equal(block.querySelector('button')?.textContent, 'Size Guide');
  });

  it('does not render when disabled', async () => {
    api.isSizeGuideEnabled = async () => false;
    const block = document.createElement('div');
    document.body.appendChild(block);

    await decorate(block);

    assert.equal(block.querySelector('button'), null);
  });

  it('fails closed on errors', async () => {
    api.isSizeGuideEnabled = async () => {
      throw new Error('boom');
    };
    const block = document.createElement('div');
    document.body.appendChild(block);

    await decorate(block);

    assert.equal(block.querySelector('button'), null);
  });
});
