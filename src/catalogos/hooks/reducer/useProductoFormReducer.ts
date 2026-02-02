type TaskState = {
    selectedImage?: File,
    showNewCategoryModal: boolean,
    showNewSizeModal: boolean
}

type ActionType = {
    SET_IMAGE:'SET_IMAGE',
    OPEN_CATEGORY_MODAL:'OPEN_CATEGORY_MODAL',
    CLOSE_CATEGORY_MODAL:'CLOSE_CATEGORY_MODAL',
    OPEN_SIZE_MODAL:'OPEN_SIZE_MODAL',
    CLOSE_SIZE_MODAL:'CLOSE_SIZE_MODAL',
}

type TaskAction =
  | { type:ActionType['SET_IMAGE']; payload?: File }
  | { type:ActionType['OPEN_CATEGORY_MODAL'] }
  | { type:ActionType['CLOSE_CATEGORY_MODAL'] }
  | { type:ActionType['OPEN_SIZE_MODAL'] }
  | { type:ActionType['CLOSE_SIZE_MODAL'] };

  export const getTaskProductoFormInitialState = (): TaskState => {
    return {
        selectedImage: undefined,
        showNewCategoryModal: false,
        showNewSizeModal:false
    }
  }


  export const useProductoFormReducer =(state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
    case 'SET_IMAGE':
      return { ...state, selectedImage: action.payload };

    case 'OPEN_CATEGORY_MODAL':
      return { ...state, showNewCategoryModal: true };

    case 'CLOSE_CATEGORY_MODAL':
      return { ...state, showNewCategoryModal: false };

    case 'OPEN_SIZE_MODAL':
      return { ...state, showNewSizeModal: true };

    case 'CLOSE_SIZE_MODAL':
      return { ...state, showNewSizeModal: false };

    default:
      return state;
  }
  }