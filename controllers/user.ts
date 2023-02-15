// initializing controllers
import { Request, Response } from 'express';
import { User } from '../models/user';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { auth } from '../middlewares/auth';

// initializing controller
export const userController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({
        name,
        email,
        password,
      });
      res.status(200).json({
        success: true,
        message: 'User registered successfully',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'User registration failed',
        error: error.message,
      });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userExists = User.findByEmail(email);

      if (!userExists) {
        res.status(400).json({
          success: false,
          message: 'User not found',
        });
      }

      const isMatch = await compare(password, userExists.password);

      if (!isMatch) {
        res.status(400).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      const token = sign({ id: userExists._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'User login failed',
        error: error.message,
      });
    }
  },
  me: async (req: Request, res: Response) => {},
  logout: async (req: Request, res: Response) => {},
};
