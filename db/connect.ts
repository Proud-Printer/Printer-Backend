import mongoose from 'mongoose';

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(
      `Database connected ${process.env.MONGO_URI}.cyan.underline.bold`
    );
  } catch (error) {
    console.log(error);
  }
};
