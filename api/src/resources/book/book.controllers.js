import { Book } from './book.model';

export const getOne = async (req, res) => {
	try {
		const findOptions = {
			_id: req.params.id
		};
		const doc = await Book
			.findOne(findOptions)
			.lean()
			.exec();

		if (!doc) {
			return res.status(400).end();
		}

		res.status(200).json({ data: doc });
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

const getMany = async (req, res) => {
	try {
		const findOptions = {};
		if (req.query.search) {
			findOptions.title = new RegExp(`${req.query.search}`, 'i');
		}
		const queryOptions = {
			sort: { title: 1 },
			offset: 0,
			limit: 20,
			lean: true
		};
		const sortProperty = req.query.sortProperty;
		if (sortProperty) {
			queryOptions.sort = { sortProperty: 1 };
		}
		if (req.query.offset) {
			queryOptions.offset = req.query.offset;
		}
		if (req.query.limit) {
			queryOptions.limit = req.query.limit;
		}
		if (req.query.order && (req.query.order === 'asc' || req.query.order === 'desc')) {
			if (sortProperty) {
				queryOptions.sort[sortProperty] = req.query.order === 'asc' ? 1 : -1;
			} else {
				queryOptions.sort.title = req.query.order === 'asc' ? 1 : -1;
			}
		}

		const docs = await Book
			.paginate(findOptions, queryOptions);

		res.status(200).json({ data: docs });
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

const createOne = async (req, res) => {
	const createdBy = req.user._id;
	try {
		const doc = await Book.create({ ...req.body, createdBy });
		res.status(201).json({ data: doc });
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

const updateOne = async (req, res) => {
	try {
		const findOptions = {
			_id: req.params.id
		};
		const updatedDoc = await Book
			.findOneAndUpdate(
				findOptions,
				req.body,
				{ new: true }
			)
			.lean()
			.exec();

		if (!updatedDoc) {
			return res.status(400).end();
		}

		res.status(200).json({ data: updatedDoc });
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

const removeOne = async (req, res) => {
	try {
		const removeConditions = {
			_id: req.params.id
		};
		const removed = await Book.findOneAndRemove(removeConditions);

		if (!removed) {
			return res.status(400).end();
		}

		return res.status(200).json({ data: removed });
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

export default {
	removeOne,
	updateOne,
	getMany,
	getOne,
	createOne
};
