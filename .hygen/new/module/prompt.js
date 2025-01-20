/* eslint-disable prettier/prettier */
module.exports = {
  prompt: ({ prompter }) => {
    return prompter
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Module Name:',
          validate(value) {
            if (!value.length) {
              return 'Module must have a name.'
            }
            return true
          }
        },
        {
          type: 'MultiSelect',
          name: 'resources',
          message: 'Resources:',
          initial: [
            'Entity',
            'Controller',
            'Service',
            'Repository',
            'ResponseDto',
            'CreateDto',
            'GetDto',
            'UpdateDto'
          ],
          choices: [
            {
              name: 'Entity',
              value: 'entity'
            },
            {
              name: 'Controller',
              value: 'controller'
            },
            {
              name: 'Service',
              value: 'service'
            },
            {
              name: 'Repository',
              value: 'repository'
            },
            {
              name: 'ResponseDto',
              value: 'response-dto'
            },
            {
              name: 'CreateDto',
              value: 'create-dto'
            },
            {
              name: 'GetDto',
              value: 'get-dto'
            },
            {
              name: 'UpdateDto',
              value: 'update-dto'
            }
          ]
        }
      ])
      .then((answer) => {
        return answer
      })
  }
}
