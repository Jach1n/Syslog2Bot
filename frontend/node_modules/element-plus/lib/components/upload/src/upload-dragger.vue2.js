'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var uploadDragger = require('./upload-dragger.js');
var vue = require('vue');
var error = require('../../../utils/error.js');
var lodashUnified = require('lodash-unified');
var constants = require('./constants.js');
var index = require('../../../hooks/use-namespace/index.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');

const COMPONENT_NAME = "ElUploadDrag";
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: COMPONENT_NAME
  },
  __name: "upload-dragger",
  props: uploadDragger.uploadDraggerProps,
  emits: uploadDragger.uploadDraggerEmits,
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const uploaderContext = vue.inject(constants.uploadContextKey);
    if (!uploaderContext) {
      error.throwError(
        COMPONENT_NAME,
        "usage: <el-upload><el-upload-dragger /></el-upload>"
      );
    }
    const ns = index.useNamespace("upload");
    const dragover = vue.ref(false);
    const disabled = useFormCommonProps.useFormDisabled();
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
          return lodashUnified.flatten(files);
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
        emit("file", lodashUnified.flatten(allFiles));
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
      return vue.openBlock(), vue.createElementBlock(
        "div",
        {
          class: vue.normalizeClass([vue.unref(ns).b("dragger"), vue.unref(ns).is("dragover", dragover.value)]),
          onDrop: vue.withModifiers(onDrop, ["prevent"]),
          onDragover: vue.withModifiers(onDragover, ["prevent"]),
          onDragleave: vue.withModifiers(onDragleave, ["prevent"])
        },
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=upload-dragger.vue2.js.map
