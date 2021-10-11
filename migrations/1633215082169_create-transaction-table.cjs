/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable(
    'transaction',
    {
      id: {
        type: 'text',
        notNull: true,
      },
      bank_transaction_id: {
        type: 'text',
        notNull: true
      },
      date: {
        type: 'bigint',
        notNull: true,
      },
      amount: {
        type: 'numeric(5, 2)', // Max $99,999.99 amount
        notNull: true,
      },
      vendor: {
        type: 'text',
        notNull: true,
      },
      category: 'text',
      bank: {
        type: 'text',
        notNull: true,
      },
      created_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
      }
    }
  )
};

exports.down = pgm => {};
