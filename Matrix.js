export class Matrix {
  
    constructor(str) {
      this.row = str.split('\n').map(el => el.split(' ').map(el => Number(el)));
      this.colum = Object.keys(this.row[0]).map(idx => this.row.map(el => el[idx]));
    }
    get rows() {
      return this.row;
    }
    get columns() {
      return this.colum;
    }
  }
  