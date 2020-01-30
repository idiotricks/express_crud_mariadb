const pool = require('../utils/pools');

class Person {
  constructor() {
    this._table = 'person'
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this._rows = null;
  }

  setId(id) {
    this.id = id;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  getId() {
    return this.id;
  }

  getFisrtName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  async all() {
    const connection = await pool.getConnection();
    this._rows = await connection.query(`SELECT * FROM ${this._table} ORDER BY id DESC LIMIT 10`);
    return this._rows;
  }

  async create() {
    const connection = await pool.getConnection();
    this._rows = await connection.query(`
      INSERT INTO ${this._table}
      (first_name, last_name)
      VALUES (?, ?)
    `, [
      this.getFisrtName(),
      this.getLastName()
    ]);

    this.setId(this._rows.insertId);
    this._rows = await this.get();
    return this._rows;
  }

  async get() {
    const connection = await pool.getConnection();
    this._rows = await connection.query(
      `SELECT * FROM ${this._table} WHERE id=${this.getId()}`
    );

    return this._rows[0] || null;
  }

  async update() {
    this._rows = await this.get();
    this.setLastName(this.lastName || this._rows[0].last_name);
    this.setFirstName(this.firstName || this._rows[0].firstName);
    const connection = await pool.getConnection();

    this._rows = await connection.query(
      `
      UPDATE ${this._table} 
      SET first_name=?,
          last_name=?
      WHERE id = ?;
      `,
      [
        this.getFisrtName(),
        this.getLastName(),
        this.getId()
      ]
    );

    this._rows = await this.get();
    return this._rows;
  } 

  async delete() {
    const connection = await pool.getConnection();
    this._rows = connection.query(`
        DELETE FROM ${this._table} WHERE id=?
      `, 
      [this.getId()]
    );

    return null;
  }

}


module.exports = Person; 