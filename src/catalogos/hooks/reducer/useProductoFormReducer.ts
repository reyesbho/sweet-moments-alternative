import type { Size } from '@/interfaces/producto';

type TaskState = {
    selectedImage?: File,
    showNewCategoryModal: boolean,
    showNewSizeModal: boolean,
    editingSize: Size | null,
}

type ActionType = {
    SET_IMAGE:'SET_IMAGE',
    OPEN_CATEGORY_MODAL:'OPEN_CATEGORY_MODAL',
    CLOSE_CATEGORY_MODAL:'CLOSE_CATEGORY_MODAL',
    OPEN_SIZE_MODAL:'OPEN_SIZE_MODAL',
    CLOSE_SIZE_MODAL:'CLOSE_SIZE_MODAL',
    OPEN_SIZE_MODAL_EDIT:'OPEN_SIZE_MODAL_EDIT',
}

type TaskAction =
  | { type:ActionType['SET_IMAGE']; payload?: File }
  | { type:ActionType['OPEN_CATEGORY_MODAL'] }
  | { type:ActionType['CLOSE_CATEGORY_MODAL'] }
  | { type:ActionType['OPEN_SIZE_MODAL'] }
  | { type:ActionType['CLOSE_SIZE_MODAL'] }
  | { type:ActionType['OPEN_SIZE_MODAL_EDIT']; payload: Size };

  export const getTaskProductoFormInitialState = (): TaskState => {
    return {
        selectedImage: undefined,
        showNewCategoryModal: false,
        showNewSizeModal: false,
        editingSize: null,
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
      return { ...state, showNewSizeModal: true, editingSize: null };

    case 'OPEN_SIZE_MODAL_EDIT':
      return { ...state, showNewSizeModal: true, editingSize: action.payload };

    case 'CLOSE_SIZE_MODAL':
      return { ...state, showNewSizeModal: false, editingSize: null };

    default:
      return state;
  }
  }