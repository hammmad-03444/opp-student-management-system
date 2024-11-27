import inquirer from "inquirer";
let todo = [];
let condition = true;
while (condition === true) {
    let answer = await inquirer.prompt([{
            name: "add",
            type: "input",
            message: "What you want to add in your todo?"
        },
        {
            name: "add2",
            type: "confirm",
            message: "Do you want to add more??",
            default: "false"
        },
    ]);
    todo.push(answer.add);
    condition = answer.add2;
}
console.log(`Your todo is here ${todo}`);
// for delete the items
let itemsDel = await inquirer.prompt([{
        name: "delitems",
        type: "confirm",
        message: "Do you want to delete last item??"
    }]);
if (itemsDel.delitems === true) {
    todo.pop();
    console.log(`Your todo is here ${todo}`);
}
// for replace the items
let itemsReplace = await inquirer.prompt([{
        name: "replace",
        type: "confirm",
        message: "Do you want to replace any item??"
    }]);
if (itemsReplace.replace === true) {
    let index = await inquirer.prompt([{
            name: "index",
            type: "list",
            message: "Which item you want to replace??",
            choices: todo
        }]);
    // replace the item with indexof
    let repitem = todo.indexOf(index.index);
    if (repitem !== 0) {
        let replace = await inquirer.prompt([{
                name: "replace",
                type: "input",
                message: "What you want to replace??"
            }]);
        todo[repitem] = replace.replace;
        console.log(`Your todo is here ${todo}`);
    }
}
else {
    console.log(`Your todo is here ${todo}`);
}
