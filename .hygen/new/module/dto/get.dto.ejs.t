---
to: "src/modules/<%= h.moduleFolderName(name) %>/<%= h.dtosFolderName(name) %>/<%= h.getDtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !resources.includes('CreateDto') %>
---
<%
  GetDtoName = h.GetDtoName(name);

%>import { IntersectionType } from '@nestjs/swagger'

import { OrderDto, PaginationDto, SearchDto } from '@app/common'

export class <%= GetDtoName %> extends IntersectionType(
  PaginationDto(),
  SearchDto,
  OrderDto()
) {
  userId?: number
}
