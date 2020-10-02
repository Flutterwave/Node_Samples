import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/signin', userController.LoginUser);
router.post('/get-grops', userController.GetGroups);
router.post('/add-grops', userController.AddGroups);
router.post('/get-members', userController.GetMembers);
router.post('/add-members', userController.AddMember);

export default router;
