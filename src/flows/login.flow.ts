import { LoginPage } from '../pages/login.page';
import { User } from '../types';

export async function loginAs(loginPage: LoginPage, user: User): Promise<void> {
  await loginPage.goto();
  await loginPage.login(user.username, user.password);
}
