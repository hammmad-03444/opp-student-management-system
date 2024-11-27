import inquirer from "inquirer";
import { log } from "util";
class Student {
    static value=10000;
    name:string;
    id:number;
    course:string[];
    balance:number;
    constructor(name:string) {
        this.id=Student.value++;
        this.name=name;
        this.course=[];
        this.balance=10000;
    }
    //Method for course and add it into our object
    enrolledCourse(courses:string){
        this.course.push(courses)
    }
    //Method to view student balance
    viewBalance(){
        console.log(`${this.balance}`);
    }
    //Method to pay fees
    payFees(fee:number){
        this.balance-=fee
        console.log(`Dear ${this.name},your ${this.course} course fee has been detucted successfully `);
        console.log(`Remaining Balance:$${this.balance}`);
        
        
    }
    //Method to get student status
    getStudentStatus(){
        console.log(`Name:${this.name}`);
        console.log(`ID:${this.id}`);
        console.log(`Course:${this.course}`);
        console.log(`Balance:${this.balance}`);
    }
}
class Student_manager{
    students:Student[]
    constructor(){
        this.students=[]
    }
    

    
    //Method to add students in our data base where we save every student data in an array
    addNewStudents(name:string){
         let newStudent=new Student(name)
         this.students.push(newStudent)
         console.log(`Student ${name} added sucessfully . Student ID:${newStudent.id}`);
         
    }
    //Method to enroll student to a course
    enroll_student(id:number,course:string){
        let student=this.students.find(std=>std.id===id)     //let student=this.find_student(id) we can also use this if we make a method to find the student
        if(student){
            student.enrolledCourse(course)
        console.log(`${student.name} has enrolled in ${course}`);
    
        }else{
            console.log(`student not found`);
            
        }}
        
        //Method to view student balance
        view_student_balance(id:number){
        let student=this.students.find(std=>std.id===id)      //let student=this.find_student(id) we can also use this if we make a method to find the student
        if(student){
            student.viewBalance()
        }
        else{
            console.log(`student not found`);
        }
    }
    
    //Method to pay fees
    pay_fees (id:number,fee:number){
        let student=this.students.find(std=>std.id===id)      //let student=this.find_student(id) we can also use this if we make a method to find the student
        if(student){
            student.payFees(fee)
        }
        else{
            console.log(`student not found`);
        }
    }
    

//Method to get student status
get_student_status(id:number){
    let student=this.students.find(std=>std.id===id)      //let student=this.find_student(id) we can also use this if we make a method to find the student
    if(student){
        student.getStudentStatus()
    }
    
}
    
    //Method to find student by id we can use that in various method
//find_student(id:number){
  // return this.students.find(std=>std.id===id)
//}

}
async function main() {
    console.log("WELCOME TO STUDENT MANAGEMENT SYSTEM");
    console.log("-".repeat(50));
    let student_manager=new Student_manager()
   //while loop for running the program continously
    while (true) {
        let answers = await inquirer.prompt([{
            name: "choice",
            type: "list",
            message: "Select Your Choice",
            choices: ["Add Student", "Enroll Student", "View Student Balance", "Pay Fees", "Show Status", "Exit"]
        }])
        switch (answers.choice) {
            case "Add Student":
                let add_student = await inquirer.prompt({
                    name: "name",
                    type: "input",
                    message: "Enter Student Name",
                    validate: (input) => {
                        if (input !=="") {
                            return true
                        } else {
                            return "Please Enter Valid Name"
                        }
                    }
                });student_manager.addNewStudents(add_student.name)
                break;
        case "Enroll Student":
            let course_input=await inquirer.prompt([{
                name:"id",
                type:"number",
                message:"Enter Student Id"
            },
            {
                name:"course",
                type:"list",
                message:"Select Course",
                choices:["React","Node","Mongo","Express"]
    
            }]);
            student_manager.enroll_student(course_input.id,course_input.course)
                break;
                case "View Student Balance":
                    let view_student=await inquirer.prompt({
                        name:"id",
                        type:"number",
                        message:"Enter Student Id"
                    });student_manager.view_student_balance(view_student.id)
                    break;
                    case "Pay Fees":
                        let pay_fees=await inquirer.prompt([{
                            name:"id",
                            type:"number",
                            message:"Enter Student Id"
                        },
                        {
                            name:"fee",
                            type:"input",
                            message:`Enter the fee amount $1000 which same for all courses ` 
                            
                        }]);
                        if (pay_fees.fee==1000) {
                            student_manager.pay_fees(pay_fees.id,pay_fees.fee)
                        } 
                        else{
                            console.log("invalid ammount");
                            console.log("Registeration cancelled");
                            process.exit()
                        
                        }
                        break;
                        case "Show Status":
                            let show_status=await inquirer.prompt({
                                name:"showStatus",
                                message:"Enter your id number for your status",
                                type:"number"
                            });
                            student_manager.get_student_status(show_status.showStatus)
                            break;
                            case "Exit":
                                console.log("Exiting....");
                                process.exit()
                                break
                                
            default:
                break;
        }
    
}}

//calling main function
main()