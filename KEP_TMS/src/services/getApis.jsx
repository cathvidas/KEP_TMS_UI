export const GetEmployees =()=>{
    // return fetch('https://jsonplaceholder.typicode.com/users')
    // .then((response) => response.json())
    return [{
        id: 1,
        name: "John Doe",
        department: "HR"
    },{
        id: 2,
        name: "Jane Smith",
        department: "IT"
    },{
        id: 3,
        name: "Mike Johnson",
        department: "Finance"
    },{
        id: 4,
        name: "Sarah Brown",
        department: "Marketing"
    },{
        id: 5,
        name: "Tom Davis",
        department: "HR"
    },{
        id: 6,
        name: "Emily Wilson",
        department: "IT"
    },{
        id: 1,
        name: "John Doe",
        department: "HR"
    },{
        id: 2,
        name: "Jane Smith",
        department: "IT"
    },{
        id: 3,
        name: "Mike Johnson",
        department: "Finance"
    },{
        id: 4,
        name: "Sarah Brown",
        department: "Marketing"
    },{
        id: 5,
        name: "Tom Davis",
        department: "HR"
    },{
        id: 6,
        name: "Emily Wilson",
        department: "IT"
    },{
        id: 1,
        name: "John Doe",
        department: "HR"
    },{
        id: 2,
        name: "Jane Smith",
        department: "IT"
    },{
        id: 3,
        name: "Mike Johnson",
        department: "Finance"
    },{
        id: 4,
        name: "Sarah Brown",
        department: "Marketing"
    },{
        id: 5,
        name: "Tom Davis",
        department: "HR"
    },{
        id: 6,
        name: "Emily Wilson",
        department: "IT"
    }
]
}

export const GetDepartments =()=>{
    return [{
        id: 1,
        name: "HR"
    },{
        id: 2,
        name: "IT"
    },{
        id: 3,
        name: "Finance"
    },{
        id: 4,
        name: "Marketing"
    },{
        id: 5,
        name: "Admin"
    },{
        id: 6,
        name: "Engineering"
    }]
}
export const GetSchedule=()=>{
    return [{
        schedDate: "2024-12-12",
        timeIn: "20:12",
        timeOut: "09:7",
      }, 
    {
        schedDate: "2024-12-13",
        timeIn: "13:45",
        timeOut: "17:15",
      },{
        schedDate: "2024-12-14",
        timeIn: "10:00",
        timeOut: "14:30",
      }
    ]
}
export const SampleStringList=()=>{
    return ["Apple", "Orange", "Green", "Yellow"]
}