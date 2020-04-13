
import { toast } from 'react-toastify';

export const toastError = (statement, msg) => {
  if (!statement) {
    toast.error(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

export const toastSuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};
