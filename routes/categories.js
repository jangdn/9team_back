const router = require('express').Router();

const categoryData = [
  '상의', '하의', '아우터', '신발', '기타'
];

const subCategoryData = {
  상의: [
      '티셔츠', '셔츠','스웨터','후드'
  ],
  하의: [
      '청바지','데님','반바지',
  ],
  아우터: [
    '재킷','점퍼','다운','코트','가죽','코트'
  ],
  신발: [
    '스니커즈',
  ],
  기타: [
    '넥타이', '벨트',
  ]
};

router.get('/', (req, res) => {
  res.json(categoryData);
});

router.get('/:category', (req, res) => {
  //console.log(req.params);
  const { category } = req.params;
  res.json(subCategoryData[category.slice(1)]);
});

module.exports = router;
