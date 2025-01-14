/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('tokens', {
        id: {
            type: 'text',
            primaryKey: true
        },
        token: {
            type: 'text',
            notNull: true,
        }
    });
};

exports.down = (pgm) => {};
