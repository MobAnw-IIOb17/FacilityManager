/**
 * This class describes an item for the object checklist.
 * Its use is for documenting the state of each part that needs to be checked in a certain object/property.
 * @var {string} name
 *  the name of the checklist item
 * @var {string} description
 *  a few words about the state of the item that needs to be checked
 * @var {boolean} is_ok
 *  a concluding judgement whether the inspected item is in an ok state
 * @var {string[]} images
 *  an array of images encoded in base-64 strings
 */
export class ChecklistItem {
    name: string;
    description: string;
    // tslint:disable-next-line:variable-name
    is_ok: boolean;
    images: string[];
}
