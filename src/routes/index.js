const express = require('express');
const router = express.Router();
const pool = require('../database');
router.get('/', async (req, res) => {
    res.render('index');
});


router.get('/users/:page', async(req,res,next)=>{
    const perpage = 2;
    const page= req.params.page || 1;
    const offset = (perpage * page) - perpage;
    const results =  await pool.query("select * from users limit "+perpage+" OFFSET "+offset)
    const count = await pool.query("Select count(*) as total from users")

 const count2 =JSON.parse(JSON.stringify(count[0]['total']))
   const paginas = Math.ceil(count2/perpage);


    
    if(count2 > 0 ){
        console.log(JSON.parse(JSON.stringify(results)))
      
        console.log('offset: '+offset)
        console.log('total de paginas: '+count[0]['total'])
      
        res.render('users/user',{results,page,paginas})
    }
})

module.exports = router;