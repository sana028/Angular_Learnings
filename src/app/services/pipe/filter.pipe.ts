import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, fieldName: string): any[] {
    console.log(items,searchText,fieldName)
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return item[fieldName].toLowerCase().includes(searchText);
    });
  }

}
