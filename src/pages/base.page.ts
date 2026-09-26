import { type Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';
import { MenuComponent } from './components/menu.component';

export class BasePage {
  readonly page: Page;
  readonly header: HeaderComponent;
  readonly menu: MenuComponent;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.menu = new MenuComponent(page);
  }
}
