import { User } from './user.model';

export const me = (req, res) => {
	res.status(200).json({ data: req.user });
};

export const updateMe = async (req, res) => {
	try {
		if (req.body.settings) {
			const updateObj = {
				settings: req.body.settings
			};
			const user = await User.findByIdAndUpdate(
				req.user._id,
				updateObj,
				{
					new: true
				}
			)
				.lean()
				.exec();
			res.status(200).json({ data: user });
		} else {
			res.status(400).end();
		}
	} catch (e) {
		console.error(e);
		res.status(400).end();
	}
};
