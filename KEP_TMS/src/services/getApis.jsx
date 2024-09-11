import axios from "axios"

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
export const SampleExamQuestionaire =()=>{
    return[{
        question: "What is the capital of France?",
        options: ["Paris", "London", "Madrid", "Berlin"],
        answer: "Paris"
    }, {
        question: "Who is the current Prime Minister of the United Kingdom?",
        options: ["Theresa May", "David Cameron", "Boris Johnson", "David Corbyn"],
        answer: "David Cameron"
    }, {
        question: "What is the most famous song by Queen?",
        options: ["Bohemian Rhapsody", "We Will Rock You", "A Night at the Opera", "Bohemian Rhapsody"],
        answer: "Bohemian Rhapsody"
    }, {
        question: "Who wrote the novel 'Pride and Prejudice'?",
        options: ["Jane Austen", "Charles Dickens", "William Shakespeare", "George Orwell"],
        answer: "Jane Austen"
    }, {
        question: "What is the largest island in the world?",
        options: ["Greenland", "New Zealand", "Iceland", "Antarctica"],
        answer: "Greenland"
    },{
        question: "What is the tallest mountain in the world?",
        options: ["Mount Everest", "K2", "Mount Kilimanjaro", "Mount McKinley"],
        answer: "Mount Everest"
    },]
}

export const GetAllPrograms = async () =>{
    const response = await axios.get("http://localhost:5030/api/TrainingProgram/GetAllTrainingPrograms")
   return await response.data
} 

export const GetAllCategories = async () =>{
    const response = await axios.get("http://localhost:5030/api/TrainingCategory/GetAllTrainingCategories")
   return await response.data
} 
export const SampleOptions = ()=>{
    return [
    {
        value: 1,
        label: "Sample"
    },{
        value: 2,
        label: "Sample"
    }
]}

