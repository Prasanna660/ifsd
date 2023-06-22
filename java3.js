const readline = require('readline');
const mongoose = require('mongoose');

// Define the Student schema
const studentSchema = new mongoose.Schema({
  name: String,
  cgpa: Number
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

class Class {
  constructor() {
    this.students = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  getStudentNames() {
    return this.students.map(student => student.name);
  }
}

function calculateAverageCGPA(student1, student2) {
  return (student1.cgpa + student2.cgpa) / 2;
}

async function main() {
  const classA = new Class();
  const classB = new Class();

  // MongoDB Connection URL
  const url = 'mongodb+srv://prasanna:FHbjcp0RgaZXyJCv@cluster0.2mkzkic.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'school';

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter the name of student 1: ', (name1) => {
    rl.question('Enter the CGPA of student 1: ', (cgpa1) => {
      rl.question('Enter the name of student 2: ', (name2) => {
        rl.question('Enter the CGPA of student 2: ', (cgpa2) => {
          // Create student objects
          const student1 = new Student({ name: name1, cgpa: parseFloat(cgpa1) });
          const student2 = new Student({ name: name2, cgpa: parseFloat(cgpa2) });

          // Add students to their respective classes
          classA.addStudent(student1);
          classB.addStudent(student2);

          // Get the student names
          const studentNamesA = classA.getStudentNames();
          const studentNamesB = classB.getStudentNames();

          console.log('Students in Class A:', studentNamesA);
          console.log('Students in Class B:', studentNamesB);

          // Calculate and display the average CGPA
          const averageCGPA = calculateAverageCGPA(student1, student2);
          console.log('Average CGPA:', averageCGPA);

          // Connect to MongoDB
          mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
              console.log('Connected to MongoDB');

              // Insert student data into MongoDB
              return Student.insertMany([student1, student2]);
            })
            .then(() => {
              console.log('Student data inserted successfully');

              // Close the MongoDB connection
              mongoose.connection.close();
              rl.close();
            })
            .catch((err) => {
              console.error('Failed to connect to MongoDB or insert student data:', err);
              rl.close();
            });
        });
      });
    });
  });
}

// Call the main function
main();
