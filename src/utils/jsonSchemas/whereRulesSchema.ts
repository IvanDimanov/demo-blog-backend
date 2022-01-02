const whereRulesSchema = {
  title: 'Where rules',
  description: `Allow to filter list of results by using common rules.
    List of available operations: \`=\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`
    Example:

    {
      "where": [{
        "column": "rating",
        "operation": ">",
        "value": 4
      }]
    }
  `,
  type: 'object',
  properties: {
    where: {
      description: 'An array of `where` clauses we want to use for filtering',
      type: 'array',
      items: {
        description: 'Single `where` clause',
        type: 'object',
        properties: {
          column: {
            description: 'DB column name we want to use for filtering',
            type: 'string',
            example: 'price',
          },

          operation: {
            description: 'What kind of filtering we want: =, >, <, etc.',
            type: 'string',
            example: '=',
          },

          value: {
            description: 'What is the value we use for filtering',
            type: ['string', 'number'],
            example: 20,
          },
        },
        required: ['column', 'operation', 'value'],
      },
    },

    whereNot: {
      description: 'An array of `whereNot` clauses we want to use for filtering',
      type: 'array',
      items: {
        description: 'Single `whereNot` clause',
        type: 'object',
        properties: {
          column: {
            description: 'DB column name we want to use for filtering',
            type: 'string',
            example: 'price',
          },

          operation: {
            description: 'What kind of filtering we want: =, >, <, like, etc.',
            type: 'string',
            example: '=',
          },

          value: {
            description: 'What is the value we use for filtering',
            type: ['string', 'number'],
            example: 20,
          },
        },
        required: ['column', 'operation', 'value'],
      },
    },

    whereIn: {
      description: 'An array of `whereIn` clauses we want to use for filtering',
      type: 'array',
      items: {
        description: 'Single `whereIn` clause',
        type: 'object',
        properties: {
          column: {
            description: 'DB column name we want to use for filtering',
            type: 'string',
            example: 'price',
          },

          value: {
            description: 'What are the values we use for filtering',
            type: 'array',
            example: [1, 2, 3],
            items: {
              type: ['string', 'number'],
            },
          },
        },
        required: ['column', 'value'],
      },
    },

    whereNotIn: {
      description: 'An array of `whereNotIn` clauses we want to use for filtering',
      type: 'array',
      items: {
        description: 'Single `whereNotIn` clause',
        type: 'object',
        properties: {
          column: {
            description: 'DB column name we want to use for filtering',
            type: 'string',
            example: 'price',
          },

          value: {
            description: 'What are the values we use for filtering',
            type: 'array',
            example: [1, 2, 3],
            items: {
              type: ['string', 'number'],
            },
          },
        },
        required: ['column', 'value'],
      },
    },

    whereBetween: {
      description: 'An array of `whereBetween` clauses we want to use for filtering',
      type: 'array',
      items: {
        description: 'Single `whereBetween` clause',
        type: 'object',
        properties: {
          column: {
            description: 'DB column name we want to use for filtering',
            type: 'string',
            example: 'price',
          },

          value: {
            description: 'What are the values we use for range filtering',
            type: 'array',
            example: [1, 2],
            items: {
              type: ['string', 'number'],
            },
          },
        },
        required: ['column', 'value'],
      },
    },

    whereNotBetween: {
      description: 'An array of `whereNotBetween` clauses we want to use for filtering',
      type: 'array',
      items: {
        description: 'Single `whereNotBetween` clause',
        type: 'object',
        properties: {
          column: {
            description: 'DB column name we want to use for filtering',
            type: 'string',
            example: 'price',
          },

          value: {
            description: 'What are the values we use for range filtering',
            type: 'array',
            example: [1, 2],
            items: {
              type: ['string', 'number'],
            },
          },
        },
        required: ['column', 'value'],
      },
    },
  },
  additionalProperties: false,
} as const


export default whereRulesSchema
