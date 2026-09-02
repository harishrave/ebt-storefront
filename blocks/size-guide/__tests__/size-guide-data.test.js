import { strict as assert } from 'node:assert';
import { sizeGuideData, sizeGuideTabs } from '../size-guide-data.js';

describe('sizeGuideData', () => {
  it('includes women, men, and rings tabs', () => {
    assert.deepEqual(sizeGuideTabs, ['women', 'men', 'rings']);
    assert.ok(sizeGuideData.women);
    assert.ok(sizeGuideData.men);
  });

  it('includes apparel and rings sections for women and men', () => {
    ['women', 'men'].forEach((group) => {
      const sections = sizeGuideData[group].sections;
      assert.equal(sections.length, 2);
      assert.equal(sections[0].title, 'Apparel');
      assert.equal(sections[1].title, 'Rings');
      assert.deepEqual(sections[0].columns, ['US Size', 'Chest/Bust', 'Waist', 'Hips']);
      assert.deepEqual(sections[1].columns, ['Ring Size', 'Circumference', 'Diameter']);
    });
  });

  it('covers XS through XXL with inch and centimeter pairs', () => {
    const womenSizes = sizeGuideData.women.sections[0].rows.map((row) => row.size);
    const menSizes = sizeGuideData.men.sections[0].rows.map((row) => row.size);
    assert.deepEqual(womenSizes, ['XS', 'S', 'M', 'L', 'XL', 'XXL']);
    assert.deepEqual(menSizes, ['XS', 'S', 'M', 'L', 'XL', 'XXL']);

    [...sizeGuideData.women.sections[0].rows, ...sizeGuideData.men.sections[0].rows].forEach((row) => {
      ['chestBust', 'waist', 'hips'].forEach((key) => {
        assert.match(row[key], /\bin\b/);
        assert.match(row[key], /\bcm\b/);
      });
    });
  });
});
