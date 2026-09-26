import { faker } from '@faker-js/faker';
import { CheckoutInfo } from '../types';
import { getTestSeed } from '../utils/random.utils';

export function generateCheckoutInfo(seed?: number): CheckoutInfo {
  faker.seed(seed ?? getTestSeed());
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode('#####'),
  };
}

export function generateMissingFirstName(seed?: number): CheckoutInfo {
  return { ...generateCheckoutInfo(seed), firstName: '' };
}

export function generateMissingLastName(seed?: number): CheckoutInfo {
  return { ...generateCheckoutInfo(seed), lastName: '' };
}

export function generateMissingPostalCode(seed?: number): CheckoutInfo {
  return { ...generateCheckoutInfo(seed), postalCode: '' };
}
