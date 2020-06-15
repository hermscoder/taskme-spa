import { FilterType } from './FilterType';

export class FilterField {
  key: string;
  label: string;
  options: any[];
  choosen: any;
  type: FilterType;

  constructor (key, label, options = null, type) {
    this.key = key;
    this.label = label;
    this.options = options;
    this.type = type;
  }
}
