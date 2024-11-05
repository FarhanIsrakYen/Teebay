import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import express from 'express';
import rateLimit from "express-rate-limit";
import helmet from 'helmet';
import resolvers from "../backend/app/resolvers/resolvers.js";
import typeDefs from "../backend/app/schema/typeDefs.js";
import { JWT_KEY, MAX_JSON_SIZE, REQUEST_LIMIT_TIME, REQUEST_NUMBER, URL_ENCODE, WEB_CACHE } from "./app/configs/config.js";
import { connection } from "./app/postgres/postgres.js";

const app = express();

app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());
app.use(cookieParser());

const limiter = rateLimit({windowMs:REQUEST_LIMIT_TIME, max: REQUEST_NUMBER})
app.use(limiter)

app.set('etag', WEB_CACHE)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.token;
    try {
      const { userId } = jwt.verify(token, JWT_KEY);
      return { userId };
    } catch {
      return {};
    }
  },
});

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000/graphql`)
  );
});

connection();