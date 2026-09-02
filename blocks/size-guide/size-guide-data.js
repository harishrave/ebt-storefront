export const sizeGuideData = {
  women: {
    label: 'Women',
    sections: [
      {
        title: 'Apparel',
        type: 'table',
        columns: ['US Size', 'Chest/Bust', 'Waist', 'Hips'],
        rows: [
          { size: 'XS', chestBust: '31-32 in / 79-81 cm', waist: '24-25 in / 61-64 cm', hips: '34-35 in / 86-89 cm' },
          { size: 'S', chestBust: '33-34 in / 84-86 cm', waist: '26-27 in / 66-69 cm', hips: '36-37 in / 91-94 cm' },
          { size: 'M', chestBust: '35-36 in / 89-91 cm', waist: '28-29 in / 71-74 cm', hips: '38-39 in / 97-99 cm' },
          { size: 'L', chestBust: '37-39 in / 94-99 cm', waist: '30-32 in / 76-81 cm', hips: '40-42 in / 102-107 cm' },
          { size: 'XL', chestBust: '40-42 in / 102-107 cm', waist: '33-35 in / 84-89 cm', hips: '43-45 in / 109-114 cm' },
          { size: 'XXL', chestBust: '43-45 in / 109-114 cm', waist: '36-38 in / 91-97 cm', hips: '46-48 in / 117-122 cm' },
        ],
      },
      {
        title: 'Rings',
        type: 'table',
        columns: ['Ring Size', 'Circumference', 'Diameter'],
        rows: [
          { size: '5', circumference: '49.3 mm / 1.94 in', diameter: '15.7 mm / 0.62 in' },
          { size: '6', circumference: '51.9 mm / 2.04 in', diameter: '16.5 mm / 0.65 in' },
          { size: '7', circumference: '54.4 mm / 2.14 in', diameter: '17.3 mm / 0.68 in' },
          { size: '8', circumference: '57.0 mm / 2.24 in', diameter: '18.1 mm / 0.71 in' },
          { size: '9', circumference: '59.5 mm / 2.34 in', diameter: '18.9 mm / 0.74 in' },
        ],
      },
    ],
  },
  men: {
    label: 'Men',
    sections: [
      {
        title: 'Apparel',
        type: 'table',
        columns: ['US Size', 'Chest/Bust', 'Waist', 'Hips'],
        rows: [
          { size: 'XS', chestBust: '31-34 in / 79-86 cm', waist: '25-27 in / 64-69 cm', hips: '31-34 in / 79-86 cm' },
          { size: 'S', chestBust: '35-37 in / 89-94 cm', waist: '28-30 in / 71-76 cm', hips: '35-37 in / 89-94 cm' },
          { size: 'M', chestBust: '38-40 in / 97-102 cm', waist: '31-33 in / 79-84 cm', hips: '38-40 in / 97-102 cm' },
          { size: 'L', chestBust: '41-43 in / 104-109 cm', waist: '34-36 in / 86-91 cm', hips: '41-43 in / 104-109 cm' },
          { size: 'XL', chestBust: '44-46 in / 112-117 cm', waist: '37-39 in / 94-99 cm', hips: '44-46 in / 112-117 cm' },
          { size: 'XXL', chestBust: '47-49 in / 119-124 cm', waist: '40-42 in / 102-107 cm', hips: '47-49 in / 119-124 cm' },
        ],
      },
      {
        title: 'Rings',
        type: 'table',
        columns: ['Ring Size', 'Circumference', 'Diameter'],
        rows: [
          { size: '8', circumference: '57.0 mm / 2.24 in', diameter: '18.1 mm / 0.71 in' },
          { size: '9', circumference: '59.5 mm / 2.34 in', diameter: '18.9 mm / 0.74 in' },
          { size: '10', circumference: '62.1 mm / 2.44 in', diameter: '19.8 mm / 0.78 in' },
          { size: '11', circumference: '64.6 mm / 2.54 in', diameter: '20.6 mm / 0.81 in' },
          { size: '12', circumference: '67.2 mm / 2.65 in', diameter: '21.4 mm / 0.84 in' },
        ],
      },
    ],
  },
};

export const sizeGuideTabs = ['women', 'men', 'rings'];
