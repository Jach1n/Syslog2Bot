import { ref, watch } from 'vue';
import { isEqual, get } from 'lodash-unified';

const defaultProps = {
  label: "label",
  value: "value",
  disabled: "disabled",
  options: "options"
};
function useProps(props) {
  const aliasProps = ref({ ...defaultProps, ...props.props });
  let cache = { ...props.props };
  watch(
    () => props.props,
    (val) => {
      if (!isEqual(val, cache)) {
        aliasProps.value = { ...defaultProps, ...val };
        cache = { ...val };
      }
    },
    { deep: true }
  );
  const getLabel = (option) => get(option, aliasProps.value.label);
  const getValue = (option) => get(option, aliasProps.value.value);
  const getDisabled = (option) => get(option, aliasProps.value.disabled);
  const getOptions = (option) => get(option, aliasProps.value.options);
  return {
    aliasProps,
    getLabel,
    getValue,
    getDisabled,
    getOptions
  };
}

export { defaultProps, useProps };
//# sourceMappingURL=useProps.mjs.map
