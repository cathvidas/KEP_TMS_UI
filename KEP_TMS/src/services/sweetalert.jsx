import Swal from "sweetalert2";

export const confirmAction = (actionFunction) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Submit",
  }).then((result) => {
    if (result.isConfirmed) {
        actionFunction();
      return true;
    }else{
        return false;}
  });
};

export const actionDelay = () => {
    Swal.fire({
        title: 'Please wait',
        text: 'This action will take some time.',
        icon: 'info',
        showConfirmButton: false,
        timer: 3000
    });
}

export const actionSuccessful = (title, text) => {
    Swal.fire({
        title,
        text,
        icon: "success",
        timer: 2000
    });
}

export const actionFailed = (title, text) => {
    Swal.fire({
        title,
        text,
        icon: "error",
        timer: 5000
    });
}