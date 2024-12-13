import express  from "express";

const app = express()
const port = 8000

app.use(express.json())

let teaData = []
let nextId = 1


//add new tea
app.post('/teas',(req, res)=>{
    const {name,price} = req.body
    const newTea = {
        id: nextId++,
        name,
        price
    }
    teaData.push(newTea)
    res.status(200).send(newTea)
})

app.get('/teas',(req, res)=>{
    res.status(200).send(teaData)

})

//get new tea
app.get('/teas/:id',(req, res)=>{
    const tea = teaData.find(t=> t.id === parseInt(req.params.id))
    if (!tea){
        res.status(404).send("tea not found")
    } else{
        res.status(202).send(tea)
    }
    

})

//update
app.put("/teas/:id",(req,res)=>{
    const tea = teaData.find(t=> t.id === parseInt(req.params.id))
    if (!tea){
        res.status(404).send("tea not found")
    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.status(202).send(tea)


})

//delete
app.delete("/teas/:id",(req,res)=>{
    
    const teaIndex = teaData.findIndex(t=> t.id === parseInt(req.params.id))
    // console.log(teaData, teaIndex);
    if (teaIndex === -1){
        return res.status(404).send("tea not found")
    } 
    teaData.splice(teaIndex, 1)
    res.status(202).send(teaData)

    



})


// app.get("/",(req,res)=>{
//     res.send("hi server connected")
// })

// app.get("/about",(req,res)=>{
//     res.send("hi server connected- about")
// })




app.listen(port,()=>{
    console.log(`Server is listening on port: ${port}`);
})