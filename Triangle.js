export class Triangle {
    constructor(a,b,c) {
      this.a = Math.max(a,b,c);
      this.b = +(((a+b+c) - (Math.max(a,b,c) + Math.min(a,b,c))).toPrecision(1));
      this.c = Math.min(a,b,c);
      this.exists = (this.c + this.b) > this.a
      this.notDegenerated = this.a !== (this.b + this.c)
    }
    get isEquilateral() {
      return (this.a == this.b) && (this.b == this.c) && this.exists && this.notDegenerated;
    }
    get isIsosceles() {
      return ((this.a == this.b) || (this.b == this.c) || (this.c == this.a)) && this.exists && this.notDegenerated;
    }
    get isScalene() {
      return ((this.a != this.b) && (this.b != this.c)) && this.exists && this.notDegenerated;
    }
  }
  