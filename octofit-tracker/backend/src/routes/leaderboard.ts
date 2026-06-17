import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

// GET leaderboard (sorted by score desc)
router.get('/', async (_req: Request, res: Response) => {
  const entries = await Leaderboard.find().sort({ score: -1 }).populate('user', '-password');
  res.json(entries);
});

// GET leaderboard entry by id
router.get('/:id', async (req: Request, res: Response) => {
  const entry = await Leaderboard.findById(req.params.id).populate('user', '-password');
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  res.json(entry);
});

// POST create/update score
router.post('/', async (req: Request, res: Response) => {
  const entry = new Leaderboard({ ...req.body, updatedAt: new Date() });
  await entry.save();
  res.status(201).json(entry);
});

// PUT update score
router.put('/:id', async (req: Request, res: Response) => {
  const entry = await Leaderboard.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: new Date() },
    { new: true }
  );
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  res.json(entry);
});

// DELETE leaderboard entry
router.delete('/:id', async (req: Request, res: Response) => {
  await Leaderboard.findByIdAndDelete(req.params.id);
  res.json({ message: 'Leaderboard entry deleted' });
});

export default router;
