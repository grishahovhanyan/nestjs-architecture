---
to: "src/modules/<%= h.moduleFolderName(name) %>/<%= h.controllerFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !resources.includes('Controller') %>
---
<%
  ModuleName = h.ModuleName(name)

  ControllerName = h.ControllerName(name)
  ControllerPrefix = h.toDashCase(h.pascalPluralize(name))

  ServiceName = h.ServiceName(name)
  serviceFileName = h.serviceFileName(name)
  serviceParamName = h.changeCase.camel(ServiceName)

  RepositoryName = h.RepositoryName(name)
  repositoryFileName = h.repositoryFileName(name)

  EntityName = h.EntityName(name)
  entityFileName = h.entityFileName(name)

  instanceName = h.instanceName(name)
  instanceId = instanceName + 'Id'

  dtosFolderName = h.dtosFolderName()
  ResponseDtoName = h.ResponseDtoName(name)
  CreateDtoName = h.CreateDtoName(name)
  GetDtoName = h.GetDtoName(name)
  UpdateDtoName = h.UpdateDtoName(name)

  createDtoParamName = h.changeCase.camel(CreateDtoName)
  updateDtoParamName = h.changeCase.camel(UpdateDtoName)

%>import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'

import { Swagger } from '@app/swagger'
import { EnhancedController, RequestUser, TransformResponse } from '@app/common'

import { <%= CreateDtoName %>, <%= GetDtoName %>, <%= UpdateDtoName %>, <%= ResponseDtoName %> } from './<%= dtosFolderName %>'
import { <%= ServiceName %> } from './<%= serviceFileName %>'

@EnhancedController('<%= ControllerPrefix %>')
@TransformResponse(<%= ResponseDtoName %>)
export class <%= ControllerName %> {
  constructor(private readonly <%= serviceParamName %>: <%= ServiceName %>) {}

  @Swagger({ response: <%= ResponseDtoName %>, pagination: true })
  @Get()
  index(
    @RequestUser('id') currentUserId: number,
    @Query() query: <%= GetDtoName %>
  ) {
    return this.<%= serviceParamName %>.index(currentUserId, query)
  }

  @Swagger({ response: <%= ResponseDtoName %>, 201: true, errorResponses: [400, 404] })
  @Post()
  create(
    @RequestUser('id') currentUserId: number,
    @Param('id') <%= instanceId %>: number,
    @Body() <%= createDtoParamName %>: <%= CreateDtoName %>
  ) {
    return this.<%= serviceParamName %>.create(currentUserId, <%= instanceId %>, <%= createDtoParamName %>)
  }

  @Swagger({ response: <%= ResponseDtoName %>, errorResponses: [404] })
  @Get(':id')
  find(
    @RequestUser('id') currentUserId: number,
    @Param('id') <%= instanceId %>: number
  ) {
    return this.<%= serviceParamName %>.find(currentUserId, <%= instanceId %>)
  }

  @Swagger({ response: <%= ResponseDtoName %>, errorResponses: [400, 404] })
  @Put(':id')
  update(
    @RequestUser('id') currentUserId: number,
    @Param('id') <%= instanceId %>: number,
    @Body() <%= updateDtoParamName %>: <%= UpdateDtoName %>
  ) {
    return this.<%= serviceParamName %>.update(currentUserId, <%= instanceId %>, <%= updateDtoParamName %>)
  }

  @Swagger({ response: <%= ResponseDtoName %>, errorResponses: [404] })
  @Delete(':id')
  delete(
    @RequestUser('id') currentUserId: number,
    @Param('id') <%= instanceId %>: number
  ) {
    return this.<%= serviceParamName %>.delete(currentUserId, <%= instanceId %>)
  }
}

