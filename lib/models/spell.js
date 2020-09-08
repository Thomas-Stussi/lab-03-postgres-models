const pool = require('../utils/pool');

class Spell {
    id;
    name;
    school;
    level;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.school = row.school;
      this.level = row.level;
    }

    static async insert(spell) {
      const { rows } = await pool.query(
        'INSERT INTO spells (name, school, level) VALUES ($1, $2, $3) RETURNING *',
        [spell.name, spell.school, spell.level]
      );

      return new Spell(rows[0]);
    }
}

module.exports = Spell;