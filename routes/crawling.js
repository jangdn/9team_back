const request = require('request');
const cheerio = require('cheerio');
//const Item = require('./model/model_items')
//var mongoose = require('mongoose');

//현재 Tops만
cNo_list=[182,282,283,255,185,186,188,194,195,196,197,256,257,291,240,239,238,237,236];
page_list=[1,2,1,8,3,3,3,1,1,1,0,1,1,1,2,1,1,3,1];

function makeURL(cNo, page){
    var categoryUrl = "http://www.topten10.co.kr/product/list.asp";
    return categoryUrl+"?cNo="+cNo+"&page="+page;
}

async function crawlPage(url){
    request(url, function(error, response, body){
        var baseurl = "http://www.topten10.co.kr"
        const $ = cheerio.load(body);
        const gphoto = $('.goods_list');
        const categories = $('.container_12').find('a').contents();
        var index=0;
        gphoto.find('li').each(function(){
            dic={}
            const productUrl = baseurl+$(this).find('.name').find('a').attr('href');
            const name = $(this).find('.name').find('a').text();
            dic['name']=name;
            dic['link']=productUrl;
            dic['brand']='Topten';
            dic['main_ctg']=categories[2].data;
            dic['sub_ctg']=categories[3].data;
            const imglink = baseurl+$(this).find('img').attr('src');
            const price = $(this).find('.sale_price').text();
            dic['image_link']=imglink;
            dic['price']=price;
            dic=fitCategory(dic);
            colors=[]
            var i=0;
            $(this).find('.g_color').find('a').each(function(){
                colors[i]=baseurl+$(this).attr('href');
                i++;
            })
            dic['otherColorsImage']=colors;
            saveDB(dic);
            console.log(dic);
            index++;
        })
        return;
    });
}

function saveDB(dic){
    var add_item = new Item();
    const randomstring = require("randomstring");
    add_item.itemId=randomstring.generate(10);
    add_item.name=dic['name'];
    add_item.price=dic['price'];
    add_item.link=dic['link'];
    add_item.image_link=dic['image_link'];
    add_item.main_ctg=dic['main_ctg'];
    add_item.sub_ctg=dic['sub_ctg'];
    //add_item.color=dic['color'];
    add_item.tags.push(itemData[i].brand);
    add_item.tags.push(itemData[i].main_ctg);
    add_item.tags.push(itemData[i].sub_ctg);
    //for(var j = 0; j< itemData[i].color.length; j++)
        //add_item.tags.push(itemData[i].color[j]);
    add_item.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));
      res.json({result:1});
}

function fitCategory(dic){
    if(dic["sub_ctg"]=="신발"){
        dic["main_ctg"]="신발";
        if(dic["name"].match("스니커즈")=="스니커즈"){
            dic["sub_ctg"]="스니커즈";
        }
        else if(dic["name"].match("슬립온")=="슬립온"){
            dic["sub_ctg"]="슬립온";
        }
        else{
            dic["sub_ctg"]="기타";
        }
    }
    else if(dic["main_ctg"]=="TOPS"){
        dic["main_ctg"]="상의";
        if(dic["sub_ctg"].match("스웨터")=="스웨터"){
            dic["sub_ctg"]="스웨터";
        }
        else if(dic["sub_ctg"].match("후드")=="후드"){
            dic["sub_ctg"]="후드";
        }
    }
    else if(dic["main_ctg"]=="BOTTOMS"){
        dic["main_ctg"]="하의";
        if((dic["sub_ctg"].match("치노")=="치노")||(dic["sub_ctg"].match("팬츠")=="팬츠")){
            dic["sub_ctg"]="팬츠"
        }
    }
    else if(dic["main_ctg"]=="OUTER"){
        dic["main_ctg"]="아우터";
        if(dic["name"].match("가죽")=="가죽"){
            dic["sub_ctg"]="가죽";
        }
    }
    else{
        dic["main_ctg"]="기타";
        if(dic["name"].match("넥타이")=="넥타이"){
            dic["sub_ctg"]="넥타이";
        }
        else if(dic["name"].match("밸트")=="밸트"){
            dic["sub_ctg"]="밸트";
        }
        else if(dic["name"].match("모자")=="모자"){
            dic["sub_ctg"]="모자";
        }
        else{
            dic["sub_ctg"]="기타";
        }
    }
    return dic;
}


//모든 카테고리에 대해
for(var i=0;i<cNo_list.length;i++){
    //그 카테고리의 모든 페이지에 대해
    for (var j=1; j<=page_list[i];j++){
        crawlPage(makeURL(cNo_list[i],j));
    }
}