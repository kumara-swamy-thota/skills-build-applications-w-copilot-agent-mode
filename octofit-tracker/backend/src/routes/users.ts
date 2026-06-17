import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// GET all users
router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// GET user by id
router.get('/:id', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// POST create user
router.post('/', async (req: Request, res: Response) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ ...user.toObject(), password: undefined });
});

// PUT update user
router.put('/:id', async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

export default router;
