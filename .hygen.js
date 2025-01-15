/* eslint-disable prettier/prettier */
module.exports = {
	templates: `${__dirname}/.hygen`,
	helpers: {
		/* ******* Helpers ******* */
		dasherize(name) {
			return this.inflection.dasherize(name).toLowerCase()
		},
		singularize(name) {
			// user -> users
			return this.inflection.singularize(name)
		},
		pluralize(name) {
			// user -> users
			return this.inflection.pluralize(this.dasherize(name))
		},

		pascalSingularize(name) {
			// users -> User
			return this.changeCase.pascal(this.singularize(name))
		},
		pascalPluralize(name) {
			// user -> Users
			return this.changeCase.pascal(this.pluralize(name))
		},

		instanceName(name) {
			return this.changeCase.camel(this.EntityName(name))
		},

		folderName(name) {
			return this.pluralize(name)
		},

		/* ******* Module, controller, service, repository names ******* */
		ModuleName(name) {
			return `${this.pascalPluralize(name)}Module`
		},
		ControllerName(name) {
			return `${this.pascalPluralize(name)}Controller`
		},
		ServiceName(name) {
			return `${this.pascalPluralize(name)}Service`
		},
		RepositoryName(name) {
			return `${this.pascalPluralize(name)}Repository`
		},

		/* ******* Module, controller, service, repository folder/file names ******* */
		moduleFolderName(name) {
			return `${this.pluralize(name)}`
		},
		moduleFileName(name) {
			return `${this.folderName(name)}.module`
		},
		controllerFileName(name) {
			return `${this.folderName(name)}.controller`
		},
		repositoryFileName(name) {
			return `${this.folderName(name)}.repository`
		},
		serviceFileName(name) {
			return `${this.folderName(name)}.service`
		},

		/* ******* Entity and table names ******* */
		entitiesFolderName() {
			return `entities`
		},

		TableName(name) {
			name = name.replace(/-/g, '_')
			console.log(name, '<name')
			return this.inflection.pluralize(
				this.inflection
					.underscore(name)
					.toLowerCase()
			)
		},
		EntityName(name) {
			return this.pascalSingularize(name)
		},

		entityFileName(name) {
			return `${this.dasherize(this.singularize(name))}.entity`
		},

		/* ******* Dtos ******* */
		dtosFolderName() {
			return `dto`
		},

		ResponseDtoName(name) {
			return `${this.pascalSingularize(name)}ResponseDto`
		},
		CreateDtoName(name) {
			return `Create${this.pascalSingularize(name)}Dto`
		},
		GetDtoName(name) {
			return `Get${this.pascalPluralize(name)}Dto`
		},
		UpdateDtoName(name) {
			return `Update${this.pascalSingularize(name)}Dto`
		},

		responseDtoFileName(name) {
			return `${this.singularize(name)}-response.dto`
		},
		createDtoFileName(name) {
			return `create-${this.singularize(name)}.dto`
		},
		getDtoFileName(name) {
			return `get-${this.pluralize(name)}.dto`
		},
		updateDtoFileName(name) {
			return `update-${this.singularize(name)}.dto`
		},
	}
}
