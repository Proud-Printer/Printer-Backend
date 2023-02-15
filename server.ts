// initializing server with express
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from 'mongoose';

// importing routes
import { userRouter } from './routes/user';

// initializing express
const app = express();

// initializing dotenv
dotenv.config();

// connecting to database
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/user', userRouter);

// listening to port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Path: routes/user.ts
