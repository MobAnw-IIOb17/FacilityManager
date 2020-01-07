import { Checklist } from './checklist.model';
import { Employee } from './employee.model';
import { Property } from './property.model';

/**
 * This class contains the needed information for organising the checklist for an object/property.
 * @var {Property} property
 *  the object/property that needs to be checked
 * @var {Employee} employee
 *  the employee that does the checking
 * @var {Checklist[]} checklist
 *  the checklist containing all to be checked items in the named object/property
 */
export class ObjectChecklist {
    property: Property;
    employee: Employee;
    checklist: Checklist[];
}
