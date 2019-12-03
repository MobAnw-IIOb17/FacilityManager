import {Deserializable} from './deserializable.model';

export class Damage implements Deserializable{
    id: string;
    place: string;
    address: string;
    location: string;
    tenant: string;
    description: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
