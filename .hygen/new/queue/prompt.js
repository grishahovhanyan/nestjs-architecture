module.exports = {
  prompt: ({ prompter }) => {
    return prompter
      .prompt([
        {
          type: 'input',
          name: 'queueName',
          message: 'Queue Name:',
          validate(value) {
            if (!value.length) {
              return 'Queue must have a name.'
            }
            return true
          }
        }
      ])
      .then((answer) => {
        return answer
      })
  }
}
