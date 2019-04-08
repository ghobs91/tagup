exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function(tbl) {
    tbl.increments();
    tbl.timestamp('timestamp').defaultTo(knex.fn.now());
    tbl.string('name', 255)
    tbl.float('rating')
    tbl.boolean('visited')
    tbl.timestamp('creationDate').defaultTo(knex.fn.now());
    tbl.timestamp('lastModificationDate').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('restaurants');
};