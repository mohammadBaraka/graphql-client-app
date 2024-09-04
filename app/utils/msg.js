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
