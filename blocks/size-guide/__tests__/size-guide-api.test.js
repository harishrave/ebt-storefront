import { strict as assert } from 'node:assert';
import { isSizeGuideEnabled } from '../size-guide-api.js';

describe('isSizeGuideEnabled', () => {
  afterEach(() => {
    global.fetch = undefined;
  });

  it('returns true when the attribute is enabled', async () => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({
        data: {
          products: {
            items: [{ sku: 'sku-1', size_guide_enabled: true }],
          },
        },
      }),
    });

    const result = await isSizeGuideEnabled({ sku: 'sku-1', endpoint: 'https://example.com/graphql' });
    assert.equal(result, true);
  });

  it('returns false when the attribute is missing', async () => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({
        data: {
          products: {
            items: [{ sku: 'sku-1' }],
          },
        },
      }),
    });

    const result = await isSizeGuideEnabled({ sku: 'sku-1', endpoint: 'https://example.com/graphql' });
    assert.equal(result, false);
  });

  it('fails closed on GraphQL errors', async () => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({
        errors: [{ message: 'boom' }],
      }),
    });

    const result = await isSizeGuideEnabled({ sku: 'sku-1', endpoint: 'https://example.com/graphql' });
    assert.equal(result, false);
  });
});
