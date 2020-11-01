export const getOne = (model, isPublic) => async (req, res) => {
	try {
		const findOptions = {
			_id: req.params.id
		};
		if (!isPublic) {
			findOptions.createdBy = req.user._id;
		}
		const doc = await model
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

export const getMany = (model, isPublic, sortProperty) => async (req, res) => {
	try {
		const findOptions = {};
		if (!isPublic) {
			findOptions.createdBy = req.user._id;
		}
		if (req.query.search) {
			findOptions.title = new RegExp(`${req.query.search}`, 'i');
		}
		const queryOptions = {
			offset: 0,
			limit: 20,
			lean: true,
			populate: 'createdBy'
		};
		if (sortProperty) {
			queryOptions.sort = { sortProperty: 1 };
		}
		if (req.query.offset) {
			queryOptions.offset = req.query.offset;
		}
		if (req.query.limit) {
			queryOptions.limit = req.query.limit;
		}
		if (req.query.order && sortProperty && (req.query.order === 'asc' || req.query.order === 'desc')) {
			queryOptions.sort[sortProperty] = req.query.order === 'asc' ? 1 : -1;
		}

		const docs = await model
			.paginate(findOptions, queryOptions);

		res.status(200).json({ data: docs });
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

export const createOne = (model) => async (req, res) => {
	const createdBy = req.user._id;
	try {
		const doc = await model.create({ ...req.body, createdBy });
		res.status(201).json({ data: doc });
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

export const updateOne = (model, isPublic) => async (req, res) => {
	try {
		const findOptions = {
			_id: req.params.id
		};
		if (!isPublic) {
			findOptions.createdBy = req.user._id;
		}
		const updatedDoc = await model
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

export const removeOne = (model, isPublic) => async (req, res) => {
	try {
		const removeConditions = {
			_id: req.params.id
		};
		if (!isPublic) {
			removeConditions.createdBy = req.user._id;
		}
		const removed = await model.findOneAndRemove(removeConditions);

		if (!removed) {
			return res.status(400).end();
		}

		return res.status(200).json({ data: removed });
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};

export const crudControllers = (model, isPublic) => ({
	removeOne: removeOne(model, isPublic),
	updateOne: updateOne(model, isPublic),
	getMany: getMany(model, isPublic),
	getOne: getOne(model, isPublic),
	createOne: createOne(model)
});
