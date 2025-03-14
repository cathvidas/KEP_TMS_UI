const validateUserDetails = (data, noValidation)=>{
    if(noValidation) return {isValid: true, errors: {}};
    let errors = {};
    let isValid = true;
    
    if(!data?.employeeBadge){
        errors.employeeBadge = "Badge No is required";
        isValid = false;
    }
    if(!data?.firstname){
        errors.firstname = "Firstname is required";
        isValid = false;
    }
    
    if(!data?.lastname){
        errors.lastname = "Lastname is required";
        isValid = false;
    }
    
    if(!data?.email){
        errors.email = "Email is required";
        isValid = false;
        // errors.emailFormat = "Invalid email format";
        // if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data?.email)){
        //     isValid = false;
        // }
    }
    if(data?.positionId === 0){
        errors.positionId = "Position is required";
        isValid = false;
    }
    if(data?.departmentId === 0){
        errors.departmentId = "Department is required";
        isValid = false;
    }
    if(!data?.superiorBadge){
        errors.superiorBadge = "This field is required";
        isValid = false;
    }
    if(data?.roleId === 0){
        errors.roleId = "User Type is required";
        isValid = false;
    }
    
    if(!data?.password){
        errors.password = "Password is required";
        isValid = false;
    }
    return {
        errors: errors,
        isValid: isValid
    }
    
}
export default validateUserDetails;