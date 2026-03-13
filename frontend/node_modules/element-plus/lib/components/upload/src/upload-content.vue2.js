'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var uploadContent = require('./upload-content.js');
var vue = require('vue');
var lodashUnified = require('lodash-unified');
var uploadDragger_vue_vue_type_script_setup_true_lang = require('./upload-dragger.vue2.js');
var upload = require('./upload.js');
var objects = require('../../../utils/objects.js');
var index = require('../../../hooks/use-namespace/index.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');
var shared = require('@vue/shared');

const _hoisted_1 = ["tabindex", "aria-disabled", "onKeydown"];
const _hoisted_2 = ["name", "disabled", "multiple", "accept", "webkitdirectory"];
var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElUploadContent",
    inheritAttrs: false
  },
  __name: "upload-content",
  props: uploadContent.uploadContentProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = index.useNamespace("upload");
    const disabled = useFormCommonProps.useFormDisabled();
    const requests = vue.shallowRef(
      {}
    );
    const inputRef = vue.shallowRef();
    const uploadFiles = (files) => {
      if (files.length === 0) return;
      const { autoUpload, limit, fileList, multiple, onStart, onExceed } = props;
      if (limit && fileList.length + files.length > limit) {
        onExceed(files, fileList);
        return;
      }
      if (!multiple) {
        files = files.slice(0, 1);
      }
      for (const file of files) {
        const rawFile = file;
        rawFile.uid = upload.genFileId();
        onStart(rawFile);
        if (autoUpload) upload$1(rawFile);
      }
    };
    const upload$1 = async (rawFile) => {
      inputRef.value.value = "";
      if (!props.beforeUpload) {
        return doUpload(rawFile);
      }
      let hookResult;
      let beforeData = {};
      try {
        const originData = props.data;
        const beforeUploadPromise = props.beforeUpload(rawFile);
        beforeData = shared.isPlainObject(props.data) ? lodashUnified.cloneDeep(props.data) : props.data;
        hookResult = await beforeUploadPromise;
        if (shared.isPlainObject(props.data) && lodashUnified.isEqual(originData, beforeData)) {
          beforeData = lodashUnified.cloneDeep(props.data);
        }
      } catch (e) {
        hookResult = false;
      }
      if (hookResult === false) {
        props.onRemove(rawFile);
        return;
      }
      let file = rawFile;
      if (hookResult instanceof Blob) {
        if (hookResult instanceof File) {
          file = hookResult;
        } else {
          file = new File([hookResult], rawFile.name, {
            type: rawFile.type
          });
        }
      }
      doUpload(
        Object.assign(file, {
          uid: rawFile.uid
        }),
        beforeData
      );
    };
    const resolveData = async (data, rawFile) => {
      if (shared.isFunction(data)) {
        return data(rawFile);
      }
      return data;
    };
    const doUpload = async (rawFile, beforeData) => {
      const {
        headers,
        data,
        method,
        withCredentials,
        name: filename,
        action,
        onProgress,
        onSuccess,
        onError,
        httpRequest
      } = props;
      try {
        beforeData = await resolveData(beforeData != null ? beforeData : data, rawFile);
      } catch (e) {
        props.onRemove(rawFile);
        return;
      }
      const { uid } = rawFile;
      const options = {
        headers: headers || {},
        withCredentials,
        file: rawFile,
        data: beforeData,
        method,
        filename,
        action,
        onProgress: (evt) => {
          onProgress(evt, rawFile);
        },
        onSuccess: (res) => {
          onSuccess(res, rawFile);
          delete requests.value[uid];
        },
        onError: (err) => {
          onError(err, rawFile);
          delete requests.value[uid];
        }
      };
      const request = httpRequest(options);
      requests.value[uid] = request;
      if (request instanceof Promise) {
        request.then(options.onSuccess, options.onError);
      }
    };
    const handleChange = (e) => {
      const files = e.target.files;
      if (!files) return;
      uploadFiles(Array.from(files));
    };
    const handleClick = () => {
      if (!disabled.value) {
        inputRef.value.value = "";
        inputRef.value.click();
      }
    };
    const handleKeydown = () => {
      handleClick();
    };
    const abort = (file) => {
      const _reqs = objects.entriesOf(requests.value).filter(
        file ? ([uid]) => String(file.uid) === uid : () => true
      );
      _reqs.forEach(([uid, req]) => {
        if (req instanceof XMLHttpRequest) req.abort();
        delete requests.value[uid];
      });
    };
    __expose({
      abort,
      upload: upload$1
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass([
          vue.unref(ns).b(),
          vue.unref(ns).m(__props.listType),
          vue.unref(ns).is("drag", __props.drag),
          vue.unref(ns).is("disabled", vue.unref(disabled))
        ]),
        tabindex: vue.unref(disabled) ? void 0 : 0,
        "aria-disabled": vue.unref(disabled),
        role: "button",
        onClick: handleClick,
        onKeydown: vue.withKeys(vue.withModifiers(handleKeydown, ["self"]), ["enter", "space"])
      }, [
        __props.drag ? (vue.openBlock(), vue.createBlock(uploadDragger_vue_vue_type_script_setup_true_lang.default, {
          key: 0,
          disabled: vue.unref(disabled),
          directory: __props.directory,
          onFile: uploadFiles
        }, {
          default: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["disabled", "directory"])) : vue.renderSlot(_ctx.$slots, "default", { key: 1 }),
        vue.createElementVNode("input", {
          ref_key: "inputRef",
          ref: inputRef,
          class: vue.normalizeClass(vue.unref(ns).e("input")),
          name: __props.name,
          disabled: vue.unref(disabled),
          multiple: __props.multiple,
          accept: __props.accept,
          webkitdirectory: __props.directory || void 0,
          type: "file",
          onChange: handleChange,
          onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {
          }, ["stop"]))
        }, null, 42, _hoisted_2)
      ], 42, _hoisted_1);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=upload-content.vue2.js.map
