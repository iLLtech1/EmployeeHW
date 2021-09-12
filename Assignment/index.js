const render = require('./lib/htmlRenderer.js')
const Intern = require('./lib/Intern.js.js')
const Engineer = require('./lib/Engineer.js.js')
const Manager = require('./lib/Manager.js')
const { prompt } = require('inquirer')
const { writeFile } = require('fs')

const school = []

const buildManager = ({ name, email, phone }) => {
  prompt({
    type: 'input',
    name: 'position',
    message: 'What is their position?'
  })
    .then(({ position }) => {
      school.push(new Faculty(name, email, phone, position))
      menu()
    })
}

const buildEngineer = ({ name, email, phone }) => {
  prompt({
    type: 'input',
    name: 'subject',
    message: 'What subject do they teach?'
  })
    .then(({ subject }) => {
      school.push(new Teacher(name, email, phone, subject))
      menu()
    })
}

const buildIntern = ({ name, email, phone }) => {
  prompt({
    type: 'number',
    name: 'grade',
    message: 'What grade are they in?'
  })
    .then(({ grade }) => {
      school.push(new Student(name, email, phone, grade))
      menu()
    })
}

const buildEmployee = () => {
  prompt([
    {
      type: 'list',
      name: 'role',
      message: 'Who would you like to create?',
      choices: ['Student', 'Teacher', 'Faculty']
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is their name?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is their email?'
    },
    {
      type: 'input',
      name: 'phone',
      message: 'What is their phone number?'
    }
  ])
    .then(({ role, ...employee }) => {
      switch (role) {
        case 'Intern':
          buildStudent(employee)
          break
        case 'Engineer':
          buildTeacher(employee)
          break
        case 'Manager':
          buildFaculty(employee)
          break
      }
    })
}

const menu = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['Create new person', 'Finish']
  })
    .then(({ action }) => {
      switch (action) {
        case 'Create new person':
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