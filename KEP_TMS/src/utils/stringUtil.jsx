export const checkIfNullOrEmpty = (stringData)=>{
    if(stringData){
      return true
    }
    return false
  }

export const extractChanges = (data)=>{
  let parts = data?.split(" -> ");
  // Access the desired value from the resulting array
  let fromValue = parts[0]?.trim()?.split("From:")[1]?.trim();
  let toValue = parts[1]?.trim()?.split("To:")[1]?.trim();
  return {
    fromValue,
    toValue
  }
}