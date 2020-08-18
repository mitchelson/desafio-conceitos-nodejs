const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {

  const { title, url, techs }  = request.body;
  
  const repository = {
      id:uuid(), 
      title, 
      url, 
      techs, 
      likes:0
    }
  
  repositories.push(repository);
  
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params;
  const { title, url, techs }  = request.body;

  const repositorieIndex = repositories.findIndex(repository => repository.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: "Project Not Found"})
  }

  repositories[repositorieIndex] = {
    id,
    title,
    url,
    techs, 
    likes: repositories[repositorieIndex].likes
  };
  return response.json(repositories[repositorieIndex]);
  
});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repository => repository.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: "Project Not Found"})
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repository => repository.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: "Project Not Found"})
  }
  const like = repositories[repositorieIndex].likes + 1;

  repositories[repositorieIndex].likes = like
  
  return response.json(repositories[repositorieIndex])
});

module.exports = app;
