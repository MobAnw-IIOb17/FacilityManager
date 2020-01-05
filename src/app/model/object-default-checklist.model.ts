/**
 * Interface to contain the fetched checklist data from the web service.
 * @var {number} object_uid
 *  the uid of the object/property
 * @var {string} update
 *  TODO: find out what this is, I guess timestamp of when it was updated
 * @var {JSON} checklist
 *  a json string containing the already existing checklist items
 */
interface ObjectDefaultChecklist {
    object_uid: number;
    update: string;
    checklist: JSON;
}
