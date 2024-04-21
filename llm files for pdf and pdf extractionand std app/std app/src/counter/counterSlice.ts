import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

interface TodoData {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface ProductData {
  [x: string]: any;
  id: string;
  name: string;
  price: number;
}

interface CounterState {
  value: number;
  todoData: TodoData | null;
  productData: ProductData | null;
  loadingTodo: boolean;
  loadingProduct: boolean;
}

const initialState: CounterState = {
  value: 0,
  todoData: null,
  productData: null,
  loadingTodo: false,
  loadingProduct: false,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setTodoData: (state, action: PayloadAction<TodoData>) => {
      state.todoData = action.payload;
    },
    setProductData: (state, action: PayloadAction<ProductData>) => {
      state.productData = action.payload;
    },
    setLoadingTodo: (state, action: PayloadAction<boolean>) => {
      state.loadingTodo = action.payload;
    },
    setLoadingProduct: (state, action: PayloadAction<boolean>) => {
      state.loadingProduct = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  setTodoData,
  setProductData,
  setLoadingTodo,
  setLoadingProduct,
} = counterSlice.actions;

export const fetchTodoData = () => async (dispatch: any) => {
  dispatch(setLoadingTodo(true));
  try {
    const response = await axios.get<TodoData>(
      "https://jsonplaceholder.typicode.com/todos/1"
      );
      console.log(response.data);
    dispatch(setTodoData(response.data));
    dispatch(setLoadingTodo(false));
  } catch (error) {
    console.error("Error fetching todo data: ", error);
    dispatch(setLoadingTodo(false));
  }
};

export const fetchProductData = () => async (dispatch: any) => {
  dispatch(setLoadingProduct(true));
  try {
    const response = await axios.get<ProductData>(
      "https://dummyjson.com/products/1"
    );
    
    dispatch(setProductData(response.data));
    dispatch(setLoadingProduct(false));
  } catch (error) {
    console.error("Error fetching product data: ", error);
    dispatch(setLoadingProduct(false));
  }
};

export const selectCount = (state: RootState) => state.counter.value;
export const selectTodoData = (state: RootState) => state.counter.todoData;
export const selectProductData = (state: RootState) =>
  state.counter.productData;
export const selectLoadingTodo = (state: RootState) =>
  state.counter.loadingTodo;
export const selectLoadingProduct = (state: RootState) =>
  state.counter.loadingProduct;

export default counterSlice.reducer;
