'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var upload = require('./upload.js');
var vue = require('vue');
var constants = require('./constants.js');
var uploadList_vue_vue_type_script_setup_true_lang = require('./upload-list.vue2.js');
var uploadContent_vue_vue_type_script_setup_true_lang = require('./upload-content.vue2.js');
var useHandlers = require('./use-handlers.js');
var useFormCommonProps = require('../../form/src/hooks/use-form-common-props.js');

var _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...{
    name: "ElUpload"
  },
  __name: "upload",
  props: upload.uploadProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const disabled = useFormCommonProps.useFormDisabled();
    const uploadRef = vue.shallowRef();
    const {
      abort,
      submit,
      clearFiles,
      uploadFiles,
      handleStart,
      handleError,
      handleRemove,
      handleSuccess,
      handleProgress,
      revokeFileObjectURL
    } = useHandlers.useHandlers(props, uploadRef);
    const isPictureCard = vue.computed(() => props.listType === "picture-card");
    const uploadContentProps = vue.computed(() => ({
      ...props,
      fileList: uploadFiles.value,
      onStart: handleStart,
      onProgress: handleProgress,
      onSuccess: handleSuccess,
      onError: handleError,
      onRemove: handleRemove
    }));
    vue.onBeforeUnmount(() => {
      uploadFiles.value.forEach(revokeFileObjectURL);
    });
    vue.provide(constants.uploadContextKey, {
      accept: vue.toRef(props, "accept")
    });
    __expose({
      /** @description cancel upload request */
      abort,
      /** @description upload the file list manually */
      submit,
      /** @description clear the file list  */
      clearFiles,
      /** @description select the file manually */
      handleStart,
      /** @description remove the file manually */
      handleRemove
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", null, [
        isPictureCard.value && __props.showFileList ? (vue.openBlock(), vue.createBlock(uploadList_vue_vue_type_script_setup_true_lang.default, {
          key: 0,
          disabled: vue.unref(disabled),
          "list-type": __props.listType,
          files: vue.unref(uploadFiles),
          crossorigin: __props.crossorigin,
          "handle-preview": __props.onPreview,
          onRemove: vue.unref(handleRemove)
        }, vue.createSlots({
          append: vue.withCtx(() => [
            vue.createVNode(
              uploadContent_vue_vue_type_script_setup_true_lang.default,
              vue.mergeProps({
                ref_key: "uploadRef",
                ref: uploadRef
              }, uploadContentProps.value),
              {
                default: vue.withCtx(() => [
                  _ctx.$slots.trigger ? vue.renderSlot(_ctx.$slots, "trigger", { key: 0 }) : vue.createCommentVNode("v-if", true),
                  !_ctx.$slots.trigger && _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", { key: 1 }) : vue.createCommentVNode("v-if", true)
                ]),
                _: 3
                /* FORWARDED */
              },
              16
              /* FULL_PROPS */
            )
          ]),
          _: 2
          /* DYNAMIC */
        }, [
          _ctx.$slots.file ? {
            name: "default",
            fn: vue.withCtx(({ file, index }) => [
              vue.renderSlot(_ctx.$slots, "file", {
                file,
                index
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["disabled", "list-type", "files", "crossorigin", "handle-preview", "onRemove"])) : vue.createCommentVNode("v-if", true),
        !isPictureCard.value || isPictureCard.value && !__props.showFileList ? (vue.openBlock(), vue.createBlock(
          uploadContent_vue_vue_type_script_setup_true_lang.default,
          vue.mergeProps({
            key: 1,
            ref_key: "uploadRef",
            ref: uploadRef
          }, uploadContentProps.value),
          {
            default: vue.withCtx(() => [
              _ctx.$slots.trigger ? vue.renderSlot(_ctx.$slots, "trigger", { key: 0 }) : vue.createCommentVNode("v-if", true),
              !_ctx.$slots.trigger && _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", { key: 1 }) : vue.createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          },
          16
          /* FULL_PROPS */
        )) : vue.createCommentVNode("v-if", true),
        _ctx.$slots.trigger ? vue.renderSlot(_ctx.$slots, "default", { key: 2 }) : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "tip"),
        !isPictureCard.value && __props.showFileList ? (vue.openBlock(), vue.createBlock(uploadList_vue_vue_type_script_setup_true_lang.default, {
          key: 3,
          disabled: vue.unref(disabled),
          "list-type": __props.listType,
          files: vue.unref(uploadFiles),
          crossorigin: __props.crossorigin,
          "handle-preview": __props.onPreview,
          onRemove: vue.unref(handleRemove)
        }, vue.createSlots({
          _: 2
          /* DYNAMIC */
        }, [
          _ctx.$slots.file ? {
            name: "default",
            fn: vue.withCtx(({ file, index }) => [
              vue.renderSlot(_ctx.$slots, "file", {
                file,
                index
              })
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["disabled", "list-type", "files", "crossorigin", "handle-preview", "onRemove"])) : vue.createCommentVNode("v-if", true)
      ]);
    };
  }
});

exports.default = _sfc_main;
//# sourceMappingURL=upload.vue2.js.map
