import JsonView from './json-viewer';

const install = (Vue) => {
    Vue.components('JsonViewer', JsonView);
}
export default Object.assign(JsonView, {install});
