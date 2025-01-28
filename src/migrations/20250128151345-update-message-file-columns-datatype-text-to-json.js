'use strict';

module.exports = {
  // up: async (queryInterface, Sequelize) => {
  //   await queryInterface.changeColumn('Messages', 'file_url', {
  //     type: Sequelize.JSONB,
  //     allowNull: true,
  //   });

  //   await queryInterface.changeColumn('Messages', 'filename', {
  //     type: Sequelize.JSONB,
  //     allowNull: true,
  //   });

  //   await queryInterface.changeColumn('Messages', 'filetype', {
  //     type: Sequelize.JSONB,
  //     allowNull: true,
  //   });

  //   await queryInterface.changeColumn('Messages', 'filesize', {
  //     type: Sequelize.JSONB,
  //     allowNull: true,
  //   });
  // },

  // down: async (queryInterface, Sequelize) => {
  //   await queryInterface.changeColumn('Messages', 'file_url', {
  //     type: Sequelize.STRING,
  //     allowNull: true,
  //   });

  //   await queryInterface.changeColumn('Messages', 'filename', {
  //     type: Sequelize.STRING,
  //     allowNull: true,
  //   });

  //   await queryInterface.changeColumn('Messages', 'filetype', {
  //     type: Sequelize.STRING,
  //     allowNull: true,
  //   });

  //   await queryInterface.changeColumn('Messages', 'filesize', {
  //     type: Sequelize.BIGINT,
  //     allowNull: true,
  //   });
  // },

  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Messages"
      ALTER COLUMN "file_url" TYPE JSONB USING "file_url"::JSONB
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "Messages"
      ALTER COLUMN "filename" TYPE JSONB USING "filename"::JSONB
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "Messages"
      ALTER COLUMN "filetype" TYPE JSONB USING "filetype"::JSONB
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "Messages"
      ALTER COLUMN "filesize" TYPE JSONB USING "filesize"::JSONB
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Messages"
      ALTER COLUMN "file_url" TYPE TEXT USING "file_url"::TEXT
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "Messages"
      ALTER COLUMN "filename" TYPE TEXT USING "filename"::TEXT
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "Messages"
      ALTER COLUMN "filetype" TYPE TEXT USING "filetype"::TEXT
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE "Messages"
      ALTER COLUMN "filesize" TYPE BIGINT USING 
      CASE 
        WHEN jsonb_typeof("filesize") = 'number' THEN ("filesize"::TEXT)::BIGINT
        WHEN jsonb_typeof("filesize") = 'string' AND ("filesize"::TEXT) ~ '^\\d+$' THEN ("filesize"::TEXT)::BIGINT
        ELSE NULL
      END
    `);
  },

};
