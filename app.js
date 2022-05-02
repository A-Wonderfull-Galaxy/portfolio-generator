const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?(REQUIRED)',
            validate: nameInput =>{
                if (nameInput) {
                    return true;
                }else{
                    console.log('Please enter your name!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username(REQUIRED)',
            validate: githubInput =>{
                if (githubInput) {
                    return true;
                }else{
                    console.log('Please enter your GitHub username!')
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout}) => confirmAbout
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
    ================
    Add a New Project
    ================
    `);
       
        //If theres no 'projects' array property, create one
        if (!portfolioData.projects){
            portfolioData.projects= [];
        }
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is the name of your project?(REQUIRED!)',
                    validate: nameInput =>{
                        if (nameInput) {
                            return true;
                        }else{
                            console.log('Please enter your Project Name!')
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'description',
                    message: 'Provide a description of the project (REQUIRED!)?',
                    validate: descriptionInput =>{
                        if (descriptionInput) {
                            return true;
                        }else{
                            console.log('Please enter your Project Description!')
                            return false;
                        }
                    }
                },
                {
                    type: 'checkbox',
                    name: 'language',
                    message: 'What did you build this project with? ( Check all that apply)',
                    choices: ['JavaScript','CSS','ES6','JQuerry','BootStrap','Node']
                },
                {
                    type: 'input',
                    name: 'link',
                    message: 'Enter the GitHub link to your project. (Required)',
                    validate: linkInput =>{
                        if (linkInput) {
                            return true;
                        }else{
                            console.log('Please enter your GutHub Project link!')
                            return false;
                        }
                    }
                },
                {
                    type: 'confirm',
                    name: 'feature',
                    message: 'Would you like to feature this project?',
                    default: false
                },
                {
                    type: 'confirm',
                    name: 'confirmAddProject',
                    message: 'Would you like to enter another project?',
                    default: false
                }
            ])
            .then(projectData => {
                portfolioData.projects.push(projectData);
                if (projectData.confirmAddProject) {
                    return promptProject(portfolioData);
                }else{
                return portfolioData;
                }
            });
};

fs.writeFile('./dist/index.html', pageHTML, err => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Page created! Check out index.html in this directory to see it!');

    fs.copyFile('./src/style.css', './dist/style.css', err =>{
        if (err) {
            console.log(err);
            return;
        }

        console.log('Style sheet copied seccussfully!');
    });
});

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse =>{
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err =>{
        console.log(err);
    });
    
    