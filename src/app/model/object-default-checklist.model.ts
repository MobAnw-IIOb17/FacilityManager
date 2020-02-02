/**
 * Interface to contain the fetched checklist data from the web service.
 *
 * @var {number} object_uid
 *  the uid of the object/property
 * @var {string} update
 *  timestamp from when the default checklist was updated
 * @var {JSON} checklist
 *  a json string containing the already existing checklist items
 */
export interface ObjectDefaultChecklist {
    object_uid: number;
    update: string;
    checklist: JSON;
}
