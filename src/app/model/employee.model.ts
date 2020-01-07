/**
 * This is a wrapper class for the Employee object from the Webservice.
 *
 * @var {string} uid
 *  the unique identifier of the object
 * @var {string} name
 *  the employee's name which is needed for identifying who wrote a damage report
 * @var {string} deleted
 *  '1' if deleted, '0' if not deleted
 * @var {string} hidden
 *  '1' if hidden, '0' if not hidden
 */
export class Employee {
    uid: string;
    name: string;
    deleted: string;
    hidden: string;
}
