import { Section } from './section';

export interface PageData {
    pageTitle?: string,
    moreData?: boolean,
    sections: Section[]
}