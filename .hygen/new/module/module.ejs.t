---
to: "src/modules/<%= h.moduleFolderName(name) %>/<%= h.moduleFileName(name) %>.ts"
unless_exists: true
---
<%
  ModuleName = h.ModuleName(name)

  ControllerName = h.ControllerName(name)
  controllerFileName = h.controllerFileName(name)

  ServiceName = h.ServiceName(name)
  serviceFileName = h.serviceFileName(name)

  RepositoryName = h.RepositoryName(name)
  repositoryFileName = h.repositoryFileName(name)

  EntityName = h.EntityName(name)
  entitiesFolderName = h.entitiesFolderName(name)
  entityFileName = h.entityFileName(name)

%>import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { <%= EntityName %> } from './<%= entitiesFolderName %>/<%= entityFileName %>'
import { <%= ControllerName %> } from './<%= controllerFileName %>'
import { <%= RepositoryName %> } from './<%= repositoryFileName %>'
import { <%= ServiceName %> } from './<%= serviceFileName %>'

@Module({
  imports: [TypeOrmModule.forFeature([<%= EntityName %>])],
  controllers: [<%= ControllerName %>],
  providers: [<%= RepositoryName %>, <%= ServiceName %>],
  exports: [<%= ServiceName %>]
})
export class UsersModule {}
