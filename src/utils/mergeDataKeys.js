export default function mergeDataKeys(dataItem, keys) {
    const mergedData = [...new Array(dataItem[keys[0]].length)].map(() => ({}));

    [...new Array(dataItem[keys[0]].length)]
        .map((_, idx) => idx)
        .forEach((idx) => {
            const newProps = keys.reduce(
                (accum, key) => ({
                    ...accum,
                    ...dataItem[key][idx],
                }),
                {},
            );
            mergedData[idx] = {
                ...mergedData[idx],
                ...newProps,
            };
        });

    return mergedData;
}
