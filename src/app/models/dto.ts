export interface AddResponse {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    value: string;
    tag: string;
    id: string;
}

export interface Meta {
    sent: string;
    summary: Summary;
}

export interface Summary {
    created: number;
    not_created: number;
    valid: number;
    invalid: number;
}

export interface AddRequest {
    add: Add[];
}

export interface Add {
    value: string;
    tag: string;
}

export class Tweet {
    id: number;
    data: Data;
    includes: Includes;
    matching_rules: MatchingRule[];

    constructor(entity: TweetEntity) {
        const _data = JSON.parse(entity.data);
        this.id = entity.id ? entity.id : null;
        this.data = _data.data;
        this.includes = _data.includes;
        this.matching_rules = _data.matching_rules;
    }
}

export interface Data {
    id: string;
    text: string;
    author_id: string;
    created_at: string;
}

export interface Includes {
    users: User[];
}

export interface User {
    id: string;
    name: string;
    username: string;
}

export interface MatchingRule {
    id: number;
    tag: string;
}

export interface TweetHistoryDto {
    content: Content[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface Content {
    data: string;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface TweetEntity {
    id: number;
    data: string;
}

