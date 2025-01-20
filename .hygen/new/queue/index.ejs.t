---
to: "src/infrastructure/queues/<%= h.queueFolderName(queueName) %>/index.ts"
unless_exists: true
---
<%
  queueServiceFileName = h.queueServiceFileName(queueName)

%>export * from './enums'

export * from './<%= queueServiceFileName %>'
