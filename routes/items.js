const router = require('express').Router();

const itemData = {
  tt41213: {
    itemId: 'tt41213',
    name: '남성) 자카드 스웨터',
    price: '39,900',
    tags: ['상의', '탑텐', '스웨터'],
    image: 'http://assets.styleship.com/topten10/data/productImage/a/4/MSY4ER1505OTP.jpg',
    url: 'http://www.topten10.co.kr/product/view.asp?productNo=41213',
    sizeTable: {
      sizeHeader: ['95', '100', '105', '110'],
      partSizeHeader: [
        '가슴둘레', '목깊이', '목넓이', '밑단둘레', '소매길이', '소매밑단(카우스)', '소매중통', '소매통', '암홀(A.H)', '총기장'
      ],
      sizes: [
        ['97', '8', '18.5', '87', '83.5', '19', '27', '34.5', '29', '68'],
        ['102', '8.5', '19', '92', '85', '20', '28', '36', '30', '70'],
        ['107', '9', '19.5', '97', '86.5', '21', '29', '37.5', '31', '72'],
        ['113', '9.5', '20', '103', '88', '22', '30', '39', '32', '74'],
      ],
    },
  },
  tt41503: {
    itemId: 'tt41503',
    name: '남성) 드레스 셔츠',
    price: '29,900',
    tags: ['상의', '탑텐', '셔츠'],
    image: 'http://assets.styleship.com/topten10/data/productImage/a/4/MSY4WC1902NVM.jpg',
    url: 'http://www.topten10.co.kr/product/view.asp?productNo=41503',
    sizeTable: {
      sizeHeader: ['95', '100', '105', '110'],
      partSizeHeader: [
        '가슴둘레', '목깊이', '목넓이', '밑단둘레', '소매길이', '소매밑단(카우스)', '소매중통', '소매통', '암홀(A.H)', '총기장'
      ],
      sizes: [
        ['97', '8', '18.5', '87', '83.5', '19', '27', '34.5', '29', '68'],
        ['102', '8.5', '19', '92', '85', '20', '28', '36', '30', '70'],
        ['107', '9', '19.5', '97', '86.5', '21', '29', '37.5', '31', '72'],
        ['113', '9.5', '20', '103', '88', '22', '30', '39', '32', '74'],
      ],
    },
  },
  tt41509: {
    itemId: 'tt41509',
    name: '남성) 코튼 해비 플란넬 레귤러카라 셔츠',
    price: '29,900',
    tags: ['상의', '탑텐', '셔츠'],
    image: 'http://assets.styleship.com/topten10/data/productImage/a/4/MSY4WC1904BBM.jpg',
    url: 'http://www.topten10.co.kr/product/view.asp?productNo=41509',
    sizeTable: {
      sizeHeader: ['95', '100', '105', '110'],
      partSizeHeader: [
        '가슴둘레', '목깊이', '목넓이', '밑단둘레', '소매길이', '소매밑단(카우스)', '소매중통', '소매통', '암홀(A.H)', '총기장'
      ],
      sizes: [
        ['97', '8', '18.5', '87', '83.5', '19', '27', '34.5', '29', '68'],
        ['102', '8.5', '19', '92', '85', '20', '28', '36', '30', '70'],
        ['107', '9', '19.5', '97', '86.5', '21', '29', '37.5', '31', '72'],
        ['113', '9.5', '20', '103', '88', '22', '30', '39', '32', '74'],
      ],
    },
  },
  tt40805: {
    itemId: 'tt40805',
    name: '남성) 코튼 옥스포드 버튼다운 셔츠',
    price: '29,900',
    tags: ['상의', '탑텐', '셔츠'],
    image: 'http://assets.styleship.com/topten10/data/productImage/a/4/MSY3WC1901GN.jpg',
    url: 'http://www.topten10.co.kr/product/view.asp?productNo=40805',
    sizeTable: {
      sizeHeader: ['95', '100', '105', '110'],
      partSizeHeader: [
        '가슴둘레', '목깊이', '목넓이', '밑단둘레', '소매길이', '소매밑단(카우스)', '소매중통', '소매통', '암홀(A.H)', '총기장'
      ],
      sizes: [
        ['97', '8', '18.5', '87', '83.5', '19', '27', '34.5', '29', '68'],
        ['102', '8.5', '19', '92', '85', '20', '28', '36', '30', '70'],
        ['107', '9', '19.5', '97', '86.5', '21', '29', '37.5', '31', '72'],
        ['113', '9.5', '20', '103', '88', '22', '30', '39', '32', '74'],
      ],
    },
  },
  tt40716: {
    itemId: 'tt40716',
    name: '남성) 코튼 옥스포드 버튼다운 셔츠',
    price: '29,900',
    tags: ['상의', '탑텐', '티셔츠'],
    image: 'http://assets.styleship.com/topten10/data/productImage/a/4/MSY3TR1202BK.jpg',
    url: 'http://www.topten10.co.kr/product/view.asp?productNo=40716',
    sizeTable: {
      sizeHeader: ['95', '100', '105', '110'],
      partSizeHeader: [
        '가슴둘레', '목깊이', '목넓이', '밑단둘레', '소매길이', '소매밑단(카우스)', '소매중통', '소매통', '암홀(A.H)', '총기장'
      ],
      sizes: [
        ['97', '8', '18.5', '87', '83.5', '19', '27', '34.5', '29', '68'],
        ['102', '8.5', '19', '92', '85', '20', '28', '36', '30', '70'],
        ['107', '9', '19.5', '97', '86.5', '21', '29', '37.5', '31', '72'],
        ['113', '9.5', '20', '103', '88', '22', '30', '39', '32', '74'],
      ],
    },
  },
};

