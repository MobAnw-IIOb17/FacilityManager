/**
 * This class describes a Property.
 * Properties are objects like building complexes, buildings or parts of buildings.
 *
 * @var {string} uid
 *  the unique identifier of the object
 * @var {string} deleted
 *  '1' if deleted, '0' if not deleted
 * @var {string} hidden
 *  '1' if hidden, '0' if not hidden
 * @var {string} title
 *  some mysterious attribute which, for now, is empty for all properties
 * @var {string} street
 *  the street where the property is located
 * @var {string} zip
 *  the zip code of the city where the property is located
 * @var {string} city
 *  the city where the property is located
 * @var {string} owner
 *  the (real-life) owner of the property
 */
export class Property {
    uid: string;
    deleted: string;
    hidden: string;
    title: string;
    street: string;
    zip: string;
    city: string;
    owner: string;
}
