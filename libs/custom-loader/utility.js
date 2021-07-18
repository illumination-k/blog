exports.transformToJsxNode =  function(parent, index, value, position) {
    const newNode = {
        type: "jsx",
        value: value,
        postion: position,
    };

    parent.children[index] = newNode;
}
