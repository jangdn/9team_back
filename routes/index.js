module.exports = function(app, product)
{
    
    app.get('/api/tags', function(req,res){
        res.json({result : ["top", "pants", "shoes", "outer", "hat"]});
    });

    //POST TEST
    app.post('/posttest', function(req,res){
        res.json({send : 'post success'});
    });

    //GET TEST
    app.get('/gettest', function(req,res){
        res.json({send : 'get success'});
    });

    // PRODUCT SAVE
    app.post('/api/product', function(req, res){
        var structure_product = new product();
        structure_product.image = req.body.image;
        structure_product.size = req.body.size;
        structure_product.sold_out = req.body.sold_out;
        structure_product.page_link = req.body.page_link;
        //api_product.tag = new tag(req.body.tag);
        
        //성공 1, 실패 0 출력
        structure_product.save(function(err){
            if(err)
            {
                console.error(err);
                res.json({result:0});
                return;
            }
    
            res.json({result:1});
        });
    });

    // GET ALL PRODUCT
    app.get('/api/product', function(req,res){
        product.find(function(err, api_product){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(api_product);
        });
    });

    // GET SINGLE PRODUCT
    app.get('/api/product/:product_id', function(req, res){
        product.findOne({_id: req.params.product_id}, function(err, api_product){
            if(err) return res.status(500).json({error: err});
            if(!api_product) return res.status(404).json({error: 'book not found'});
            res.json(api_product);
        })
    });

    // GET PRODUCT BY CATEGORY
    app.get('/api/product/category/:category', function(req, res){
        res.end();
    });

    // CREATE PRODUCT
    app.post('/api/product', function(req, res){
        res.end();
    });

    // UPDATE THE BOOK
    app.put('/api/product/:product_id', function(req, res){
        res.end();
    });

    // DELETE BOOK
    app.delete('/api/product/:product_id', function(req, res){
        res.end();
    });

}