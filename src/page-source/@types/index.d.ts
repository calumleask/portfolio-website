
declare namespace Pages {

    type ProjectInfo = {
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

}
