export const getImgSrc = (value) => {
    if (value?.includes("http")) return value;
    else return `https://d2ww1nxgcpzn26.cloudfront.net${value}`;
};
