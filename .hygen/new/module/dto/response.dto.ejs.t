---
to: "src/modules/<%= h.moduleFolderName(name) %>/<%= h.dtosFolderName(name) %>/<%= h.responseDtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !resources.includes('ResponseDto') %>
---
<%
  ResponseDtoName = h.ResponseDtoName(name);

%>import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

@Exclude()
export class <%= ResponseDtoName %> {
  @Expose()
  @ApiProperty()
  id: number
}
