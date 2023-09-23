import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Substitui o ponto por vírgula
    return value.replace('.', ',');
  }
}
