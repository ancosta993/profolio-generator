const inquirer = require('inquirer');

const promptUser = () => {
   return inquirer.prompt([
      {
         type:'type',
         name:'name',
         message: 'What is your name?'
      },
      {
         type:'input',
         name:'github',
         message:'Enter your GitHub Username'
      },
      {
         type:'input',
         name:'about',
         message:'Provide some information about yourself:'
      }

   ]);
};

const promptProject = protfolioData => {
   // If there is no projects array property, creat one

   if(!protfolioData.projects){
      protfolioData.projects = [];
   }

   console.log(`
   =================
   Add a New Project
   =================
   `);

   return inquirer.prompt([
      {
         type:'input',
         name:'name',
         message: 'What is the name of your project?'
      },
      {
         type:'type',
         name:'description',
         message:'Provide a description of the project (Required)'
      },
      {
         type:'checkbox',
         name:'languages',
         message:'What did you build this project with? (check all that apply)',
         choices: ['JavaScript', 'HTML', 'CSS', "ES6", "jQuery",'Bootstrap','Node']
      },
      {
         type: 'input',
         name:'link',
         message:'Enter the GitHub link to yout project. (Required)'
      },
      {
         type:'confirm',
         name:'feature',
         message:'Would you like to feature this project?',
         default: false
      },
      {
         type: 'confirm',
         name:'confirmAddProject',
         message:'Would you like to enter another project?',
         default: false
      }

   ]).then(projectData => {
      protfolioData.projects.push(projectData);
      if(projectData.confirmAddProject){
         return promptProject(protfolioData);
      } else {
         return protfolioData;
      }
   });
   
};

promptUser()
   .then(promptProject)
   .then(protfolioData => console.log(protfolioData));



// const fs = require('fs');
// const generatePage = require('./src/page-template.js');



// const pageHTML = generatePage(name, github)

// fs.writeFile('index.html', pageHTML, err => {
//    if (err) throw err;

//    console.log('Protfolio Complete! Check out index.html to see the output!');
// });