import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

// GET all activities
router.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user', '-password');
  res.json(activities);
});

// GET activity by id
router.get('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findById(req.params.id).populate('user', '-password');
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json(activity);
});

// POST log activity
router.post('/', async (req: Request, res: Response) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  res.json(activity);
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  await Activity.findByIdAndDelete(req.params.id);
  res.json({ message: 'Activity deleted' });
});

export default router;
