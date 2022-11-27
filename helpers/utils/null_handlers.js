const nullAssign = (prop, obj) => {
  // nullHandling
  const handler = {
    [prop]: null
  }

  const finalHandle = {
    ...handler, ...obj
  }
  return finalHandle
}

const nullResponse = (prop, projectName, endpoint, methodType) => {
  // nullResponseHandling
  const responseErr = {
    Error: {
      message: "Unhandled : " + prop + " property doesn't exist",
      project: projectName,
      endpoint: endpoint,
      method: methodType
    }
  }

  return responseErr
}

const nullPropResponse = (prop) => {
  // nullPropHandling
  const responseErr = {
    Error: {
      message: "Unhandled : " + prop + " property doesn't exist",
    }
  }

  return responseErr
}

module.exports = {
  nullAssign,
  nullResponse,
  nullPropResponse
}