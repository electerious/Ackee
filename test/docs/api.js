import { mergeTypeDefs } from '@graphql-tools/merge'
import test from 'ava'
import { buildASTSchema, parse, validate } from 'graphql'
import {
  DateTimeTypeDefinition,
  PositiveFloatTypeDefinition,
  UnsignedIntTypeDefinition,
  URLTypeDefinition,
} from 'graphql-scalars'
import { readFile } from 'node:fs/promises'

import typeDefs from '../../src/types/index.js'

const schema = buildASTSchema(
  mergeTypeDefs([
    DateTimeTypeDefinition,
    PositiveFloatTypeDefinition,
    UnsignedIntTypeDefinition,
    URLTypeDefinition,
    typeDefs,
  ]),
)

const documentation = await readFile(new URL('../../docs/API.md', import.meta.url), 'utf8')
const examples = documentation.matchAll(/```graphql\r?\n([\s\S]*?)```/g).toArray()

test('contains GraphQL examples', (t) => {
  t.true(examples.length > 0)
})

for (const [, source] of examples) {
  const document = parse(source)
  const [operation] = document.definitions

  test(`validate ${operation.name.value}`, (t) => {
    const errors = validate(schema, document)

    t.deepEqual(
      errors.map((error) => error.message),
      [],
    )
  })
}
