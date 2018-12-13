const router = require('express').Router();

const categoryData = [
  '상의', '하의', '아우터', '신발', '기타'
];

const subCategoryData = {
  상의: [
    '티셔츠', '셔츠','스웨터','후드'
  ],
  하의: [
    '팬츠','데님','슬랙스','반바지'
  ],
  아우터: [
    '점퍼/자켓','코트','가죽','베스트'
  ],
  신발: [
    '스니커즈','슬립온','기타'
  ],
  기타: [
    '넥타이','벨트','모자','기타'
  ]
};

router.get('/', (req, res) => {
  res.json(categoryData);
});

router.get('/:category', (req, res) => {
  //console.log(req.params);
  const { category } = req.params;
  res.json(subCategoryData[category]);
});

module.exports = router;
