import { Router } from 'express';
import controllers from './library-book.controllers';

const router = Router();

// /api/library
router
	.route('/')
	.get(controllers.getMany)
	.post(controllers.createOne);

// /api/library/:id
router
	.route('/:id')
	.get(controllers.getOne)
	.put(controllers.updateOne)
	.delete(controllers.removeOne);

// /api/library/book/:id
router
	.route('/book/:bookId')
	.get(controllers.getOneByProperty);

export default router;
