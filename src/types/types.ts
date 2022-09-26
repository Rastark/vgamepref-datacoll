export type GameProps = Array<{ id: number, name: string }>;

export type QuestionProps = {
    [x: string]: any;
    items: Array<{
        id: string, 
        subject: string, 
        dimension: string, 
        sub_dimension: string, 
        is_score_rev: boolean
    }>
};