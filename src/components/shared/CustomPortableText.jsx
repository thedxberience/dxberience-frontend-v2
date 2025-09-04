import { PortableText } from "@portabletext/react";

function CustomPortableText({ value }) {
    if (typeof value !== "string") {
        return <PortableText value={value} />;
    }
    return <div>{value}</div>;
}

export default CustomPortableText;