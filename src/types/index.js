const { loadFilesSync, mergeTypeDefs } = require('graphql-tools')

const typesArray = loadFilesSync(__dirname)

module.exports = mergeTypeDefs(typesArray, { all: true })