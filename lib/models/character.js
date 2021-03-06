const pool = require('../utils/pool');

class Character {
  id;
  name;
  level;
  class;
  race;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.level = row.level;
    this.class = row.class;
    this.race = row.race;
  }

  static async insert(character) {
    const { rows } = await pool.query(
      'INSERT INTO characters (name, level, class, race) VALUES ($1, $2, $3, $4) RETURNING *',
      [character.name, character.level, character.class, character.race]
    );

    return new Character(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM characters WHERE id = $1',
      [id]
    );

    if(!rows[0]) return null;
    else return new Character(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM characters'
    );

    return rows.map(row => new Character(row));
  }

  static async update(id, updatedCharacter) {
    const { rows } = await pool.query(
      `UPDATE characters
       SET name=$1,
           level=$2,
           class=$3,
           race=$4
       WHERE id = $5
       RETURNING *
      `,
      [updatedCharacter.name, updatedCharacter.level, updatedCharacter.class, updatedCharacter.race, id]
    );

    return new Character(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM characters WHERE id = $1 RETURNING *',
      [id]
    );

    return new Character(rows[0]);
  }
}

module.exports = Character;
