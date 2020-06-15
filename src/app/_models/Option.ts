export class Option {
  value: any;
  label: string;
  name: string;

  constructor (label, value) {
    this.label = label;
    this.name = label.replace(" ", "").toLowerCase();
    this.value = value;
  }
}
