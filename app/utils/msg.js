import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const msg = (icon, msg) => {
  Swal.fire({
    position: "top-end",
    icon: icon,
    title: msg,
    showConfirmButton: false,
    timer: 2000,
  });
};

// export const msgConfirm = (text, fun) => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: text,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       fun();
//     }
//   });
// };

export const msgSucess = (msg) => {
  toast.success(msg);
};
export const msgError = (msg) => {
  toast.error(msg);
};
