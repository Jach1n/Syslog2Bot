import { uploadDraggerEmits, uploadDraggerProps } from './upload-dragger.mjs';
import { defineComponent, inject, ref, createElementBlock, openBlock, withModifiers, normalizeClass, unref, renderSlot } from 'vue';
import { throwError } from '../../../utils/error.mjs';
import { flatten } from 'lodash-unified';
import { uploadContextKey } from './constants.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useFormDisabled } from '../../form/src/hooks/use-form-common-props.mjs';

const COMPONENT_NAME = "ElUploadDrag";
var _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "upload-dragger",
  props: uploadDraggerProps,
  emits: uploadDraggerEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const uploaderContext = inject(uploadContextKey);
    if (!uploaderContext) {
      throwError(
        COMPONENT_NAME,
        "usage: <el-upload><el-upload-dragger /></el-upload>"
      );
    }
    const ns = useNamespace("upload");
    const dragover = ref(false);
    const disabled = useFormDisabled();
    const getFile = (entry) => {
      return new Promise((resolve, reject) => entry.file(resolve, reject));
    };
    const getAllFiles = async (entry) => {
      try {
        if (entry.isFile) {
          const file = await getFile(
            entry
          );
          file.isDirectory = false;
          return [file];
        }
        if (entry.isDirectory) {
          const dirReader = entry.createReader();
          const getEntries = () => {
            return new Promise(
              (resolve, reject) => dirReader.readEntries(resolve, reject)
            );
          };
          const entries = [];
          let readEntries = await getEntries();
          while (readEntries.length > 0) {
            entries.push(...readEntries);
            readEntries = await getEntries();
          }
          const filePromises = entries.map(
            (entry2) => getAllFiles(entry2).catch(() => [])
          );
          const files = await Promise.all(filePromises);
          return flatten(files);
        }
      } catch (e) {
        return [];
      }
      return [];
    };
    const onDrop = async (e) => {
      if (disabled.value) return;
      dragover.value = false;
      e.stopPropagation();
      const files = Array.from(e.dataTransfer.files);
      const items = e.dataTransfer.items || [];
      if (props.directory) {
        const entries = Array.from(items).map((item) => {
          var _a;
          return (_a = item == null ? void 0 : item.webkitGetAsEntry) == null ? void 0 : _a.call(item);
        }).filter((entry) => entry);
        const allFiles = await Promise.all(entries.map(getAllFiles));
        emit("file", flatten(allFiles));
        return;
      }
      files.forEach((file, index) => {
        var _a;
        const item = items[index];
        const entry = (_a = item == null ? void 0 : item.webkitGetAsEntry) == null ? void 0 : _a.call(item);
        if (entry) {
          file.isDirectory = entry.isDirectory;
        }
      });
      emit("file", files);
    };
    const onDragover = () => {
      if (!disabled.value) dragover.value = true;
    };
    const onDragleave = (e) => {
      if (!e.currentTarget.contains(e.relatedTarget))
        dragover.value = false;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        "div",
        {
          class: normalizeClass([unref(ns).b("dragger"), unref(ns).is("dragover", dragover.value)]),
          onDrop: withModifiers(onDrop, ["prevent"]),
          onDragover: withModifiers(onDragover, ["prevent"]),
          onDragleave: withModifiers(onDragleave, ["prevent"])
        },
        [
          renderSlot(_ctx.$slots, "default")
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
});

export { _sfc_main as default };
//# sourceMappingURL=upload-dragger.vue2.mjs.map
