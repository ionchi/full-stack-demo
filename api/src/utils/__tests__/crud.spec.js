import {
	getOne,
	getMany,
	createOne,
	updateOne,
	removeOne
} from '../crud';
import { LibraryBook } from '../../resources/library-book/library-book.model';
import mongoose from 'mongoose';

describe('crud controllers', () => {
	// eslint-disable-next-line jest/valid-describe
	describe('getOne', async () => {
		test('finds by authenticated user and id', async () => {
			expect.assertions(2);

			const user = mongoose.Types.ObjectId();
			const book = mongoose.Types.ObjectId();
			const libraryBook = await LibraryBook.create({
				notes: 'notes',
				book: book,
				createdBy: user
			});

			const req = {
				params: {
					id: libraryBook._id
				},
				user: {
					_id: user
				}
			};

			const res = {
				status(status) {
					expect(status).toBe(200);
					return this;
				},
				json(result) {
					expect(result.data._id.toString()).toBe(libraryBook._id.toString());
				}
			};

			await getOne(LibraryBook, false)(req, res);
		});

		test('404 if no doc was found', async () => {
			expect.assertions(2);

			const user = mongoose.Types.ObjectId();

			const req = {
				params: {
					id: mongoose.Types.ObjectId()
				},
				user: {
					_id: user
				}
			};

			const res = {
				status(status) {
					expect(status).toBe(400);
					return this;
				},
				end() {
					expect(true).toBe(true);
				}
			};

			await getOne(LibraryBook, false)(req, res);
		});
	});

	describe('getMany', () => {
		test('finds array of docs by authenticated user', async () => {
			expect.assertions(4);

			const user = mongoose.Types.ObjectId();
			const book = mongoose.Types.ObjectId();
			const book1 = mongoose.Types.ObjectId();
			const book2 = mongoose.Types.ObjectId();
			await LibraryBook.create([
				{ notes: 'list', book: book, createdBy: user },
				{ notes: 'other', book: book1, createdBy: user },
				{ notes: 'list', book: book2, createdBy: mongoose.Types.ObjectId() }
			]);

			const req = {
				user: {
					_id: user
				}
			};

			const res = {
				status(status) {
					expect(status).toBe(200);
					return this;
				},
				json(result) {
					expect(result.data).toHaveLength(2);
					result.data.forEach((doc) =>
						expect(`${doc.createdBy}`).toBe(`${user}`)
					);
				}
			};

			await getMany(LibraryBook, false)(req, res);
		});
	});

	describe('createOne', () => {
		test('creates a new doc', async () => {
			expect.assertions(2);

			const user = mongoose.Types.ObjectId();
			const body = { notes: 'name', book: mongoose.Types.ObjectId() };

			const req = {
				user: { _id: user },
				body
			};

			const res = {
				status(status) {
					expect(status).toBe(201);
					return this;
				},
				json(results) {
					expect(results.data.book).toBe(body.book);
				}
			};

			await createOne(LibraryBook)(req, res);
		});

		test('createdBy should be the authenticated user', async () => {
			expect.assertions(2);

			const user = mongoose.Types.ObjectId();
			const body = { notes: 'name', book: mongoose.Types.ObjectId() };

			const req = {
				user: { _id: user },
				body
			};

			const res = {
				status(status) {
					expect(status).toBe(201);
					return this;
				},
				json(results) {
					expect(`${results.data.createdBy}`).toBe(`${user}`);
				}
			};

			await createOne(LibraryBook)(req, res);
		});
	});

	describe('updateOne', () => {
		test('finds doc by authenticated user and id to update', async () => {
			expect.assertions(3);

			const user = mongoose.Types.ObjectId();
			const libraryBook = await LibraryBook.create({
				notes: 'notes',
				book: mongoose.Types.ObjectId(),
				createdBy: user
			});
			const update = { notes: 'hello' };

			const req = {
				params: { id: libraryBook._id },
				user: { _id: user },
				body: update
			};

			const res = {
				status(status) {
					expect(status).toBe(200);
					return this;
				},
				json(results) {
					expect(`${results.data._id}`).toBe(`${libraryBook._id}`);
					expect(results.data.notes).toBe(update.notes);
				}
			};

			await updateOne(LibraryBook, false)(req, res);
		});

		test('400 if no doc', async () => {
			expect.assertions(2);

			const user = mongoose.Types.ObjectId();
			const update = { notes: 'hello', book: mongoose.Types.ObjectId() };

			const req = {
				params: { id: mongoose.Types.ObjectId() },
				user: { _id: user },
				body: update
			};

			const res = {
				status(status) {
					expect(status).toBe(400);
					return this;
				},
				end() {
					expect(true).toBe(true);
				}
			};

			await updateOne(LibraryBook, false)(req, res);
		});
	});

	describe('removeOne', () => {
		test('first doc by authenticated user and id to remove', async () => {
			expect.assertions(2);

			const user = mongoose.Types.ObjectId();
			const libraryBook = await LibraryBook.create({
				notes: 'name',
				book: mongoose.Types.ObjectId(),
				createdBy: user
			});

			const req = {
				params: { id: libraryBook._id },
				user: { _id: user }
			};

			const res = {
				status(status) {
					expect(status).toBe(200);
					return this;
				},
				json(results) {
					expect(`${results.data._id}`).toBe(`${libraryBook._id}`);
				}
			};

			await removeOne(LibraryBook, false)(req, res);
		});

		test('400 if no doc', async () => {
			expect.assertions(2);
			const user = mongoose.Types.ObjectId();

			const req = {
				params: { id: mongoose.Types.ObjectId() },
				user: { _id: user }
			};

			const res = {
				status(status) {
					expect(status).toBe(400);
					return this;
				},
				end() {
					expect(true).toBe(true);
				}
			};

			await removeOne(LibraryBook, false)(req, res);
		});
	});
});
