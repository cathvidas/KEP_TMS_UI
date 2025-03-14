import Swal from "sweetalert2";

export const confirmAction = (prop) => {
  Swal.fire({
    title: prop.title ??"Confirm Submission?",
    text: prop.text??"Are you sure you want to submit this form?",
    icon: prop.icon?? "warning",
    showCancelButton: !prop.hideCancelButton,
    confirmButtonColor: prop.confirmButtonColor?? "#3085d6",
    cancelButtonColor:prop.cancelButtonColor?? "#dcdcdc",
    confirmButtonText: prop.confirmButtonText??"Submit",
    cancelButtonText: prop.cancelButtonText??"Cancel",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      if(prop.showLoaderOnConfirm){
      actionDelay();}
      if(prop?.param){
        prop.onConfirm(prop?.param);
      }else{
        prop.onConfirm();
      }
      return true;
    }else{
        return false;}
  });
};

export const actionDelay = () => {
    Swal.fire({
        title: 'Please wait',
        text: 'This action will take some time.',
        showConfirmButton: false,
        // timer: 3000,
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen:  () => {
          Swal.showLoading()
        }

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
        // timer: 5000
    });
}