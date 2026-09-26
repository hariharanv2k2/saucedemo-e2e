import { test as pomTest } from './pom.fixture';
import { loginAs } from '../flows/login.flow';
import { USERS } from '../data/users.data';

type AuthFixtures = {
  authenticatedPage: void;
};

export const test = pomTest.extend<AuthFixtures>({
  authenticatedPage: [
    async ({ loginPage }, use) => {
      await loginAs(loginPage, USERS.standard);
      await use();
    },
    { auto: false },
  ],
});
