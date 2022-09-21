const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const mongoose = require("mongoose");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app, path: "/truly" });

  app.use((req, res) => {
    res.send("Hello form express apollo server");
  });

  await mongoose.connect("mongodb://localhost:27017/post_db", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("Mongoose connected");

  app.listen(4600, () => console.log("Server start....!!"));
}

startServer();
