import {ChecklistItem} from './checklist-item.model';

/**
 * This class provides the basis for an object checklist.
 *
 * @var {string} name
 *  the name of the checklist
 * @var {ChecklistItem[]} items
 *  the content of the checklist which is a list consisting of ChecklistItems
 */
export class Checklist {
    name: string;
    items: ChecklistItem[];
}