const reviewData = [
  {
    commentId: 'comment123',
    itemId: 'tt41213',
    rating: 3.5,
    writer: 'asdf',
    writerSize: [
      { text: '키', value: '177cm' },
      { text: '몸무게', value: '77kg'},
      { text: '가슴둘레', value: '103cm'},
    ],
    comment: '조금 큽니다',
  },
  {
    commentId: 'comment123',
    itemId: 'tt41213',
    rating: 4,
    writer: 'asdf',
    writerSize: [
      { text: '키', value: '177cm' },
      { text: '몸무게', value: '77kg'},
      { text: '가슴둘레', value: '103cm'},
    ],
    comment: '딱맞아요',
  },
  {
    commentId: 'comment123',
    itemId: 'tt41213',
    rating: 4.5,
    writer: 'asdf',
    writerSize: [
      { text: '키', value: '183cm' },
      { text: '몸무게', value: '79kg'},
      { text: '가슴둘레', value: '107cm'},
    ],
    comment: '딱맞습니다',
  },
  {
    commentId: 'comment123',
    itemId: 'tt41503',
    rating: 3.5,
    writer: 'asdf',
    writerSize: [
      { text: '키', value: '177cm' },
      { text: '몸무게', value: '77kg'},
      { text: '가슴둘레', value: '103cm'},
    ],
    comment: '적당해요',
  },
  {
    commentId: 'comment123',
    itemId: 'tt41503',
    rating: 4.5,
    writer: 'asdf',
    writerSize: [
      { text: '키', value: '177cm' },
      { text: '몸무게', value: '77kg'},
      { text: '가슴둘레', value: '103cm'},
    ],
    comment: '딱 맞습니다',
  },
];

router.get('/', (req, res) => {
  const { tagString, limit, offset } = req.query;
  const tags = tagString.split(',');
  // console.log(req.query);
  // console.log(req.params);
  // res.json(Object.keys(categories));
  res.json(Object.values(itemData).filter(item => {
    console.log(tags, item.tags);
    return tags.every(tag => item.tags.indexOf(tag) > -1);
  }));
});

router.get('/:itemId', (req, res) => {
  const { itemId } = req.params;
  const item = itemData[itemId];
  item.reviews = reviewData.filter(review => review.itemId == itemId);
  res.json(item);
});

module.exports = router;
