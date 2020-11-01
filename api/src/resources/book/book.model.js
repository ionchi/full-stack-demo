import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true
		},
		isbn13: {
			type: String,
			length: 13
		},
		isbn10: {
			type: String,
			length: 10
		},
		subtitle: String,
		authors: {
			type: Array,
			default: []
		},
		categories: String,
		thumbnail: String,
		description: String,
		published_year: Number,
		average_rating: Number,
		num_pages: Number,
		ratings_count: Number,
		createdBy: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'user'
		}
	},
	{ timestamps: true }
);

bookSchema.plugin(mongoosePaginate);
bookSchema.index({ isbn10: 1, title: 1 }, { unique: true });

export const Book = mongoose.model('book', bookSchema);
