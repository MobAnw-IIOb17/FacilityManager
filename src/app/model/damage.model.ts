import { Property } from './property.model';
import { Employee } from './employee.model';

export class Damage {
    uid: string;
    createDate: string;
    property: Property;
    employee: Employee;
    description: string;
    images: string[];
    location: string;
}
