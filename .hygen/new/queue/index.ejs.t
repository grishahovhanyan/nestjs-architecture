---
to: "src/infrastructure/queues/<%= h.queueFolderName(queueName) %>/index.ts"
unless_exists: true
---
<%
  queueModuleFileName = h.queueModuleFileName(queueName)
  queueServiceFileName = h.queueServiceFileName(queueName)

%>export * from './enums'
export * from './<%= queueModuleFileName %>'
export * from './<%= queueServiceFileName %>'
