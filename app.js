const inquirer = require('inquirer');
const {writeFile, copyFile} = require('./utils/generate-site');
const generatePage = require('./src/page-template.js');


const promptUser = () => {
   return inquirer.prompt([
      {
         type:'type',
         name:'name',
         message: 'What is your name?',
         validate: nameInput => {
            if (nameInput) {
               return true;
            } else {
               console.log("Please enter your name!");
               return false;
            }
         }
      },
      {
         type:'input',
         name:'github',
         message:'Enter your GitHub Username (Required)',
         validate: nameInput => {
            if (nameInput) {
               return true;
            } else {
               console.log("Please enter the Git Username");
               return false;
            }
         } 
      },
      {
         type:"confirm",
         name:"confirmAbout",
         message:"Would you like to enter some information about yourself for an 'About' section",
         default: true
      },
      {
         type:'input',
         name:'about',
         message:'Provide some information about yourself:',
         when: ({confirmAbout}) => {
            if(confirmAbout) {
               return true;
            } else {
               return false;
            }
         }
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
         message:'Provide a description of the project (Required)',
         validate: userInput => {
            if (userInput){
               return true;
            } else {
               console.log("Please provide a description of the project");
               return false;
            }
         }
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
         message:'Enter the GitHub link to yout project. (Required)',
         validate: userInput => {
            if (userInput){
               return true;
            } else {
               console.log("Link is required!");
               return false;
            }
         }
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

const mockData = {
   name: 'Lernantino',
   github: 'lernantino',
   confirmAbout: true,
   about:
     'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
   projects: [
     {
       name: 'Run Buddy',
       description:
         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
       languages: ['HTML', 'CSS'],
       link: 'https://github.com/lernantino/run-buddy',
       feature: true,
       confirmAddProject: true
     },
     {
       name: 'Taskinator',
       description:
         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
       languages: ['JavaScript', 'HTML', 'CSS'],
       link: 'https://github.com/lernantino/taskinator',
       feature: true,
       confirmAddProject: true
     },
     {
       name: 'Taskmaster Pro',
       description:
         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
       languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
       link: 'https://github.com/lernantino/taskmaster-pro',
       feature: false,
       confirmAddProject: true
     },
     {
       name: 'Robot Gladiators',
       description:
         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
       languages: ['JavaScript'],
       link: 'https://github.com/lernantino/robot-gladiators',
       feature: false,
       confirmAddProject: false
     }
   ]
 };


promptUser()
   .then(promptProject)
   .then(portfolioData => {
      return generatePage(portfolioData);
   })
   .then(pageHTML => {
      return writeFile(pageHTML);
   })
   .then(writeFileResponse => {
      console.log(writeFileResponse);
      return copyFile();
   })
   .then(copyFileResponse => {
      console.log(copyFileResponse);
   })
   .catch(err=>{
      console.log(err);
   });




