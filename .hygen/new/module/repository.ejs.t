---
to: "src/modules/<%= h.moduleFolderName(name) %>/<%= h.repositoryFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !resources.includes('Repository') %>
---
<%
  RepositoryName = h.RepositoryName(name)

  EntityName = h.EntityName(name)
  entitiesFolderName = h.entitiesFolderName(name)
  entityFileName = h.entityFileName(name)

%>import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { BaseRepository } from '@app/database'

import { <%= EntityName %> } from './<%= entitiesFolderName %>/<%= entityFileName %>'

@Injectable()
export class <%= RepositoryName %> extends BaseRepository< <%= EntityName %> > {
  constructor(dataSource: DataSource) {
    super(dataSource, <%= EntityName %>)
  }
}
