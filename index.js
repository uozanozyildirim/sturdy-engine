//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var task = ["buy socks", "practise with nodejs"];
var complete = ["finish jquery"];

const { MongoClient } = require("mongodb");
const { empty } = require("statuses");
// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://uozanozyildirim:lfI6lEf55sUd127P@to-do-database.ky4ux0b.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const database = client.db('tasks');
const data = database.collection('data')
// Query for a movie that has the title 'Back to the Future'
const query = { age: '24' };

async function run() {
  try {
    // const movie = await movies.findOne(query);
    //  console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files

app.use(express.static("public"));




//post route for adding new task 
app.post("/addtask", function(req, res) {
  
    var newTask = req.body.newtask;

    try {

      task.push(newTask);
      newTask = JSON.stringify(newTask)
    
      MongoClient.connect(
        uri,
        { useNewUrlParser: true },
        (error, client) => {
          if (error) {
            return console.log('unable to connect to database');
          }
      
          const db = client.db('tasks');
      
          db.collection('data').insertOne({
            name: newTask
          });
        }
      );

      console.log(newTask);
      res.redirect("/");
    }
    catch(error) {
      console.log(error)
    }

}
  );

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //check if the completed task already exits in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", function(req, res) {


  try {

    MongoClient.connect(
      uri,
      { useNewUrlParser: true },
      (error, client) => {
        if (error) {
           return console.log('unable to connect to database');
        }
        
        var tmp;
        const db = client.db('tasks');
    
        const result = client.db("tasks").collection("data").findOne({ name: "umut ozan ozyildirim" });

        if (result) {
            console.log('Found a listing in the collection with the name');
            console.log(result);
        } else {
            console.log('No listings found with the name');
        }

      })
  
  }

  catch (error) {
    console.log(error)
  }


  res.render("index", { task: task, complete: complete });

})

//set app to listen on port 3000
app.listen(3000, function() {
    console.log("Server Is Started On Port 3000");
});