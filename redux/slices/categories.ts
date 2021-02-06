import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getClient } from '../../constants/api';
import {
	getAllCategories,
	mutationCreateCategory,
	mutationDestroyCategory,
	mutationUpdateCategory,
} from '../querys/categories';

export interface ICategory {
	[key: string]: string | undefined;
	_id?: string;
	description_en: string;
	description_es: string;
}

interface IPayloadCategory {
	category: {
		description_en: string;
		description_es: string;
	};
	catId: string;
}

export const getCategories = createAsyncThunk(
	'category/getAll',
	async (lang) => {
		const client = getClient();
		const clientRequest = await client.request(getAllCategories);
		return { clientRequest, lang };
	}
);

export const destroyCategory = createAsyncThunk(
	'category/destroyCat',
	async (payload: string) => {
		const client = getClient();
		const clientRequest = await client.request(mutationDestroyCategory, {
			catId: payload,
		});
		return { id: payload, message: clientRequest.destroyCategory };
	}
);

export const createCategory = createAsyncThunk(
	'category/createOne',
	async (payload) => {
		const client = getClient();
		const clientRequest = await client.request(mutationCreateCategory, {
			category: payload,
		});
		return clientRequest;
	}
);
export const updateCategory = createAsyncThunk(
	'category/updateOne',
	async (payload: IPayloadCategory) => {
		const client = getClient();
		const clientRequest = await client.request(mutationUpdateCategory, {
			category: payload.category,
			catId: payload.catId,
		});
		return clientRequest;
	}
);

const categorySlice = createSlice({
	name: 'quiz',
	initialState: {
		categories: [],
		loading: false,
	},
	reducers: {
		sortCategories: (state, { payload }) => {
			state.categories = state.categories.sort((a, b) =>
				a[`description_${payload}`] > b[`description_${payload}`]
					? 1
					: -1
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCategories.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			getCategories.fulfilled,
			(state, { payload: { clientRequest, lang } }) => {
				state.categories = clientRequest.getCategories.sort(
					(a: ICategory, b: ICategory) =>
						(a[`description_${lang}`] as string) >
						(b[`description_${lang}`] as string)
							? 1
							: -1
				);
				state.loading = false;
			}
		);
		builder.addCase(destroyCategory.fulfilled, (state, { payload }) => {
			if (payload.message) {
				state.categories = state.categories.filter(
					(category: ICategory) => category._id !== payload.id
				);
			}
		});
	},
});

export const { sortCategories } = categorySlice.actions;

export default categorySlice.reducer;