function exampleValues(propertyName: string, propertyDetail, exampleValue: string | number | boolean, enumValues) {
  if (propertyName === 'id' || propertyName.endsWith('Id')) {
    propertyDetail[propertyName].example = exampleValue ?? 1
  }

  if (propertyName.endsWith('At')) {
    propertyDetail[propertyName].example = exampleValue ?? '2023-11-11T09:00:00.111Z'
  } else if (propertyName === 'firstName') {
    propertyDetail[propertyName].example = exampleValue ?? 'John'
  } else if (propertyName === 'lastName') {
    propertyDetail[propertyName].example = exampleValue ?? 'Doe'
  } else if (propertyName === 'fullName') {
    propertyDetail[propertyName].example = exampleValue ?? 'John Doe'
  }

  if (enumValues) {
    propertyDetail[propertyName].enum = enumValues
  }

  return propertyDetail
}

export const getOrderingDescription = (sortFields: string[]) => `
    Allowed fields: ${sortFields.join(', ')}

    Examples: 
      ?ordering=-id (descending) 
      ?ordering=createdAt (ascending) 
      ?ordering=id,-createdAt`

export const integerProperty = (propertyName: string, example?: number, enumValues?: number[]) => {
  const result = {
    [propertyName]: { type: 'integer', example, enum: enumValues }
  }

  exampleValues(propertyName, result, example, enumValues)

  return result
}

export const stringProperty = (propertyName: string, example?: string, enumValues?: string[]) => {
  const result = {
    [propertyName]: { type: 'string', example, enum: enumValues }
  }

  exampleValues(propertyName, result, example, enumValues)

  return result
}

export const booleanProperty = (propertyName: string) => ({ [propertyName]: { type: 'boolean' } })

export const arrayProperty = (propertyName: string, itemType: string, itemProperties?: any) => ({
  [propertyName]: {
    type: 'array',
    items: {
      type: itemType,
      properties: itemType === 'object' ? itemProperties : {}
    }
  }
})

export const objectProperty = (propertyName: string, properties: any) => ({
  [propertyName]: {
    type: 'object',
    properties
  }
})

export const paginatedResponseProperties = (itemProperties: any) => ({
  pages: {
    type: 'object',
    properties: {
      ...integerProperty('next', 3),
      ...integerProperty('previous', 1),
      ...integerProperty('current', 2),
      ...integerProperty('numPages', 5),
      ...integerProperty('perPage', 30)
    }
  },
  ...integerProperty('count', 30),
  ...arrayProperty('results', 'object', itemProperties)
})

export const userProperties = {
  ...integerProperty('id'),
  ...stringProperty('firstName'),
  ...stringProperty('lastName'),
  ...stringProperty('fullName'),
  ...stringProperty('birthDate', '2004-04-14'),
  ...integerProperty('age', 20),
  ...stringProperty('email'),
  ...stringProperty('registeredAt')
}
