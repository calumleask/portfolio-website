
export type Project = {
    id: string;
    fields: {
        slug: string;
    };
    frontmatter: {
        date: string;
        title: string;
        tags: string;
    };
};
