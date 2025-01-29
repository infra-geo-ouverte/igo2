import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  _limit: number = 10;
  _total: number = 0;
  _pages: number = 0;
  currentPage: number = 0;
  pagesArr: number[] = []; //tableau contenant les numéros des pages affichées

  @Input() set limit(value: number) {
    this._limit = value;
    this.calculatePages();
  }
  @Input() set total(value: number) {
    this._total = value;
    this.calculatePages();
  }

  @Output() page = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    this.calculatePages();
  }

  calculatePages() {
    this._pages = Math.ceil(this._total / this._limit); // Arrondi supérieur pour obtenir le nombre de pages
    this.updateVisiblePages(); // Met à jour les pages visibles
  }

  // Met à jour la liste des pages visibles en fonction de la page actuelle.
  updateVisiblePages() {
    let start = Math.max(0, this.currentPage - 1); // Décale la fenêtre de pagination
    let end = Math.min(this._pages, start + 3); // Toujours afficher 3 pages maximum
    this.pagesArr = Array.from(
      { length: end - start },
      (_, i) => start + i + 1
    ); // Remplit pagesArr avec au maximum 3 numéros de pages visibles

    this.pagesArr = this.pagesArr.filter(
      (page) => page > 0 && page <= this._pages
    ); // Assurer que la page est valide
  }

  goToPage(index: number) {
    if (index < 0 || index >= this._pages) return;
    this.currentPage = index;
    this.page.emit(this.currentPage);
    this.updateVisiblePages();
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.page.emit(this.currentPage);
      this.updateVisiblePages();
    }
  }

  nextPage() {
    if (this.currentPage < this._pages - 1) {
      this.currentPage++;
      this.page.emit(this.currentPage);
      this.updateVisiblePages();
    }
  }
}
