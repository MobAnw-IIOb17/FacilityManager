/**
 * This class is a wrapper for the "Object" object of the Webservice which we call "Property" as "Object" is a signal word.
 * Objects/Properties are objects like building complexes, buildings or parts of buildings.
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
import {Artisan} from './artisan.model';

export class Property {
    uid: string;
    deleted: string;
    hidden: string;
    title: string;
    street: string;
    zip: string;
    city: string;
    owner: string;
    // tslint:disable-next-line:variable-name
    owner_street: string;
    // tslint:disable-next-line:variable-name
    owner_zip: string;
    // tslint:disable-next-line:variable-name
    owner_city: string;
    administrator: Artisan;
    elektriker: Artisan;
    heizung: Artisan;
    sanitear: Artisan;
    schluesseldienst: Artisan;
    schornsteinfeger: Artisan;
    brandschutz: Artisan;
    rohrreinigung: Artisan;
    fahrstuhl: Artisan;
}
