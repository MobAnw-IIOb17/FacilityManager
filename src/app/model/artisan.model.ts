/**
 * This class is a model for an artisan (Handwerker).
 * It's used to model the different kinds of artisans working at a property
 * and only extracts the information relevant for app internals from the property
 * webservice.
 *
 * @var {string} firstname
 *  the first name of the artisan
 * @var {string} lastname
 *  the family name of the artisan
 * @var {string} telephone
 *  the landline of the artisan
 * @var {string} mobile
 *  the artisan's mobile phone number
 * @var {string} email
 *  the artisan's email address
 * @var {string} company
 *  the company the artisan works for
 * @var {string} street
 *  the street the artisan lives in, including the house number
 * @var {string} zip
 *  the zip code of the city the artisan lives in
 * @var {string} city
 *  the city the artisan lives in
 */
export class Artisan {
  firstname: string;
  lastname: string;
  telephone: string;
  mobile: string;
  email: string;
  company: string;
  street: string;
  zip: string;
  city: string;
}
