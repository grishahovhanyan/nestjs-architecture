---
to: "src/modules/<%= h.moduleFolderName(name) %>/<%= h.dtosFolderName(name) %>/<%= h.updateDtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !resources.includes('UpdateDto') %>
---
<%
  createDtoFileName = h.createDtoFileName(name)
  CreateDtoName = h.CreateDtoName(name)

  UpdateDtoName = h.UpdateDtoName(name)

%>import { PickType } from '@nestjs/swagger'

import { <%= CreateDtoName %> } from './<%= createDtoFileName %>'

export class <%= UpdateDtoName %> extends PickType(<%= CreateDtoName %>, [] as const) {}
