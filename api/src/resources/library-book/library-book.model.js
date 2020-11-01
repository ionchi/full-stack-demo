import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const libraryBookSchema = new mongoose.Schema(
	{
		notes: String,
		bookTitle: {
			type: String,
			required: true
		},
		book: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'book',
			required: true
		},
		createdBy: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'user',
			required: true
		}
	},
	{ timestamps: true }
);

libraryBookSchema.plugin(mongoosePaginate);
libraryBookSchema.index({ user: 1, book: 1 }, { unique: true });

export const LibraryBook = mongoose.model('libraryBook', libraryBookSchema);


