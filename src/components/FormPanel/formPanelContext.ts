import { createContext } from 'react';

interface FormPanelContextData {
  formState: {
    data: any;
    errors: any;
  };
  formDispatch: ({ type, payload }: { type: string; payload: any }) => void;
}

const FormPanelContext = createContext({} as FormPanelContextData);

export default FormPanelContext;
