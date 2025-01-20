---
to: "src/infrastructure/queues/<%= h.queueFolderName(queueName) %>/enums/<%= h.queueJobNamesEnumFileName(queueName) %>.ts"
unless_exists: true
---
<%
  queueJobNamesEnumFileName = h.queueJobNamesEnumFileName(queueName)
  QueueJobNamesEnumName = h.QueueJobNamesEnumName(queueName)

%>export enum <%= QueueJobNamesEnumName %> {
  exampleJob = 'exampleJob'
}
