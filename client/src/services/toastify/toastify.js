
import { toast } from 'react-toastify';

export const toastError = (statement, msg) => {
  if (!statement) {
    toast.error(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const toastSuccess = (statement, msg) => {
  if (!statement) {
    toast.success(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};
