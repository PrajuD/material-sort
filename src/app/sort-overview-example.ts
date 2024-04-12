import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';

export interface Dessert {
  favorite: boolean;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

export const FAVORITES_FIRST = true;
export const FAVORITES_ALSO_SORTED = true;

/**
 * @title Sorting overview
 */
@Component({
  selector: 'sort-overview-example',
  templateUrl: 'sort-overview-example.html',
  styleUrls: ['sort-overview-example.css'],
})
export class SortOverviewExample {
  desserts: Dessert[] = [
    {
      favorite: false,
      name: 'Tiramisu',
      calories: 159,
      fat: 6,
      carbs: 24,
      protein: 4,

    },
    {
      favorite: false,
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4,
    },
    {
      favorite: true,
      name: 'Lint',
      calories: 262,
      fat: 16,
      carbs: 24,
      protein: 6,
    },
    {
      favorite: false,
      name: 'Cupcake',
      calories: 305,
      fat: 4,
      carbs: 67,
      protein: 4,
    },
    {
      favorite: true,
      name: 'Laddu',
      calories: 356,
      fat: 16,
      carbs: 49,
      protein: 4,
    },
  ];

  sortedData: Dessert[];

  favFirst = FAVORITES_FIRST;
  favSorted = FAVORITES_ALSO_SORTED;

  sort?: Sort;
  title: any;

  constructor() {
    this.onSortChanged({ active: 'carbs', direction: 'asc' });
  }

  onSortChanged(sort: Sort) {
    this.sort = sort;

    const data = this.desserts.slice();
    const column = sort.active;
    const isAsc = sort.direction === 'asc';
    this.sortIt(column, isAsc, data);
  }

  resortAfterDataChanged() {
    this.onSortChanged(this.sort);
  }

  sortIt(property: string, isAsc: boolean, data: Dessert[]): void {
    data.sort((a, b) => {
      if (FAVORITES_FIRST) {
        if (a.favorite && b.favorite) {
          return this.sortFavorites(property, isAsc, a, b);
        }
        // if only one favorite, the favorite is on top, no matter asc or desc
        if (a.favorite === true) {
          return -1;
        } else if (b.favorite === true) {
          return 1;
        }
      }

      // if no favorite, standard sorting
      return this.stdSort(property, isAsc, a, b);
    });

    this.sortedData = data;
  }

  stdSort(property: string, isAsc: boolean, a: Dessert, b: Dessert) {
    switch (property) {
      case 'name':
        return compare(a.name, b.name, isAsc);
      case 'calories':
        return compare(a.calories, b.calories, isAsc);
      case 'fat':
        return compare(a.fat, b.fat, isAsc);
      case 'carbs':
        return compare(a.carbs, b.carbs, isAsc);
      case 'protein':
        return compare(a.protein, b.protein, isAsc);
      default:
        return 0;
    }
  }

  private sortFavorites(
    property: string,
    isAsc: boolean,
    a: Dessert,
    b: Dessert
  ): number {
    if (FAVORITES_ALSO_SORTED) {
      // if both favorites, they must be ordered among themselves
      return this.stdSort(property, isAsc, a, b);
    }
    // if both favorites, no sorting among themselves
    return 0;
  }
}

function compare(
  a: number | string,
  b: number | string,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


