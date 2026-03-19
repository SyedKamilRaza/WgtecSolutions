import Swal from "sweetalert2";

export const deleteConfirm = async ({
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  confirmButtonText = "Delete",
}) => {
  return await Swal.fire({
    title,
    text,
    icon: "warning",

    background: "#2A2A2A",
    color: "#FFFFFF",
    iconColor: "#ffca28",

    showCancelButton: true,
    confirmButtonColor: "#8CE600",
    cancelButtonColor: "#8CE600",

    confirmButtonText,
    cancelButtonText: "Cancel",

    buttonsStyling: true,
  });
};
