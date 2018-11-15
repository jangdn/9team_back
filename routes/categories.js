const router = require('express').Router();

const categoryData = [
  '상의', '하의', '아우터', '신발', '기타'
];
const subCategoryData = {
  상의: [
    {
      subCategory: '티셔츠',
      imageUrl: 'https://image.flaticon.com/icons/svg/1177/1177099.svg',
    },
    {
      subCategory: '셔츠',
      imageUrl: 'https://image.flaticon.com/icons/svg/343/343225.svg',
    },
    {
      subCategory: '스웨터',
      imageUrl: 'https://image.flaticon.com/icons/svg/1177/1177081.svg',
    },
    {
      code: 'hood',
      subCategory: '후드',
      imageUrl: 'https://image.flaticon.com/icons/svg/1177/1177072.svg',
    },
  ],
  하의: [
    {
      subCategory: '청바지',
      imageUrl: 'https://image.flaticon.com/icons/svg/1177/1177092.svg',
    },
    {
      subCategory: '치노팬츠',
      imageUrl: 'https://image.flaticon.com/icons/svg/88/88823.svg',
    },
    {
      subCategory: '슬랙스',
      imageUrl: 'https://image.flaticon.com/icons/svg/88/88795.svg',
    },
    {
      subCategory: '반바지',
      imageUrl: 'https://image.flaticon.com/icons/svg/1177/1177103.svg',
    }
  ],
  아우터: [
    {
      subCategory: '재킷',
      imageUrl: 'https://image.flaticon.com/icons/svg/1177/1177079.svg',
    },
    {
      subCategory: '코트',
      imageUrl: 'https://image.flaticon.com/icons/svg/1291/1291339.svg',
    }
  ],
  신발: [
    {
      subCategory: '스니커즈',
      imageUrl: 'https://image.flaticon.com/icons/svg/1177/1177082.svg',
    }
  ],
  기타: [
    {
      subCategory: '모자',
      imageUrl: 'https://image.flaticon.com/icons/svg/1177/1177097.svg',
    },
    {
      subCategory: '넥타이',
      imageUrl: 'https://image.flaticon.com/icons/svg/1177/1177111.svg',
    },
    {
      subCategory: '벨트',
      imageUrl: 'https://image.flaticon.com/icons/svg/1177/1177077.svg',
    }
  ]
};

router.get('/', (req, res) => {
  res.json(categoryData);
});

router.get('/:category', (req, res) => {
  // console.log(req.params);
  const { category } = req.params;
  res.json(subCategoryData[category]);
});

module.exports = router;
