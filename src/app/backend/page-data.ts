import { Section } from './section';

export interface PageData {
    pageTitle?: string,
    pageBannerSrc?: string,
    moreData?: boolean,
    sections: Section[]
}