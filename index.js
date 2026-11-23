const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI; // Reads my MongoDB connection details from .env

const PersonSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true 
    }, 
    age: Number, 
    gender: String, 
    salary: Number ,
    city: String // New field for the person's city
}); 
 
const Person = mongoose.model( 
    'modelname', 
    PersonSchema, 
    'personCollection' 
); 


// Function to insert one document 
async function insertOne() { 
 
    const doc1 = new Person({ 
        name: 'NHQ', 
        age: 32, 
        gender: 'Male', 
        salary: 1234 
    }); 
 
    const savedDoc = await doc1.save(); 
 
    console.log('One document inserted'); 
    console.log(savedDoc); 
}

// Function to insert many documents
async function insertMany() {

    const manypersons = [
        { name: 'SimonNHQ', age: 42, gender: 'Male', salary: 3456 },
        { name: 'NeeshaNN', age: 53, gender: 'Female', salary: 1000 },
        { name: 'MaryNHQ', age: 27, gender: 'Female', salary: 5402 },
        { name: 'MikeNJQ', age: 40, gender: 'Male', salary: 4519 }
    ];

    const result = await Person.insertMany(manypersons);

    console.log('Many documents inserted');
    console.log(result);
}

// Find all documents
async function findAll() {

    const docs = await Person.find({}) // Find all documents
        .sort({ salary: 1 }) // Sort by salary in ascending order
        .select('name salary age') // Select the required fields
        .limit(100); // Limit the results to 100 documents

    console.log("Showing multiple documents");

    docs.forEach(doc => {
        console.log(doc.age, doc.name, doc.salary);
    });
}


// Find females with age >= 30
async function findFemalesOver30() {

    const givenAge = 30; // Find females aged 30 or above

    const docs = await Person.find({
        gender: 'Female',
        age: { $gte: givenAge }
    })
    .sort({ salary: 1 })
    .select('name salary age')
    .limit(10);

    console.log(`Females aged ${givenAge} or above:`);

    docs.forEach(doc => {
        console.log(doc.age, doc.name, doc.salary);
    });
}


// Count all documents
async function countDocuments() {

    const count = await Person.countDocuments();

    console.log("Total Documents Count:", count);
}


// Delete all documents where age >= 45
async function deleteManyPersons() {

    const result = await Person.deleteMany({
        age: { $gte: 45 } // Find records aged 45 or above
    });

    console.log("Deleted documents:", result);
}


 // Update all females' salary to 5555
async function updateManyPersons() {

    const result = await Person.updateMany(
        { gender: "Female" },
        { salary: 5555 }
    );

    console.log("Update successful");
    console.log(result);
}

 // Insert three documents with city information
async function insertCityRecords() {
    const people = [
        { name: 'Aisha', age: 25, gender: 'Female', salary: 3000, city: 'London' },
        { name: 'Rahim', age: 30, gender: 'Male', salary: 3500, city: 'Manchester' },
        { name: 'Sara', age: 28, gender: 'Female', salary: 3200, city: 'London' }
    ];

    const result = await Person.insertMany(people);

    console.log('Three documents with city inserted');
    console.log(result);
}


// Find people from London
async function findPeopleByCity() {

    const givenCity = 'London'; // City to search for

    const docs = await Person.find({
        city: givenCity // Find records matching the selected city
    });

    console.log(`People from ${givenCity}:`);

    docs.forEach(doc => {
        console.log(doc.name, doc.age, doc.gender, doc.city);
    });
}

async function main() { 
 
    try { 
 
        await mongoose.connect(MONGO_URI); 
        console.log('Connected to MongoDB');
 
        
 
// await insertOne(); // Completed in Task 1
// await insertMany(); // Completed in Task 2
// await findAll(); // Completed in Task 3
// await findFemalesOver30(); // Completed in Task 4
// await countDocuments(); // Completed in Task 5
// await deleteManyPersons(); // Completed in Task 6
// await updateManyPersons(); // Completed in Task 7

// await insertCityRecords(); // Already completed in Portfolio Task 2
await findPeopleByCity(); // Display people from London


 
        } catch (err) { 
 
        console.error('Error:', err); 
 
    } finally { 
 
        await mongoose.connection.close(); 
        console.log('Connection closed'); 
 
    } 
} 
 
main();