const {Pool} = require("pg")
//using pool is better for web apps so that we can
//Check out this video I discuss this in details
//https://www.youtube.com/watch?v=GTeCtIoV2Tw
const express = require("express")
const app = express()
app.use(express.json())
let pool; 

app.delete("/todos", async (req, res) => {
    const {id} = req.body;  
    const result = await deleteTodo(id)
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify({result: result}))

})
app.post("/todos", async (req, res) => {
     
    const todoText = req.body;
    const result = await create(todoText.todoText)
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify({result: result}))
})
app.get("/todos", async (req,res) => {
    res.setHeader("content-type", "application/json")
    const rows = await query()
    res.send(JSON.stringify(rows))
})
app.listen(8080, () => console.log("listening "))
async function query () {
    const res = await client.query("select id, text from todos")
    return res.rows; 
}
async function connect () {
try {

    pool = new Pool({
        "host" : "husseinmac",
        "user": "postgres",
        "password": "postgres",
        "database": "todo",
        "port" : 5432
    })
   
}
catch(e)
{
    console.error(e)

}
}



async function deleteTodo(todoId) {
    try {

        await pool.query(`DELETE FROM TODOS where id = $1`, [todoId] )
        return true
    }
    catch (e){
        return false;
    }
}

async function create(todoText) {
    try {

        await pool.query(`INSERT INTO TODOS (text) VALUES ('${todoText}')`)
        return true
    }
    catch (e){
        return false;
    }
}
connect();
query();