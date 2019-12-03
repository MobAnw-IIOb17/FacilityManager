import { Checklist } from './checklist.model';
import { Employee } from './employee.model';
import { Property } from './property.model';

export class ObjectChecklist {
    property: Property;
    employee: Employee;
    checklist: Checklist[];
}
