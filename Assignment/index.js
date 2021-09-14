const render = require('./lib/htmlRenderer.js')
const Intern = require('./lib/Intern.js')
const Engineer = require('./lib/Engineer.js')
const Manager = require('./lib/Manager.js')
const { prompt } = require('inquirer')
const { writeFile } = require('fs')

const company = []

const buildManager = ({ name, email, phone }) => {
  prompt({
    type: 'input',
    name: 'officeNumber',
    message: 'What is your office number?'
  })
    .then(({ officeNumber }) => {
      company.push(new Manager(name, email, phone, officeNumber))
      menu()
    })
}
const buildEngineer = ({ name, email, id }) => {
  prompt({
    type: 'input',
    name: 'github',
    message: 'What is you github user name?'
  })
    .then(({ github }) => {
      company.push(new Engineer(name, email, id, github))
      menu()
    })
}

const buildIntern = ({ name, email, id, }) => {
  prompt({
    type: 'input',
    name: 'school',
    message: 'What school do you goto?'
  })
    .then(({ school }) => {
      company.push(new Intern(name, email, id, school))
      menu()
    })
}

const buildEmployee = () => {
  prompt([
    {
      type: 'list',
      name: 'role',
      message: 'What is your role?',
      choices: ['Manager', 'Engineer', 'Intern']
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?'
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is your id number?'
    }
  ])
    .then(({ role, ...employee }) => {
      switch (role) {
        case 'Intern':
          buildIntern(employee)
          break
        case 'Engineer':
          buildEngineer(employee)
          break
        case 'Manager':
          buildManager(employee)
          break
      }
    })
}

const menu = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['Create new Employee!', 'Finish']
  })
    .then(({ action }) => {
      switch (action) {
        case 'Create new Employee!':
          buildEmployee()
          break
        case 'Finish':
          writeFile('./output/company.html', render(company), err => {
            if (err) { console.log(err) }
            console.log('Company Built!')
          })
          break
      }
    })
}

menu()