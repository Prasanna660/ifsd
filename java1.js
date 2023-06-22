const readline = require('readline');

class Student {
  constructor(name, cgpa) {
    this.name = name;
    this.cgpa = cgpa;
  }
}

class Class {
  constructor() {
    this.students = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  getStudentNames() {
    const names = [];
    for (let student of this.students) {
      names.push(student.name);
    }
    return names;
  }
}

function calculateAverageCGPA(student1, student2) {
  return (student1.cgpa + student2.cgpa) / 2;
}

function main() {
  const classA = new Class();
  const classB = new Class();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter the name of student 1: ', (name1) => {
    rl.question('Enter the CGPA of student 1: ', (cgpa1) => {
      rl.question('Enter the name of student 2: ', (name2) => {
        rl.question('Enter the CGPA of student 2: ', (cgpa2) => {
          // Create student objects
          const student1 = new Student(name1, parseFloat(cgpa1));
          const student2 = new Student(name2, parseFloat(cgpa2));

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

          rl.close();
        });
      });
    });
  });
}

// Call the main function
main();
