export function getActionTypeByModel(type, modelName) {
    return `${type}_${modelName.toUpperCase()}`;
}