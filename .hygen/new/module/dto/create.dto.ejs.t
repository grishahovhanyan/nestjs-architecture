---
to: "src/modules/<%= h.moduleFolderName(name) %>/<%= h.dtosFolderName(name) %>/<%= h.createDtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !resources.includes('CreateDto') %>
---
<%
  CreateDtoName = h.CreateDtoName(name);

%>export class <%= CreateDtoName %> {}
