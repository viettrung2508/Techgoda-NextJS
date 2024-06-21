import React from "react";

declare type HtmlViewProps = {
    content: string;
};

export default function HtmlView({ content }: HtmlViewProps) {
    return <div
        dangerouslySetInnerHTML={{ __html: content }} />;
};
