---
to: "src/modules/<%= h.moduleFolderName(name) %>/<%= h.dtosFolderName(name) %>/index.ts"
unless_exists: true
---
<%
  responseDtoFileName = h.responseDtoFileName(name)
  createDtoFileName = h.createDtoFileName(name)
  getDtoFileName = h.getDtoFileName(name)
  updateDtoFileName = h.updateDtoFileName(name)

%>export * from './<%= createDtoFileName %>'
export * from './<%= getDtoFileName %>'
export * from './<%= updateDtoFileName %>'
export * from './<%= responseDtoFileName %>'
