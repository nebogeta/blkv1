import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Expense } from '@/types/Expense';

type ExpensesState = Expense[];

const expensesReducer = (state: ExpensesState = [], action: { type: string; payload: Expense[] }): ExpensesState => {
    switch (action.type) {
        case 'SET_EXPENSES':
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    expenses: expensesReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

export default persistReducer(persistConfig, rootReducer);
