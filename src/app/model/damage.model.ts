/**
 * This class is a wrapper for the Damage object of the Webservice.
 * It contains all data provided by the user interface for filing damage reports.
 *
 * @var {string} uid
 *  the unique identifier of the object
 * @var {string} createDate
 *  when the damage report was created
 * @var {Property} property
 *  the property the damage was detected in
 * @var {Employee} employee
 *  the employee who files the report
 * @var {string} description
 *  a few words to describe the nature of the damage
 * @var {string[]} images
 *  an array of images encoded in base-64 strings
 * @var {string} location
 *  the location where exactly the damage was found, can be floor, room, or other details to help locate the damage
 */
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
