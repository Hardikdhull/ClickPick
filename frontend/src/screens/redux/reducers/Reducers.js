import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
} from '../ActionTypes';

export const Reducers = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        // Item already exists in the cart, update quantity
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }

      // Item doesn't exist in the cart, add it
      return [...state, { ...action.payload, quantity: 1 }];

      case REMOVE_FROM_CART:
        const updatedCart = state.map(item => {
          if (item.id === action.payload && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
  
        return updatedCart.filter(item => item.quantity !== 0);
  
      default:
        return state;
  }
};

