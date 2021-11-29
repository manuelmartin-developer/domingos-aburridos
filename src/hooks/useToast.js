import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position: "bottom-left",
    showConfirmButton: false,
    timer: 7000,
    timerProgressBar: true,
  });