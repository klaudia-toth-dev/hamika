export const getAllItemsReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "GET_ITEMS_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_ITEMS_SUCCESS":
      return {
        loading: false,
        items: action.payload,
      };
    case "GET_ITEMS_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const getItemByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ITEMBYID_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "GET_ITEMBYID_SUCCESS":
      return {
        loading: false,
        item: action.payload,
      };
    case "GET_ITEMBYID_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export const addItemReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ITEM_REQUEST":
      return {
        loading: true,
        ...state,
      };
    case "ADD_ITEM_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "ADD_ITEM_FAILED":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export const editItemReducer = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_ITEM_REQUEST":
      return {
        editLoading: true,
        ...state,
      };
    case "EDIT_ITEM_SUCCESS":
      return {
        editLoading: false,
        editSuccess: true,
      };
    case "EDIT_ITEM_FAILED":
      return {
        editError: action.payload,
        editLoading: false,
      };
    default:
      return state;
  }
};
