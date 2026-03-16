
let person = {
    name: "Ali",
    age: 22,
    gender: "male"
}

// from the user the update
const updates = {
    gender: "female"
}

person = { ...person, ...updates }
console.log(person);
