import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const Notification = {
  success: (title, message, position = 'topRight', timeout = 5000) => {
    iziToast.success({
      title,
      message,
      position,
      timeout,
    });
  },

  error: (title, message, position = 'topRight', timeout = 5000) => {
    iziToast.error({
      title,
      message,
      position,
      timeout,
    });
  },

  info: (title, message, position = 'topRight', timeout = 5000) => {
    iziToast.info({
      title,
      message,
      position,
      timeout,
    });
  },

  warning: (title, message, position = 'topRight', timeout = 5000) => {
    iziToast.warning({
      title,
      message,
      position,
      timeout,
    });
  },
};

export default Notification;