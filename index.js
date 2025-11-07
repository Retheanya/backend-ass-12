const express=require("express");
const mongoose=require("mongoose");
const Item=require("./model/Item.js");
const app=express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/b22")
           .then(()=>console.log("mongodb connected"))
           .catch((e)=>console.log(e));

         
  app.post("/save", async (req, res) => {
  try {
    const itm = new Item(req.body);
    const result = await itm.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});
        app.get("/view",async(req,res)=>{
           const itm=await Item.find();
         res.send(itm)
})
      app.put("/update/:eid", async (req, res) => {
      const itm = await Item.updateOne({eid:req.params.eid}, req.body, { new: true });
      res.send(itm);
});

    app.delete("/delete/:eid", async (req, res) => {
    const itm = await Item.deleteOne({eid:req.params.eid},req.body, {new:true});
    res.send(itm);
});  

app.listen(4000,()=>{console.log('server running succesfully')})






















